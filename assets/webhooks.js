(() => {
  const MAX_EMBEDS = 5;
  const MAX_FIELDS = 10;
  const MAX_LINK_BUTTONS = 5;
  const FALLBACK_LANG = 'ru';
  const DEFAULT_COLOR = '#44b8de';

  const text = {
    ru: {
      pageTitle: 'Core - создание вебхуков',
      pageDescription: 'Создавай Discord webhook-сообщения в стиле Core: текст, embeds, превью, JSON и кнопки-ссылки.',
      eyebrow: 'Core tools',
      title: 'Создание вебхуков',
      copy: 'Собери сообщение, проверь его в Discord-превью и отправь через свой webhook URL. Поддерживаются текст, embeds и только кнопки-ссылки.',
      openHelp: 'Справка по командам',
      connectionLabel: 'Подключение',
      connectionTitle: 'Webhook',
      webhookUrlLabel: 'Webhook URL',
      usernameLabel: 'Имя отправителя',
      avatarLabel: 'Аватар URL',
      contentLabel: 'Текст сообщения',
      embedsLabel: 'Embeds',
      embedsTitle: 'Карточки сообщения',
      addEmbed: 'Добавить embed',
      linksLabel: 'Link buttons',
      linksTitle: 'Кнопки-ссылки',
      addLinkButton: 'Добавить ссылку',
      send: 'Отправить вебхук',
      copyJson: 'Копировать JSON',
      reset: 'Сбросить',
      previewChannel: 'webhook-preview',
      payloadLabel: 'Payload',
      payloadTitle: 'JSON',
      embed: 'Embed',
      remove: 'Удалить',
      titleField: 'Заголовок',
      descriptionField: 'Описание',
      colorField: 'Цвет',
      urlField: 'URL заголовка',
      authorField: 'Автор',
      thumbnailField: 'Thumbnail URL',
      imageField: 'Image URL',
      footerField: 'Footer',
      fields: 'Поля',
      addField: 'Добавить поле',
      fieldName: 'Название',
      fieldValue: 'Значение',
      inline: 'В линию',
      linkButton: 'Кнопка-ссылка',
      linkLabel: 'Текст кнопки',
      linkUrl: 'Ссылка',
      emptyContent: 'Сообщение появится здесь.',
      copied: 'JSON скопирован',
      resetDone: 'Черновик сброшен',
      invalidWebhook: 'Вставь корректный Discord webhook URL.',
      emptyPayload: 'Добавь текст, embed или хотя бы одну кнопку-ссылку.',
      sending: 'Отправляю...',
      sent: 'Отправлено.',
      failed: 'Discord вернул ошибку: {message}',
      networkFailed: 'Не получилось отправить запрос. Проверь URL и доступность Discord.',
      fieldLimit: 'Лимит полей в embed: {limit}.',
      embedLimit: 'Лимит embeds: {limit}.',
      buttonLimit: 'Лимит link-кнопок: {limit}.'
    },
    en: {
      pageTitle: 'Core - webhook builder',
      pageDescription: 'Create Discord webhook messages in the Core style: text, embeds, preview, JSON and link buttons.',
      eyebrow: 'Core tools',
      title: 'Webhook builder',
      copy: 'Build a message, preview it like Discord and send it through your webhook URL. Text, embeds and link buttons only.',
      openHelp: 'Command help',
      connectionLabel: 'Connection',
      connectionTitle: 'Webhook',
      webhookUrlLabel: 'Webhook URL',
      usernameLabel: 'Sender name',
      avatarLabel: 'Avatar URL',
      contentLabel: 'Message text',
      embedsLabel: 'Embeds',
      embedsTitle: 'Message cards',
      addEmbed: 'Add embed',
      linksLabel: 'Link buttons',
      linksTitle: 'Link buttons',
      addLinkButton: 'Add link',
      send: 'Send webhook',
      copyJson: 'Copy JSON',
      reset: 'Reset',
      previewChannel: 'webhook-preview',
      payloadLabel: 'Payload',
      payloadTitle: 'JSON',
      embed: 'Embed',
      remove: 'Remove',
      titleField: 'Title',
      descriptionField: 'Description',
      colorField: 'Color',
      urlField: 'Title URL',
      authorField: 'Author',
      thumbnailField: 'Thumbnail URL',
      imageField: 'Image URL',
      footerField: 'Footer',
      fields: 'Fields',
      addField: 'Add field',
      fieldName: 'Name',
      fieldValue: 'Value',
      inline: 'Inline',
      linkButton: 'Link button',
      linkLabel: 'Button text',
      linkUrl: 'URL',
      emptyContent: 'The message will appear here.',
      copied: 'JSON copied',
      resetDone: 'Draft reset',
      invalidWebhook: 'Paste a valid Discord webhook URL.',
      emptyPayload: 'Add text, an embed or at least one link button.',
      sending: 'Sending...',
      sent: 'Sent.',
      failed: 'Discord returned an error: {message}',
      networkFailed: 'Could not send the request. Check the URL and Discord availability.',
      fieldLimit: 'Embed field limit: {limit}.',
      embedLimit: 'Embed limit: {limit}.',
      buttonLimit: 'Link button limit: {limit}.'
    },
    ua: {
      pageTitle: 'Core - створення вебхуків',
      pageDescription: 'Створюй Discord webhook-повідомлення у стилі Core: текст, embeds, превью, JSON і кнопки-посилання.',
      eyebrow: 'Core tools',
      title: 'Створення вебхуків',
      copy: 'Збери повідомлення, перевір його в Discord-превью та надішли через свій webhook URL. Підтримуються текст, embeds і тільки кнопки-посилання.',
      openHelp: 'Довідка команд',
      connectionLabel: 'Підключення',
      connectionTitle: 'Webhook',
      webhookUrlLabel: 'Webhook URL',
      usernameLabel: 'Імʼя відправника',
      avatarLabel: 'Аватар URL',
      contentLabel: 'Текст повідомлення',
      embedsLabel: 'Embeds',
      embedsTitle: 'Картки повідомлення',
      addEmbed: 'Додати embed',
      linksLabel: 'Link buttons',
      linksTitle: 'Кнопки-посилання',
      addLinkButton: 'Додати посилання',
      send: 'Надіслати вебхук',
      copyJson: 'Скопіювати JSON',
      reset: 'Скинути',
      previewChannel: 'webhook-preview',
      payloadLabel: 'Payload',
      payloadTitle: 'JSON',
      embed: 'Embed',
      remove: 'Видалити',
      titleField: 'Заголовок',
      descriptionField: 'Опис',
      colorField: 'Колір',
      urlField: 'URL заголовка',
      authorField: 'Автор',
      thumbnailField: 'Thumbnail URL',
      imageField: 'Image URL',
      footerField: 'Footer',
      fields: 'Поля',
      addField: 'Додати поле',
      fieldName: 'Назва',
      fieldValue: 'Значення',
      inline: 'В лінію',
      linkButton: 'Кнопка-посилання',
      linkLabel: 'Текст кнопки',
      linkUrl: 'Посилання',
      emptyContent: 'Повідомлення зʼявиться тут.',
      copied: 'JSON скопійовано',
      resetDone: 'Чернетку скинуто',
      invalidWebhook: 'Встав коректний Discord webhook URL.',
      emptyPayload: 'Додай текст, embed або хоча б одну кнопку-посилання.',
      sending: 'Надсилаю...',
      sent: 'Надіслано.',
      failed: 'Discord повернув помилку: {message}',
      networkFailed: 'Не вдалося надіслати запит. Перевір URL і доступність Discord.',
      fieldLimit: 'Ліміт полів в embed: {limit}.',
      embedLimit: 'Ліміт embeds: {limit}.',
      buttonLimit: 'Ліміт link-кнопок: {limit}.'
    },
    de: {
      pageTitle: 'Core - Webhook Builder',
      pageDescription: 'Erstelle Discord-Webhook-Nachrichten im Core-Stil: Text, Embeds, Vorschau, JSON und Link-Buttons.',
      eyebrow: 'Core tools',
      title: 'Webhook Builder',
      copy: 'Baue eine Nachricht, prüfe sie in der Discord-Vorschau und sende sie über deine Webhook-URL. Nur Text, Embeds und Link-Buttons.',
      openHelp: 'Befehlshilfe',
      connectionLabel: 'Verbindung',
      connectionTitle: 'Webhook',
      webhookUrlLabel: 'Webhook URL',
      usernameLabel: 'Absendername',
      avatarLabel: 'Avatar URL',
      contentLabel: 'Nachrichtentext',
      embedsLabel: 'Embeds',
      embedsTitle: 'Nachrichtenkarten',
      addEmbed: 'Embed hinzufügen',
      linksLabel: 'Link buttons',
      linksTitle: 'Link-Buttons',
      addLinkButton: 'Link hinzufügen',
      send: 'Webhook senden',
      copyJson: 'JSON kopieren',
      reset: 'Zurücksetzen',
      previewChannel: 'webhook-preview',
      payloadLabel: 'Payload',
      payloadTitle: 'JSON',
      embed: 'Embed',
      remove: 'Entfernen',
      titleField: 'Titel',
      descriptionField: 'Beschreibung',
      colorField: 'Farbe',
      urlField: 'Titel URL',
      authorField: 'Autor',
      thumbnailField: 'Thumbnail URL',
      imageField: 'Image URL',
      footerField: 'Footer',
      fields: 'Felder',
      addField: 'Feld hinzufügen',
      fieldName: 'Name',
      fieldValue: 'Wert',
      inline: 'Inline',
      linkButton: 'Link-Button',
      linkLabel: 'Button-Text',
      linkUrl: 'Link',
      emptyContent: 'Die Nachricht erscheint hier.',
      copied: 'JSON kopiert',
      resetDone: 'Entwurf zurückgesetzt',
      invalidWebhook: 'Füge eine gültige Discord-Webhook-URL ein.',
      emptyPayload: 'Füge Text, ein Embed oder mindestens einen Link-Button hinzu.',
      sending: 'Sende...',
      sent: 'Gesendet.',
      failed: 'Discord meldete einen Fehler: {message}',
      networkFailed: 'Anfrage konnte nicht gesendet werden. Prüfe URL und Discord-Verfügbarkeit.',
      fieldLimit: 'Embed-Feldlimit: {limit}.',
      embedLimit: 'Embed-Limit: {limit}.',
      buttonLimit: 'Link-Button-Limit: {limit}.'
    }
  };

  let language = FALLBACK_LANG;
  let nextId = 1;
  const state = {
    embeds: [],
    buttons: []
  };

  const form = document.querySelector('[data-webhook-form]');
  if (!form) return;

  const elements = {
    url: document.querySelector('[data-webhook-url]'),
    username: document.querySelector('[data-webhook-username]'),
    avatar: document.querySelector('[data-webhook-avatar]'),
    content: document.querySelector('[data-webhook-content]'),
    contentCount: document.querySelector('[data-content-count]'),
    embedList: document.querySelector('[data-embed-list]'),
    buttonList: document.querySelector('[data-link-button-list]'),
    status: document.querySelector('[data-webhook-status]'),
    toast: document.querySelector('[data-webhook-toast]'),
    previewAvatar: document.querySelector('[data-preview-avatar]'),
    previewUsername: document.querySelector('[data-preview-username]'),
    previewContent: document.querySelector('[data-preview-content]'),
    previewEmbeds: document.querySelector('[data-preview-embeds]'),
    previewButtons: document.querySelector('[data-preview-buttons]'),
    payload: document.querySelector('[data-payload-preview]')
  };

  function getSavedLanguage() {
    const saved = localStorage.getItem('core-site-language');
    if (text[saved]) return saved;
    const browserLanguage = navigator.language?.toLowerCase() || '';
    if (browserLanguage.startsWith('uk')) return 'ua';
    if (browserLanguage.startsWith('de')) return 'de';
    if (browserLanguage.startsWith('en')) return 'en';
    return FALLBACK_LANG;
  }

  function t(key, replacements = {}) {
    let value = text[language]?.[key] || text[FALLBACK_LANG][key] || key;
    Object.entries(replacements).forEach(([name, replacement]) => {
      value = value.replace(`{${name}}`, String(replacement));
    });
    return value;
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatMarkdown(value) {
    const escaped = escapeHtml(value || '');
    const withInline = escaped
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

    return withInline
      .split('\n')
      .map((line) => {
        if (/^###\s+/.test(line)) return `<h4>${line.replace(/^###\s+/, '')}</h4>`;
        if (/^##\s+/.test(line)) return `<h3>${line.replace(/^##\s+/, '')}</h3>`;
        if (/^#\s+/.test(line)) return `<h2>${line.replace(/^#\s+/, '')}</h2>`;
        if (/^-\s+/.test(line)) return `<p class="discord-bullet">${line.replace(/^-\s+/, '')}</p>`;
        return line ? `<p>${line}</p>` : '<br>';
      })
      .join('');
  }

  function isValidHttpUrl(value) {
    if (!value) return false;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  }

  function isValidDiscordWebhookUrl(value) {
    if (!value) return false;
    try {
      const url = new URL(value.trim());
      return url.protocol === 'https:' && /(^|\.)discord(app)?\.com$/i.test(url.hostname) && url.pathname.startsWith('/api/webhooks/');
    } catch {
      return false;
    }
  }

  function hexToInt(value) {
    const hex = String(value || DEFAULT_COLOR).replace('#', '').trim();
    if (!/^[\da-f]{6}$/i.test(hex)) return parseInt(DEFAULT_COLOR.slice(1), 16);
    return parseInt(hex, 16);
  }

  function intToHex(value) {
    const number = Number.isFinite(value) ? value : hexToInt(DEFAULT_COLOR);
    return `#${number.toString(16).padStart(6, '0').slice(0, 6)}`;
  }

  function createEmbed() {
    return {
      id: nextId++,
      title: 'Core webhook',
      description: 'Аккуратная карточка для объявления, правил или новости.',
      color: DEFAULT_COLOR,
      url: '',
      author: '',
      thumbnail: '',
      image: '',
      footer: '',
      fields: []
    };
  }

  function createField() {
    return { id: nextId++, name: '', value: '', inline: false };
  }

  function createLinkButton() {
    return { id: nextId++, label: 'Открыть', url: 'https://discord.gg/FjfZkHEuyv' };
  }

  function getPayload() {
    const payload = {};
    const content = elements.content?.value.trim() || '';
    const username = elements.username?.value.trim() || '';
    const avatarUrl = elements.avatar?.value.trim() || '';

    if (content) payload.content = content;
    if (username) payload.username = username.slice(0, 80);
    if (isValidHttpUrl(avatarUrl)) payload.avatar_url = avatarUrl;

    const embeds = state.embeds
      .map((embed) => {
        const nextEmbed = {};
        const fields = embed.fields
          .filter((field) => field.name.trim() && field.value.trim())
          .slice(0, 25)
          .map((field) => ({
            name: field.name.trim().slice(0, 256),
            value: field.value.trim().slice(0, 1024),
            inline: Boolean(field.inline)
          }));

        if (embed.title.trim()) nextEmbed.title = embed.title.trim().slice(0, 256);
        if (embed.description.trim()) nextEmbed.description = embed.description.trim().slice(0, 4096);
        if (embed.url.trim() && isValidHttpUrl(embed.url.trim())) nextEmbed.url = embed.url.trim();
        if (embed.author.trim()) nextEmbed.author = { name: embed.author.trim().slice(0, 256) };
        if (embed.thumbnail.trim() && isValidHttpUrl(embed.thumbnail.trim())) nextEmbed.thumbnail = { url: embed.thumbnail.trim() };
        if (embed.image.trim() && isValidHttpUrl(embed.image.trim())) nextEmbed.image = { url: embed.image.trim() };
        if (embed.footer.trim()) nextEmbed.footer = { text: embed.footer.trim().slice(0, 2048) };
        if (fields.length) nextEmbed.fields = fields;
        if (Object.keys(nextEmbed).length) nextEmbed.color = hexToInt(embed.color);

        return nextEmbed;
      })
      .filter((embed) => Object.keys(embed).length);

    if (embeds.length) payload.embeds = embeds;

    const buttons = state.buttons
      .filter((button) => button.label.trim() && isValidHttpUrl(button.url.trim()))
      .slice(0, MAX_LINK_BUTTONS)
      .map((button) => ({
        type: 2,
        style: 5,
        label: button.label.trim().slice(0, 80),
        url: button.url.trim()
      }));

    if (buttons.length) {
      payload.components = [{ type: 1, components: buttons }];
    }

    return payload;
  }

  function hasMessageBody(payload) {
    return Boolean(payload.content || payload.embeds?.length || payload.components?.length);
  }

  function renderEmbedEditor(embed, index) {
    return `
      <article class="embed-editor" data-embed-id="${embed.id}">
        <div class="embed-editor-head">
          <strong>${escapeHtml(t('embed'))} ${index + 1}</strong>
          <button class="editor-mini-action" type="button" data-remove-embed="${embed.id}">${escapeHtml(t('remove'))}</button>
        </div>
        <div class="field-grid">
          <label class="field">
            <span>${escapeHtml(t('titleField'))}</span>
            <input class="core-input" type="text" maxlength="256" data-embed-field="title" value="${escapeHtml(embed.title)}">
          </label>
          <label class="field">
            <span>${escapeHtml(t('colorField'))}</span>
            <input class="core-input color-input" type="color" data-embed-field="color" value="${escapeHtml(intToHex(hexToInt(embed.color)))}">
          </label>
        </div>
        <label class="field">
          <span>${escapeHtml(t('descriptionField'))}</span>
          <textarea class="core-textarea" rows="5" maxlength="4096" data-embed-field="description">${escapeHtml(embed.description)}</textarea>
        </label>
        <div class="field-grid">
          <label class="field">
            <span>${escapeHtml(t('urlField'))}</span>
            <input class="core-input" type="url" data-embed-field="url" value="${escapeHtml(embed.url)}">
          </label>
          <label class="field">
            <span>${escapeHtml(t('authorField'))}</span>
            <input class="core-input" type="text" maxlength="256" data-embed-field="author" value="${escapeHtml(embed.author)}">
          </label>
        </div>
        <div class="field-grid">
          <label class="field">
            <span>${escapeHtml(t('thumbnailField'))}</span>
            <input class="core-input" type="url" data-embed-field="thumbnail" value="${escapeHtml(embed.thumbnail)}">
          </label>
          <label class="field">
            <span>${escapeHtml(t('imageField'))}</span>
            <input class="core-input" type="url" data-embed-field="image" value="${escapeHtml(embed.image)}">
          </label>
        </div>
        <label class="field">
          <span>${escapeHtml(t('footerField'))}</span>
          <input class="core-input" type="text" maxlength="2048" data-embed-field="footer" value="${escapeHtml(embed.footer)}">
        </label>
        <div class="embed-fields">
          <div class="embed-fields-head">
            <strong>${escapeHtml(t('fields'))}</strong>
            <button class="editor-mini-action" type="button" data-add-field="${embed.id}">${escapeHtml(t('addField'))}</button>
          </div>
          ${embed.fields.map((field) => renderFieldEditor(field, embed.id)).join('')}
        </div>
      </article>
    `;
  }

  function renderFieldEditor(field, embedId) {
    return `
      <div class="embed-field-editor" data-field-id="${field.id}" data-parent-embed="${embedId}">
        <label class="field">
          <span>${escapeHtml(t('fieldName'))}</span>
          <input class="core-input" type="text" maxlength="256" data-field-prop="name" value="${escapeHtml(field.name)}">
        </label>
        <label class="field">
          <span>${escapeHtml(t('fieldValue'))}</span>
          <textarea class="core-textarea" rows="3" maxlength="1024" data-field-prop="value">${escapeHtml(field.value)}</textarea>
        </label>
        <label class="toggle-field">
          <input type="checkbox" data-field-prop="inline" ${field.inline ? 'checked' : ''}>
          <span>${escapeHtml(t('inline'))}</span>
        </label>
        <button class="editor-mini-action" type="button" data-remove-field="${field.id}">${escapeHtml(t('remove'))}</button>
      </div>
    `;
  }

  function renderButtonEditor(button, index) {
    return `
      <div class="link-button-editor" data-link-button-id="${button.id}">
        <div class="embed-editor-head">
          <strong>${escapeHtml(t('linkButton'))} ${index + 1}</strong>
          <button class="editor-mini-action" type="button" data-remove-link-button="${button.id}">${escapeHtml(t('remove'))}</button>
        </div>
        <div class="field-grid">
          <label class="field">
            <span>${escapeHtml(t('linkLabel'))}</span>
            <input class="core-input" type="text" maxlength="80" data-link-button-field="label" value="${escapeHtml(button.label)}">
          </label>
          <label class="field">
            <span>${escapeHtml(t('linkUrl'))}</span>
            <input class="core-input" type="url" data-link-button-field="url" value="${escapeHtml(button.url)}">
          </label>
        </div>
      </div>
    `;
  }

  function renderEditors() {
    if (elements.embedList) {
      elements.embedList.innerHTML = state.embeds.map(renderEmbedEditor).join('');
    }
    if (elements.buttonList) {
      elements.buttonList.innerHTML = state.buttons.map(renderButtonEditor).join('');
    }
    const addEmbed = document.querySelector('[data-add-embed]');
    const addButton = document.querySelector('[data-add-link-button]');
    if (addEmbed) addEmbed.disabled = state.embeds.length >= MAX_EMBEDS;
    if (addButton) addButton.disabled = state.buttons.length >= MAX_LINK_BUTTONS;
  }

  function renderPreview() {
    const payload = getPayload();
    const username = payload.username || 'Core';
    const avatarUrl = payload.avatar_url || '';

    if (elements.contentCount) elements.contentCount.textContent = String(elements.content?.value.length || 0);
    if (elements.previewUsername) elements.previewUsername.textContent = username;

    if (elements.previewAvatar) {
      elements.previewAvatar.innerHTML = avatarUrl
        ? `<img src="${escapeHtml(avatarUrl)}" alt="">`
        : escapeHtml(username.trim().slice(0, 1).toUpperCase() || 'C');
    }

    if (elements.previewContent) {
      elements.previewContent.innerHTML = payload.content ? formatMarkdown(payload.content) : `<p class="empty-preview">${escapeHtml(t('emptyContent'))}</p>`;
    }

    if (elements.previewEmbeds) {
      const embeds = payload.embeds || [];
      elements.previewEmbeds.innerHTML = embeds.map((embed) => `
        <article class="discord-embed-preview" style="--embed-color:#${Number(embed.color || hexToInt(DEFAULT_COLOR)).toString(16).padStart(6, '0')}">
          ${embed.author?.name ? `<div class="embed-author">${escapeHtml(embed.author.name)}</div>` : ''}
          ${embed.title ? `<h3>${embed.url ? `<a href="${escapeHtml(embed.url)}" target="_blank" rel="noreferrer">${escapeHtml(embed.title)}</a>` : escapeHtml(embed.title)}</h3>` : ''}
          ${embed.description ? `<div class="embed-description">${formatMarkdown(embed.description)}</div>` : ''}
          ${embed.thumbnail?.url ? `<img class="embed-thumbnail" src="${escapeHtml(embed.thumbnail.url)}" alt="">` : ''}
          ${embed.fields?.length ? `<div class="embed-field-preview-list">${embed.fields.map((field) => `
            <div class="${field.inline ? 'is-inline' : ''}">
              <strong>${escapeHtml(field.name)}</strong>
              <p>${formatMarkdown(field.value)}</p>
            </div>
          `).join('')}</div>` : ''}
          ${embed.image?.url ? `<img class="embed-image" src="${escapeHtml(embed.image.url)}" alt="">` : ''}
          ${embed.footer?.text ? `<footer>${escapeHtml(embed.footer.text)}</footer>` : ''}
        </article>
      `).join('');
    }

    if (elements.previewButtons) {
      const buttons = payload.components?.[0]?.components || [];
      elements.previewButtons.innerHTML = buttons.map((button) => `
        <a href="${escapeHtml(button.url)}" target="_blank" rel="noreferrer">${escapeHtml(button.label)}</a>
      `).join('');
    }

    if (elements.payload) {
      elements.payload.textContent = JSON.stringify(payload, null, 2);
    }
  }

  function showToast(message) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.classList.add('is-visible');
    window.setTimeout(() => elements.toast?.classList.remove('is-visible'), 1800);
  }

  function setStatus(message, tone = '') {
    if (!elements.status) return;
    elements.status.textContent = message;
    elements.status.dataset.tone = tone;
  }

  function applyLanguage(nextLanguage) {
    language = text[nextLanguage] ? nextLanguage : FALLBACK_LANG;
    document.documentElement.lang = language === 'ua' ? 'uk' : language;
    document.title = t('pageTitle');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('pageDescription'));
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('pageTitle'));
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('pageDescription'));

    document.querySelectorAll('[data-webhook-i18n]').forEach((node) => {
      const key = node.dataset.webhookI18n;
      if (text[language]?.[key]) node.textContent = t(key);
    });

    renderEditors();
    renderPreview();
  }

  function resetState() {
    state.embeds = [createEmbed()];
    state.buttons = [createLinkButton()];
    if (elements.username) elements.username.value = 'Core';
    if (elements.avatar) elements.avatar.value = '';
    if (elements.url) elements.url.value = '';
    if (elements.content) {
      elements.content.value = language === 'en'
        ? '# Hello!\nThis message was created with Core webhook builder.'
        : '# Привет!\nЭто сообщение отправлено через Core webhook builder.';
    }
    renderEditors();
    renderPreview();
  }

  function findEmbed(id) {
    return state.embeds.find((embed) => embed.id === Number(id));
  }

  function findField(embed, id) {
    return embed?.fields.find((field) => field.id === Number(id));
  }

  function findButton(id) {
    return state.buttons.find((button) => button.id === Number(id));
  }

  form.addEventListener('input', (event) => {
    const target = event.target;
    const embedRoot = target.closest('[data-embed-id]');
    const fieldRoot = target.closest('[data-field-id]');
    const buttonRoot = target.closest('[data-link-button-id]');

    if (fieldRoot) {
      const embed = findEmbed(fieldRoot.dataset.parentEmbed);
      const field = findField(embed, fieldRoot.dataset.fieldId);
      const prop = target.dataset.fieldProp;
      if (field && prop) field[prop] = target.type === 'checkbox' ? target.checked : target.value;
    } else if (embedRoot && target.dataset.embedField) {
      const embed = findEmbed(embedRoot.dataset.embedId);
      if (embed) embed[target.dataset.embedField] = target.value;
    } else if (buttonRoot && target.dataset.linkButtonField) {
      const button = findButton(buttonRoot.dataset.linkButtonId);
      if (button) button[target.dataset.linkButtonField] = target.value;
    }

    renderPreview();
  });

  form.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;

    if (target.matches('[data-add-embed]')) {
      if (state.embeds.length >= MAX_EMBEDS) return showToast(t('embedLimit', { limit: MAX_EMBEDS }));
      state.embeds.push(createEmbed());
      renderEditors();
      renderPreview();
    }

    if (target.matches('[data-remove-embed]')) {
      state.embeds = state.embeds.filter((embed) => embed.id !== Number(target.dataset.removeEmbed));
      renderEditors();
      renderPreview();
    }

    if (target.matches('[data-add-field]')) {
      const embed = findEmbed(target.dataset.addField);
      if (!embed) return;
      if (embed.fields.length >= MAX_FIELDS) return showToast(t('fieldLimit', { limit: MAX_FIELDS }));
      embed.fields.push(createField());
      renderEditors();
      renderPreview();
    }

    if (target.matches('[data-remove-field]')) {
      state.embeds.forEach((embed) => {
        embed.fields = embed.fields.filter((field) => field.id !== Number(target.dataset.removeField));
      });
      renderEditors();
      renderPreview();
    }

    if (target.matches('[data-add-link-button]')) {
      if (state.buttons.length >= MAX_LINK_BUTTONS) return showToast(t('buttonLimit', { limit: MAX_LINK_BUTTONS }));
      state.buttons.push(createLinkButton());
      renderEditors();
      renderPreview();
    }

    if (target.matches('[data-remove-link-button]')) {
      state.buttons = state.buttons.filter((button) => button.id !== Number(target.dataset.removeLinkButton));
      renderEditors();
      renderPreview();
    }
  });

  document.querySelector('[data-copy-payload]')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(JSON.stringify(getPayload(), null, 2)).then(() => showToast(t('copied'))).catch(() => {});
  });

  document.querySelector('[data-reset-webhook]')?.addEventListener('click', () => {
    resetState();
    setStatus('');
    showToast(t('resetDone'));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const webhookUrl = elements.url?.value.trim() || '';
    const payload = getPayload();

    if (!isValidDiscordWebhookUrl(webhookUrl)) {
      setStatus(t('invalidWebhook'), 'error');
      return;
    }

    if (!hasMessageBody(payload)) {
      setStatus(t('emptyPayload'), 'error');
      return;
    }

    setStatus(t('sending'), 'progress');

    try {
      const url = new URL(webhookUrl);
      url.searchParams.set('wait', 'true');
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const message = await response.text();
        setStatus(t('failed', { message: message.slice(0, 220) || `HTTP ${response.status}` }), 'error');
        return;
      }

      setStatus(t('sent'), 'success');
    } catch {
      setStatus(t('networkFailed'), 'error');
    }
  });

  window.addEventListener('core-language-change', (event) => {
    applyLanguage(event.detail?.language || getSavedLanguage());
  });

  resetState();
  applyLanguage(getSavedLanguage());
})();
