(() => {
  const FALLBACK_LANG = 'ru';

  const dictionaries = {
    ru: {
      timestampTitle: 'Генератор timestamp',
      colorTitle: 'Цветной текст Discord',
      markdownTitle: 'Markdown Discord',
      timestampCopy: 'Выберите дату, время и формат. Код можно вставить в сообщение, embed или Components V2.',
      colorCopy: 'Соберите ANSI-блок для Discord. Цветной текст работает внутри блока ```ansi```.',
      markdownCopy: 'Готовые форматы Markdown для сообщений, правил, объявлений и шаблонов.',
      date: 'Дата',
      time: 'Время',
      style: 'Формат',
      now: 'Сейчас',
      output: 'Результат',
      copy: 'Скопировать',
      copied: 'Скопировано.',
      text: 'Текст',
      foreground: 'Цвет текста',
      background: 'Фон',
      bold: 'Жирный',
      underline: 'Подчёркнутый',
      noColor: 'Без цвета',
      markdown: 'Фрагменты',
      openWebhook: 'Открыть редактор вебхуков'
    },
    en: {
      timestampTitle: 'Timestamp generator',
      colorTitle: 'Discord colored text',
      markdownTitle: 'Discord Markdown',
      timestampCopy: 'Choose date, time and format. Paste the code into a message, embed or Components V2.',
      colorCopy: 'Build an ANSI block for Discord. Colored text works inside an ```ansi``` block.',
      markdownCopy: 'Ready Markdown formats for messages, rules, announcements and templates.',
      date: 'Date',
      time: 'Time',
      style: 'Format',
      now: 'Now',
      output: 'Result',
      copy: 'Copy',
      copied: 'Copied.',
      text: 'Text',
      foreground: 'Text color',
      background: 'Background',
      bold: 'Bold',
      underline: 'Underline',
      noColor: 'No color',
      markdown: 'Snippets',
      openWebhook: 'Open webhook builder'
    },
    ua: {
      timestampTitle: 'Генератор timestamp',
      colorTitle: 'Кольоровий текст Discord',
      markdownTitle: 'Markdown Discord',
      timestampCopy: 'Виберіть дату, час і формат. Код можна вставити в повідомлення, embed або Components V2.',
      colorCopy: 'Зберіть ANSI-блок для Discord. Кольоровий текст працює всередині блока ```ansi```.',
      markdownCopy: 'Готові формати Markdown для повідомлень, правил, оголошень і шаблонів.',
      date: 'Дата',
      time: 'Час',
      style: 'Формат',
      now: 'Зараз',
      output: 'Результат',
      copy: 'Скопіювати',
      copied: 'Скопійовано.',
      text: 'Текст',
      foreground: 'Колір тексту',
      background: 'Фон',
      bold: 'Жирний',
      underline: 'Підкреслений',
      noColor: 'Без кольору',
      markdown: 'Фрагменти',
      openWebhook: 'Відкрити редактор вебхуків'
    },
    de: {
      timestampTitle: 'Timestamp-Generator',
      colorTitle: 'Discord-Farbtext',
      markdownTitle: 'Discord Markdown',
      timestampCopy: 'Datum, Uhrzeit und Format waehlen. Der Code passt in Nachrichten, Embeds oder Components V2.',
      colorCopy: 'Erstelle einen ANSI-Block fuer Discord. Farbiger Text funktioniert im ```ansi``` Block.',
      markdownCopy: 'Fertige Markdown-Formate fuer Nachrichten, Regeln, Ankuendigungen und Vorlagen.',
      date: 'Datum',
      time: 'Uhrzeit',
      style: 'Format',
      now: 'Jetzt',
      output: 'Ergebnis',
      copy: 'Kopieren',
      copied: 'Kopiert.',
      text: 'Text',
      foreground: 'Textfarbe',
      background: 'Hintergrund',
      bold: 'Fett',
      underline: 'Unterstrichen',
      noColor: 'Keine Farbe',
      markdown: 'Bausteine',
      openWebhook: 'Webhook-Editor oeffnen'
    }
  };

  const timestampStyles = [
    ['t', '16:20'],
    ['T', '16:20:30'],
    ['d', '20/04/2026'],
    ['D', '20 April 2026'],
    ['f', '20 April 2026 16:20'],
    ['F', 'Monday, 20 April 2026 16:20'],
    ['R', 'in 2 hours']
  ];

  const colors = [
    ['', 'Default', 39],
    ['gray', 'Gray', 30],
    ['red', 'Red', 31],
    ['green', 'Green', 32],
    ['yellow', 'Yellow', 33],
    ['blue', 'Blue', 34],
    ['pink', 'Pink', 35],
    ['cyan', 'Cyan', 36],
    ['white', 'White', 37]
  ];

  const backgrounds = [
    ['', 'Default', 49],
    ['dark-blue', 'Dark blue', 40],
    ['orange', 'Orange', 41],
    ['gray', 'Gray', 42],
    ['blue-gray', 'Blue gray', 43],
    ['light-gray', 'Light gray', 44],
    ['indigo', 'Indigo', 45],
    ['light-gray-2', 'Light gray 2', 46],
    ['white', 'White', 47]
  ];

  const markdownSnippets = [
    ['Bold', '**Bold text**'],
    ['Italic', '*Italic text*'],
    ['Underline', '__Underlined text__'],
    ['Strikethrough', '~~Strikethrough~~'],
    ['Spoiler', '||Spoiler||'],
    ['Quote', '> Quote'],
    ['Heading 1', '# Heading'],
    ['Heading 2', '## Heading'],
    ['Subtext', '-# Small note'],
    ['Inline code', '`Inline code`'],
    ['Code block', '```js\nconsole.log(\"Core\");\n```'],
    ['Link', '[Link](https://example.com)'],
    ['List', '- First item\n- Second item'],
    ['Numbered list', '1. First item\n2. Second item'],
    ['Mention example', '<@123456789012345678>'],
    ['Channel example', '<#123456789012345678>']
  ];

  let language = FALLBACK_LANG;

  function savedLanguage() {
    const saved = localStorage.getItem('core-site-language');
    if (dictionaries[saved]) return saved;
    const browserLanguage = navigator.language?.toLowerCase() || '';
    if (browserLanguage.startsWith('uk')) return 'ua';
    if (browserLanguage.startsWith('de')) return 'de';
    if (browserLanguage.startsWith('en')) return 'en';
    return FALLBACK_LANG;
  }

  function t(key) {
    return dictionaries[language]?.[key] || dictionaries[FALLBACK_LANG][key] || key;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function dateValue(date = new Date()) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function timeValue(date = new Date()) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function unixFromInputs(root) {
    const date = root.querySelector('[data-tool-date]')?.value;
    const time = root.querySelector('[data-tool-time]')?.value || '00:00';
    if (!date) return Math.floor(Date.now() / 1000);
    const [year, month, day] = date.split('-').map(Number);
    const [hour = 0, minute = 0] = time.split(':').map(Number);
    return Math.floor(new Date(year, month - 1, day, hour, minute).getTime() / 1000);
  }

  function optionList(items, active = '') {
    return items.map(([key, label]) => `<option value="${key}" ${key === active ? 'selected' : ''}>${key ? label : t('noColor')}</option>`).join('');
  }

  function findCode(items, key) {
    return items.find((item) => item[0] === key)?.[2] || '';
  }

  function ansiValue(root) {
    const text = root.querySelector('[data-color-text]')?.value || 'Core message';
    const codes = [];
    if (root.querySelector('[data-color-bold]')?.checked) codes.push(1);
    if (root.querySelector('[data-color-underline]')?.checked) codes.push(4);
    const fg = findCode(colors, root.querySelector('[data-color-fg]')?.value || '');
    const bg = findCode(backgrounds, root.querySelector('[data-color-bg]')?.value || '');
    if (fg) codes.push(fg);
    if (bg) codes.push(bg);
    const prefix = codes.length ? `\u001b[${codes.join(';')}m` : '';
    return `\`\`\`ansi\n${prefix}${text}${prefix ? '\u001b[0m' : ''}\n\`\`\``;
  }

  function renderTimestamp(root) {
    const now = new Date();
    root.innerHTML = `
      <section class="section tool-hero compact-tool-hero">
        <div class="section-heading" data-reveal>
          <h1>${t('timestampTitle')}</h1>
          <p>${t('timestampCopy')}</p>
        </div>
        <a class="button secondary" href="../webhooks/">${t('openWebhook')}</a>
      </section>
      <section class="section discord-tool-grid">
        <div class="discord-tool-panel">
          <div class="rules-two">
            <label class="rules-field"><span>${t('date')}</span><input type="date" data-tool-date value="${dateValue(now)}"></label>
            <label class="rules-field"><span>${t('time')}</span><input type="time" data-tool-time value="${timeValue(now)}"></label>
          </div>
          <button type="button" class="button secondary" data-use-now>${t('now')}</button>
        </div>
        <div class="timestamp-results" data-timestamp-results></div>
      </section>
    `;
  }

  function updateTimestamp(root) {
    const unix = unixFromInputs(root);
    const results = root.querySelector('[data-timestamp-results]');
    if (!results) return;
    results.innerHTML = timestampStyles.map(([style, label]) => {
      const value = `<t:${unix}:${style}>`;
      return `
        <article class="timestamp-card">
          <div><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>
          <button type="button" data-copy-value="${escapeHtml(value)}">${t('copy')}</button>
        </article>
      `;
    }).join('');
  }

  function renderColor(root) {
    root.innerHTML = `
      <section class="section tool-hero compact-tool-hero">
        <div class="section-heading" data-reveal>
          <h1>${t('colorTitle')}</h1>
          <p>${t('colorCopy')}</p>
        </div>
        <a class="button secondary" href="../webhooks/">${t('openWebhook')}</a>
      </section>
      <section class="section discord-tool-grid">
        <div class="discord-tool-panel">
          <label class="rules-field"><span>${t('text')}</span><textarea rows="8" data-color-text>Core message</textarea></label>
          <div class="rules-two">
            <label class="rules-field"><span>${t('foreground')}</span><select data-color-fg>${optionList(colors, 'cyan')}</select></label>
            <label class="rules-field"><span>${t('background')}</span><select data-color-bg>${optionList(backgrounds)}</select></label>
          </div>
          <div class="rules-two">
            <label class="rules-check"><input type="checkbox" data-color-bold><span>${t('bold')}</span></label>
            <label class="rules-check"><input type="checkbox" data-color-underline><span>${t('underline')}</span></label>
          </div>
        </div>
        <div class="discord-tool-panel">
          <label class="rules-field"><span>${t('output')}</span><textarea rows="12" data-color-output readonly></textarea></label>
          <button type="button" class="button primary" data-copy-output>${t('copy')}</button>
        </div>
      </section>
    `;
  }

  function updateColor(root) {
    const output = root.querySelector('[data-color-output]');
    if (output) output.value = ansiValue(root);
  }

  function renderMarkdown(root) {
    root.innerHTML = `
      <section class="section tool-hero compact-tool-hero">
        <div class="section-heading" data-reveal>
          <h1>${t('markdownTitle')}</h1>
          <p>${t('markdownCopy')}</p>
        </div>
        <a class="button secondary" href="../webhooks/">${t('openWebhook')}</a>
      </section>
      <section class="section markdown-tool-list">
        ${markdownSnippets.map(([label, value], index) => `
          <article class="markdown-tool-card">
            <strong>${label}</strong>
            <pre>${escapeHtml(value)}</pre>
            <button type="button" data-copy-index="${index}">${t('copy')}</button>
          </article>
        `).join('')}
      </section>
    `;
  }

  function copyValue(value, button) {
    navigator.clipboard?.writeText(value).then(() => {
      const previous = button.textContent;
      button.textContent = t('copied');
      window.setTimeout(() => { button.textContent = previous; }, 1400);
    }).catch(() => {});
  }

  function render() {
    const root = document.querySelector('[data-discord-tool]');
    if (!root) return;
    language = savedLanguage();
    const kind = root.dataset.discordTool;
    if (kind === 'timestamp') {
      document.title = `Core - ${t('timestampTitle')}`;
      renderTimestamp(root);
      updateTimestamp(root);
    } else if (kind === 'color') {
      document.title = `Core - ${t('colorTitle')}`;
      renderColor(root);
      updateColor(root);
    } else {
      document.title = `Core - ${t('markdownTitle')}`;
      renderMarkdown(root);
    }
  }

  document.addEventListener('input', (event) => {
    const root = event.target.closest('[data-discord-tool]');
    if (!root) return;
    if (root.dataset.discordTool === 'timestamp') updateTimestamp(root);
    if (root.dataset.discordTool === 'color') updateColor(root);
  });

  document.addEventListener('change', (event) => {
    const root = event.target.closest('[data-discord-tool]');
    if (!root) return;
    if (root.dataset.discordTool === 'timestamp') updateTimestamp(root);
    if (root.dataset.discordTool === 'color') updateColor(root);
  });

  document.addEventListener('click', (event) => {
    const root = event.target.closest('[data-discord-tool]');
    if (!root) return;
    const button = event.target.closest('button');
    if (!button) return;
    if (button.matches('[data-use-now]')) {
      const now = new Date();
      root.querySelector('[data-tool-date]').value = dateValue(now);
      root.querySelector('[data-tool-time]').value = timeValue(now);
      updateTimestamp(root);
      return;
    }
    if (button.matches('[data-copy-output]')) {
      copyValue(root.querySelector('[data-color-output]')?.value || '', button);
      return;
    }
    if (button.dataset.copyIndex !== undefined) {
      copyValue(markdownSnippets[Number(button.dataset.copyIndex)]?.[1] || '', button);
      return;
    }
    if (button.dataset.copyValue !== undefined) {
      copyValue(button.dataset.copyValue, button);
    }
  });

  window.addEventListener('core-language-change', () => render());
  render();
})();
