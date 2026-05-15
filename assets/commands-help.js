(() => {
  const FALLBACK_LANG = 'ru';

  const labels = {
    ru: {
      pageTitle: 'Core - справка по командам',
      pageDescription: 'Подробная справка по публичным командам Core с Discord-симуляцией.',
      eyebrow: 'Core guide',
      title: 'Справка по публичным командам',
      copy: 'Открой любую функцию и посмотри, как команда выглядит в Discord: ввод, ответ Core, результат и ограничения доступа.',
      openWebhooks: 'Создать вебхук',
      searchLabel: 'Поиск',
      searchPlaceholder: '/server-import',
      livePreview: 'Live preview',
      ownerLabel: 'Владелец',
      usageTitle: 'Использование',
      accessTitle: 'Доступ',
      paramsTitle: 'Параметры',
      resultTitle: 'Результат',
      all: 'Все',
      noParams: 'Параметров нет.',
      empty: 'Ничего не найдено.',
      botThinking: 'Core выполняет команду...',
      categories: {
        templates: 'Шаблоны',
        transfer: 'Перенос сервера',
        rolesRules: 'Роли и правила',
        catalog: 'Каталог',
        suggestions: 'Предложения',
        support: 'Связь'
      },
      commands: {
        templateList: {
          category: 'templates',
          command: '/template list',
          label: 'Список шаблонов',
          title: 'Показывает публичные заготовки',
          summary: 'Открывает список серверных шаблонов, которые можно заранее посмотреть или применить через импорт.',
          access: 'Доступно всем участникам сервера.',
          usage: ['/template list'],
          params: ['Без параметров.'],
          result: 'Core отправляет компактный список доступных серверных заготовок.',
          previewKind: 'templates',
          previewCopy: 'Найдено 12 публичных заготовок. Можно открыть превью или импортировать через /server-import.',
          artifact: { type: 'tree', rows: ['# минималистичный-community', '# gaming-hub', '# creator-studio'] },
          steps: ['Читает публичный каталог', 'Группирует заготовки', 'Отправляет список в Discord']
        },
        templatePreview: {
          category: 'templates',
          command: '/template preview name:minimalistic-community-server',
          label: 'Превью шаблона',
          title: 'Показывает структуру до применения',
          summary: 'Раскрывает роли, категории, каналы и ключевые настройки выбранной публичной заготовки.',
          access: 'Доступно всем участникам сервера.',
          usage: ['/template preview name:<template>'],
          params: ['name - название публичного шаблона.'],
          result: 'Появляется Discord-превью структуры, чтобы владелец заранее видел объём изменений.',
          previewKind: 'preview',
          previewCopy: 'Core показывает каналы по категориям и отдельную кнопку расширенного просмотра.',
          artifact: { type: 'tree', rows: ['╭─〔 Общение 〕', '# чат', '# медиа', '🔊 общий-гк'] },
          steps: ['Загружает шаблон', 'Сортирует роли и каналы', 'Рисует превью']
        },
        serverImport: {
          category: 'transfer',
          command: '/server-import template:minimalistic-community-server delete_existing:false',
          label: 'Импорт сервера',
          title: 'Создаёт структуру из JSON или публичного шаблона',
          summary: 'Переносит роли, каналы, категории, права и настройки. Перед применением сохраняет временный откат.',
          access: 'Только владелец сервера. Разработчик Core может использовать на любом сервере.',
          usage: ['/server-import file:<json> delete_existing:<true|false>', '/server-import template:<template> delete_existing:<true|false>'],
          params: ['file - закодированный JSON сервера.', 'template - публичная заготовка.', 'delete_existing - удалить текущие роли и каналы перед созданием.'],
          result: 'После подтверждения Core создаёт структуру и оставляет откат на один час.',
          previewKind: 'import',
          previewCopy: 'Перед импортом Core показывает подтверждение и сохраняет снимок сервера.',
          artifact: { type: 'tasks', rows: ['Снимок сохранён', 'Роли созданы сверху вниз', 'Каналы распределены по категориям'] },
          steps: ['Проверяет владельца', 'Сохраняет откат', 'Создаёт роли и каналы']
        },
        serverExport: {
          category: 'transfer',
          command: '/server-export',
          label: 'Экспорт сервера',
          title: 'Выгружает структуру сервера',
          summary: 'Собирает роли, каналы, категории, права и настройки сервера в закодированный JSON-файл.',
          access: 'Только владелец сервера. Разработчик Core может использовать на любом сервере.',
          usage: ['/server-export'],
          params: ['Без параметров.'],
          result: 'В ответе Discord появляется JSON-файл, который можно импортировать через Core.',
          previewKind: 'file',
          previewCopy: 'Core создаёт файл server-config.json и прикрепляет его к ответу.',
          artifact: { type: 'file', name: 'server-config.json', meta: 'roles: 7 • channels: 42 • settings: saved' },
          steps: ['Считывает роли', 'Считывает каналы и права', 'Прикрепляет JSON']
        },
        serverRollback: {
          category: 'transfer',
          command: '/server-rollback',
          label: 'Откат сервера',
          title: 'Возвращает сервер к последнему снимку',
          summary: 'Использует временную резервную копию, которая создаётся перед импортом или применением шаблона.',
          access: 'Только владелец сервера.',
          usage: ['/server-rollback'],
          params: ['Без параметров.'],
          result: 'Если час ещё не прошёл, Core восстанавливает роли, каналы и настройки из снимка.',
          previewKind: 'rollback',
          previewCopy: 'Core показывает подтверждение и предупреждает, когда снимок уже истёк.',
          artifact: { type: 'tasks', rows: ['Снимок найден', 'Подтверждение получено', 'Структура восстановлена'] },
          steps: ['Ищет активный снимок', 'Показывает подтверждение', 'Восстанавливает сервер']
        },
        rolesJson: {
          category: 'rolesRules',
          command: '/roles-json export',
          label: 'Роли через JSON',
          title: 'Переносит роли отдельно',
          summary: 'Экспортирует роли в закодированный JSON или создаёт их из файла/публичного набора ролей.',
          access: 'Только владелец сервера.',
          usage: ['/roles-json export', '/roles-json import file:<json>', '/roles-json import template:<name>'],
          params: ['file - закодированный JSON ролей.', 'template - публичный набор ролей.'],
          result: 'Можно перенести роли без полного пересоздания серверной структуры.',
          previewKind: 'roles',
          previewCopy: 'Core сохраняет порядок ролей и базовые настройки: цвет, права, hoist и mentionable.',
          artifact: { type: 'roles', rows: ['◆ Founder', '✦ Admin', '◇ Moderator', 'Member'] },
          steps: ['Фильтрует системные роли', 'Кодирует JSON', 'Создаёт роли по порядку']
        },
        rulesImport: {
          category: 'rolesRules',
          command: '/rules-import template:community-rules channel:#rules',
          label: 'Импорт правил',
          title: 'Публикует шаблон правил',
          summary: 'Отправляет один или несколько сообщений с правилами из закодированного JSON или публичного шаблона.',
          access: 'Только владелец сервера.',
          usage: ['/rules-import file:<json> channel:<channel>', '/rules-import template:<name> channel:<channel>'],
          params: ['file - закодированный JSON правил.', 'template - публичный шаблон правил.', 'channel - канал для публикации.'],
          result: 'В выбранном канале появляются готовые сообщения правил с сохранённым оформлением.',
          previewKind: 'rules',
          previewCopy: 'Core сохраняет текст, embeds и Components V2 структуру правил.',
          artifact: { type: 'messages', rows: ['Правила сервера', 'Безопасность аккаунта', 'Модерация и апелляции'] },
          steps: ['Проверяет шаблон', 'Делит по лимитам Discord', 'Отправляет сообщения']
        },
        rulesExport: {
          category: 'rolesRules',
          command: 'ПКМ по сообщению → Экспорт правил JSON',
          label: 'Экспорт правил ПКМ',
          title: 'Выгружает сообщение правил',
          summary: 'Контекстная команда сохраняет выбранное сообщение правил в закодированный JSON.',
          access: 'Только владелец сервера.',
          usage: ['ПКМ по сообщению → Приложения → Экспорт правил JSON'],
          params: ['Выбирается сообщение, которое нужно перенести.'],
          result: 'Core отправляет владельцу JSON-файл для последующего импорта.',
          previewKind: 'context',
          previewCopy: 'Сообщение считывается прямо из Discord и превращается в переносимый шаблон.',
          artifact: { type: 'file', name: 'rules-message.json', meta: 'content • embeds • components' },
          steps: ['Получает сообщение', 'Сохраняет оформление', 'Прикрепляет JSON']
        },
        ruleSuggest: {
          category: 'suggestions',
          command: 'ПКМ по сообщению → Предложить шаблон правил',
          label: 'Предложить правила ПКМ',
          title: 'Отправляет правила на рассмотрение',
          summary: 'Контекстная команда превращает выбранное сообщение в предложение публичного шаблона правил.',
          access: 'Доступно всем участникам сервера.',
          usage: ['ПКМ по сообщению → Приложения → Предложить шаблон правил'],
          params: ['Название и описание вводятся в форме Discord.'],
          result: 'Разработчик Core получает краткое превью и закодированный JSON.',
          previewKind: 'suggest',
          previewCopy: 'Предложение уходит в канал проверки, а исходный JSON остаётся защищённым.',
          artifact: { type: 'messages', rows: ['Название', 'Описание', 'Зашифрованный файл'] },
          steps: ['Открывает форму', 'Собирает сообщение', 'Отправляет предложение']
        },
        templateRate: {
          category: 'catalog',
          command: '/template-rate type:server name:minimalistic stars:5',
          label: 'Оценка шаблонов',
          title: 'Ставит звёзды публичному шаблону',
          summary: 'Позволяет оценить серверный, ролевой или правиловый шаблон от 1 до 5 звёзд.',
          access: 'Доступно всем участникам сервера.',
          usage: ['/template-rate type:<server|roles|rules> name:<template> stars:<1-5>'],
          params: ['type - тип шаблона.', 'name - название шаблона.', 'stars - оценка от 1 до 5.'],
          result: 'Рейтинг обновляется и затем отображается на сайте в каталоге шаблонов.',
          previewKind: 'rating',
          previewCopy: 'Core сохраняет оценку пользователя и пересчитывает средний рейтинг.',
          artifact: { type: 'stars', rows: ['★★★★★', '4.8 average', '24 ratings'] },
          steps: ['Находит шаблон', 'Проверяет оценку', 'Обновляет рейтинг']
        },
        templateSuggest: {
          category: 'suggestions',
          command: '/template-suggest server file:<json> name:<name> description:<text>',
          label: 'Предложить шаблон',
          title: 'Отправляет серверный или ролевой шаблон на рассмотрение',
          summary: 'Принимает JSON, краткое название и описание, затем отправляет предложение команде Core.',
          access: 'Доступно всем участникам сервера.',
          usage: ['/template-suggest server file:<json> name:<name> description:<text>', '/template-suggest roles file:<json> name:<name> description:<text>'],
          params: ['server/roles - тип предложения.', 'file - JSON шаблона.', 'name - название.', 'description - описание.'],
          result: 'В канал проверки отправляется сводка и закодированный JSON-файл.',
          previewKind: 'suggest',
          previewCopy: 'Core считает роли/каналы и прикладывает файл для проверки.',
          artifact: { type: 'file', name: 'template-suggestion.json', meta: 'encrypted • summary included' },
          steps: ['Принимает JSON', 'Считает краткие цифры', 'Отправляет на проверку']
        },
        feedback: {
          category: 'support',
          command: '/feedback message:идея для Core',
          label: 'Фидбек',
          title: 'Отправляет сообщение разработчику',
          summary: 'Приватно передаёт отзыв, ошибку или идею в канал обратной связи Core.',
          access: 'Доступно всем участникам сервера.',
          usage: ['/feedback message:<text>'],
          params: ['message - текст сообщения разработчику.'],
          result: 'Разработчик видит сообщение, автора и сервер, откуда оно пришло.',
          previewKind: 'feedback',
          previewCopy: 'Core оформляет фидбек в отдельную карточку для разработчика.',
          artifact: { type: 'messages', rows: ['Пользователь', 'Сервер', 'Сообщение'] },
          steps: ['Принимает текст', 'Добавляет контекст', 'Отправляет разработчику']
        },
        help: {
          category: 'support',
          command: '/help command:server-import',
          label: 'Помощь',
          title: 'Показывает справку внутри Discord',
          summary: 'Открывает список публичных команд или подробную карточку по выбранной команде.',
          access: 'Доступно всем участникам сервера.',
          usage: ['/help', '/help command:<command>'],
          params: ['command - необязательное название команды.'],
          result: 'Пользователь получает Components V2 справку прямо в Discord.',
          previewKind: 'help',
          previewCopy: 'Core показывает категории команд и кнопки-ссылки на бота и сервер.',
          artifact: { type: 'tasks', rows: ['Шаблоны', 'Перенос сервера', 'Роли и правила'] },
          steps: ['Открывает справочник', 'Группирует команды', 'Показывает детали']
        }
      }
    },
    en: {
      pageTitle: 'Core - command help',
      pageDescription: 'Detailed public Core command help with Discord-style simulations.',
      eyebrow: 'Core guide',
      title: 'Public command help',
      copy: 'Open any feature and see how it looks in Discord: input, Core response, result and access limits.',
      openWebhooks: 'Create webhook',
      searchLabel: 'Search',
      searchPlaceholder: '/server-import',
      livePreview: 'Live preview',
      ownerLabel: 'Owner',
      usageTitle: 'Usage',
      accessTitle: 'Access',
      paramsTitle: 'Parameters',
      resultTitle: 'Result',
      all: 'All',
      noParams: 'No parameters.',
      empty: 'Nothing found.',
      botThinking: 'Core is running the command...',
      categories: {
        templates: 'Templates',
        transfer: 'Server transfer',
        rolesRules: 'Roles and rules',
        catalog: 'Catalog',
        suggestions: 'Suggestions',
        support: 'Support'
      }
    },
    ua: {
      pageTitle: 'Core - довідка команд',
      pageDescription: 'Детальна довідка публічних команд Core з Discord-симуляцією.',
      eyebrow: 'Core guide',
      title: 'Довідка публічних команд',
      copy: 'Відкрий будь-яку функцію і подивись, як команда виглядає в Discord: введення, відповідь Core, результат і доступ.',
      openWebhooks: 'Створити вебхук',
      searchLabel: 'Пошук',
      searchPlaceholder: '/server-import',
      livePreview: 'Live preview',
      ownerLabel: 'Власник',
      usageTitle: 'Використання',
      accessTitle: 'Доступ',
      paramsTitle: 'Параметри',
      resultTitle: 'Результат',
      all: 'Усі',
      noParams: 'Параметрів немає.',
      empty: 'Нічого не знайдено.',
      botThinking: 'Core виконує команду...',
      categories: {
        templates: 'Шаблони',
        transfer: 'Перенесення сервера',
        rolesRules: 'Ролі та правила',
        catalog: 'Каталог',
        suggestions: 'Пропозиції',
        support: 'Звʼязок'
      }
    },
    de: {
      pageTitle: 'Core - Befehlshilfe',
      pageDescription: 'Ausführliche Hilfe zu öffentlichen Core-Befehlen mit Discord-Simulationen.',
      eyebrow: 'Core guide',
      title: 'Hilfe zu öffentlichen Befehlen',
      copy: 'Öffne eine Funktion und sieh, wie sie in Discord wirkt: Eingabe, Core-Antwort, Ergebnis und Zugriff.',
      openWebhooks: 'Webhook erstellen',
      searchLabel: 'Suche',
      searchPlaceholder: '/server-import',
      livePreview: 'Live preview',
      ownerLabel: 'Besitzer',
      usageTitle: 'Nutzung',
      accessTitle: 'Zugriff',
      paramsTitle: 'Parameter',
      resultTitle: 'Ergebnis',
      all: 'Alle',
      noParams: 'Keine Parameter.',
      empty: 'Nichts gefunden.',
      botThinking: 'Core führt den Befehl aus...',
      categories: {
        templates: 'Vorlagen',
        transfer: 'Servertransfer',
        rolesRules: 'Rollen und Regeln',
        catalog: 'Katalog',
        suggestions: 'Vorschläge',
        support: 'Support'
      }
    }
  };

  labels.en.commands = localizeCommandSkeleton('en');
  labels.ua.commands = localizeCommandSkeleton('ua');
  labels.de.commands = localizeCommandSkeleton('de');

  let language = FALLBACK_LANG;
  let activeId = 'templateList';
  let activeCategory = 'all';
  let query = '';
  let typingTimers = [];

  const root = document.querySelector('.command-help-shell');
  if (!root) return;

  const nodes = {
    search: document.querySelector('[data-help-search]'),
    categories: document.querySelector('[data-help-categories]'),
    list: document.querySelector('[data-help-list]'),
    typed: document.querySelector('[data-help-typed]'),
    botRow: document.querySelector('[data-help-bot-row]'),
    previewTitle: document.querySelector('[data-help-preview-title]'),
    previewKind: document.querySelector('[data-help-preview-kind]'),
    previewCopy: document.querySelector('[data-help-preview-copy]'),
    artifact: document.querySelector('[data-help-artifact]'),
    progress: document.querySelector('[data-help-progress]'),
    category: document.querySelector('[data-help-category]'),
    title: document.querySelector('[data-help-title]'),
    summary: document.querySelector('[data-help-summary]'),
    usage: document.querySelector('[data-help-usage]'),
    access: document.querySelector('[data-help-access]'),
    params: document.querySelector('[data-help-params]'),
    result: document.querySelector('[data-help-result]')
  };

  function localizeCommandSkeleton(lang) {
    const ruCommands = labels.ru.commands;
    const overrides = {
      en: {
        templateList: ['Template list', 'Shows public presets', 'Lists server templates that can be previewed or imported later.', 'Available to every server member.', 'Core sends a compact list of public server templates.'],
        templatePreview: ['Template preview', 'Shows structure before applying it', 'Displays roles, categories, channels and key settings of a public preset.', 'Available to every server member.', 'A Discord-style preview appears before the owner applies changes.'],
        serverImport: ['Server import', 'Creates a structure from JSON or a public template', 'Transfers roles, channels, categories, permissions and settings. A temporary rollback is saved first.', 'Server owner only. Core developer can use it on any server.', 'Core creates the structure after confirmation and keeps rollback for one hour.'],
        serverExport: ['Server export', 'Exports the server structure', 'Collects roles, channels, categories, permissions and settings into an encoded JSON file.', 'Server owner only. Core developer can use it on any server.', 'The Discord response includes a JSON file for later import.'],
        serverRollback: ['Server rollback', 'Restores the latest snapshot', 'Uses the temporary backup created before an import or template apply.', 'Server owner only.', 'If the hour has not expired, Core restores roles, channels and settings.'],
        rolesJson: ['Roles JSON', 'Transfers roles separately', 'Exports roles to encoded JSON or creates them from a file/public role pack.', 'Server owner only.', 'Roles can be transferred without rebuilding the full server.'],
        rulesImport: ['Rules import', 'Publishes a rules template', 'Sends one or multiple rules messages from encoded JSON or a public template.', 'Server owner only.', 'Ready rules messages appear in the selected channel.'],
        rulesExport: ['Rules export context', 'Exports a rules message', 'Saves the selected rules message as encoded JSON.', 'Server owner only.', 'Core sends the owner a JSON file for import.'],
        ruleSuggest: ['Suggest rules context', 'Sends rules for review', 'Turns the selected message into a public rules-template suggestion.', 'Available to every server member.', 'Core developer receives a preview and encoded JSON.'],
        templateRate: ['Template rating', 'Rates a public template', 'Lets users rate server, role or rules templates from 1 to 5 stars.', 'Available to every server member.', 'The rating updates and appears on the template site.'],
        templateSuggest: ['Suggest template', 'Sends a server or role template for review', 'Accepts JSON, name and description, then sends the suggestion to Core.', 'Available to every server member.', 'The review channel receives a summary and encoded JSON.'],
        feedback: ['Feedback', 'Sends a message to the developer', 'Privately forwards feedback, bugs or ideas to the Core feedback channel.', 'Available to every server member.', 'The developer sees the message, author and source server.'],
        help: ['Help', 'Shows help inside Discord', 'Opens the public command list or a detailed card for one command.', 'Available to every server member.', 'The user receives Components V2 help directly in Discord.']
      },
      ua: {
        templateList: ['Список шаблонів', 'Показує публічні заготовки', 'Відкриває список серверних шаблонів, які можна переглянути або імпортувати.', 'Доступно всім учасникам сервера.', 'Core надсилає компактний список публічних заготовок.'],
        templatePreview: ['Превью шаблону', 'Показує структуру до застосування', 'Розкриває ролі, категорії, канали та ключові налаштування шаблону.', 'Доступно всім учасникам сервера.', 'Зʼявляється Discord-превью структури перед змінами.'],
        serverImport: ['Імпорт сервера', 'Створює структуру з JSON або публічного шаблону', 'Переносить ролі, канали, категорії, права й налаштування. Спершу зберігає відкат.', 'Тільки власник сервера. Розробник Core може використовувати на будь-якому сервері.', 'Core створює структуру після підтвердження та залишає відкат на одну годину.'],
        serverExport: ['Експорт сервера', 'Вивантажує структуру сервера', 'Збирає ролі, канали, категорії, права й налаштування в закодований JSON.', 'Тільки власник сервера. Розробник Core може використовувати на будь-якому сервері.', 'У відповіді Discord зʼявляється JSON-файл для імпорту.'],
        serverRollback: ['Відкат сервера', 'Повертає останній знімок', 'Використовує тимчасову копію, створену перед імпортом або шаблоном.', 'Тільки власник сервера.', 'Якщо година ще не минула, Core відновлює ролі, канали й налаштування.'],
        rolesJson: ['Ролі через JSON', 'Переносить ролі окремо', 'Експортує ролі в JSON або створює їх з файлу/публічного набору.', 'Тільки власник сервера.', 'Ролі можна перенести без повної перебудови сервера.'],
        rulesImport: ['Імпорт правил', 'Публікує шаблон правил', 'Надсилає одне або кілька повідомлень правил з JSON або публічного шаблону.', 'Тільки власник сервера.', 'Готові правила зʼявляються у вибраному каналі.'],
        rulesExport: ['Експорт правил ПКМ', 'Вивантажує повідомлення правил', 'Зберігає вибране повідомлення правил у закодований JSON.', 'Тільки власник сервера.', 'Core надсилає власнику JSON-файл для імпорту.'],
        ruleSuggest: ['Запропонувати правила ПКМ', 'Надсилає правила на розгляд', 'Перетворює вибране повідомлення на пропозицію шаблону правил.', 'Доступно всім учасникам сервера.', 'Розробник Core отримує превью та закодований JSON.'],
        templateRate: ['Оцінка шаблонів', 'Ставить зірки публічному шаблону', 'Дозволяє оцінити серверний, рольовий або правиловий шаблон від 1 до 5.', 'Доступно всім учасникам сервера.', 'Рейтинг оновлюється та показується на сайті.'],
        templateSuggest: ['Запропонувати шаблон', 'Надсилає серверний або рольовий шаблон на розгляд', 'Приймає JSON, назву й опис, потім надсилає пропозицію Core.', 'Доступно всім учасникам сервера.', 'Канал перевірки отримує зведення та закодований JSON.'],
        feedback: ['Фідбек', 'Надсилає повідомлення розробнику', 'Передає відгук, помилку або ідею в канал зворотного звʼязку Core.', 'Доступно всім учасникам сервера.', 'Розробник бачить повідомлення, автора й сервер.'],
        help: ['Допомога', 'Показує довідку в Discord', 'Відкриває список публічних команд або детальну картку команди.', 'Доступно всім учасникам сервера.', 'Користувач отримує Components V2 довідку прямо в Discord.']
      },
      de: {
        templateList: ['Vorlagenliste', 'Zeigt öffentliche Vorlagen', 'Öffnet Servervorlagen, die man vorher ansehen oder importieren kann.', 'Für alle Servermitglieder verfügbar.', 'Core sendet eine kompakte Liste öffentlicher Servervorlagen.'],
        templatePreview: ['Vorlagenvorschau', 'Zeigt die Struktur vor der Anwendung', 'Zeigt Rollen, Kategorien, Kanäle und wichtige Einstellungen einer öffentlichen Vorlage.', 'Für alle Servermitglieder verfügbar.', 'Eine Discord-Vorschau erscheint, bevor Änderungen angewendet werden.'],
        serverImport: ['Serverimport', 'Erstellt Struktur aus JSON oder Vorlage', 'Überträgt Rollen, Kanäle, Kategorien, Rechte und Einstellungen. Vorher wird ein Rollback gespeichert.', 'Nur Serverbesitzer. Core-Entwickler können es auf jedem Server nutzen.', 'Core erstellt die Struktur nach Bestätigung und behält das Rollback eine Stunde.'],
        serverExport: ['Serverexport', 'Exportiert die Serverstruktur', 'Sammelt Rollen, Kanäle, Kategorien, Rechte und Einstellungen in einer codierten JSON-Datei.', 'Nur Serverbesitzer. Core-Entwickler können es auf jedem Server nutzen.', 'Die Discord-Antwort enthält eine JSON-Datei für den Import.'],
        serverRollback: ['Serverrollback', 'Stellt den letzten Snapshot wieder her', 'Nutzt die temporäre Sicherung vor Import oder Vorlagenanwendung.', 'Nur Serverbesitzer.', 'Wenn die Stunde nicht abgelaufen ist, stellt Core Rollen, Kanäle und Einstellungen wieder her.'],
        rolesJson: ['Rollen JSON', 'Überträgt Rollen separat', 'Exportiert Rollen in codiertes JSON oder erstellt sie aus Datei/öffentlichem Rollenpaket.', 'Nur Serverbesitzer.', 'Rollen können ohne komplette Serverneuerstellung übertragen werden.'],
        rulesImport: ['Regelimport', 'Veröffentlicht eine Regelvorlage', 'Sendet eine oder mehrere Regel-Nachrichten aus codiertem JSON oder öffentlicher Vorlage.', 'Nur Serverbesitzer.', 'Fertige Regel-Nachrichten erscheinen im gewählten Kanal.'],
        rulesExport: ['Regeln per Kontext exportieren', 'Exportiert eine Regel-Nachricht', 'Speichert die ausgewählte Regel-Nachricht als codiertes JSON.', 'Nur Serverbesitzer.', 'Core sendet dem Besitzer eine JSON-Datei für den Import.'],
        ruleSuggest: ['Regeln per Kontext vorschlagen', 'Sendet Regeln zur Prüfung', 'Wandelt die ausgewählte Nachricht in einen Vorschlag für eine öffentliche Regelvorlage um.', 'Für alle Servermitglieder verfügbar.', 'Der Core-Entwickler erhält Vorschau und codiertes JSON.'],
        templateRate: ['Vorlagenbewertung', 'Bewertet eine öffentliche Vorlage', 'Bewertet Server-, Rollen- oder Regelvorlagen mit 1 bis 5 Sternen.', 'Für alle Servermitglieder verfügbar.', 'Die Bewertung wird aktualisiert und auf der Website angezeigt.'],
        templateSuggest: ['Vorlage vorschlagen', 'Sendet Server- oder Rollenvorlage zur Prüfung', 'Nimmt JSON, Namen und Beschreibung an und sendet den Vorschlag an Core.', 'Für alle Servermitglieder verfügbar.', 'Der Prüfkanal erhält Zusammenfassung und codiertes JSON.'],
        feedback: ['Feedback', 'Sendet eine Nachricht an den Entwickler', 'Leitet Feedback, Fehler oder Ideen an den Core-Feedbackkanal weiter.', 'Für alle Servermitglieder verfügbar.', 'Der Entwickler sieht Nachricht, Autor und Server.'],
        help: ['Hilfe', 'Zeigt Hilfe in Discord', 'Öffnet die öffentliche Befehlsliste oder eine Detailkarte.', 'Für alle Servermitglieder verfügbar.', 'Der Nutzer erhält Components V2 Hilfe direkt in Discord.']
      }
    };

    return Object.fromEntries(Object.entries(ruCommands).map(([id, command]) => {
      const item = { ...command };
      const data = overrides[lang][id];
      item.label = data[0];
      item.title = data[1];
      item.summary = data[2];
      item.access = data[3];
      item.result = data[4];
      Object.assign(item, localizedDetails(lang, id, item));
      return [id, item];
    }));
  }

  function localizedDetails(lang, id, item) {
    const details = {
      en: {
        noParams: 'No parameters.',
        params: {
          templateList: ['No parameters.'],
          templatePreview: ['name - public template key.'],
          serverImport: ['file - encoded server JSON.', 'template - public server preset.', 'delete_existing - whether to remove current channels and roles first.'],
          serverExport: ['No parameters.'],
          serverRollback: ['No parameters.'],
          rolesJson: ['file - encoded roles JSON.', 'template - public role pack.'],
          rulesImport: ['file - encoded rules JSON.', 'template - public rules template.', 'channel - target channel.'],
          rulesExport: ['Right-click the message that should be exported.'],
          ruleSuggest: ['Name and description are entered in the Discord form.'],
          templateRate: ['type - template type.', 'name - template key.', 'stars - rating from 1 to 5.'],
          templateSuggest: ['server/roles - suggestion type.', 'file - template JSON.', 'name - display name.', 'description - public description.'],
          feedback: ['message - text for the Core developer.'],
          help: ['command - optional command key.']
        },
        steps: {
          templateList: ['Reads the public catalog', 'Groups templates', 'Sends the list in Discord'],
          templatePreview: ['Loads the template', 'Sorts roles and channels', 'Renders the preview'],
          serverImport: ['Checks owner access', 'Saves rollback', 'Creates roles and channels'],
          serverExport: ['Reads roles', 'Reads channels and permissions', 'Attaches JSON'],
          serverRollback: ['Finds active snapshot', 'Shows confirmation', 'Restores the server'],
          rolesJson: ['Filters system roles', 'Encodes JSON', 'Creates roles in order'],
          rulesImport: ['Checks the template', 'Splits by Discord limits', 'Sends messages'],
          rulesExport: ['Reads the selected message', 'Keeps formatting', 'Attaches JSON'],
          ruleSuggest: ['Opens the form', 'Collects the message', 'Sends suggestion'],
          templateRate: ['Finds the template', 'Checks rating', 'Updates average score'],
          templateSuggest: ['Accepts JSON', 'Counts summary stats', 'Sends for review'],
          feedback: ['Accepts text', 'Adds context', 'Sends to developer'],
          help: ['Opens help', 'Groups commands', 'Shows details']
        },
        preview: {
          templateList: 'Found public presets. Open a preview or import through /server-import.',
          templatePreview: 'Core shows categories and channels with an extended-view option.',
          serverImport: 'Core shows confirmation and saves a server snapshot before import.',
          serverExport: 'Core creates server-config.json and attaches it to the response.',
          serverRollback: 'Core asks for confirmation and warns if the snapshot expired.',
          rolesJson: 'Core keeps role order and basic settings: color, permissions, hoist and mentionable.',
          rulesImport: 'Core keeps content, embeds and Components V2 structure.',
          rulesExport: 'The selected Discord message becomes a portable template.',
          ruleSuggest: 'The suggestion goes to review, while the source JSON stays protected.',
          templateRate: 'Core stores the user rating and recalculates the average score.',
          templateSuggest: 'Core counts roles/channels and attaches the file for review.',
          feedback: 'Core formats feedback into a separate developer card.',
          help: 'Core shows command categories and link buttons for bot/server.'
        },
        artifactRows: {
          templateList: ['# minimalistic-community', '# gaming-hub', '# creator-studio'],
          templatePreview: ['╭─〔 Chat 〕', '# chat', '# media', '🔊 general-vc'],
          serverImport: ['Snapshot saved', 'Roles created top-down', 'Channels placed into categories'],
          serverRollback: ['Snapshot found', 'Confirmation received', 'Structure restored'],
          rolesJson: ['◆ Founder', '✦ Admin', '◇ Moderator', 'Member'],
          rulesImport: ['Server rules', 'Account safety', 'Moderation and appeals'],
          ruleSuggest: ['Name', 'Description', 'Encoded file'],
          feedback: ['User', 'Server', 'Message'],
          help: ['Templates', 'Server transfer', 'Roles and rules']
        }
      },
      ua: {
        noParams: 'Параметрів немає.',
        params: {
          templateList: ['Параметрів немає.'],
          templatePreview: ['name - ключ публічного шаблону.'],
          serverImport: ['file - закодований JSON сервера.', 'template - публічна заготовка.', 'delete_existing - чи видаляти поточні канали й ролі перед створенням.'],
          serverExport: ['Параметрів немає.'],
          serverRollback: ['Параметрів немає.'],
          rolesJson: ['file - закодований JSON ролей.', 'template - публічний набір ролей.'],
          rulesImport: ['file - закодований JSON правил.', 'template - публічний шаблон правил.', 'channel - цільовий канал.'],
          rulesExport: ['Натисніть ПКМ на повідомленні, яке потрібно експортувати.'],
          ruleSuggest: ['Назва та опис вводяться у формі Discord.'],
          templateRate: ['type - тип шаблону.', 'name - ключ шаблону.', 'stars - оцінка від 1 до 5.'],
          templateSuggest: ['server/roles - тип пропозиції.', 'file - JSON шаблону.', 'name - назва.', 'description - опис.'],
          feedback: ['message - текст для розробника Core.'],
          help: ['command - необовʼязковий ключ команди.']
        },
        steps: {
          templateList: ['Читає публічний каталог', 'Групує заготовки', 'Надсилає список у Discord'],
          templatePreview: ['Завантажує шаблон', 'Сортує ролі й канали', 'Малює превью'],
          serverImport: ['Перевіряє власника', 'Зберігає відкат', 'Створює ролі й канали'],
          serverExport: ['Зчитує ролі', 'Зчитує канали та права', 'Прикріплює JSON'],
          serverRollback: ['Шукає активний знімок', 'Показує підтвердження', 'Відновлює сервер'],
          rolesJson: ['Фільтрує системні ролі', 'Кодує JSON', 'Створює ролі по порядку'],
          rulesImport: ['Перевіряє шаблон', 'Ділить за лімітами Discord', 'Надсилає повідомлення'],
          rulesExport: ['Отримує повідомлення', 'Зберігає оформлення', 'Прикріплює JSON'],
          ruleSuggest: ['Відкриває форму', 'Збирає повідомлення', 'Надсилає пропозицію'],
          templateRate: ['Знаходить шаблон', 'Перевіряє оцінку', 'Оновлює рейтинг'],
          templateSuggest: ['Приймає JSON', 'Рахує короткі цифри', 'Надсилає на перевірку'],
          feedback: ['Приймає текст', 'Додає контекст', 'Надсилає розробнику'],
          help: ['Відкриває довідник', 'Групує команди', 'Показує деталі']
        },
        preview: {
          templateList: 'Знайдено публічні заготовки. Можна відкрити превью або імпортувати через /server-import.',
          templatePreview: 'Core показує канали за категоріями та кнопку розширеного перегляду.',
          serverImport: 'Перед імпортом Core показує підтвердження та зберігає знімок сервера.',
          serverExport: 'Core створює server-config.json і прикріплює його до відповіді.',
          serverRollback: 'Core показує підтвердження й попереджає, якщо знімок застарів.',
          rolesJson: 'Core зберігає порядок ролей і базові налаштування: колір, права, hoist і mentionable.',
          rulesImport: 'Core зберігає текст, embeds і Components V2 структуру.',
          rulesExport: 'Вибране повідомлення Discord стає переносним шаблоном.',
          ruleSuggest: 'Пропозиція йде на перевірку, а вихідний JSON лишається захищеним.',
          templateRate: 'Core зберігає оцінку користувача та перераховує середній рейтинг.',
          templateSuggest: 'Core рахує ролі/канали та прикріплює файл для перевірки.',
          feedback: 'Core оформлює фідбек в окрему картку для розробника.',
          help: 'Core показує категорії команд і кнопки-посилання на бота та сервер.'
        },
        artifactRows: {
          templateList: ['# minimalistic-community', '# gaming-hub', '# creator-studio'],
          templatePreview: ['╭─〔 Спілкування 〕', '# чат', '# медіа', '🔊 загальний-гк'],
          serverImport: ['Знімок збережено', 'Ролі створено зверху вниз', 'Канали розподілено за категоріями'],
          serverRollback: ['Знімок знайдено', 'Підтвердження отримано', 'Структуру відновлено'],
          rolesJson: ['◆ Founder', '✦ Admin', '◇ Moderator', 'Member'],
          rulesImport: ['Правила сервера', 'Безпека акаунта', 'Модерація та апеляції'],
          ruleSuggest: ['Назва', 'Опис', 'Закодований файл'],
          feedback: ['Користувач', 'Сервер', 'Повідомлення'],
          help: ['Шаблони', 'Перенесення сервера', 'Ролі та правила']
        }
      },
      de: {
        noParams: 'Keine Parameter.',
        params: {
          templateList: ['Keine Parameter.'],
          templatePreview: ['name - Schlüssel der öffentlichen Vorlage.'],
          serverImport: ['file - codiertes Server-JSON.', 'template - öffentliche Servervorlage.', 'delete_existing - ob aktuelle Kanäle und Rollen zuerst entfernt werden.'],
          serverExport: ['Keine Parameter.'],
          serverRollback: ['Keine Parameter.'],
          rolesJson: ['file - codiertes Rollen-JSON.', 'template - öffentliches Rollenpaket.'],
          rulesImport: ['file - codiertes Regel-JSON.', 'template - öffentliche Regelvorlage.', 'channel - Zielkanal.'],
          rulesExport: ['Rechtsklick auf die Nachricht, die exportiert werden soll.'],
          ruleSuggest: ['Name und Beschreibung werden im Discord-Formular eingegeben.'],
          templateRate: ['type - Vorlagentyp.', 'name - Vorlagenschlüssel.', 'stars - Bewertung von 1 bis 5.'],
          templateSuggest: ['server/roles - Vorschlagstyp.', 'file - Vorlagen-JSON.', 'name - Anzeigename.', 'description - Beschreibung.'],
          feedback: ['message - Text für den Core-Entwickler.'],
          help: ['command - optionaler Befehlsschlüssel.']
        },
        steps: {
          templateList: ['Liest den öffentlichen Katalog', 'Gruppiert Vorlagen', 'Sendet die Liste in Discord'],
          templatePreview: ['Lädt die Vorlage', 'Sortiert Rollen und Kanäle', 'Rendert die Vorschau'],
          serverImport: ['Prüft Besitzerzugriff', 'Speichert Rollback', 'Erstellt Rollen und Kanäle'],
          serverExport: ['Liest Rollen', 'Liest Kanäle und Rechte', 'Hängt JSON an'],
          serverRollback: ['Findet aktiven Snapshot', 'Zeigt Bestätigung', 'Stellt Server wieder her'],
          rolesJson: ['Filtert Systemrollen', 'Codiert JSON', 'Erstellt Rollen in Reihenfolge'],
          rulesImport: ['Prüft die Vorlage', 'Teilt nach Discord-Limits', 'Sendet Nachrichten'],
          rulesExport: ['Liest die Nachricht', 'Behält Formatierung', 'Hängt JSON an'],
          ruleSuggest: ['Öffnet Formular', 'Sammelt Nachricht', 'Sendet Vorschlag'],
          templateRate: ['Findet Vorlage', 'Prüft Bewertung', 'Aktualisiert Durchschnitt'],
          templateSuggest: ['Nimmt JSON an', 'Zählt Zusammenfassung', 'Sendet zur Prüfung'],
          feedback: ['Nimmt Text an', 'Fügt Kontext hinzu', 'Sendet an Entwickler'],
          help: ['Öffnet Hilfe', 'Gruppiert Befehle', 'Zeigt Details']
        },
        preview: {
          templateList: 'Öffentliche Vorlagen gefunden. Vorschau öffnen oder über /server-import importieren.',
          templatePreview: 'Core zeigt Kategorien und Kanäle mit erweiterter Ansicht.',
          serverImport: 'Core zeigt Bestätigung und speichert vor dem Import einen Snapshot.',
          serverExport: 'Core erstellt server-config.json und hängt die Datei an die Antwort.',
          serverRollback: 'Core fragt nach Bestätigung und warnt, wenn der Snapshot abgelaufen ist.',
          rolesJson: 'Core behält Rollenreihenfolge und Einstellungen: Farbe, Rechte, hoist und mentionable.',
          rulesImport: 'Core behält Inhalt, Embeds und Components V2 Struktur.',
          rulesExport: 'Die ausgewählte Discord-Nachricht wird zu einer übertragbaren Vorlage.',
          ruleSuggest: 'Der Vorschlag geht zur Prüfung, während das JSON geschützt bleibt.',
          templateRate: 'Core speichert die Nutzerbewertung und berechnet den Durchschnitt neu.',
          templateSuggest: 'Core zählt Rollen/Kanäle und hängt die Datei zur Prüfung an.',
          feedback: 'Core formatiert Feedback als separate Entwicklerkarte.',
          help: 'Core zeigt Befehlskategorien und Link-Buttons für Bot und Server.'
        },
        artifactRows: {
          templateList: ['# minimalistic-community', '# gaming-hub', '# creator-studio'],
          templatePreview: ['╭─〔 Chat 〕', '# chat', '# media', '🔊 general-vc'],
          serverImport: ['Snapshot gespeichert', 'Rollen von oben nach unten erstellt', 'Kanäle in Kategorien gesetzt'],
          serverRollback: ['Snapshot gefunden', 'Bestätigung erhalten', 'Struktur wiederhergestellt'],
          rolesJson: ['◆ Founder', '✦ Admin', '◇ Moderator', 'Member'],
          rulesImport: ['Serverregeln', 'Kontosicherheit', 'Moderation und Einsprüche'],
          ruleSuggest: ['Name', 'Beschreibung', 'Codierte Datei'],
          feedback: ['Nutzer', 'Server', 'Nachricht'],
          help: ['Vorlagen', 'Servertransfer', 'Rollen und Regeln']
        }
      }
    }[lang];

    const next = {
      params: details.params[id] || [details.noParams],
      steps: details.steps[id] || item.steps,
      previewCopy: details.preview[id] || item.summary
    };

    if (item.artifact?.rows && details.artifactRows[id]) {
      next.artifact = { ...item.artifact, rows: details.artifactRows[id] };
    }

    if (item.artifact?.type === 'file') {
      next.artifact = {
        ...item.artifact,
        ...(next.artifact || {}),
        meta: lang === 'en'
          ? item.artifact.meta.replace('roles', 'roles').replace('channels', 'channels').replace('settings: saved', 'settings: saved').replace('encrypted', 'encoded')
          : lang === 'ua'
            ? item.artifact.meta.replace('roles', 'ролі').replace('channels', 'канали').replace('settings: saved', 'налаштування збережено').replace('encrypted', 'закодовано').replace('summary included', 'зведення додано')
            : item.artifact.meta.replace('roles', 'Rollen').replace('channels', 'Kanäle').replace('settings: saved', 'Einstellungen gespeichert').replace('encrypted', 'codiert').replace('summary included', 'Zusammenfassung enthalten')
      };
    }

    return next;
  }

  function getSavedLanguage() {
    const saved = localStorage.getItem('core-site-language');
    if (labels[saved]) return saved;
    const browserLanguage = navigator.language?.toLowerCase() || '';
    if (browserLanguage.startsWith('uk')) return 'ua';
    if (browserLanguage.startsWith('de')) return 'de';
    if (browserLanguage.startsWith('en')) return 'en';
    return FALLBACK_LANG;
  }

  function t(key) {
    return labels[language]?.[key] || labels[FALLBACK_LANG][key] || key;
  }

  function dictionary() {
    return labels[language] || labels[FALLBACK_LANG];
  }

  function commands() {
    return Object.entries(dictionary().commands).map(([id, item]) => ({ id, ...item }));
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function filteredCommands() {
    const normalizedQuery = query.trim().toLowerCase();
    return commands().filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const haystack = `${item.command} ${item.label} ${item.title} ${item.summary}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }

  function getActiveCommand() {
    const list = commands();
    return list.find((item) => item.id === activeId) || list[0];
  }

  function renderCategories() {
    const categories = ['all', ...new Set(commands().map((item) => item.category))];
    nodes.categories.innerHTML = categories.map((category) => {
      const label = category === 'all' ? t('all') : dictionary().categories[category];
      return `<button type="button" class="${activeCategory === category ? 'is-active' : ''}" data-help-category-select="${escapeHtml(category)}">${escapeHtml(label)}</button>`;
    }).join('');
  }

  function renderList() {
    const list = filteredCommands();
    if (!list.length) {
      nodes.list.innerHTML = `<div class="command-help-empty">${escapeHtml(t('empty'))}</div>`;
      return;
    }

    nodes.list.innerHTML = list.map((item) => `
      <button type="button" class="command-help-item${item.id === activeId ? ' is-active' : ''}" data-help-command="${escapeHtml(item.id)}">
        <code>${escapeHtml(item.command)}</code>
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(item.title)}</span>
      </button>
    `).join('');
  }

  function renderArtifact(artifact) {
    if (!artifact) return '';
    if (artifact.type === 'file') {
      return `
        <div class="help-file-artifact">
          <span>JSON</span>
          <div>
            <strong>${escapeHtml(artifact.name)}</strong>
            <small>${escapeHtml(artifact.meta)}</small>
          </div>
        </div>
      `;
    }

    if (artifact.type === 'roles') {
      return `<div class="help-role-artifact">${artifact.rows.map((row, index) => `<span style="--role-color:${['#f2a51a', '#44b8de', '#35b46f', '#a7b0bf'][index % 4]}">${escapeHtml(row)}</span>`).join('')}</div>`;
    }

    if (artifact.type === 'stars') {
      return `<div class="help-stars-artifact">${artifact.rows.map((row, index) => `<strong class="${index === 0 ? 'stars-main' : ''}">${escapeHtml(row)}</strong>`).join('')}</div>`;
    }

    if (artifact.type === 'messages') {
      return `<div class="help-message-artifact">${artifact.rows.map((row) => `<p>${escapeHtml(row)}</p>`).join('')}</div>`;
    }

    return `
      <div class="help-tree-artifact">
        ${artifact.rows.map((row) => `<p><span>${row.includes('🔊') ? 'vc' : row.includes('╭') ? 'cat' : '#'}</span>${escapeHtml(row)}</p>`).join('')}
      </div>
    `;
  }

  function clearTypingTimers() {
    typingTimers.forEach((timer) => window.clearTimeout(timer));
    typingTimers = [];
  }

  function animateTypedCommand(command) {
    clearTypingTimers();
    nodes.typed.textContent = '';
    document.querySelector('.command-help-detail')?.classList.remove('is-running');
    document.querySelector('.command-help-detail')?.classList.add('is-typing');
    nodes.botRow?.classList.remove('is-visible');

    const clean = command.replace(/^\//, '');
    Array.from(clean).forEach((char, index) => {
      typingTimers.push(window.setTimeout(() => {
        nodes.typed.textContent += char;
      }, index * 24));
    });

    typingTimers.push(window.setTimeout(() => {
      document.querySelector('.command-help-detail')?.classList.remove('is-typing');
      document.querySelector('.command-help-detail')?.classList.add('is-running');
      nodes.botRow?.classList.add('is-visible');
    }, Math.max(260, clean.length * 24 + 260)));
  }

  function renderDetail(animate = true) {
    const item = getActiveCommand();
    if (!item) return;

    nodes.previewTitle.textContent = item.title;
    nodes.previewKind.textContent = item.previewKind;
    nodes.previewCopy.textContent = item.previewCopy;
    nodes.artifact.innerHTML = renderArtifact(item.artifact);
    nodes.progress.innerHTML = item.steps.map((step, index) => `
      <div class="help-progress-row" style="--step:${index}">
        <span></span>
        <p>${escapeHtml(step)}</p>
        <i></i>
      </div>
    `).join('');

    nodes.category.textContent = dictionary().categories[item.category] || item.category;
    nodes.title.textContent = item.title;
    nodes.summary.textContent = item.summary;
    nodes.access.textContent = item.access;
    nodes.result.textContent = item.result;
    nodes.usage.innerHTML = item.usage.map((usage) => `<code>${escapeHtml(usage)}</code>`).join('');
    nodes.params.innerHTML = (item.params?.length ? item.params : [t('noParams')]).map((param) => `<p>${escapeHtml(param)}</p>`).join('');

    if (animate) animateTypedCommand(item.command);
    else nodes.typed.textContent = item.command.replace(/^\//, '');
  }

  function render() {
    renderCategories();
    renderList();
    if (!filteredCommands().some((item) => item.id === activeId)) {
      activeId = filteredCommands()[0]?.id || commands()[0]?.id;
    }
    renderDetail(true);
  }

  function applyLanguage(nextLanguage) {
    language = labels[nextLanguage] ? nextLanguage : FALLBACK_LANG;
    document.documentElement.lang = language === 'ua' ? 'uk' : language;
    document.title = t('pageTitle');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('pageDescription'));
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('pageTitle'));
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('pageDescription'));
    if (nodes.search) nodes.search.placeholder = t('searchPlaceholder');

    document.querySelectorAll('[data-help-i18n]').forEach((node) => {
      const key = node.dataset.helpI18n;
      if (labels[language]?.[key]) node.textContent = t(key);
    });

    render();
  }

  nodes.categories.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-help-category-select]');
    if (!trigger) return;
    activeCategory = trigger.dataset.helpCategorySelect || 'all';
    const next = filteredCommands()[0];
    if (next) activeId = next.id;
    render();
  });

  nodes.list.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-help-command]');
    if (!trigger) return;
    activeId = trigger.dataset.helpCommand;
    renderList();
    renderDetail(true);
  });

  nodes.search?.addEventListener('input', () => {
    query = nodes.search.value;
    const next = filteredCommands()[0];
    if (next) activeId = next.id;
    render();
  });

  window.addEventListener('core-language-change', (event) => {
    applyLanguage(event.detail?.language || getSavedLanguage());
  });

  applyLanguage(getSavedLanguage());
})();
