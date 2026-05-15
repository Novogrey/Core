(() => {
  const V2_FLAG = 32768;
  const LIMITS = {
    messages: 10,
    content: 2000,
    embeds: 10,
    embedTitle: 256,
    embedDescription: 4096,
    embedFields: 25,
    embedFieldName: 256,
    embedFieldValue: 1024,
    embedFooter: 2048,
    embedAuthor: 256,
    embedTotal: 6000,
    components: 40,
    componentText: 4000,
    containerChildren: 10,
    galleryItems: 10,
    buttonLabel: 80,
    url: 500
  };

  const instances = new WeakMap();

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function clampText(value, max) {
    return String(value || '').slice(0, max);
  }

  function normalizeHexColor(value, fallback = '#44b8de') {
    const raw = String(value || '').trim();
    if (/^#[\da-f]{6}$/i.test(raw)) return raw.toLowerCase();
    if (typeof value === 'number' && Number.isFinite(value)) {
      return `#${Math.max(0, Math.min(0xFFFFFF, Math.floor(value))).toString(16).padStart(6, '0')}`;
    }
    return fallback;
  }

  function colorToInt(value) {
    return Number.parseInt(normalizeHexColor(value).slice(1), 16);
  }

  function normalizeUrl(value, required = false) {
    const raw = String(value || '').trim().slice(0, LIMITS.url);
    if (!raw) return required ? '' : '';
    if (raw.startsWith('attachment://')) return raw;
    try {
      const url = new URL(raw);
      return ['https:', 'http:'].includes(url.protocol) ? url.toString() : '';
    } catch {
      return '';
    }
  }

  function isValidUrl(value, required = false) {
    const raw = String(value || '').trim();
    if (!raw) return !required;
    return Boolean(normalizeUrl(raw));
  }

  function isValidWebhookUrl(value) {
    const raw = String(value || '').trim();
    if (!raw) return false;
    try {
      const url = new URL(raw);
      return url.protocol === 'https:' && url.hostname === 'discord.com' && url.pathname.startsWith('/api/webhooks/');
    } catch {
      return false;
    }
  }

  function firstFilledLine(value, fallback) {
    return String(value || '').split(/\r?\n/).find((line) => line.trim())?.trim() || fallback;
  }

  function embedTotal(embed) {
    return [
      embed.title,
      embed.description,
      embed.author?.name,
      embed.footer?.text,
      ...(embed.fields || []).flatMap((field) => [field.name, field.value])
    ].reduce((sum, value) => sum + String(value || '').length, 0);
  }

  function defaultEmbed() {
    return {
      color: '#44b8de',
      author: { name: '', url: '', icon_url: '' },
      title: '',
      url: '',
      description: '',
      thumbnail: { url: '' },
      image: { url: '' },
      fields: [],
      footer: { text: '', icon_url: '' },
      timestamp: ''
    };
  }

  function defaultMessage() {
    return {
      mode: 'classic',
      content: '# Правила сервера\n\nПожалуйста, ознакомься с правилами перед началом общения.',
      embeds: [{
        ...defaultEmbed(),
        title: 'Основные правила',
        description: '1. Уважай участников.\n2. Не публикуй спам и рекламу.\n3. Используй каналы по назначению.\n4. Не передавай личные данные.',
        footer: { text: 'Правила могут обновляться.', icon_url: '' }
      }],
      activeEmbed: 0,
      blocks: [{
        kind: 'container',
        accent: '#44b8de',
        text: '# Правила сервера\n\n1. Уважай участников.\n2. Не публикуй спам и рекламу.\n3. Используй каналы по назначению.',
        media: '',
        buttonLabel: '',
        buttonUrl: '',
        spoiler: false
      }]
    };
  }

  function normalizeIncomingEmbed(embed = {}) {
    const normalized = defaultEmbed();
    normalized.color = normalizeHexColor(embed.color, '#44b8de');
    normalized.author = {
      name: clampText(embed.author?.name, LIMITS.embedAuthor),
      url: normalizeUrl(embed.author?.url),
      icon_url: normalizeUrl(embed.author?.icon_url || embed.author?.iconURL)
    };
    normalized.title = clampText(embed.title, LIMITS.embedTitle);
    normalized.url = normalizeUrl(embed.url);
    normalized.description = clampText(embed.description, LIMITS.embedDescription);
    normalized.thumbnail = { url: normalizeUrl(embed.thumbnail?.url || embed.thumbnail) };
    normalized.image = { url: normalizeUrl(embed.image?.url || embed.image) };
    normalized.footer = {
      text: clampText(embed.footer?.text, LIMITS.embedFooter),
      icon_url: normalizeUrl(embed.footer?.icon_url || embed.footer?.iconURL)
    };
    normalized.timestamp = String(embed.timestamp || '').slice(0, 64);
    normalized.fields = Array.isArray(embed.fields)
      ? embed.fields.slice(0, LIMITS.embedFields).map((field) => ({
        name: clampText(field.name, LIMITS.embedFieldName),
        value: clampText(field.value, LIMITS.embedFieldValue),
        inline: Boolean(field.inline)
      }))
      : [];
    return normalized;
  }

  function mediaItemsToText(items = []) {
    return items
      .map((item) => {
        const url = item.media?.url || item.file?.url || '';
        const description = item.description || '';
        return description ? `${url} | ${description}` : url;
      })
      .filter(Boolean)
      .join('\n');
  }

  function parseMediaItems(value) {
    return String(value || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, LIMITS.galleryItems)
      .map((line) => {
        const [urlPart, ...descriptionParts] = line.split('|');
        const url = normalizeUrl(urlPart.trim());
        if (!url) return null;
        const description = clampText(descriptionParts.join('|').trim(), 1024);
        return {
          media: { url },
          ...(description ? { description } : {})
        };
      })
      .filter(Boolean);
  }

  function isContainerChildBlock(block) {
    return Boolean(block && ['text', 'section', 'gallery', 'separator', 'button', 'file'].includes(block.kind));
  }

  function normalizeContainerChildren(block = {}) {
    if (Array.isArray(block.children) && block.children.length) {
      block.children = block.children.filter(isContainerChildBlock).slice(0, LIMITS.containerChildren);
      return block.children;
    }

    const children = [];
    const text = clampText(block.text, LIMITS.componentText);
    if (text) {
      if (normalizeUrl(block.thumbnail)) {
        children.push({
          kind: 'section',
          content: text,
          accessoryType: 'thumbnail',
          accessoryUrl: normalizeUrl(block.thumbnail),
          buttonLabel: '',
          buttonUrl: ''
        });
      } else {
        children.push({ kind: 'text', content: text });
      }
    }
    if (block.media) children.push({ kind: 'gallery', media: block.media });
    if (block.buttonUrl) children.push({
      kind: 'button',
      label: block.buttonLabel || 'Open',
      url: block.buttonUrl,
      disabled: Boolean(block.disabled)
    });

    block.children = children.length ? children.slice(0, LIMITS.containerChildren) : [{ kind: 'text', content: '# Title\nContainer text.' }];
    return block.children;
  }

  function blockFromComponent(component = {}) {
    const type = Number(component.type);
    if (type === 10) {
      return [{ kind: 'text', content: clampText(component.content, LIMITS.componentText) }];
    }
    if (type === 14) {
      return [{
        kind: 'separator',
        divider: component.divider !== false,
        spacing: Number(component.spacing) === 2 ? 2 : 1
      }];
    }
    if (type === 12) {
      return [{ kind: 'gallery', media: mediaItemsToText(component.items || []) }];
    }
    if (type === 13) {
      return [{ kind: 'file', fileName: component.file?.url || '', spoiler: Boolean(component.spoiler) }];
    }
    if (type === 1) {
      return (component.components || [])
        .filter((button) => Number(button.type) === 2)
        .map((button) => ({
          kind: 'button',
          label: clampText(button.label, LIMITS.buttonLabel),
          url: normalizeUrl(button.url),
          disabled: Boolean(button.disabled)
        }));
    }
    if (type === 9) {
      const content = (component.components || [])
        .filter((child) => Number(child.type) === 10)
        .map((child) => child.content || '')
        .join('\n\n');
      const accessory = component.accessory || {};
      const accessoryType = Number(accessory.type) === 2 ? 'button' : 'thumbnail';
      return [{
        kind: 'section',
        content: clampText(content, LIMITS.componentText),
        accessoryType,
        accessoryUrl: accessoryType === 'thumbnail' ? normalizeUrl(accessory.media?.url) : normalizeUrl(accessory.url),
        buttonLabel: accessoryType === 'button' ? clampText(accessory.label, LIMITS.buttonLabel) : '',
        buttonUrl: accessoryType === 'button' ? normalizeUrl(accessory.url) : ''
      }];
    }
    if (type === 17) {
      const children = component.components || [];
      const nestedBlocks = children
        .flatMap(blockFromComponent)
        .filter(isContainerChildBlock)
        .slice(0, LIMITS.containerChildren);
      return [{
        kind: 'container',
        accent: normalizeHexColor(component.accent_color, '#44b8de'),
        children: nestedBlocks.length ? nestedBlocks : [{ kind: 'text', content: '' }],
        spoiler: Boolean(component.spoiler)
      }];
    }
    return [];
  }

  function normalizeIncomingMessage(message = {}) {
    const blocks = Array.isArray(message.components)
      ? message.components.flatMap(blockFromComponent).filter(Boolean)
      : [];
    const embeds = Array.isArray(message.embeds)
      ? message.embeds.map(normalizeIncomingEmbed).filter((embed) => buildEmbed(embed))
      : [];
    const rawPayload = normalizeRawPayload(message);
    const hasComponents = Array.isArray(message.components) && message.components.length;
    const hasClassicBody = Boolean(message.content) || embeds.length > 0;
    return {
      mode: hasComponents ? (blocks.length && !hasClassicBody ? 'components' : 'raw') : 'classic',
      content: clampText(message.content, LIMITS.content),
      embeds,
      activeEmbed: 0,
      blocks: blocks.length ? blocks : clone(defaultMessage().blocks),
      raw: JSON.stringify(rawPayload, null, 2)
    };
  }

  function normalizeMessages(messages) {
    const source = Array.isArray(messages) && messages.length ? messages : [defaultMessage()];
    return source.slice(0, LIMITS.messages).map(normalizeIncomingMessage);
  }

  function buildEmbed(source = {}) {
    const embed = {};
    const color = colorToInt(source.color);
    if (source.title) embed.title = clampText(source.title, LIMITS.embedTitle);
    if (source.url && normalizeUrl(source.url)) embed.url = normalizeUrl(source.url);
    if (source.description) embed.description = clampText(source.description, LIMITS.embedDescription);
    if (color || color === 0) embed.color = color;
    if (source.author?.name) {
      embed.author = { name: clampText(source.author.name, LIMITS.embedAuthor) };
      if (normalizeUrl(source.author.url)) embed.author.url = normalizeUrl(source.author.url);
      if (normalizeUrl(source.author.icon_url)) embed.author.icon_url = normalizeUrl(source.author.icon_url);
    }
    if (source.thumbnail?.url && normalizeUrl(source.thumbnail.url)) embed.thumbnail = { url: normalizeUrl(source.thumbnail.url) };
    if (source.image?.url && normalizeUrl(source.image.url)) embed.image = { url: normalizeUrl(source.image.url) };
    const fields = (source.fields || [])
      .filter((field) => field.name || field.value)
      .slice(0, LIMITS.embedFields)
      .map((field) => ({
        name: clampText(field.name || '\u200B', LIMITS.embedFieldName),
        value: clampText(field.value || '\u200B', LIMITS.embedFieldValue),
        inline: Boolean(field.inline)
      }));
    if (fields.length) embed.fields = fields;
    if (source.footer?.text) {
      embed.footer = { text: clampText(source.footer.text, LIMITS.embedFooter) };
      if (normalizeUrl(source.footer.icon_url)) embed.footer.icon_url = normalizeUrl(source.footer.icon_url);
    }
    if (source.timestamp) embed.timestamp = source.timestamp;

    const hasBody = embed.title || embed.description || embed.author || embed.thumbnail || embed.image || embed.fields?.length || embed.footer;
    return hasBody ? embed : null;
  }

  function buildButton(block) {
    const url = normalizeUrl(block.buttonUrl || block.url);
    const label = clampText(block.buttonLabel || block.label || 'Open', LIMITS.buttonLabel);
    return url ? { type: 2, style: 5, label, url, ...(block.disabled ? { disabled: true } : {}) } : null;
  }

  function buildComponent(block) {
    if (block.kind === 'text') {
      const content = clampText(block.content, LIMITS.componentText);
      return content ? { type: 10, content } : null;
    }
    if (block.kind === 'separator') {
      return { type: 14, divider: block.divider !== false, spacing: Number(block.spacing) === 2 ? 2 : 1 };
    }
    if (block.kind === 'gallery') {
      const items = parseMediaItems(block.media);
      return items.length ? { type: 12, items } : null;
    }
    if (block.kind === 'file') {
      const url = String(block.fileName || '').trim();
      return url.startsWith('attachment://') ? { type: 13, file: { url }, ...(block.spoiler ? { spoiler: true } : {}) } : null;
    }
    if (block.kind === 'button') {
      const button = buildButton(block);
      return button ? { type: 1, components: [button] } : null;
    }
    if (block.kind === 'section') {
      const content = clampText(block.content, LIMITS.componentText);
      if (!content) return null;
      let accessory = null;
      if (block.accessoryType === 'button') {
        accessory = buildButton(block);
      } else if (normalizeUrl(block.accessoryUrl)) {
        accessory = { type: 11, media: { url: normalizeUrl(block.accessoryUrl) } };
      }
      return accessory ? { type: 9, components: [{ type: 10, content }], accessory } : null;
    }
    if (block.kind === 'container') {
      const children = normalizeContainerChildren(block)
        .map(buildComponent)
        .filter((component) => component && Number(component.type) !== 17)
        .slice(0, LIMITS.containerChildren);
      if (!children.length) return null;
      return {
        type: 17,
        accent_color: colorToInt(block.accent || '#44b8de'),
        components: children.slice(0, LIMITS.containerChildren),
        ...(block.spoiler ? { spoiler: true } : {})
      };
    }
    return null;
  }

  function buildComponents(blocks = []) {
    return blocks.map(buildComponent).filter(Boolean).slice(0, LIMITS.components);
  }

  function buildRuleMessage(message) {
    if (message.mode === 'raw') {
      return parseRawPayload(message.raw);
    }

    if (message.mode === 'components') {
      return {
        flags: V2_FLAG,
        components: buildComponents(message.blocks)
      };
    }

    const embeds = (message.embeds || []).map(buildEmbed).filter(Boolean).slice(0, LIMITS.embeds);
    return {
      content: clampText(message.content, LIMITS.content),
      embeds
    };
  }

  function normalizeRawPayload(message = {}) {
    const payload = {};
    const flags = Number(message.flags || 0);
    const content = clampText(message.content, LIMITS.content);
    if (content) payload.content = content;
    if (Array.isArray(message.embeds) && message.embeds.length) {
      payload.embeds = message.embeds.slice(0, LIMITS.embeds).map((embed) => clone(embed));
    }
    if (Array.isArray(message.components) && message.components.length) {
      payload.components = clone(message.components).slice(0, LIMITS.components);
    }
    if (flags & V2_FLAG) payload.flags = V2_FLAG;
    return payload;
  }

  function parseRawPayload(raw) {
    const payload = JSON.parse(String(raw || '{}'));
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new Error('Raw JSON must be a Discord message object.');
    }

    const normalized = {};
    if (payload.content) normalized.content = clampText(payload.content, LIMITS.content);
    if (Array.isArray(payload.embeds)) normalized.embeds = payload.embeds.slice(0, LIMITS.embeds);
    if (Array.isArray(payload.components)) normalized.components = payload.components.slice(0, LIMITS.components);
    if (Number(payload.flags || 0) & V2_FLAG) normalized.flags = V2_FLAG;

    if (!normalized.content && !normalized.embeds?.length && !normalized.components?.length) {
      throw new Error('Raw JSON must include content, embeds, or components.');
    }

    return normalized;
  }

  function buildWebhookPayload(state, message) {
    const payload = {
      allowed_mentions: { parse: [] },
      ...buildRuleMessage(message)
    };
    if (state.username) payload.username = clampText(state.username, 80);
    if (normalizeUrl(state.avatarUrl)) payload.avatar_url = normalizeUrl(state.avatarUrl);
    return payload;
  }

  function renderEditorShell() {
    return `
      <div class="rules-editor">
        <div class="rules-panel rules-settings">
          <div class="rules-panel-heading">
            <span>Webhook</span>
            <strong data-editor-status>Готово</strong>
          </div>
          <label class="rules-field">
            <span>Discord webhook URL</span>
            <input type="url" data-setting="webhookUrl" placeholder="https://discord.com/api/webhooks/...">
          </label>
          <div class="rules-two">
            <label class="rules-field">
              <span>Имя вебхука</span>
              <input type="text" data-setting="username" maxlength="80" placeholder="Core">
            </label>
            <label class="rules-field">
              <span>Аватар вебхука</span>
              <input type="url" data-setting="avatarUrl" placeholder="https://...">
            </label>
          </div>
          <div class="rules-actions">
            <button type="button" class="button primary" data-editor-send>Отправить</button>
            <button type="button" class="button secondary" data-editor-export>Экспорт JSON</button>
            <button type="button" class="button secondary" data-editor-copy>Скопировать JSON</button>
            <label class="button secondary rules-file-button">
              Импорт JSON
              <input type="file" data-editor-import accept="application/json,.json">
            </label>
          </div>
          <div class="rules-limit-list" data-editor-limits></div>
          <div class="rules-alert" data-editor-alert hidden></div>
        </div>

        <div class="rules-panel rules-message-list">
          <div class="rules-panel-heading">
            <span>Сообщения</span>
            <button type="button" data-add-message>Добавить</button>
          </div>
          <div class="rules-message-buttons" data-message-list></div>
        </div>

        <div class="rules-panel rules-edit-panel">
          <div class="rules-panel-heading">
            <span data-current-message-title>Сообщение 1</span>
            <div class="rules-mini-actions">
              <button type="button" data-duplicate-message>Дубль</button>
              <button type="button" data-delete-message>Удалить</button>
            </div>
          </div>
          <div class="message-mode-switch" role="group" aria-label="Message type">
            <button type="button" data-message-mode="classic">Content + embeds</button>
            <button type="button" data-message-mode="components">Components V2</button>
            <button type="button" data-message-mode="raw">Raw JSON</button>
          </div>
          <div data-message-editor-body></div>
        </div>

        <div class="rules-panel rules-preview-panel">
          <div class="rules-panel-heading">
            <span>Превью</span>
            <strong data-editor-count>1 сообщение</strong>
          </div>
          <div class="rules-preview" data-editor-preview></div>
        </div>
      </div>
    `;
  }

  function renderEmbedList(message) {
    const embeds = message.embeds || [];
    return `
      <div class="embed-list-toolbar">
        <div class="embed-tabs">
          ${embeds.map((embed, index) => `
            <button type="button" class="${index === message.activeEmbed ? 'is-active' : ''}" data-select-embed="${index}">
              ${escapeHtml(embed.title || `Embed ${index + 1}`)}
            </button>
          `).join('')}
        </div>
        <button type="button" data-add-embed ${embeds.length >= LIMITS.embeds ? 'disabled' : ''}>+ Embed</button>
      </div>
    `;
  }

  function renderEmbedEditor(message) {
    const embed = message.embeds[message.activeEmbed] || defaultEmbed();
    return `
      ${renderEmbedList(message)}
      <div class="embed-editor">
        <div class="rules-mini-actions">
          <button type="button" data-duplicate-embed ${message.embeds.length >= LIMITS.embeds ? 'disabled' : ''}>Дублировать embed</button>
          <button type="button" data-delete-embed ${message.embeds.length <= 1 ? 'disabled' : ''}>Удалить embed</button>
        </div>
        <div class="rules-two">
          <label class="rules-field">
            <span>Цвет</span>
            <input type="color" data-embed-path="color" value="${escapeHtml(normalizeHexColor(embed.color))}">
          </label>
          <label class="rules-field">
            <span>Заголовок</span>
            <input type="text" data-embed-path="title" maxlength="${LIMITS.embedTitle}" value="${escapeHtml(embed.title)}">
          </label>
        </div>
        <label class="rules-field">
          <span>URL заголовка</span>
          <input type="url" data-embed-path="url" value="${escapeHtml(embed.url)}" placeholder="https://...">
        </label>
        <label class="rules-field">
          <span>Описание embed</span>
          <textarea data-embed-path="description" maxlength="${LIMITS.embedDescription}" rows="8">${escapeHtml(embed.description)}</textarea>
        </label>
        <div class="rules-two">
          <label class="rules-field">
            <span>Автор</span>
            <input type="text" data-embed-path="author.name" maxlength="${LIMITS.embedAuthor}" value="${escapeHtml(embed.author?.name)}">
          </label>
          <label class="rules-field">
            <span>URL автора</span>
            <input type="url" data-embed-path="author.url" value="${escapeHtml(embed.author?.url)}" placeholder="https://...">
          </label>
        </div>
        <label class="rules-field">
          <span>Иконка автора</span>
          <input type="url" data-embed-path="author.icon_url" value="${escapeHtml(embed.author?.icon_url)}" placeholder="https://...">
        </label>
        <div class="rules-two">
          <label class="rules-field">
            <span>Thumbnail URL</span>
            <input type="url" data-embed-path="thumbnail.url" value="${escapeHtml(embed.thumbnail?.url)}" placeholder="https://...">
          </label>
          <label class="rules-field">
            <span>Image URL</span>
            <input type="url" data-embed-path="image.url" value="${escapeHtml(embed.image?.url)}" placeholder="https://...">
          </label>
        </div>
        <div class="rules-two">
          <label class="rules-field">
            <span>Footer</span>
            <input type="text" data-embed-path="footer.text" maxlength="${LIMITS.embedFooter}" value="${escapeHtml(embed.footer?.text)}">
          </label>
          <label class="rules-field">
            <span>Footer icon</span>
            <input type="url" data-embed-path="footer.icon_url" value="${escapeHtml(embed.footer?.icon_url)}" placeholder="https://...">
          </label>
        </div>
        <label class="rules-field">
          <span>Timestamp ISO</span>
          <input type="text" data-embed-path="timestamp" value="${escapeHtml(embed.timestamp)}" placeholder="2026-05-06T18:00:00.000Z">
        </label>
        <div class="embed-fields">
          <div class="rules-panel-heading">
            <span>Fields</span>
            <button type="button" data-add-field ${embed.fields.length >= LIMITS.embedFields ? 'disabled' : ''}>Добавить field</button>
          </div>
          ${embed.fields.length ? embed.fields.map((field, index) => `
            <div class="embed-field-row" data-field-index="${index}">
              <label class="rules-field">
                <span>Название</span>
                <input type="text" data-field-name="${index}" maxlength="${LIMITS.embedFieldName}" value="${escapeHtml(field.name)}">
              </label>
              <label class="rules-field">
                <span>Значение</span>
                <textarea data-field-value="${index}" maxlength="${LIMITS.embedFieldValue}" rows="3">${escapeHtml(field.value)}</textarea>
              </label>
              <label class="rules-check">
                <input type="checkbox" data-field-inline="${index}" ${field.inline ? 'checked' : ''}>
                <span>Inline</span>
              </label>
              <button type="button" class="template-copy-btn" data-delete-field="${index}">Удалить</button>
            </div>
          `).join('') : '<p class="editor-muted">Fields пока нет.</p>'}
        </div>
      </div>
    `;
  }

  function renderClassicEditor(message) {
    message.embeds ||= [];
    if (!message.embeds.length) message.embeds.push(defaultEmbed());
    return `
      <label class="rules-field">
        <span>Текст сообщения</span>
        <textarea data-message-content maxlength="${LIMITS.content}" rows="8" placeholder="# Правила сервера">${escapeHtml(message.content)}</textarea>
      </label>
      ${renderEmbedEditor(message)}
    `;
  }

  function renderComponentBlock(block, index, parentIndex = null) {
    const isNested = parentIndex !== null && parentIndex !== undefined;
    const fieldAttrs = isNested
      ? `data-container-index="${parentIndex}" data-child-index="${index}"`
      : `data-component-index="${index}"`;
    const controls = isNested ? `
      <div class="component-block-actions">
        <button type="button" data-move-container-component data-container-index="${parentIndex}" data-child-index="${index}" data-direction="-1" ${index === 0 ? 'disabled' : ''}>↑</button>
        <button type="button" data-move-container-component data-container-index="${parentIndex}" data-child-index="${index}" data-direction="1">↓</button>
        <button type="button" data-duplicate-container-component data-container-index="${parentIndex}" data-child-index="${index}">Дубль</button>
        <button type="button" data-delete-container-component data-container-index="${parentIndex}" data-child-index="${index}">Удалить</button>
      </div>
    ` : `
      <div class="component-block-actions">
        <button type="button" data-move-component="${index}" data-direction="-1" ${index === 0 ? 'disabled' : ''}>↑</button>
        <button type="button" data-move-component="${index}" data-direction="1">↓</button>
        <button type="button" data-duplicate-component="${index}">Дубль</button>
        <button type="button" data-delete-component="${index}">Удалить</button>
      </div>
    `;

    if (block.kind === 'text') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>Text Display</strong>${controls}</div>
          <label class="rules-field">
            <span>Markdown text</span>
            <textarea rows="6" maxlength="${LIMITS.componentText}" data-component-field="content" ${fieldAttrs}>${escapeHtml(block.content)}</textarea>
          </label>
        </article>
      `;
    }

    if (block.kind === 'separator') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>Separator</strong>${controls}</div>
          <label class="rules-check">
            <input type="checkbox" data-component-field="divider" ${fieldAttrs} ${block.divider !== false ? 'checked' : ''}>
            <span>Показывать линию</span>
          </label>
          <label class="rules-field">
            <span>Отступ</span>
            <select data-component-field="spacing" ${fieldAttrs}>
              <option value="1" ${Number(block.spacing) !== 2 ? 'selected' : ''}>Small</option>
              <option value="2" ${Number(block.spacing) === 2 ? 'selected' : ''}>Large</option>
            </select>
          </label>
        </article>
      `;
    }

    if (block.kind === 'gallery') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>Media Gallery</strong>${controls}</div>
          <label class="rules-field">
            <span>URL по одному на строку. Описание через |</span>
            <textarea rows="6" data-component-field="media" ${fieldAttrs} placeholder="https://site/image.png | Описание">${escapeHtml(block.media)}</textarea>
          </label>
        </article>
      `;
    }

    if (block.kind === 'file') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>File</strong>${controls}</div>
          <label class="rules-field">
            <span>Attachment URL</span>
            <input type="text" data-component-field="fileName" ${fieldAttrs} value="${escapeHtml(block.fileName)}" placeholder="attachment://rules.pdf">
          </label>
          <label class="rules-check">
            <input type="checkbox" data-component-field="spoiler" ${fieldAttrs} ${block.spoiler ? 'checked' : ''}>
            <span>Spoiler</span>
          </label>
        </article>
      `;
    }

    if (block.kind === 'button') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>Link Button</strong>${controls}</div>
          <div class="rules-two">
            <label class="rules-field">
              <span>Текст кнопки</span>
              <input type="text" maxlength="${LIMITS.buttonLabel}" data-component-field="label" ${fieldAttrs} value="${escapeHtml(block.label)}">
            </label>
            <label class="rules-field">
              <span>URL</span>
              <input type="url" data-component-field="url" ${fieldAttrs} value="${escapeHtml(block.url)}" placeholder="https://...">
            </label>
          </div>
        </article>
      `;
    }

    if (block.kind === 'section') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>Section</strong>${controls}</div>
          <label class="rules-field">
            <span>Текст секции</span>
            <textarea rows="6" maxlength="${LIMITS.componentText}" data-component-field="content" ${fieldAttrs}>${escapeHtml(block.content)}</textarea>
          </label>
          <div class="rules-two">
            <label class="rules-field">
              <span>Accessory</span>
              <select data-component-field="accessoryType" ${fieldAttrs}>
                <option value="thumbnail" ${block.accessoryType !== 'button' ? 'selected' : ''}>Thumbnail</option>
                <option value="button" ${block.accessoryType === 'button' ? 'selected' : ''}>Button</option>
              </select>
            </label>
            <label class="rules-field">
              <span>${block.accessoryType === 'button' ? 'Button URL' : 'Thumbnail URL'}</span>
              <input type="url" data-component-field="${block.accessoryType === 'button' ? 'buttonUrl' : 'accessoryUrl'}" ${fieldAttrs} value="${escapeHtml(block.accessoryType === 'button' ? block.buttonUrl : block.accessoryUrl)}" placeholder="https://...">
            </label>
          </div>
          ${block.accessoryType === 'button' ? `
            <label class="rules-field">
              <span>Button label</span>
              <input type="text" maxlength="${LIMITS.buttonLabel}" data-component-field="buttonLabel" ${fieldAttrs} value="${escapeHtml(block.buttonLabel)}">
            </label>
          ` : ''}
        </article>
      `;
    }

    if (block.kind === 'container') {
      const children = normalizeContainerChildren(block);
      return `
        <article class="component-block component-container-block">
          <div class="component-block-heading"><strong>Container</strong>${controls}</div>
          <div class="rules-two">
            <label class="rules-field">
              <span>Accent color</span>
              <input type="color" data-component-field="accent" data-component-index="${index}" value="${escapeHtml(normalizeHexColor(block.accent))}">
            </label>
            <label class="rules-check">
              <input type="checkbox" data-component-field="spoiler" data-component-index="${index}" ${block.spoiler ? 'checked' : ''}>
              <span>Spoiler container</span>
            </label>
          </div>
          <div class="container-child-toolbar">
            <span>Inside container</span>
            <div class="components-toolbar">
              <button type="button" data-add-container-component="text" data-container-index="${index}" ${children.length >= LIMITS.containerChildren ? 'disabled' : ''}>Text</button>
              <button type="button" data-add-container-component="section" data-container-index="${index}" ${children.length >= LIMITS.containerChildren ? 'disabled' : ''}>Section</button>
              <button type="button" data-add-container-component="gallery" data-container-index="${index}" ${children.length >= LIMITS.containerChildren ? 'disabled' : ''}>Gallery</button>
              <button type="button" data-add-container-component="separator" data-container-index="${index}" ${children.length >= LIMITS.containerChildren ? 'disabled' : ''}>Separator</button>
              <button type="button" data-add-container-component="button" data-container-index="${index}" ${children.length >= LIMITS.containerChildren ? 'disabled' : ''}>Button</button>
              <button type="button" data-add-container-component="file" data-container-index="${index}" ${children.length >= LIMITS.containerChildren ? 'disabled' : ''}>File</button>
            </div>
          </div>
          <div class="container-child-list">
            ${children.map((child, childIndex) => renderComponentBlock(child, childIndex, index)).join('')}
          </div>
        </article>
      `;
    }

    return `
      <article class="component-block">
        <div class="component-block-heading"><strong>Unknown component</strong>${controls}</div>
        <div class="rules-two">
          <label class="rules-field">
            <span>Accent color</span>
            <input type="color" data-component-field="accent" data-component-index="${index}" value="${escapeHtml(normalizeHexColor(block.accent))}">
          </label>
          <label class="rules-field">
            <span>Thumbnail URL</span>
            <input type="url" data-component-field="thumbnail" data-component-index="${index}" value="${escapeHtml(block.thumbnail)}" placeholder="https://...">
          </label>
        </div>
        <label class="rules-field">
          <span>Text Display внутри контейнера</span>
          <textarea rows="7" maxlength="${LIMITS.componentText}" data-component-field="text" data-component-index="${index}">${escapeHtml(block.text)}</textarea>
        </label>
        <label class="rules-field">
          <span>Media Gallery URL по одному на строку</span>
          <textarea rows="4" data-component-field="media" data-component-index="${index}" placeholder="https://site/image.png | Описание">${escapeHtml(block.media)}</textarea>
        </label>
        <div class="rules-two">
          <label class="rules-field">
            <span>Кнопка</span>
            <input type="text" maxlength="${LIMITS.buttonLabel}" data-component-field="buttonLabel" data-component-index="${index}" value="${escapeHtml(block.buttonLabel)}" placeholder="Открыть">
          </label>
          <label class="rules-field">
            <span>URL кнопки</span>
            <input type="url" data-component-field="buttonUrl" data-component-index="${index}" value="${escapeHtml(block.buttonUrl)}" placeholder="https://...">
          </label>
        </div>
        <label class="rules-check">
          <input type="checkbox" data-component-field="spoiler" data-component-index="${index}" ${block.spoiler ? 'checked' : ''}>
          <span>Spoiler container</span>
        </label>
      </article>
    `;
  }

  function renderComponentsEditor(message) {
    return `
      <div class="components-toolbar">
        <button type="button" data-add-component="container">Container</button>
        <button type="button" data-add-component="text">Text</button>
        <button type="button" data-add-component="section">Section</button>
        <button type="button" data-add-component="gallery">Gallery</button>
        <button type="button" data-add-component="separator">Separator</button>
        <button type="button" data-add-component="button">Button</button>
        <button type="button" data-add-component="file">File</button>
      </div>
      <p class="editor-muted">В Components V2 Discord не использует обычные content/embeds. Для текста используй Text Display или Container.</p>
      <div class="component-block-list">
        ${message.blocks?.length ? message.blocks.map(renderComponentBlock).join('') : '<div class="template-empty"><strong>Добавь первый компонент.</strong></div>'}
      </div>
    `;
  }

  function renderRawEditor(message) {
    if (!message.raw) {
      message.raw = JSON.stringify(buildRuleMessage({ ...message, mode: 'classic' }), null, 2);
    }

    return `
      <label class="rules-field">
        <span>Raw Discord message JSON</span>
        <textarea data-message-raw rows="18" spellcheck="false">${escapeHtml(message.raw)}</textarea>
      </label>
      <p class="editor-muted">Raw mode keeps complex Discord payloads exact: content, embeds, legacy buttons and Components V2. Discord limits still apply.</p>
    `;
  }

  function renderPreviewEmbed(embed) {
    const color = normalizeHexColor(embed.color || embed.color === 0 ? embed.color : '#44b8de');
    return `
      <div class="rules-preview-embed" style="border-color:${escapeHtml(color)}">
        ${embed.author?.name ? `<div class="rules-preview-author">${escapeHtml(embed.author.name)}</div>` : ''}
        ${embed.title ? `<strong>${escapeHtml(embed.title)}</strong>` : ''}
        ${embed.description ? `<p>${escapeHtml(embed.description).replace(/\n/g, '<br>')}</p>` : ''}
        ${embed.fields?.length ? `<div class="rules-preview-fields">${embed.fields.map((field) => `
          <span class="${field.inline ? 'is-inline' : ''}"><b>${escapeHtml(field.name)}</b><small>${escapeHtml(field.value)}</small></span>
        `).join('')}</div>` : ''}
        ${embed.thumbnail?.url ? `<img class="rules-preview-thumb" src="${escapeHtml(embed.thumbnail.url)}" alt="">` : ''}
        ${embed.image?.url ? `<img class="rules-preview-image" src="${escapeHtml(embed.image.url)}" alt="">` : ''}
        ${embed.footer?.text ? `<small>${escapeHtml(embed.footer.text)}</small>` : ''}
      </div>
    `;
  }

  function renderPreviewComponent(component) {
    if (component.type === 10) {
      return `<div class="v2-text-display">${escapeHtml(component.content).replace(/\n/g, '<br>')}</div>`;
    }
    if (component.type === 14) {
      return `<div class="v2-separator ${component.spacing === 2 ? 'is-large' : ''}">${component.divider === false ? '' : '<i></i>'}</div>`;
    }
    if (component.type === 12) {
      return `<div class="v2-gallery">${component.items.map((item) => `
        <figure>
          <img src="${escapeHtml(item.media.url)}" alt="">
          ${item.description ? `<figcaption>${escapeHtml(item.description)}</figcaption>` : ''}
        </figure>
      `).join('')}</div>`;
    }
    if (component.type === 13) {
      return `<div class="v2-file">📄 ${escapeHtml(component.file.url.replace('attachment://', ''))}</div>`;
    }
    if (component.type === 1) {
      return `<div class="v2-buttons">${component.components.map((button) => `<a>${escapeHtml(button.label || 'Open')}</a>`).join('')}</div>`;
    }
    if (component.type === 9) {
      return `
        <div class="v2-section">
          <div>${component.components.map(renderPreviewComponent).join('')}</div>
          ${component.accessory?.type === 11 ? `<img src="${escapeHtml(component.accessory.media.url)}" alt="">` : ''}
          ${component.accessory?.type === 2 ? `<a>${escapeHtml(component.accessory.label || 'Open')}</a>` : ''}
        </div>
      `;
    }
    if (component.type === 17) {
      return `
        <div class="v2-container" style="--component-accent:#${Number(component.accent_color || 0x44b8de).toString(16).padStart(6, '0')}">
          ${component.components.map(renderPreviewComponent).join('')}
        </div>
      `;
    }
    return '';
  }

  function isRenderableMediaUrl(value) {
    const raw = String(value || '').trim();
    if (!raw || raw.startsWith('attachment://')) return false;
    return Boolean(normalizeUrl(raw));
  }

  function renderMedia(url, className = '', alt = '') {
    const raw = String(url || '').trim();
    if (!raw) return '';
    if (!isRenderableMediaUrl(raw)) {
      return `<div class="discord-media-placeholder ${escapeHtml(className)}">${escapeHtml(raw.replace('attachment://', ''))}</div>`;
    }
    return `<img class="${escapeHtml(className)}" src="${escapeHtml(raw)}" alt="${escapeHtml(alt)}" loading="lazy">`;
  }

  function formatDiscordTime(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(0, 32);
    return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }

  function renderInlineMarkdown(value) {
    let html = escapeHtml(value);
    html = html.replace(/\[([^\]]{1,80})\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html.replace(/&lt;#(\d{17,22})&gt;/g, '<span class="discord-mention">#channel</span>');
    html = html.replace(/&lt;@!?(\d{17,22})&gt;/g, '<span class="discord-mention">@user</span>');
    html = html.replace(/&lt;@&amp;(\d{17,22})&gt;/g, '<span class="discord-mention">@role</span>');
    html = html.replace(/\|\|(.+?)\|\|/g, '<span class="discord-spoiler">$1</span>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<u>$1</u>');
    html = html.replace(/~~(.+?)~~/g, '<s>$1</s>');
    html = html.replace(/(^|[^\*])\*([^\*]+)\*/g, '$1<em>$2</em>');
    return html;
  }

  function renderTextLines(segment) {
    const lines = String(segment || '').replace(/\r\n/g, '\n').split('\n');
    const output = [];
    let quote = [];
    let list = [];

    const flushQuote = () => {
      if (!quote.length) return;
      output.push(`<blockquote>${quote.map((line) => `<div>${renderInlineMarkdown(line)}</div>`).join('')}</blockquote>`);
      quote = [];
    };

    const flushList = () => {
      if (!list.length) return;
      output.push(`<ul>${list.map((line) => `<li>${renderInlineMarkdown(line)}</li>`).join('')}</ul>`);
      list = [];
    };

    lines.forEach((line) => {
      const raw = String(line || '');
      const trimmed = raw.trim();
      const heading = raw.match(/^(#{1,3})\s+(.+)$/);
      const subtext = raw.match(/^-#\s+(.+)$/);
      const quoteLine = raw.match(/^>\s?(.+)$/);
      const listLine = raw.match(/^(?:[-*]|\d+\.)\s+(.+)$/);

      if (!trimmed) {
        flushQuote();
        flushList();
        output.push('<div class="discord-line is-empty">&nbsp;</div>');
        return;
      }

      if (quoteLine) {
        flushList();
        quote.push(quoteLine[1]);
        return;
      }

      if (listLine) {
        flushQuote();
        list.push(listLine[1]);
        return;
      }

      flushQuote();
      flushList();

      if (heading) {
        output.push(`<div class="discord-heading discord-heading-${heading[1].length}">${renderInlineMarkdown(heading[2])}</div>`);
      } else if (subtext) {
        output.push(`<div class="discord-subtext">${renderInlineMarkdown(subtext[1])}</div>`);
      } else {
        output.push(`<div class="discord-line">${renderInlineMarkdown(raw)}</div>`);
      }
    });

    flushQuote();
    flushList();
    return output.join('');
  }

  function renderDiscordMarkdown(value) {
    const parts = String(value || '').replace(/\r\n/g, '\n').split(/```/);
    return parts.map((part, index) => {
      if (index % 2 === 1) return `<pre><code>${escapeHtml(part.trim())}</code></pre>`;
      return renderTextLines(part);
    }).join('');
  }

  function renderPreviewEmbed(embed = {}) {
    const color = normalizeHexColor(embed.color || embed.color === 0 ? embed.color : '#5865f2');
    const title = embed.title
      ? embed.url
        ? `<a class="discord-embed-title" href="${escapeHtml(embed.url)}" target="_blank" rel="noopener noreferrer">${renderInlineMarkdown(embed.title)}</a>`
        : `<strong class="discord-embed-title">${renderInlineMarkdown(embed.title)}</strong>`
      : '';
    const footer = [
      embed.footer?.text ? escapeHtml(embed.footer.text) : '',
      embed.timestamp ? formatDiscordTime(embed.timestamp) : ''
    ].filter(Boolean).join(' • ');

    return `
      <div class="rules-preview-embed discord-embed" style="--embed-color:${escapeHtml(color)}">
        ${embed.author?.name ? `
          <div class="discord-embed-author">
            ${embed.author.icon_url ? renderMedia(embed.author.icon_url, 'discord-embed-author-icon') : ''}
            ${embed.author.url ? `<a href="${escapeHtml(embed.author.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(embed.author.name)}</a>` : `<span>${escapeHtml(embed.author.name)}</span>`}
          </div>
        ` : ''}
        <div class="discord-embed-grid">
          <div class="discord-embed-main">
            ${title}
            ${embed.description ? `<div class="discord-embed-description">${renderDiscordMarkdown(embed.description)}</div>` : ''}
            ${embed.fields?.length ? `<div class="rules-preview-fields">${embed.fields.map((field) => `
              <span class="${field.inline ? 'is-inline' : ''}">
                <b>${renderInlineMarkdown(field.name || '\u200B')}</b>
                <small>${renderDiscordMarkdown(field.value || '\u200B')}</small>
              </span>
            `).join('')}</div>` : ''}
          </div>
          ${embed.thumbnail?.url ? `<div class="discord-embed-thumb-wrap">${renderMedia(embed.thumbnail.url, 'rules-preview-thumb')}</div>` : ''}
        </div>
        ${embed.image?.url ? renderMedia(embed.image.url, 'rules-preview-image') : ''}
        ${footer ? `
          <div class="discord-embed-footer">
            ${embed.footer?.icon_url ? renderMedia(embed.footer.icon_url, 'discord-embed-footer-icon') : ''}
            <span>${footer}</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  function buttonClass(button = {}) {
    const style = Number(button.style || (button.url ? 5 : 2));
    if (style === 1) return 'is-primary';
    if (style === 3) return 'is-success';
    if (style === 4) return 'is-danger';
    if (style === 5) return 'is-link';
    return 'is-secondary';
  }

  function renderButton(button = {}) {
    const label = button.label || button.emoji?.name || 'Open';
    const emoji = button.emoji?.name && button.label ? `<span>${escapeHtml(button.emoji.name)}</span>` : '';
    const content = `${emoji}${escapeHtml(label)}`;
    const className = `discord-button ${buttonClass(button)}${button.disabled ? ' is-disabled' : ''}`;
    return button.url
      ? `<a class="${className}" href="${escapeHtml(button.url)}" target="_blank" rel="noopener noreferrer">${content}</a>`
      : `<span class="${className}">${content}</span>`;
  }

  function renderSelectMenu(component = {}) {
    const type = Number(component.type);
    const typeLabel = type === 3
      ? 'String select'
      : type === 5
        ? 'User select'
        : type === 6
          ? 'Role select'
          : type === 7
            ? 'Mentionable select'
            : 'Channel select';
    const optionCount = Array.isArray(component.options) ? component.options.length : 0;
    const placeholder = component.placeholder || typeLabel;
    return `
      <div class="discord-select ${component.disabled ? 'is-disabled' : ''}">
        <span>${escapeHtml(placeholder)}</span>
        <small>${escapeHtml(optionCount ? `${optionCount} options` : typeLabel)}</small>
      </div>
    `;
  }

  function renderPreviewComponent(component = {}) {
    const type = Number(component.type);
    if (type === 10) return `<div class="v2-text-display">${renderDiscordMarkdown(component.content)}</div>`;
    if (type === 11) return renderMedia(component.media?.url, 'v2-thumbnail', component.description || '');
    if (type === 14) return `<div class="v2-separator ${Number(component.spacing) === 2 ? 'is-large' : ''}">${component.divider === false ? '' : '<i></i>'}</div>`;
    if (type === 12) {
      return `<div class="v2-gallery">${(component.items || []).map((item) => `
        <figure class="${item.spoiler ? 'is-spoiler' : ''}">
          ${renderMedia(item.media?.url, 'v2-gallery-image', item.description || '')}
          ${item.description ? `<figcaption>${escapeHtml(item.description)}</figcaption>` : ''}
        </figure>
      `).join('')}</div>`;
    }
    if (type === 13) {
      const fileName = String(component.file?.url || '').replace('attachment://', '');
      return `<div class="v2-file ${component.spoiler ? 'is-spoiler' : ''}"><strong>FILE</strong><span>${escapeHtml(fileName || 'attachment')}</span></div>`;
    }
    if (type === 1) {
      const children = component.components || [];
      const buttons = children.filter((item) => Number(item.type) === 2);
      if (buttons.length === children.length) return `<div class="v2-buttons">${buttons.map(renderButton).join('')}</div>`;
      return `<div class="v2-action-row">${children.map(renderPreviewComponent).join('')}</div>`;
    }
    if (type === 2) return `<div class="v2-buttons">${renderButton(component)}</div>`;
    if ([3, 5, 6, 7, 8].includes(type)) return renderSelectMenu(component);
    if (type === 9) {
      return `
        <div class="v2-section">
          <div class="v2-section-copy">${(component.components || []).map(renderPreviewComponent).join('')}</div>
          ${component.accessory?.type === 11 ? `<div class="v2-section-accessory">${renderPreviewComponent(component.accessory)}</div>` : ''}
          ${component.accessory?.type === 2 ? `<div class="v2-section-accessory">${renderButton(component.accessory)}</div>` : ''}
        </div>
      `;
    }
    if (type === 17) {
      const accent = `#${Number(component.accent_color || 0x5865f2).toString(16).padStart(6, '0')}`;
      return `
        <div class="v2-container ${component.spoiler ? 'is-spoiler' : ''}" style="--component-accent:${escapeHtml(accent)}">
          ${(component.components || []).map(renderPreviewComponent).join('')}
        </div>
      `;
    }
    return '';
  }

  function renderDiscordMessage(message = {}, index = 0, options = {}) {
    const isV2 = Boolean(Number(message.flags || 0) & V2_FLAG);
    const components = Array.isArray(message.components) ? message.components : [];
    const embeds = isV2 ? [] : (Array.isArray(message.embeds) ? message.embeds : []);
    const content = isV2 ? '' : String(message.content || '');
    const username = options.username || 'Core';
    const avatarText = String(username || 'C').trim().slice(0, 1).toUpperCase() || 'C';

    return `
      <article class="rules-preview-message discord-message">
        <div class="rules-preview-avatar discord-avatar">${escapeHtml(avatarText)}</div>
        <div class="discord-message-inner">
          <div class="rules-preview-meta discord-message-meta">
            <strong>${escapeHtml(username)}</strong>
            <span>${escapeHtml(options.timestampLabel || 'Today')}</span>
            ${isV2 ? '<span>Components V2</span>' : `<span>message ${index + 1}</span>`}
          </div>
          ${content ? `<div class="rules-preview-content discord-message-content">${renderDiscordMarkdown(content)}</div>` : ''}
          ${embeds.map(renderPreviewEmbed).join('')}
          ${components.length ? `<div class="v2-preview">${components.map(renderPreviewComponent).join('')}</div>` : ''}
          ${!content && !embeds.length && !components.length ? '<div class="discord-empty-message">Empty message</div>' : ''}
        </div>
      </article>
    `;
  }

  function renderDiscordMessages(messages = [], options = {}) {
    const source = Array.isArray(messages) && messages.length ? messages : [{ content: '', embeds: [] }];
    return `<div class="discord-message-stack">${source.slice(0, LIMITS.messages).map((message, index) => renderDiscordMessage(message, index, options)).join('')}</div>`;
  }

  function setPath(target, path, value) {
    const parts = path.split('.');
    let pointer = target;
    while (parts.length > 1) {
      const part = parts.shift();
      pointer[part] ||= {};
      pointer = pointer[part];
    }
    pointer[parts[0]] = value;
  }

  function createBlock(kind) {
    if (kind === 'text') return { kind, content: '# Заголовок\nТекст блока.' };
    if (kind === 'separator') return { kind, divider: true, spacing: 1 };
    if (kind === 'gallery') return { kind, media: '' };
    if (kind === 'file') return { kind, fileName: 'attachment://rules.pdf', spoiler: false };
    if (kind === 'button') return { kind, label: 'Открыть', url: '' };
    if (kind === 'container') {
      return {
      kind: 'container',
      accent: '#44b8de',
      children: [
        { kind: 'text', content: '# Title\nContainer text.' }
      ],
      spoiler: false
    };
    }
    if (kind === 'section') {
      return { kind, content: '# Важный блок\nТекст секции.', accessoryType: 'thumbnail', accessoryUrl: '', buttonLabel: 'Открыть', buttonUrl: '' };
    }
    return { kind: 'container', accent: '#44b8de', text: '# Заголовок\nТекст контейнера.', thumbnail: '', media: '', buttonLabel: '', buttonUrl: '', spoiler: false };
  }

  function createState(root, options = {}) {
    let initialMessages = options.initialMessages || options.messages;
    const jsonSeed = root.querySelector('script[type="application/json"]')?.textContent;
    if (!initialMessages && jsonSeed) {
      try {
        const parsed = JSON.parse(jsonSeed);
        initialMessages = parsed.messages || (parsed.message ? [parsed.message] : null);
      } catch {}
    }
    return {
      active: 0,
      webhookUrl: '',
      username: options.username || 'Core',
      avatarUrl: '',
      title: options.title || root.dataset.editorTitle || 'Редактор сообщений',
      messages: normalizeMessages(initialMessages)
    };
  }

  function init(root, options = {}) {
    if (!root || instances.has(root)) return instances.get(root);

    const state = createState(root, options);
    root.classList.add('message-editor-root');

    function message() {
      return state.messages[state.active] || state.messages[0];
    }

    function embed() {
      const current = message();
      current.embeds ||= [];
      if (!current.embeds.length) current.embeds.push(defaultEmbed());
      current.activeEmbed = Math.max(0, Math.min(current.activeEmbed || 0, current.embeds.length - 1));
      return current.embeds[current.activeEmbed];
    }

    function buildExportJson() {
      const messages = state.messages.map(buildRuleMessage);
      return {
        kind: 'rules',
        version: 2,
        createdAt: new Date().toISOString(),
        messages,
        message: messages[0] || { content: '', embeds: [] }
      };
    }

    function validatePayload() {
      const errors = [];
      const warnings = [];
      state.messages.forEach((item, index) => {
        const number = index + 1;
        if (item.mode === 'raw') {
          try {
            parseRawPayload(item.raw);
          } catch (error) {
            errors.push(`Сообщение ${number}: ${error.message || 'raw JSON is invalid.'}`);
          }
          return;
        }

        if (item.mode === 'components') {
          const components = buildComponents(item.blocks);
          if (!components.length) errors.push(`Сообщение ${number}: добавь хотя бы один Components V2 блок.`);
          if (components.length > LIMITS.components) errors.push(`Сообщение ${number}: максимум ${LIMITS.components} компонентов.`);
          (item.blocks || []).forEach((block, blockIndex) => {
            const label = `Сообщение ${number}, блок ${blockIndex + 1}`;
            if (['text', 'section'].includes(block.kind) && (block.content || '').length > LIMITS.componentText) errors.push(`${label}: текст больше ${LIMITS.componentText}.`);
            if (block.kind === 'section' && block.accessoryType === 'button' && !normalizeUrl(block.buttonUrl)) errors.push(`${label}: section button URL is required.`);
            if (block.kind === 'section' && block.accessoryType !== 'button' && !normalizeUrl(block.accessoryUrl)) errors.push(`${label}: section thumbnail URL is required.`);
            if (block.kind === 'container' && (block.text || '').length > LIMITS.componentText) errors.push(`${label}: текст контейнера больше ${LIMITS.componentText}.`);
            if (block.kind === 'gallery' && parseMediaItems(block.media).length > LIMITS.galleryItems) errors.push(`${label}: максимум ${LIMITS.galleryItems} медиа.`);
            if (block.kind === 'container') {
              const children = normalizeContainerChildren(block);
              if (children.length > LIMITS.containerChildren) errors.push(`${label}: maximum ${LIMITS.containerChildren} children.`);
              children.forEach((child, childIndex) => {
                const childLabel = `${label}, child ${childIndex + 1}`;
                if (['text', 'section'].includes(child.kind) && (child.content || '').length > LIMITS.componentText) errors.push(`${childLabel}: text is longer than ${LIMITS.componentText}.`);
                if (child.kind === 'section' && child.accessoryType === 'button' && !normalizeUrl(child.buttonUrl)) errors.push(`${childLabel}: section button URL is required.`);
                if (child.kind === 'section' && child.accessoryType !== 'button' && !normalizeUrl(child.accessoryUrl)) errors.push(`${childLabel}: section thumbnail URL is required.`);
                if (child.kind === 'gallery' && parseMediaItems(child.media).length > LIMITS.galleryItems) errors.push(`${childLabel}: maximum ${LIMITS.galleryItems} media items.`);
                ['media', 'buttonUrl', 'url', 'accessoryUrl'].forEach((field) => {
                  if (child[field] && field === 'media') return;
                  if (child[field] && !isValidUrl(child[field])) errors.push(`${childLabel}: ${field} must be a URL.`);
                });
              });
            }
            ['media', 'thumbnail', 'buttonUrl', 'url', 'accessoryUrl'].forEach((field) => {
              if (block[field] && field === 'media') return;
              if (block[field] && !isValidUrl(block[field])) errors.push(`${label}: ${field} должен быть ссылкой.`);
            });
          });
          return;
        }

        const embeds = (item.embeds || []).map(buildEmbed).filter(Boolean);
        if (!item.content && !embeds.length) errors.push(`Сообщение ${number}: нужен текст или embed.`);
        if ((item.content || '').length > LIMITS.content) errors.push(`Сообщение ${number}: текст больше ${LIMITS.content}.`);
        if ((item.embeds || []).length > LIMITS.embeds) errors.push(`Сообщение ${number}: максимум ${LIMITS.embeds} embed.`);
        (item.embeds || []).forEach((embedItem, embedIndex) => {
          const label = `Сообщение ${number}, embed ${embedIndex + 1}`;
          if ((embedItem.title || '').length > LIMITS.embedTitle) errors.push(`${label}: заголовок больше ${LIMITS.embedTitle}.`);
          if ((embedItem.description || '').length > LIMITS.embedDescription) errors.push(`${label}: описание больше ${LIMITS.embedDescription}.`);
          if ((embedItem.fields || []).length > LIMITS.embedFields) errors.push(`${label}: максимум ${LIMITS.embedFields} fields.`);
          if (embedTotal(embedItem) > LIMITS.embedTotal) errors.push(`${label}: общий размер больше ${LIMITS.embedTotal}.`);
          ['url', 'thumbnail.url', 'image.url', 'author.url', 'author.icon_url', 'footer.icon_url'].forEach((path) => {
            const value = path.split('.').reduce((object, key) => object?.[key], embedItem);
            if (value && !isValidUrl(value)) errors.push(`${label}: ${path} должен быть ссылкой.`);
          });
        });
      });

      if (state.messages.length > 6) warnings.push('Много сообщений лучше отправлять в отдельный канал правил.');
      return { errors, warnings };
    }

    function renderMessageList() {
      const list = root.querySelector('[data-message-list]');
      if (!list) return;
      list.innerHTML = state.messages.map((item, index) => {
        const label = item.mode === 'raw'
          ? firstFilledLine(item.raw, `Raw JSON ${index + 1}`)
          : item.mode === 'components'
          ? firstFilledLine(item.blocks?.find((block) => block.text || block.content)?.text || item.blocks?.find((block) => block.content)?.content, `Components V2 ${index + 1}`)
          : firstFilledLine(item.embeds?.[0]?.title || item.content, `Сообщение ${index + 1}`);
        return `
          <button type="button" class="${index === state.active ? 'is-active' : ''}" data-select-message="${index}">
            <strong>${index + 1}</strong>
            <span>${escapeHtml(label.slice(0, 58))}</span>
          </button>
        `;
      }).join('');
    }

    function renderEditorBody() {
      const current = message();
      const body = root.querySelector('[data-message-editor-body]');
      root.querySelector('[data-current-message-title]').textContent = `Сообщение ${state.active + 1}`;
      root.querySelectorAll('[data-message-mode]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.messageMode === current.mode);
      });
      if (body) {
        body.innerHTML = current.mode === 'raw'
          ? renderRawEditor(current)
          : current.mode === 'components'
            ? renderComponentsEditor(current)
            : renderClassicEditor(current);
      }
      const deleteMessage = root.querySelector('[data-delete-message]');
      const addMessage = root.querySelector('[data-add-message]');
      if (deleteMessage) deleteMessage.disabled = state.messages.length <= 1;
      if (addMessage) addMessage.disabled = state.messages.length >= LIMITS.messages;
    }

    function renderPreview() {
      const preview = root.querySelector('[data-editor-preview]');
      const count = root.querySelector('[data-editor-count]');
      if (count) count.textContent = `${state.messages.length} ${state.messages.length === 1 ? 'сообщение' : 'сообщений'}`;
      if (!preview) return;

      preview.innerHTML = renderDiscordMessages(state.messages.map((item) => {
        try {
          return buildRuleMessage(item);
        } catch {
          return { content: 'Raw JSON is invalid.', embeds: [] };
        }
      }), {
        username: state.username || 'Webhook'
      });
    }

    function renderLimits() {
      const current = message();
      const limits = root.querySelector('[data-editor-limits]');
      if (!limits) return;
      let currentPayload = {};
      try {
        currentPayload = buildRuleMessage(current);
      } catch {}
      const activeEmbed = current.mode === 'classic' ? embed() : null;
      const items = current.mode === 'raw'
        ? [
          ['Messages', state.messages.length, LIMITS.messages],
          ['Raw JSON', String(current.raw || '').length, 30000],
          ['Components', Array.isArray(currentPayload.components) ? currentPayload.components.length : 0, LIMITS.components]
        ]
        : current.mode === 'components'
        ? [
          ['Сообщения', state.messages.length, LIMITS.messages],
          ['Components', currentPayload.components?.length || 0, LIMITS.components],
          ['Text Display', Math.max(...(current.blocks || []).map((block) => String(block.text || block.content || '').length), 0), LIMITS.componentText]
        ]
        : [
          ['Сообщения', state.messages.length, LIMITS.messages],
          ['Текст', current.content.length, LIMITS.content],
          ['Embeds', current.embeds.length, LIMITS.embeds],
          ['Embed total', activeEmbed ? embedTotal(activeEmbed) : 0, LIMITS.embedTotal]
        ];

      limits.innerHTML = items.map(([label, value, max]) => {
        const ratio = Math.min(100, Math.round((Number(value || 0) / max) * 100));
        const danger = value > max ? ' is-danger' : ratio > 90 ? ' is-warning' : '';
        return `
          <div class="rules-limit${danger}">
            <span>${escapeHtml(label)}</span>
            <strong>${value}/${max}</strong>
            <i style="width:${ratio}%"></i>
          </div>
        `;
      }).join('');
    }

    function renderValidation() {
      const { errors, warnings } = validatePayload();
      const alert = root.querySelector('[data-editor-alert]');
      const status = root.querySelector('[data-editor-status]');
      const send = root.querySelector('[data-editor-send]');
      const messages = [...errors, ...warnings];
      if (alert) {
        alert.hidden = !messages.length;
        alert.classList.toggle('is-error', Boolean(errors.length));
        alert.innerHTML = messages.map((item) => `<div>${escapeHtml(item)}</div>`).join('');
      }
      if (status) status.textContent = errors.length ? `${errors.length} ошибок` : warnings.length ? `${warnings.length} предупреждений` : 'Готово';
      if (send) send.disabled = Boolean(errors.length) || !isValidWebhookUrl(state.webhookUrl);
    }

    function refreshDynamic() {
      renderPreview();
      renderLimits();
      renderValidation();
    }

    function render() {
      root.innerHTML = renderEditorShell();
      const webhook = root.querySelector('[data-setting="webhookUrl"]');
      const username = root.querySelector('[data-setting="username"]');
      const avatar = root.querySelector('[data-setting="avatarUrl"]');
      if (webhook) webhook.value = state.webhookUrl;
      if (username) username.value = state.username;
      if (avatar) avatar.value = state.avatarUrl;
      renderMessageList();
      renderEditorBody();
      refreshDynamic();
    }

    function updateSetting(target) {
      if (!target.dataset.setting) return false;
      state[target.dataset.setting] = target.value.trim();
      return true;
    }

    function getContainerChildren(current, containerIndex) {
      const container = current.blocks[Number(containerIndex)];
      if (!container || container.kind !== 'container') return null;
      return normalizeContainerChildren(container);
    }

    function getEditableComponentBlock(current, target) {
      if (target.dataset.containerIndex !== undefined && target.dataset.childIndex !== undefined) {
        const children = getContainerChildren(current, target.dataset.containerIndex);
        return children?.[Number(target.dataset.childIndex)] || null;
      }
      return current.blocks[Number(target.dataset.componentIndex)] || null;
    }

    function updateActiveInput(target) {
      const current = message();
      if (target.matches('[data-message-content]')) {
        current.content = clampText(target.value, LIMITS.content);
        return true;
      }
      if (target.matches('[data-message-raw]')) {
        current.raw = target.value;
        return true;
      }
      if (target.dataset.embedPath) {
        setPath(embed(), target.dataset.embedPath, target.value);
        return true;
      }
      if (target.dataset.fieldName !== undefined) {
        embed().fields[Number(target.dataset.fieldName)].name = target.value;
        return true;
      }
      if (target.dataset.fieldValue !== undefined) {
        embed().fields[Number(target.dataset.fieldValue)].value = target.value;
        return true;
      }
      if (target.dataset.fieldInline !== undefined) {
        embed().fields[Number(target.dataset.fieldInline)].inline = target.checked;
        return true;
      }
      if (target.dataset.componentField) {
        const block = getEditableComponentBlock(current, target);
        if (!block) return true;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        block[target.dataset.componentField] = value;
        return true;
      }
      return false;
    }

    function downloadJson() {
      const blob = new Blob([`${JSON.stringify(buildExportJson(), null, 2)}\n`], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'core-rules-template.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }

    function importJson(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        try {
          const json = JSON.parse(String(reader.result || '{}'));
          const messages = Array.isArray(json.messages) ? json.messages : json.message ? [json.message] : [];
          if (!messages.length) throw new Error('JSON не содержит messages.');
          state.messages = normalizeMessages(messages);
          state.active = 0;
          render();
        } catch (error) {
          const alert = root.querySelector('[data-editor-alert]');
          if (alert) {
            alert.hidden = false;
            alert.classList.add('is-error');
            alert.textContent = error.message || 'JSON не удалось прочитать.';
          }
        }
      });
      reader.readAsText(file);
    }

    async function sendWebhook() {
      const { errors } = validatePayload();
      const alert = root.querySelector('[data-editor-alert]');
      const send = root.querySelector('[data-editor-send]');
      if (errors.length || !isValidWebhookUrl(state.webhookUrl)) {
        if (alert) {
          alert.hidden = false;
          alert.classList.add('is-error');
          alert.textContent = !isValidWebhookUrl(state.webhookUrl)
            ? 'Укажи Discord webhook URL.'
            : errors.join('\n');
        }
        return;
      }

      if (send) {
        send.disabled = true;
        send.textContent = 'Отправляю...';
      }

      try {
        for (let index = 0; index < state.messages.length; index += 1) {
          const response = await fetch(`${state.webhookUrl}?wait=true`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildWebhookPayload(state, state.messages[index]))
          });
          if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`Discord отклонил сообщение ${index + 1}: ${response.status} ${text}`.slice(0, 700));
          }
        }
        if (alert) {
          alert.hidden = false;
          alert.classList.remove('is-error');
          alert.textContent = `Отправлено сообщений: ${state.messages.length}.`;
        }
      } catch (error) {
        if (alert) {
          alert.hidden = false;
          alert.classList.add('is-error');
          alert.textContent = `${error.message || 'Не удалось отправить webhook.'} Если браузер блокирует CORS, отправляй через серверный proxy или Google Apps Script.`;
        }
      } finally {
        if (send) send.textContent = 'Отправить';
        refreshDynamic();
      }
    }

    root.addEventListener('input', (event) => {
      if (updateSetting(event.target) || updateActiveInput(event.target)) {
        refreshDynamic();
      }
    });

    root.addEventListener('change', (event) => {
      if (event.target.matches('[data-editor-import]')) {
        importJson(event.target.files?.[0]);
        event.target.value = '';
        return;
      }
      if (updateSetting(event.target) || updateActiveInput(event.target)) {
        if (event.target.matches('select')) render();
        else refreshDynamic();
      }
    });

    root.addEventListener('click', async (event) => {
      const target = event.target.closest('button, a, label');
      if (!target) return;
      const current = message();

      if (target.dataset.selectMessage !== undefined) {
        state.active = Number(target.dataset.selectMessage);
        render();
        return;
      }
      if (target.dataset.messageMode) {
        if (target.dataset.messageMode === 'raw') {
          try {
            current.raw = JSON.stringify(buildRuleMessage(current), null, 2);
          } catch {}
        }
        current.mode = target.dataset.messageMode;
        if (current.mode === 'classic' && !current.embeds.length) current.embeds.push(defaultEmbed());
        if (current.mode === 'components' && !current.blocks.length) current.blocks.push(createBlock('container'));
        if (current.mode === 'raw' && !current.raw) current.raw = JSON.stringify(normalizeRawPayload(current), null, 2);
        render();
        return;
      }
      if (target.matches('[data-add-message]') && state.messages.length < LIMITS.messages) {
        state.messages.push(defaultMessage());
        state.active = state.messages.length - 1;
        render();
        return;
      }
      if (target.matches('[data-duplicate-message]') && state.messages.length < LIMITS.messages) {
        state.messages.splice(state.active + 1, 0, clone(current));
        state.active += 1;
        render();
        return;
      }
      if (target.matches('[data-delete-message]') && state.messages.length > 1) {
        state.messages.splice(state.active, 1);
        state.active = Math.max(0, state.active - 1);
        render();
        return;
      }
      if (target.dataset.selectEmbed !== undefined) {
        current.activeEmbed = Number(target.dataset.selectEmbed);
        render();
        return;
      }
      if (target.matches('[data-add-embed]') && current.embeds.length < LIMITS.embeds) {
        current.embeds.push(defaultEmbed());
        current.activeEmbed = current.embeds.length - 1;
        render();
        return;
      }
      if (target.matches('[data-duplicate-embed]') && current.embeds.length < LIMITS.embeds) {
        current.embeds.splice(current.activeEmbed + 1, 0, clone(embed()));
        current.activeEmbed += 1;
        render();
        return;
      }
      if (target.matches('[data-delete-embed]') && current.embeds.length > 1) {
        current.embeds.splice(current.activeEmbed, 1);
        current.activeEmbed = Math.max(0, current.activeEmbed - 1);
        render();
        return;
      }
      if (target.matches('[data-add-field]')) {
        const active = embed();
        if (active.fields.length < LIMITS.embedFields) {
          active.fields.push({ name: '', value: '', inline: false });
          render();
        }
        return;
      }
      if (target.dataset.deleteField !== undefined) {
        embed().fields.splice(Number(target.dataset.deleteField), 1);
        render();
        return;
      }
      if (target.dataset.addComponent) {
        current.blocks.push(createBlock(target.dataset.addComponent));
        render();
        return;
      }
      if (target.dataset.addContainerComponent) {
        const children = getContainerChildren(current, target.dataset.containerIndex);
        if (children && children.length < LIMITS.containerChildren) {
          children.push(createBlock(target.dataset.addContainerComponent));
          render();
        }
        return;
      }
      if (target.dataset.deleteContainerComponent !== undefined) {
        const children = getContainerChildren(current, target.dataset.containerIndex);
        if (children && children.length > 1) {
          children.splice(Number(target.dataset.childIndex), 1);
          render();
        }
        return;
      }
      if (target.dataset.duplicateContainerComponent !== undefined) {
        const children = getContainerChildren(current, target.dataset.containerIndex);
        const index = Number(target.dataset.childIndex);
        if (children && children.length < LIMITS.containerChildren && children[index]) {
          children.splice(index + 1, 0, clone(children[index]));
          render();
        }
        return;
      }
      if (target.dataset.moveContainerComponent !== undefined) {
        const children = getContainerChildren(current, target.dataset.containerIndex);
        const index = Number(target.dataset.childIndex);
        const next = index + Number(target.dataset.direction);
        if (children && next >= 0 && next < children.length) {
          const [block] = children.splice(index, 1);
          children.splice(next, 0, block);
          render();
        }
        return;
      }
      if (target.dataset.deleteComponent !== undefined) {
        current.blocks.splice(Number(target.dataset.deleteComponent), 1);
        render();
        return;
      }
      if (target.dataset.duplicateComponent !== undefined) {
        const index = Number(target.dataset.duplicateComponent);
        current.blocks.splice(index + 1, 0, clone(current.blocks[index]));
        render();
        return;
      }
      if (target.dataset.moveComponent !== undefined) {
        const index = Number(target.dataset.moveComponent);
        const next = index + Number(target.dataset.direction);
        if (next >= 0 && next < current.blocks.length) {
          const [block] = current.blocks.splice(index, 1);
          current.blocks.splice(next, 0, block);
          render();
        }
        return;
      }
      if (target.matches('[data-editor-export]')) {
        downloadJson();
        return;
      }
      if (target.matches('[data-editor-copy]')) {
        await navigator.clipboard?.writeText(JSON.stringify(buildExportJson(), null, 2));
        const alert = root.querySelector('[data-editor-alert]');
        if (alert) {
          alert.hidden = false;
          alert.classList.remove('is-error');
          alert.textContent = 'JSON скопирован.';
        }
        return;
      }
      if (target.matches('[data-editor-send]')) {
        sendWebhook();
      }
    });

    render();
    const api = { render, state, buildExportJson };
    instances.set(root, api);
    return api;
  }

  function initAll(scope = document) {
    scope.querySelectorAll('[data-message-editor], [data-rules-editor], [data-template-rule-editor]').forEach((root) => init(root));
  }

  window.CoreMessageEditor = {
    init,
    initAll,
    renderDiscordMarkdown,
    renderMessage: renderDiscordMessage,
    renderMessages: renderDiscordMessages
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll());
  } else {
    initAll();
  }
})();
