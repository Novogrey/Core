(() => {
  const FALLBACK_LANG = 'ru';

  const text = {
    ru: {
      pageTitle: 'Core - редактор вебхуков',
      pageDescription: 'Деловой редактор Discord webhook-сообщений с фиксированным превью, лимитами Discord, несколькими сообщениями, embeds и Components V2.',
      eyebrow: 'Инструменты Core',
      title: 'Редактор вебхуков',
      copy: 'Соберите и отправьте одно или несколько webhook-сообщений. Справа закреплено Discord-превью, слева показаны настройки, список сообщений и фактическое заполнение лимитов.',
      openHelp: 'Справка по командам'
    },
    en: {
      pageTitle: 'Core - webhook builder',
      pageDescription: 'A business-grade Discord webhook editor with fixed preview, Discord limits, multiple messages, embeds and Components V2.',
      eyebrow: 'Core tools',
      title: 'Webhook builder',
      copy: 'Create and send one or more webhook messages. The Discord preview stays pinned on the right, while settings, message list and limit usage stay on the left.',
      openHelp: 'Command help'
    },
    ua: {
      pageTitle: 'Core - редактор вебхуків',
      pageDescription: 'Діловий редактор Discord webhook-повідомлень із закріпленим превью, лімітами Discord, кількома повідомленнями, embeds і Components V2.',
      eyebrow: 'Інструменти Core',
      title: 'Редактор вебхуків',
      copy: 'Створіть і надішліть одне або кілька webhook-повідомлень. Discord-превью закріплене праворуч, а налаштування, список повідомлень і заповнення лімітів залишаються ліворуч.',
      openHelp: 'Довідка команд'
    },
    de: {
      pageTitle: 'Core - Webhook Builder',
      pageDescription: 'Ein sachlicher Discord-Webhook-Editor mit fester Vorschau, Discord-Limits, mehreren Nachrichten, Embeds und Components V2.',
      eyebrow: 'Core tools',
      title: 'Webhook Builder',
      copy: 'Erstelle und sende eine oder mehrere Webhook-Nachrichten. Die Discord-Vorschau bleibt rechts fixiert, links bleiben Einstellungen, Nachrichtenliste und Limit-Auslastung sichtbar.',
      openHelp: 'Befehlshilfe'
    }
  };

  let language = FALLBACK_LANG;

  function getSavedLanguage() {
    const saved = localStorage.getItem('core-site-language');
    if (text[saved]) return saved;
    const browserLanguage = navigator.language?.toLowerCase() || '';
    if (browserLanguage.startsWith('uk')) return 'ua';
    if (browserLanguage.startsWith('de')) return 'de';
    if (browserLanguage.startsWith('en')) return 'en';
    return FALLBACK_LANG;
  }

  function t(key) {
    return text[language]?.[key] || text[FALLBACK_LANG][key] || key;
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
      node.textContent = t(key);
    });
  }

  window.addEventListener('core-language-change', (event) => {
    applyLanguage(event.detail?.language || getSavedLanguage());
  });

  applyLanguage(getSavedLanguage());
})();
