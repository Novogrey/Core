(() => {
  const root = document.querySelector('[data-rules-editor]');
  if (!root) return;

  const LIMITS = {
    messages: 10,
    content: 2000,
    title: 256,
    description: 4096,
    author: 256,
    footer: 2048,
    embedTotal: 6000
  };

  const state = {
    active: 0,
    webhookUrl: '',
    username: 'Core',
    avatarUrl: '',
    messages: [
      {
        content: '# Правила сервера\n\nПожалуйста, ознакомься с правилами перед началом общения.',
        embedEnabled: true,
        embed: {
          color: '#44b8de',
          title: 'Основные правила',
          description: '1. Уважай участников.\n2. Не публикуй спам и рекламу.\n3. Используй каналы по назначению.\n4. Не передавай личные данные.',
          author: 'Core',
          footer: 'Правила могут обновляться.',
          thumbnail: '',
          image: ''
        }
      }
    ]
  };

  const $ = (selector) => root.querySelector(selector);
  const els = {
    webhook: $('[data-rules-webhook]'),
    username: $('[data-rules-username]'),
    avatar: $('[data-rules-avatar]'),
    send: $('[data-rules-send]'),
    export: $('[data-rules-export]'),
    import: $('[data-rules-import]'),
    status: $('[data-rules-status]'),
    limits: $('[data-rules-limits]'),
    alert: $('[data-rules-alert]'),
    messages: $('[data-rules-messages]'),
    add: $('[data-rules-add]'),
    duplicate: $('[data-rules-duplicate]'),
    delete: $('[data-rules-delete]'),
    currentTitle: $('[data-rules-current-title]'),
    content: $('[data-rules-content]'),
    embedEnabled: $('[data-rules-embed-enabled]'),
    embedEditor: $('[data-rules-embed-editor]'),
    color: $('[data-rules-color]'),
    title: $('[data-rules-title]'),
    description: $('[data-rules-description]'),
    author: $('[data-rules-author]'),
    footer: $('[data-rules-footer]'),
    thumbnail: $('[data-rules-thumbnail]'),
    image: $('[data-rules-image]'),
    preview: $('[data-rules-preview]'),
    count: $('[data-rules-count]')
  };

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function clampText(value, max) {
    return String(value || '').slice(0, max);
  }

  function normalizeColor(value) {
    const raw = String(value || '').trim();
    return /^#[\da-f]{6}$/i.test(raw) ? raw.toLowerCase() : '#44b8de';
  }

  function colorToInt(value) {
    return Number.parseInt(normalizeColor(value).slice(1), 16);
  }

  function validUrl(value, required = false) {
    const raw = String(value || '').trim();
    if (!raw) return !required;
    try {
      const url = new URL(raw);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  }

  function validWebhookUrl(value) {
    const raw = String(value || '').trim();
    if (!raw) return false;
    try {
      const url = new URL(raw);
      return url.protocol === 'https:' && url.hostname === 'discord.com' && url.pathname.startsWith('/api/webhooks/');
    } catch {
      return false;
    }
  }

  function getMessage(index = state.active) {
    return state.messages[index] || state.messages[0];
  }

  function emptyMessage() {
    return {
      content: '',
      embedEnabled: true,
      embed: {
        color: '#44b8de',
        title: '',
        description: '',
        author: '',
        footer: '',
        thumbnail: '',
        image: ''
      }
    };
  }

  function updateFromInputs() {
    const message = getMessage();
    if (!message) return;

    state.webhookUrl = els.webhook.value.trim();
    state.username = clampText(els.username.value, 80).trim();
    state.avatarUrl = els.avatar.value.trim();
    message.content = clampText(els.content.value, LIMITS.content);
    message.embedEnabled = els.embedEnabled.checked;
    message.embed.color = normalizeColor(els.color.value);
    message.embed.title = clampText(els.title.value, LIMITS.title);
    message.embed.description = clampText(els.description.value, LIMITS.description);
    message.embed.author = clampText(els.author.value, LIMITS.author);
    message.embed.footer = clampText(els.footer.value, LIMITS.footer);
    message.embed.thumbnail = els.thumbnail.value.trim();
    message.embed.image = els.image.value.trim();
  }

  function embedLength(embed) {
    return [
      embed.title,
      embed.description,
      embed.author,
      embed.footer
    ].reduce((sum, value) => sum + String(value || '').length, 0);
  }

  function buildEmbed(message) {
    if (!message.embedEnabled) return null;
    const source = message.embed || {};
    const embed = {};

    if (source.title) embed.title = clampText(source.title, LIMITS.title);
    if (source.description) embed.description = clampText(source.description, LIMITS.description);
    if (source.author) embed.author = { name: clampText(source.author, LIMITS.author) };
    if (source.footer) embed.footer = { text: clampText(source.footer, LIMITS.footer) };
    if (validUrl(source.thumbnail)) embed.thumbnail = { url: source.thumbnail.trim() };
    if (validUrl(source.image)) embed.image = { url: source.image.trim() };
    embed.color = colorToInt(source.color);

    const hasBody = embed.title || embed.description || embed.author || embed.footer || embed.thumbnail || embed.image;
    return hasBody ? embed : null;
  }

  function buildWebhookPayload(message) {
    const embed = buildEmbed(message);
    const payload = {
      allowed_mentions: { parse: [] }
    };

    if (state.username) payload.username = state.username;
    if (validUrl(state.avatarUrl)) payload.avatar_url = state.avatarUrl;
    if (message.content) payload.content = clampText(message.content, LIMITS.content);
    if (embed) payload.embeds = [embed];

    return payload;
  }

  function buildRulesJson() {
    const messages = state.messages.map((message) => {
      const embed = buildEmbed(message);
      return {
        content: clampText(message.content, LIMITS.content),
        embeds: embed ? [embed] : []
      };
    });

    return {
      kind: 'rules',
      version: 2,
      createdAt: new Date().toISOString(),
      messages,
      message: messages[0] || { content: '', embeds: [] }
    };
  }

  function validate() {
    const errors = [];
    const warnings = [];

    if (!validWebhookUrl(state.webhookUrl)) errors.push('Webhook URL должен быть ссылкой Discord вида https://discord.com/api/webhooks/...');
    if (state.messages.length > LIMITS.messages) errors.push(`Максимум сообщений: ${LIMITS.messages}.`);
    if (state.avatarUrl && !validUrl(state.avatarUrl)) errors.push('Аватар вебхука должен быть корректной ссылкой.');

    state.messages.forEach((message, index) => {
      const number = index + 1;
      const embed = buildEmbed(message);
      if (!message.content && !embed) errors.push(`Сообщение ${number}: нужен текст или embed.`);
      if (message.content.length > LIMITS.content) errors.push(`Сообщение ${number}: текст больше ${LIMITS.content} символов.`);
      if (message.embedEnabled) {
        if ((message.embed?.title || '').length > LIMITS.title) errors.push(`Сообщение ${number}: заголовок embed больше ${LIMITS.title}.`);
        if ((message.embed?.description || '').length > LIMITS.description) errors.push(`Сообщение ${number}: описание embed больше ${LIMITS.description}.`);
        if ((message.embed?.author || '').length > LIMITS.author) errors.push(`Сообщение ${number}: author больше ${LIMITS.author}.`);
        if ((message.embed?.footer || '').length > LIMITS.footer) errors.push(`Сообщение ${number}: footer больше ${LIMITS.footer}.`);
        if (embedLength(message.embed || {}) > LIMITS.embedTotal) errors.push(`Сообщение ${number}: общий размер embed больше ${LIMITS.embedTotal}.`);
        if (message.embed?.thumbnail && !validUrl(message.embed.thumbnail)) errors.push(`Сообщение ${number}: thumbnail должен быть ссылкой.`);
        if (message.embed?.image && !validUrl(message.embed.image)) errors.push(`Сообщение ${number}: image должен быть ссылкой.`);
      }
    });

    if (state.messages.length > 5) warnings.push('Много сообщений лучше отправлять в отдельный канал правил, чтобы не перебить активный чат.');

    return { errors, warnings };
  }

  function renderMessageButtons() {
    els.messages.innerHTML = state.messages.map((message, index) => {
      const label = message.embed?.title || message.content.split(/\r?\n/).find(Boolean) || `Сообщение ${index + 1}`;
      return `
        <button type="button" class="${index === state.active ? 'is-active' : ''}" data-rules-message="${index}">
          <strong>${index + 1}</strong>
          <span>${escapeHtml(label.slice(0, 58))}</span>
        </button>
      `;
    }).join('');
  }

  function renderInputs() {
    const message = getMessage();
    els.webhook.value = state.webhookUrl;
    els.username.value = state.username;
    els.avatar.value = state.avatarUrl;
    els.currentTitle.textContent = `Сообщение ${state.active + 1}`;
    els.content.value = message.content || '';
    els.embedEnabled.checked = Boolean(message.embedEnabled);
    els.embedEditor.hidden = !message.embedEnabled;
    els.color.value = normalizeColor(message.embed?.color);
    els.title.value = message.embed?.title || '';
    els.description.value = message.embed?.description || '';
    els.author.value = message.embed?.author || '';
    els.footer.value = message.embed?.footer || '';
    els.thumbnail.value = message.embed?.thumbnail || '';
    els.image.value = message.embed?.image || '';
    els.delete.disabled = state.messages.length <= 1;
    els.add.disabled = state.messages.length >= LIMITS.messages;
  }

  function renderLimits() {
    const message = getMessage();
    const embedTotal = embedLength(message.embed || {});
    const items = [
      ['Сообщения', state.messages.length, LIMITS.messages],
      ['Текст', message.content.length, LIMITS.content],
      ['Embed title', (message.embed?.title || '').length, LIMITS.title],
      ['Embed description', (message.embed?.description || '').length, LIMITS.description],
      ['Embed total', embedTotal, LIMITS.embedTotal]
    ];

    els.limits.innerHTML = items.map(([label, value, max]) => {
      const ratio = Math.min(100, Math.round((value / max) * 100));
      const danger = value > max ? ' is-danger' : ratio > 90 ? ' is-warning' : '';
      return `
        <div class="rules-limit${danger}">
          <span>${label}</span>
          <strong>${value}/${max}</strong>
          <i style="width:${ratio}%"></i>
        </div>
      `;
    }).join('');
  }

  function renderPreview() {
    els.count.textContent = `${state.messages.length} ${state.messages.length === 1 ? 'сообщение' : 'сообщений'}`;
    els.preview.innerHTML = state.messages.map((message, index) => {
      const embed = buildEmbed(message);
      const embedHtml = embed ? `
        <div class="rules-preview-embed" style="border-color:${escapeHtml(message.embed.color)}">
          ${embed.author?.name ? `<div class="rules-preview-author">${escapeHtml(embed.author.name)}</div>` : ''}
          ${embed.title ? `<strong>${escapeHtml(embed.title)}</strong>` : ''}
          ${embed.description ? `<p>${escapeHtml(embed.description).replace(/\n/g, '<br>')}</p>` : ''}
          ${embed.thumbnail?.url ? `<img class="rules-preview-thumb" src="${escapeHtml(embed.thumbnail.url)}" alt="">` : ''}
          ${embed.image?.url ? `<img class="rules-preview-image" src="${escapeHtml(embed.image.url)}" alt="">` : ''}
          ${embed.footer?.text ? `<small>${escapeHtml(embed.footer.text)}</small>` : ''}
        </div>
      ` : '';

      return `
        <article class="rules-preview-message">
          <div class="rules-preview-avatar">C</div>
          <div>
            <div class="rules-preview-meta"><strong>${escapeHtml(state.username || 'Webhook')}</strong><span>message ${index + 1}</span></div>
            ${message.content ? `<div class="rules-preview-content">${escapeHtml(message.content).replace(/\n/g, '<br>')}</div>` : ''}
            ${embedHtml}
          </div>
        </article>
      `;
    }).join('');
  }

  function renderValidation() {
    const { errors, warnings } = validate();
    const messages = [...errors, ...warnings];
    els.alert.hidden = !messages.length;
    els.alert.classList.toggle('is-error', Boolean(errors.length));
    els.alert.innerHTML = messages.map((message) => `<div>${escapeHtml(message)}</div>`).join('');
    els.status.textContent = errors.length ? `${errors.length} ошибок` : warnings.length ? `${warnings.length} предупреждений` : 'Готово';
    els.send.disabled = Boolean(errors.length);
  }

  function render() {
    renderMessageButtons();
    renderInputs();
    renderLimits();
    renderPreview();
    renderValidation();
  }

  function downloadJson() {
    updateFromInputs();
    const blob = new Blob([`${JSON.stringify(buildRulesJson(), null, 2)}\n`], { type: 'application/json' });
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
        const messages = Array.isArray(json.messages)
          ? json.messages
          : json.message
            ? [json.message]
            : [];
        if (!messages.length) throw new Error('JSON не содержит messages.');
        state.messages = messages.slice(0, LIMITS.messages).map((message) => ({
          content: clampText(message.content, LIMITS.content),
          embedEnabled: Boolean(message.embeds?.length),
          embed: {
            color: message.embeds?.[0]?.color ? `#${Number(message.embeds[0].color).toString(16).padStart(6, '0')}` : '#44b8de',
            title: clampText(message.embeds?.[0]?.title, LIMITS.title),
            description: clampText(message.embeds?.[0]?.description, LIMITS.description),
            author: clampText(message.embeds?.[0]?.author?.name, LIMITS.author),
            footer: clampText(message.embeds?.[0]?.footer?.text, LIMITS.footer),
            thumbnail: message.embeds?.[0]?.thumbnail?.url || '',
            image: message.embeds?.[0]?.image?.url || ''
          }
        }));
        state.active = 0;
        render();
      } catch (error) {
        els.alert.hidden = false;
        els.alert.classList.add('is-error');
        els.alert.textContent = error.message || 'JSON не удалось прочитать.';
      }
    });
    reader.readAsText(file);
  }

  async function sendWebhook() {
    updateFromInputs();
    const { errors } = validate();
    if (errors.length) {
      render();
      return;
    }

    els.send.disabled = true;
    els.send.textContent = 'Отправляю...';
    els.alert.hidden = true;

    try {
      for (let index = 0; index < state.messages.length; index += 1) {
        const response = await fetch(`${state.webhookUrl}?wait=true`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildWebhookPayload(state.messages[index]))
        });
        if (!response.ok) {
          const text = await response.text().catch(() => '');
          throw new Error(`Discord отклонил сообщение ${index + 1}: ${response.status} ${text}`.slice(0, 700));
        }
      }

      els.alert.hidden = false;
      els.alert.classList.remove('is-error');
      els.alert.textContent = `Отправлено сообщений: ${state.messages.length}.`;
    } catch (error) {
      els.alert.hidden = false;
      els.alert.classList.add('is-error');
      els.alert.textContent = `${error.message || 'Не удалось отправить webhook.'} Если браузер блокирует CORS, отправляй через серверный proxy или Google Apps Script.`;
    } finally {
      els.send.textContent = 'Отправить';
      els.send.disabled = Boolean(validate().errors.length);
    }
  }

  root.addEventListener('input', () => {
    updateFromInputs();
    renderLimits();
    renderPreview();
    renderValidation();
  });

  root.addEventListener('change', (event) => {
    if (event.target === els.import) {
      importJson(event.target.files?.[0]);
      event.target.value = '';
      return;
    }
    updateFromInputs();
    render();
  });

  root.addEventListener('click', (event) => {
    const messageButton = event.target.closest('[data-rules-message]');
    if (messageButton) {
      updateFromInputs();
      state.active = Number(messageButton.dataset.rulesMessage || 0);
      render();
      return;
    }

    if (event.target === els.add) {
      updateFromInputs();
      if (state.messages.length < LIMITS.messages) {
        state.messages.push(emptyMessage());
        state.active = state.messages.length - 1;
        render();
      }
      return;
    }

    if (event.target === els.duplicate) {
      updateFromInputs();
      if (state.messages.length < LIMITS.messages) {
        state.messages.splice(state.active + 1, 0, JSON.parse(JSON.stringify(getMessage())));
        state.active += 1;
        render();
      }
      return;
    }

    if (event.target === els.delete) {
      if (state.messages.length > 1) {
        state.messages.splice(state.active, 1);
        state.active = Math.max(0, state.active - 1);
        render();
      }
      return;
    }

    if (event.target === els.export) {
      downloadJson();
      return;
    }

    if (event.target === els.send) {
      sendWebhook();
    }
  });

  render();
})();
