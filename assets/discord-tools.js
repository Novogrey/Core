(() => {
  const FALLBACK_LANG = 'ru';
  const USER_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const DEFAULT_TEXT = 'Core helps you build a cleaner Discord server.';

  const dictionaries = {
    ru: {
      timestampTitle: 'Генератор Discord Timestamp',
      colorTitle: 'Генератор цветного текста',
      markdownTitle: 'Генератор Discord Markdown',
      date: 'Дата',
      time: 'Время',
      timezone: 'Часовой пояс',
      format: 'Формат',
      now: 'Сейчас',
      copy: 'Скопировать',
      copied: 'Скопировано',
      output: 'Готовый код',
      preview: 'Превью Discord',
      text: 'Текст',
      foreground: 'Цвет текста',
      background: 'Фон',
      bold: 'Жирный',
      underline: 'Подчеркнутый',
      applySelection: 'Применить к выделению',
      clearStyles: 'Очистить стили',
      noColor: 'Без цвета',
      markdownAction: 'Действие',
      applyMarkdown: 'Применить к выделению',
      rawMarkdown: 'Markdown',
      openWebhook: 'Открыть редактор вебхуков',
      stylesApplied: 'Стили применены к выделенному тексту.',
      selectHint: 'Если ничего не выделено, действие применится ко всему тексту.',
      timestampFormats: {
        t: 'Короткое время',
        T: 'Полное время',
        d: 'Короткая дата',
        D: 'Полная дата',
        f: 'Дата и время',
        F: 'Полная дата и время',
        R: 'Относительно'
      },
      colors: {
        default: 'По умолчанию',
        gray: 'Серый',
        red: 'Красный',
        green: 'Зеленый',
        yellow: 'Желтый',
        blue: 'Синий',
        pink: 'Розовый',
        cyan: 'Голубой',
        white: 'Белый',
        orange: 'Оранжевый',
        darkBlue: 'Темно-синий',
        blueGray: 'Сине-серый',
        indigo: 'Индиго'
      },
      markdownTools: {
        bold: 'Жирный',
        italic: 'Курсив',
        underline: 'Подчеркнутый',
        strike: 'Зачеркнутый',
        spoiler: 'Спойлер',
        quote: 'Цитата',
        heading1: 'Заголовок 1',
        heading2: 'Заголовок 2',
        subtext: 'Мелкий текст',
        inlineCode: 'Код в строке',
        codeBlock: 'Блок кода',
        link: 'Ссылка',
        bullet: 'Список',
        number: 'Нумерация'
      }
    },
    en: {
      timestampTitle: 'Discord Timestamp Generator',
      colorTitle: 'Colored Text Generator',
      markdownTitle: 'Discord Markdown Generator',
      date: 'Date',
      time: 'Time',
      timezone: 'Time zone',
      format: 'Format',
      now: 'Now',
      copy: 'Copy',
      copied: 'Copied',
      output: 'Ready code',
      preview: 'Discord preview',
      text: 'Text',
      foreground: 'Text color',
      background: 'Background',
      bold: 'Bold',
      underline: 'Underline',
      applySelection: 'Apply to selection',
      clearStyles: 'Clear styles',
      noColor: 'No color',
      markdownAction: 'Action',
      applyMarkdown: 'Apply to selection',
      rawMarkdown: 'Markdown',
      openWebhook: 'Open webhook editor',
      stylesApplied: 'Styles applied to the selected text.',
      selectHint: 'If nothing is selected, the action applies to the whole text.',
      timestampFormats: {
        t: 'Short time',
        T: 'Long time',
        d: 'Short date',
        D: 'Long date',
        f: 'Date and time',
        F: 'Full date and time',
        R: 'Relative'
      },
      colors: {
        default: 'Default',
        gray: 'Gray',
        red: 'Red',
        green: 'Green',
        yellow: 'Yellow',
        blue: 'Blue',
        pink: 'Pink',
        cyan: 'Cyan',
        white: 'White',
        orange: 'Orange',
        darkBlue: 'Dark blue',
        blueGray: 'Blue gray',
        indigo: 'Indigo'
      },
      markdownTools: {
        bold: 'Bold',
        italic: 'Italic',
        underline: 'Underline',
        strike: 'Strikethrough',
        spoiler: 'Spoiler',
        quote: 'Quote',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        subtext: 'Subtext',
        inlineCode: 'Inline code',
        codeBlock: 'Code block',
        link: 'Link',
        bullet: 'Bullet list',
        number: 'Numbered list'
      }
    },
    ua: {
      timestampTitle: 'Генератор Discord Timestamp',
      colorTitle: 'Генератор кольорового тексту',
      markdownTitle: 'Генератор Discord Markdown',
      date: 'Дата',
      time: 'Час',
      timezone: 'Часовий пояс',
      format: 'Формат',
      now: 'Зараз',
      copy: 'Скопіювати',
      copied: 'Скопійовано',
      output: 'Готовий код',
      preview: 'Превʼю Discord',
      text: 'Текст',
      foreground: 'Колір тексту',
      background: 'Фон',
      bold: 'Жирний',
      underline: 'Підкреслений',
      applySelection: 'Застосувати до виділення',
      clearStyles: 'Очистити стилі',
      noColor: 'Без кольору',
      markdownAction: 'Дія',
      applyMarkdown: 'Застосувати до виділення',
      rawMarkdown: 'Markdown',
      openWebhook: 'Відкрити редактор вебхуків',
      stylesApplied: 'Стилі застосовано до виділеного тексту.',
      selectHint: 'Якщо нічого не виділено, дія застосовується до всього тексту.',
      timestampFormats: {
        t: 'Короткий час',
        T: 'Повний час',
        d: 'Коротка дата',
        D: 'Повна дата',
        f: 'Дата і час',
        F: 'Повна дата і час',
        R: 'Відносно'
      },
      colors: {
        default: 'За замовчуванням',
        gray: 'Сірий',
        red: 'Червоний',
        green: 'Зелений',
        yellow: 'Жовтий',
        blue: 'Синій',
        pink: 'Рожевий',
        cyan: 'Блакитний',
        white: 'Білий',
        orange: 'Помаранчевий',
        darkBlue: 'Темно-синій',
        blueGray: 'Синьо-сірий',
        indigo: 'Індиго'
      },
      markdownTools: {
        bold: 'Жирний',
        italic: 'Курсив',
        underline: 'Підкреслений',
        strike: 'Закреслений',
        spoiler: 'Спойлер',
        quote: 'Цитата',
        heading1: 'Заголовок 1',
        heading2: 'Заголовок 2',
        subtext: 'Дрібний текст',
        inlineCode: 'Код у рядку',
        codeBlock: 'Блок коду',
        link: 'Посилання',
        bullet: 'Список',
        number: 'Нумерація'
      }
    },
    de: {
      timestampTitle: 'Discord Timestamp Generator',
      colorTitle: 'Generator Für Farbigen Text',
      markdownTitle: 'Discord Markdown Generator',
      date: 'Datum',
      time: 'Uhrzeit',
      timezone: 'Zeitzone',
      format: 'Format',
      now: 'Jetzt',
      copy: 'Kopieren',
      copied: 'Kopiert',
      output: 'Fertiger Code',
      preview: 'Discord-Vorschau',
      text: 'Text',
      foreground: 'Textfarbe',
      background: 'Hintergrund',
      bold: 'Fett',
      underline: 'Unterstrichen',
      applySelection: 'Auf Auswahl anwenden',
      clearStyles: 'Stile löschen',
      noColor: 'Keine Farbe',
      markdownAction: 'Aktion',
      applyMarkdown: 'Auf Auswahl anwenden',
      rawMarkdown: 'Markdown',
      openWebhook: 'Webhook-Editor öffnen',
      stylesApplied: 'Stile auf die Auswahl angewendet.',
      selectHint: 'Wenn nichts markiert ist, gilt die Aktion für den ganzen Text.',
      timestampFormats: {
        t: 'Kurze Zeit',
        T: 'Lange Zeit',
        d: 'Kurzes Datum',
        D: 'Langes Datum',
        f: 'Datum und Zeit',
        F: 'Volles Datum und Zeit',
        R: 'Relativ'
      },
      colors: {
        default: 'Standard',
        gray: 'Grau',
        red: 'Rot',
        green: 'Grün',
        yellow: 'Gelb',
        blue: 'Blau',
        pink: 'Rosa',
        cyan: 'Cyan',
        white: 'Weiß',
        orange: 'Orange',
        darkBlue: 'Dunkelblau',
        blueGray: 'Blaugrau',
        indigo: 'Indigo'
      },
      markdownTools: {
        bold: 'Fett',
        italic: 'Kursiv',
        underline: 'Unterstrichen',
        strike: 'Durchgestrichen',
        spoiler: 'Spoiler',
        quote: 'Zitat',
        heading1: 'Überschrift 1',
        heading2: 'Überschrift 2',
        subtext: 'Kleiner Text',
        inlineCode: 'Inline-Code',
        codeBlock: 'Codeblock',
        link: 'Link',
        bullet: 'Liste',
        number: 'Nummerierung'
      }
    }
  };

  const timestampStyles = ['t', 'T', 'd', 'D', 'f', 'F', 'R'];
  const foregrounds = [
    ['', 'default', 39, 'inherit'],
    ['gray', 'gray', 30, '#7f8c98'],
    ['red', 'red', 31, '#ff5f56'],
    ['green', 'green', 32, '#27c93f'],
    ['yellow', 'yellow', 33, '#ffbd2e'],
    ['blue', 'blue', 34, '#579dff'],
    ['pink', 'pink', 35, '#ff7ad9'],
    ['cyan', 'cyan', 36, '#44b8de'],
    ['white', 'white', 37, '#f2f5f8']
  ];
  const backgrounds = [
    ['', 'default', 49, 'transparent'],
    ['dark-blue', 'darkBlue', 40, '#101827'],
    ['orange', 'orange', 41, '#5c2b12'],
    ['gray', 'gray', 42, '#293241'],
    ['blue-gray', 'blueGray', 43, '#243447'],
    ['indigo', 'indigo', 45, '#2e254d'],
    ['white', 'white', 47, '#dce3ea']
  ];
  const markdownActions = {
    bold: (text) => `**${text}**`,
    italic: (text) => `*${text}*`,
    underline: (text) => `__${text}__`,
    strike: (text) => `~~${text}~~`,
    spoiler: (text) => `||${text}||`,
    quote: (text) => text.split('\n').map((line) => `> ${line || ' '}`).join('\n'),
    heading1: (text) => `# ${text}`,
    heading2: (text) => `## ${text}`,
    subtext: (text) => `-# ${text}`,
    inlineCode: (text) => `\`${text}\``,
    codeBlock: (text) => `\`\`\`\n${text}\n\`\`\``,
    link: (text) => `[${text || 'Link'}](https://example.com)`,
    bullet: (text) => text.split('\n').map((line) => `- ${line || 'item'}`).join('\n'),
    number: (text) => text.split('\n').map((line, index) => `${index + 1}. ${line || 'item'}`).join('\n')
  };

  let language = getSavedLanguage();
  let toastTimer = null;

  function getSavedLanguage() {
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

  function formatParts(date, timeZone) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).formatToParts(date).reduce((acc, part) => {
      if (part.type !== 'literal') acc[part.type] = part.value;
      return acc;
    }, {});

    return {
      date: `${parts.year}-${parts.month}-${parts.day}`,
      time: `${parts.hour === '24' ? '00' : parts.hour}:${parts.minute}`
    };
  }

  function zonedTimeToUnix(dateValue, timeValue, timeZone) {
    if (!dateValue) return Math.floor(Date.now() / 1000);
    const [year, month, day] = dateValue.split('-').map(Number);
    const [hour = 0, minute = 0] = (timeValue || '00:00').split(':').map(Number);
    let guess = Date.UTC(year, month - 1, day, hour, minute);

    for (let index = 0; index < 3; index += 1) {
      const parts = formatParts(new Date(guess), timeZone);
      const [pYear, pMonth, pDay] = parts.date.split('-').map(Number);
      const [pHour, pMinute] = parts.time.split(':').map(Number);
      const wanted = Date.UTC(year, month - 1, day, hour, minute);
      const actual = Date.UTC(pYear, pMonth - 1, pDay, pHour, pMinute);
      guess += wanted - actual;
    }

    return Math.floor(guess / 1000);
  }

  function timezoneOptions(active) {
    const fallback = [
      'UTC',
      USER_TIME_ZONE,
      'Europe/Berlin',
      'Europe/Kyiv',
      'Europe/London',
      'Europe/Paris',
      'America/New_York',
      'America/Chicago',
      'America/Los_Angeles',
      'America/Sao_Paulo',
      'Asia/Dubai',
      'Asia/Tokyo',
      'Asia/Seoul',
      'Asia/Shanghai',
      'Australia/Sydney'
    ];
    const values = typeof Intl.supportedValuesOf === 'function'
      ? Intl.supportedValuesOf('timeZone')
      : fallback;
    const unique = [...new Set([USER_TIME_ZONE, 'UTC', ...values])].filter(Boolean);
    return unique.map((zone) => `<option value="${escapeHtml(zone)}" ${zone === active ? 'selected' : ''}>${escapeHtml(zone)}</option>`).join('');
  }

  function showToast(message) {
    let toast = document.querySelector('[data-tool-toast]');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.dataset.toolToast = 'true';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1700);
  }

  function copyText(value) {
    navigator.clipboard?.writeText(value).then(() => showToast(t('copied'))).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showToast(t('copied'));
    });
  }

  function selectedRange(textarea) {
    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? start;
    if (start === end) return { start: 0, end: textarea.value.length };
    return { start, end };
  }

  function optionList(items, active = '') {
    return items.map(([key, labelKey]) => (
      `<option value="${escapeHtml(key)}" ${key === active ? 'selected' : ''}>${escapeHtml(key ? t('colors')[labelKey] : t('noColor'))}</option>`
    )).join('');
  }

  function colorByKey(items, key) {
    return items.find((item) => item[0] === key) || items[0];
  }

  function styleForSegment(segment) {
    const fg = colorByKey(foregrounds, segment.fg);
    const bg = colorByKey(backgrounds, segment.bg);
    return [
      fg[3] !== 'inherit' ? `color:${fg[3]}` : '',
      bg[3] !== 'transparent' ? `background:${bg[3]}` : '',
      segment.bold ? 'font-weight:800' : '',
      segment.underline ? 'text-decoration:underline' : ''
    ].filter(Boolean).join(';');
  }

  function segmentText(text, marks) {
    const boundaries = new Set([0, text.length]);
    marks.forEach((mark) => {
      boundaries.add(Math.max(0, Math.min(text.length, mark.start)));
      boundaries.add(Math.max(0, Math.min(text.length, mark.end)));
    });
    const sorted = [...boundaries].sort((a, b) => a - b);

    return sorted.slice(0, -1).map((start, index) => {
      const end = sorted[index + 1];
      const active = marks.filter((mark) => mark.start < end && mark.end > start).at(-1) || {};
      return {
        text: text.slice(start, end),
        fg: active.fg || '',
        bg: active.bg || '',
        bold: Boolean(active.bold),
        underline: Boolean(active.underline)
      };
    }).filter((segment) => segment.text);
  }

  function ansiForSegments(segments) {
    return `\`\`\`ansi\n${segments.map((segment) => {
      const codes = [];
      if (segment.bold) codes.push(1);
      if (segment.underline) codes.push(4);
      const fg = colorByKey(foregrounds, segment.fg)[2];
      const bg = colorByKey(backgrounds, segment.bg)[2];
      if (fg && fg !== 39) codes.push(fg);
      if (bg && bg !== 49) codes.push(bg);
      const prefix = codes.length ? `\u001b[${codes.join(';')}m` : '';
      return `${prefix}${segment.text}${prefix ? '\u001b[0m' : ''}`;
    }).join('')}\n\`\`\``;
  }

  function renderDiscordText(value) {
    let html = escapeHtml(value);
    html = html.replace(/```([\s\S]*?)```/g, '<pre>$1</pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^\-# (.+)$/gm, '<small>$1</small>');
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
    html = html.replace(/\|\|(.+?)\|\|/g, '<span class="discord-spoiler">$1</span>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<u>$1</u>');
    html = html.replace(/~~(.+?)~~/g, '<s>$1</s>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
    html = html.replace(/^- (.+)$/gm, '<div class="discord-list-line">• $1</div>');
    html = html.replace(/^\d+\. (.+)$/gm, '<div class="discord-list-line">$&</div>');
    return html.replace(/\n/g, '<br>');
  }

  function renderTimestamp(root) {
    const nowParts = formatParts(new Date(), USER_TIME_ZONE);
    root.innerHTML = `
      <section class="section tool-hero compact-tool-hero">
        <div class="section-heading" data-reveal>
          <h1>${escapeHtml(t('timestampTitle'))}</h1>
        </div>
        <a class="button secondary" href="../webhooks/">${escapeHtml(t('openWebhook'))}</a>
      </section>
      <section class="section discord-tool-grid advanced-tool-grid">
        <div class="discord-tool-panel">
          <div class="rules-two">
            <label class="rules-field"><span>${escapeHtml(t('date'))}</span><input type="date" data-tool-date value="${escapeHtml(nowParts.date)}"></label>
            <label class="rules-field"><span>${escapeHtml(t('time'))}</span><input type="time" data-tool-time value="${escapeHtml(nowParts.time)}"></label>
          </div>
          <label class="rules-field"><span>${escapeHtml(t('timezone'))}</span><select data-tool-timezone>${timezoneOptions(USER_TIME_ZONE)}</select></label>
          <label class="rules-field"><span>${escapeHtml(t('format'))}</span><select data-tool-style>${timestampStyles.map((style) => `<option value="${style}" ${style === 'F' ? 'selected' : ''}>${escapeHtml(t('timestampFormats')[style])}</option>`).join('')}</select></label>
          <div class="tool-actions">
            <button type="button" class="button secondary" data-use-now>${escapeHtml(t('now'))}</button>
            <button type="button" class="button primary" data-copy-output>${escapeHtml(t('copy'))}</button>
          </div>
        </div>
        <div class="discord-tool-panel tool-output-panel">
          <h2>${escapeHtml(t('preview'))}</h2>
          <div class="timestamp-results" data-timestamp-results></div>
          <label class="rules-field"><span>${escapeHtml(t('output'))}</span><input type="text" data-tool-output readonly></label>
        </div>
      </section>
    `;

    const update = () => {
      const date = root.querySelector('[data-tool-date]').value;
      const time = root.querySelector('[data-tool-time]').value;
      const zone = root.querySelector('[data-tool-timezone]').value || USER_TIME_ZONE;
      const style = root.querySelector('[data-tool-style]').value || 'F';
      const unix = zonedTimeToUnix(date, time, zone);
      const code = `<t:${unix}:${style}>`;
      const selectedDate = new Date(unix * 1000);
      const locale = language === 'ua' ? 'uk' : language;

      root.querySelector('[data-tool-output]').value = code;
      root.querySelector('[data-timestamp-results]').innerHTML = timestampStyles.map((item) => {
        const formatted = item === 'R'
          ? code
          : new Intl.DateTimeFormat(locale, {
            dateStyle: ['d', 'D', 'f', 'F'].includes(item) ? (item === 'd' ? 'short' : 'full') : undefined,
            timeStyle: ['t', 'T', 'f', 'F'].includes(item) ? (item === 'T' ? 'medium' : 'short') : undefined,
            timeZone: zone
          }).format(selectedDate);
        return `
          <div class="timestamp-card ${item === style ? 'is-active' : ''}">
            <div><strong>&lt;t:${unix}:${item}&gt;</strong><span>${escapeHtml(t('timestampFormats')[item])}</span></div>
            <code>${escapeHtml(item === 'R' ? `<t:${unix}:R>` : formatted)}</code>
          </div>
        `;
      }).join('');
    };

    root.addEventListener('input', update);
    root.addEventListener('change', update);
    root.querySelector('[data-use-now]').addEventListener('click', () => {
      const zone = root.querySelector('[data-tool-timezone]').value || USER_TIME_ZONE;
      const parts = formatParts(new Date(), zone);
      root.querySelector('[data-tool-date]').value = parts.date;
      root.querySelector('[data-tool-time]').value = parts.time;
      update();
    });
    root.querySelector('[data-copy-output]').addEventListener('click', () => copyText(root.querySelector('[data-tool-output]').value));
    update();
  }

  function renderColor(root) {
    root.__colorState = { text: DEFAULT_TEXT, marks: [] };
    root.innerHTML = `
      <section class="section tool-hero compact-tool-hero">
        <div class="section-heading" data-reveal><h1>${escapeHtml(t('colorTitle'))}</h1></div>
        <a class="button secondary" href="../webhooks/">${escapeHtml(t('openWebhook'))}</a>
      </section>
      <section class="section discord-tool-grid advanced-tool-grid">
        <div class="discord-tool-panel">
          <label class="rules-field"><span>${escapeHtml(t('text'))}</span><textarea rows="8" data-color-text>${escapeHtml(DEFAULT_TEXT)}</textarea></label>
          <div class="rules-two">
            <label class="rules-field"><span>${escapeHtml(t('foreground'))}</span><select data-color-fg>${optionList(foregrounds, 'cyan')}</select></label>
            <label class="rules-field"><span>${escapeHtml(t('background'))}</span><select data-color-bg>${optionList(backgrounds, '')}</select></label>
          </div>
          <div class="tool-toggle-row">
            <label><input type="checkbox" data-color-bold> ${escapeHtml(t('bold'))}</label>
            <label><input type="checkbox" data-color-underline> ${escapeHtml(t('underline'))}</label>
          </div>
          <p class="tool-note">${escapeHtml(t('selectHint'))}</p>
          <div class="tool-actions">
            <button type="button" class="button primary" data-apply-color>${escapeHtml(t('applySelection'))}</button>
            <button type="button" class="button secondary" data-clear-color>${escapeHtml(t('clearStyles'))}</button>
          </div>
        </div>
        <div class="discord-tool-panel tool-output-panel">
          <h2>${escapeHtml(t('preview'))}</h2>
          <div class="discord-color-preview" data-color-preview></div>
          <label class="rules-field"><span>${escapeHtml(t('output'))}</span><textarea rows="7" data-color-output readonly></textarea></label>
          <button type="button" class="button primary" data-copy-color>${escapeHtml(t('copy'))}</button>
        </div>
      </section>
    `;

    const textarea = root.querySelector('[data-color-text]');
    const update = () => {
      const state = root.__colorState;
      const segments = segmentText(state.text, state.marks);
      root.querySelector('[data-color-preview]').innerHTML = segments.map((segment) => (
        `<span style="${escapeHtml(styleForSegment(segment))}">${escapeHtml(segment.text)}</span>`
      )).join('').replace(/\n/g, '<br>');
      root.querySelector('[data-color-output]').value = ansiForSegments(segments);
    };

    textarea.addEventListener('input', () => {
      root.__colorState = { text: textarea.value, marks: [] };
      update();
    });
    root.querySelector('[data-apply-color]').addEventListener('click', () => {
      const range = selectedRange(textarea);
      if (range.end <= range.start) return;
      root.__colorState.text = textarea.value;
      root.__colorState.marks.push({
        ...range,
        fg: root.querySelector('[data-color-fg]').value,
        bg: root.querySelector('[data-color-bg]').value,
        bold: root.querySelector('[data-color-bold]').checked,
        underline: root.querySelector('[data-color-underline]').checked
      });
      update();
      showToast(t('stylesApplied'));
    });
    root.querySelector('[data-clear-color]').addEventListener('click', () => {
      root.__colorState = { text: textarea.value, marks: [] };
      update();
    });
    root.querySelector('[data-copy-color]').addEventListener('click', () => copyText(root.querySelector('[data-color-output]').value));
    update();
  }

  function renderMarkdown(root) {
    root.innerHTML = `
      <section class="section tool-hero compact-tool-hero">
        <div class="section-heading" data-reveal><h1>${escapeHtml(t('markdownTitle'))}</h1></div>
        <a class="button secondary" href="../webhooks/">${escapeHtml(t('openWebhook'))}</a>
      </section>
      <section class="section discord-tool-grid advanced-tool-grid">
        <div class="discord-tool-panel">
          <label class="rules-field"><span>${escapeHtml(t('rawMarkdown'))}</span><textarea rows="10" data-markdown-text>${escapeHtml(DEFAULT_TEXT)}</textarea></label>
          <div class="rules-two">
            <label class="rules-field"><span>${escapeHtml(t('markdownAction'))}</span><select data-markdown-action>${Object.keys(markdownActions).map((key) => `<option value="${key}">${escapeHtml(t('markdownTools')[key])}</option>`).join('')}</select></label>
            <div class="tool-actions is-bottom"><button type="button" class="button primary" data-apply-markdown>${escapeHtml(t('applyMarkdown'))}</button></div>
          </div>
          <div class="markdown-toolbar">${Object.keys(markdownActions).map((key) => `<button type="button" data-markdown-quick="${key}">${escapeHtml(t('markdownTools')[key])}</button>`).join('')}</div>
          <p class="tool-note">${escapeHtml(t('selectHint'))}</p>
        </div>
        <div class="discord-tool-panel tool-output-panel">
          <h2>${escapeHtml(t('preview'))}</h2>
          <div class="discord-markdown-preview" data-markdown-preview></div>
          <button type="button" class="button primary" data-copy-markdown>${escapeHtml(t('copy'))}</button>
        </div>
      </section>
    `;

    const textarea = root.querySelector('[data-markdown-text]');
    const apply = (action) => {
      const range = selectedRange(textarea);
      const source = textarea.value;
      const selected = source.slice(range.start, range.end) || 'text';
      const replacement = markdownActions[action](selected);
      textarea.value = `${source.slice(0, range.start)}${replacement}${source.slice(range.end)}`;
      textarea.focus();
      textarea.setSelectionRange(range.start, range.start + replacement.length);
      update();
    };
    const update = () => {
      root.querySelector('[data-markdown-preview]').innerHTML = renderDiscordText(textarea.value);
    };

    textarea.addEventListener('input', update);
    root.querySelector('[data-apply-markdown]').addEventListener('click', () => apply(root.querySelector('[data-markdown-action]').value));
    root.querySelector('.markdown-toolbar').addEventListener('click', (event) => {
      const button = event.target.closest('[data-markdown-quick]');
      if (button) apply(button.dataset.markdownQuick);
    });
    root.querySelector('[data-copy-markdown]').addEventListener('click', () => copyText(textarea.value));
    update();
  }

  function renderAll() {
    document.querySelectorAll('[data-discord-tool]').forEach((root) => {
      const tool = root.dataset.discordTool;
      if (tool === 'timestamp') renderTimestamp(root);
      if (tool === 'color') renderColor(root);
      if (tool === 'markdown') renderMarkdown(root);
    });
  }

  window.addEventListener('core-language-change', (event) => {
    language = dictionaries[event.detail?.language] ? event.detail.language : getSavedLanguage();
    renderAll();
  });

  renderAll();
})();
