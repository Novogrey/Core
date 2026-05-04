const INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1499785495264104688&permissions=8&integration_type=0&scope=bot+applications.commands';
const OFFICIAL_SERVER_URL = 'https://discord.gg/FjfZkHEuyv';
const CONFIGURED_TEMPLATE_API_URL = String(window.CORE_TEMPLATES_API_URL || '').trim();
const TEMPLATE_API_URL = CONFIGURED_TEMPLATE_API_URL && !CONFIGURED_TEMPLATE_API_URL.includes('PASTE_GOOGLE_APPS_SCRIPT')
  ? CONFIGURED_TEMPLATE_API_URL
  : '';

const translations = {
  ru: {
    meta: {
      title: 'Core - бот для Discord-серверов',
      description: 'Core помогает владельцам Discord-серверов использовать публичные шаблоны, импорт и экспорт структуры, превью изменений и безопасный откат.'
    },
    nav: {
      home: 'Главная',
      commands: 'Команды',
      templates: 'Шаблоны',
      preview: 'Превью',
      safety: 'Откат',
      catalog: 'Каталог',
      server: 'Сервер',
      add: 'Добавить'
    },
    hero: {
      eyebrow: 'Core for Discord',
      title: 'Сервер готов быстрее.',
      copy: 'Core помогает владельцу сервера быстро поставить готовую структуру, перенести оформление через JSON и проверить всё перед применением.',
      add: 'Добавить Core',
      server: 'Официальный сервер',
      commands: 'Посмотреть команды'
    },
    commands: {
      eyebrow: 'Доступные команды',
      title: 'Выбери команду и посмотри, что она делает.',
      copy: 'Команды работают на серверах, где Core добавлен с нужными правами. Опасные действия требуют подтверждения владельца сервера.',
      selected: 'Выбрана команда',
      inputLabel: 'Discord input',
      items: {
        templateList: {
          command: '/template list',
          label: 'Список шаблонов',
          title: 'Показывает публичные шаблоны',
          description: 'Core выводит доступные заготовки, которые можно посмотреть или применить на сервере.',
          steps: [
            'Читает папку публичных шаблонов',
            'Собирает названия и описания',
            'Отправляет список владельцу сервера'
          ],
          result: 'На выходе владелец видит короткий список доступных публичных заготовок.'
        },
        templatePreview: {
          command: '/template preview name:<template>',
          label: 'Превью шаблона',
          title: 'Показывает структуру до применения',
          description: 'Команда раскрывает роли, категории, каналы и настройки выбранной публичной заготовки.',
          steps: [
            'Загружает выбранный шаблон',
            'Сортирует роли и каналы',
            'Показывает превью в Discord'
          ],
          result: 'Владелец понимает, что именно появится на сервере, до подтверждения изменений.'
        },
        templateSend: {
          command: '/template send name:<template>',
          label: 'Применить шаблон',
          title: 'Применяет публичную заготовку',
          description: 'Core показывает подтверждение, создаёт временный снимок и переносит структуру шаблона на сервер.',
          steps: [
            'Показывает окно подтверждения',
            'Сохраняет снимок для отката',
            'Создаёт роли, каналы и права'
          ],
          result: 'После подтверждения сервер получает готовую структуру, а откат остаётся доступен один час.'
        },
        serverExport: {
          command: '/server-export',
          label: 'Экспорт JSON',
          title: 'Выгружает структуру сервера',
          description: 'Команда собирает роли, каналы, права и настройки сервера в JSON-файл для переноса через Core.',
          steps: [
            'Считывает роли и порядок каналов',
            'Упаковывает права и настройки',
            'Отправляет JSON-файл в ответе'
          ],
          result: 'Получается файл, который можно использовать для импорта на другом сервере с Core.'
        },
        serverImport: {
          command: '/server-import file:<json>',
          label: 'Импорт JSON',
          title: 'Воссоздаёт сервер из файла',
          description: 'Core принимает JSON, проверяет данные, сохраняет снимок для отката и создаёт структуру на сервере.',
          steps: [
            'Загружает прикреплённый JSON',
            'Сохраняет снимок текущего состояния',
            'Создаёт недостающие роли и каналы'
          ],
          result: 'Структура из файла появляется на сервере после проверки и подтверждения владельцем.'
        },
        serverRollback: {
          command: '/server-rollback',
          label: 'Откат',
          title: 'Возвращает состояние сервера',
          description: 'Команда использует последний временный снимок, если с момента импорта или шаблона прошло меньше часа.',
          steps: [
            'Ищет активный снимок сервера',
            'Показывает подтверждение отката',
            'Восстанавливает роли, каналы и настройки'
          ],
          result: 'Если срок не истёк, сервер возвращается к состоянию до последнего крупного изменения.'
        }
      }
    },
    benefits: {
      eyebrow: 'Что умеет Core',
      title: 'Быстрый старт без ручной сборки каждого канала.',
      build: {
        title: 'Ставит шаблон',
        copy: 'Выбирай публичную заготовку и применяй готовые категории, каналы, роли и права под новый сервер.'
      },
      transfer: {
        title: 'Переносит структуру',
        copy: 'Экспортируй настройки сервера в JSON и импортируй их там, где нужно повторить оформление.'
      },
      protect: {
        title: 'Показывает заранее',
        copy: 'Перед применением владелец видит превью ролей, категорий и каналов, а затем подтверждает действие.'
      },
      restore: {
        title: 'Даёт путь назад',
        copy: 'Перед импортом Core сохраняет временный снимок, чтобы владелец мог откатить изменения в течение часа.'
      }
    },
    templates: {
      eyebrow: 'Публичные шаблоны',
      title: 'Галерея заготовок прямо с Core.',
      copy: 'Сайт берёт список из API бота и сам рисует карточки без скриншотов, чтобы каталог оставался лёгким для GitHub Pages.',
      sourceLabel: 'Источник',
      loading: 'Загружаю шаблоны...',
      ready: 'Доступно: {count}',
      empty: 'Публичных шаблонов пока нет.',
      error: 'Не удалось загрузить шаблоны. Проверь API бота.',
      refresh: 'Обновить',
      open: 'Открыть шаблон',
      add: 'Добавить Core',
      commandLabel: 'Команда',
      noDescription: 'Описание скоро появится.',
      roles: 'Роли',
      categories: 'Категории',
      textChannels: 'Текст',
      voiceChannels: 'Голос',
      updated: 'Обновлено',
      pageTitle: 'Выбери заготовку и посмотри структуру.',
      backHome: 'На главную',
      notConfigured: 'Для GitHub Pages укажи HTTPS URL Google Apps Script в assets/site-config.js.',
      previewTitle: 'Превью сервера',
      selectHint: 'Выбери заготовку слева, чтобы открыть структуру.',
      discordPreview: 'Discord preview',
      serverRoles: 'Роли сервера',
      noChannels: 'Каналы не указаны.',
      emptyCategory: 'Пустая категория',
      viewDetails: 'Открыть превью',
      useCommand: 'Команда применения',
      channelSettings: 'Настройки канала',
      channelType: 'Тип',
      channelPosition: 'Позиция',
      channelTopic: 'Описание',
      channelSlowmode: 'Медленный режим',
      channelNsfw: 'NSFW',
      channelBitrate: 'Битрейт',
      channelUserLimit: 'Лимит участников',
      channelOverwrites: 'Прав доступа',
      noChannelSettings: 'У канала нет отдельных настроек.',
      selectChannel: 'Нажми на канал, чтобы посмотреть его настройки.',
      typeText: 'Текстовый',
      typeVoice: 'Голосовой',
      typeAnnouncement: 'Объявления',
      typeForum: 'Форум',
      closePreview: 'Закрыть превью',
      summaryTitle: 'Сводка',
      tabSummary: 'Сводка',
      tabPreview: 'Превью',
      copy: 'Копировать',
      copied: 'Скопировано',
      yes: 'Да',
      no: 'Нет'
    },
    preview: {
      eyebrow: 'Как это выглядит',
      title: 'Структура появляется сразу',
      copy: 'Core создаёт понятные места для приветствия, правил, объявлений, общения, медиа и служебных каналов, если они есть в выбранном шаблоне.'
    },
    demo: {
      category1: 'Старт',
      category2: 'Общение',
      category3: 'Управление',
      channel1: 'добро-пожаловать',
      channel2: 'правила',
      channel3: 'объявления',
      channel4: 'чат',
      channel5: 'медиа',
      channel6: 'голосовой',
      channel7: 'заметки',
      channel8: 'логи',
      messageTitle: 'Шаблон применён',
      messageCopy: 'Каналы, роли и права созданы. Сервер можно настроить дальше или сразу запускать.',
      buildTitle: 'Создание структуры',
      buildStep1: 'Создаёт категории',
      buildStep2: 'Добавляет каналы',
      buildStep3: 'Расставляет права',
      buildStep4: 'Публикует результат',
      pill1: 'Шаблон',
      pill2: 'Превью',
      pill3: 'Импорт',
      pill4: 'Откат'
    },
    safety: {
      eyebrow: 'Спокойные изменения',
      title: 'Можно пробовать смелее',
      copy: 'Перед применением шаблона Core сохраняет резервное состояние сервера. Если результат не подошёл, владелец может откатиться в течение часа.',
      item1: 'Применение и откат доступны владельцу сервера.',
      item2: 'Резервная копия хранится ограниченное время.',
      item3: 'Если Discord не даёт удалить канал, Core сообщает об этом вместо тихого пропуска.'
    },
    final: {
      title: 'Добавь Core и начни с готовой структуры',
      copy: 'Подходит владельцам сообществ, проектов, игровых серверов и медиа-команд, которым нужен аккуратный Discord без долгой ручной сборки.',
      add: 'Добавить в Discord',
      server: 'Официальный сервер'
    },
    footer: {
      text: 'Создан для аккуратных Discord-серверов.',
      server: 'Официальный сервер'
    }
  },
  en: {
    meta: {
      title: 'Core - Discord server builder',
      description: 'Core helps Discord server owners use public templates, import and export server layouts, preview changes and roll back safely.'
    },
    nav: {
      home: 'Home',
      commands: 'Commands',
      templates: 'Templates',
      preview: 'Preview',
      safety: 'Rollback',
      catalog: 'Catalog',
      server: 'Server',
      add: 'Add'
    },
    hero: {
      eyebrow: 'Core for Discord',
      title: 'Your server is ready faster.',
      copy: 'Core helps server owners apply a ready structure, transfer layouts through JSON and review everything before changes go live.',
      add: 'Add Core',
      server: 'Official server',
      commands: 'View commands'
    },
    commands: {
      eyebrow: 'Available commands',
      title: 'Choose a command and see what it does.',
      copy: 'Commands work on servers where Core has the required permissions. Destructive changes require owner confirmation.',
      selected: 'Selected command',
      inputLabel: 'Discord input',
      items: {
        templateList: {
          command: '/template list',
          label: 'Template list',
          title: 'Shows public templates',
          description: 'Core lists the available public presets that can be previewed or applied to the server.',
          steps: [
            'Reads the public template folder',
            'Collects names and descriptions',
            'Sends the list to the server owner'
          ],
          result: 'The owner gets a compact list of available public presets.'
        },
        templatePreview: {
          command: '/template preview name:<template>',
          label: 'Template preview',
          title: 'Shows structure before applying',
          description: 'The command displays roles, categories, channels and settings from the selected public preset.',
          steps: [
            'Loads the selected template',
            'Sorts roles and channels',
            'Shows the preview in Discord'
          ],
          result: 'The owner understands exactly what will appear before confirming any change.'
        },
        templateSend: {
          command: '/template send name:<template>',
          label: 'Apply template',
          title: 'Applies a public preset',
          description: 'Core asks for confirmation, saves a temporary rollback snapshot and applies the template structure.',
          steps: [
            'Shows the confirmation screen',
            'Saves a rollback snapshot',
            'Creates roles, channels and permissions'
          ],
          result: 'After confirmation, the server gets the ready structure and rollback stays available for one hour.'
        },
        serverExport: {
          command: '/server-export',
          label: 'JSON export',
          title: 'Exports the server structure',
          description: 'The command collects roles, channels, permissions and settings into a JSON file for transfer through Core.',
          steps: [
            'Reads roles and channel order',
            'Packages permissions and settings',
            'Sends the JSON file in the reply'
          ],
          result: 'You receive a file that can be imported on another server with Core.'
        },
        serverImport: {
          command: '/server-import file:<json>',
          label: 'JSON import',
          title: 'Recreates a server from a file',
          description: 'Core reads the JSON, checks the data, saves a rollback snapshot and creates the structure on the server.',
          steps: [
            'Downloads the attached JSON',
            'Saves the current server snapshot',
            'Creates missing roles and channels'
          ],
          result: 'The file structure appears on the server after validation and owner confirmation.'
        },
        serverRollback: {
          command: '/server-rollback',
          label: 'Rollback',
          title: 'Restores the server state',
          description: 'The command uses the latest temporary snapshot if less than one hour has passed since import or template application.',
          steps: [
            'Finds the active server snapshot',
            'Shows rollback confirmation',
            'Restores roles, channels and settings'
          ],
          result: 'If the window has not expired, the server returns to its state before the last major change.'
        }
      }
    },
    benefits: {
      eyebrow: 'What Core Does',
      title: 'A faster start without rebuilding every channel by hand.',
      build: {
        title: 'Applies templates',
        copy: 'Pick a public preset and create ready categories, channels, roles and permissions for a new server.'
      },
      transfer: {
        title: 'Moves structure',
        copy: 'Export server settings to JSON and import them wherever the same layout is needed.'
      },
      protect: {
        title: 'Shows it first',
        copy: 'Before applying, the owner sees a preview of roles, categories and channels, then confirms the action.'
      },
      restore: {
        title: 'Gives a way back',
        copy: 'Before import, Core saves a temporary snapshot so the owner can roll back changes within one hour.'
      }
    },
    templates: {
      eyebrow: 'Public templates',
      title: 'A live gallery powered by Core.',
      copy: 'The static site reads the bot API and draws template cards without screenshots, so the catalog stays light for GitHub Pages.',
      sourceLabel: 'Source',
      loading: 'Loading templates...',
      ready: 'Available: {count}',
      empty: 'No public templates are available yet.',
      error: 'Templates could not be loaded. Check the bot API.',
      refresh: 'Refresh',
      open: 'Open template',
      add: 'Add Core',
      commandLabel: 'Command',
      noDescription: 'Description will appear soon.',
      roles: 'Roles',
      categories: 'Categories',
      textChannels: 'Text',
      voiceChannels: 'Voice',
      updated: 'Updated',
      pageTitle: 'Choose a preset and inspect the structure.',
      backHome: 'Home',
      notConfigured: 'For GitHub Pages, set the HTTPS Google Apps Script URL in assets/site-config.js.',
      previewTitle: 'Server preview',
      selectHint: 'Choose a preset on the left to open its structure.',
      discordPreview: 'Discord preview',
      serverRoles: 'Server roles',
      noChannels: 'No channels listed.',
      emptyCategory: 'Empty category',
      viewDetails: 'Open preview',
      useCommand: 'Apply command',
      channelSettings: 'Channel settings',
      channelType: 'Type',
      channelPosition: 'Position',
      channelTopic: 'Topic',
      channelSlowmode: 'Slowmode',
      channelNsfw: 'NSFW',
      channelBitrate: 'Bitrate',
      channelUserLimit: 'User limit',
      channelOverwrites: 'Permission overwrites',
      noChannelSettings: 'This channel has no separate settings.',
      selectChannel: 'Click a channel to inspect its settings.',
      typeText: 'Text',
      typeVoice: 'Voice',
      typeAnnouncement: 'Announcement',
      typeForum: 'Forum',
      closePreview: 'Close preview',
      summaryTitle: 'Summary',
      tabSummary: 'Summary',
      tabPreview: 'Preview',
      copy: 'Copy',
      copied: 'Copied',
      yes: 'Yes',
      no: 'No'
    },
    preview: {
      eyebrow: 'How it looks',
      title: 'The structure appears immediately',
      copy: 'Core creates clear places for welcome, rules, announcements, chat, media and utility channels when they exist in the selected template.'
    },
    demo: {
      category1: 'Start',
      category2: 'Community',
      category3: 'Management',
      channel1: 'welcome',
      channel2: 'rules',
      channel3: 'announcements',
      channel4: 'chat',
      channel5: 'media',
      channel6: 'voice',
      channel7: 'notes',
      channel8: 'logs',
      messageTitle: 'Template applied',
      messageCopy: 'Channels, roles and permissions are ready. Continue customizing or launch the server right away.',
      buildTitle: 'Structure creation',
      buildStep1: 'Creates categories',
      buildStep2: 'Adds channels',
      buildStep3: 'Applies permissions',
      buildStep4: 'Publishes the result',
      pill1: 'Template',
      pill2: 'Preview',
      pill3: 'Import',
      pill4: 'Rollback'
    },
    safety: {
      eyebrow: 'Safer changes',
      title: 'Experiment with less stress',
      copy: 'Before applying a template, Core saves a backup state. If the result is not right, the owner can roll back within one hour.',
      item1: 'Apply and rollback are available to the server owner.',
      item2: 'The backup is stored for a limited time.',
      item3: 'If Discord blocks channel deletion, Core shows it instead of silently skipping it.'
    },
    final: {
      title: 'Add Core and start with a ready structure',
      copy: 'Useful for community owners, projects, gaming servers and media teams that need a clean Discord without long manual setup.',
      add: 'Add to Discord',
      server: 'Official server'
    },
    footer: {
      text: 'Built for cleaner Discord servers.',
      server: 'Official server'
    }
  },
  ua: {
    meta: {
      title: 'Core - бот для Discord-серверів',
      description: 'Core допомагає власникам Discord-серверів використовувати публічні шаблони, імпорт і експорт структури, превью змін та безпечний відкат.'
    },
    nav: {
      home: 'Головна',
      commands: 'Команди',
      templates: 'Шаблони',
      preview: 'Превью',
      safety: 'Відкат',
      catalog: 'Каталог',
      server: 'Сервер',
      add: 'Додати'
    },
    hero: {
      eyebrow: 'Core for Discord',
      title: 'Сервер готовий швидше.',
      copy: 'Core допомагає власнику сервера швидко поставити готову структуру, перенести оформлення через JSON і перевірити все перед застосуванням.',
      add: 'Додати Core',
      server: 'Офіційний сервер',
      commands: 'Переглянути команди'
    },
    commands: {
      eyebrow: 'Доступні команди',
      title: 'Обери команду й подивися, що вона робить.',
      copy: 'Команди працюють на серверах, де Core доданий з потрібними правами. Небезпечні дії потребують підтвердження власника сервера.',
      selected: 'Обрана команда',
      inputLabel: 'Discord input',
      items: {
        templateList: {
          command: '/template list',
          label: 'Список шаблонів',
          title: 'Показує публічні шаблони',
          description: 'Core виводить доступні заготовки, які можна переглянути або застосувати на сервері.',
          steps: [
            'Читає папку публічних шаблонів',
            'Збирає назви та описи',
            'Надсилає список власнику сервера'
          ],
          result: 'На виході власник бачить короткий список доступних публічних заготовок.'
        },
        templatePreview: {
          command: '/template preview name:<template>',
          label: 'Превью шаблону',
          title: 'Показує структуру до застосування',
          description: 'Команда розкриває ролі, категорії, канали та налаштування обраної публічної заготовки.',
          steps: [
            'Завантажує обраний шаблон',
            'Сортує ролі та канали',
            'Показує превью в Discord'
          ],
          result: 'Власник розуміє, що саме з’явиться на сервері, до підтвердження змін.'
        },
        templateSend: {
          command: '/template send name:<template>',
          label: 'Застосувати шаблон',
          title: 'Застосовує публічну заготовку',
          description: 'Core показує підтвердження, створює тимчасовий знімок і переносить структуру шаблону на сервер.',
          steps: [
            'Показує вікно підтвердження',
            'Зберігає знімок для відкату',
            'Створює ролі, канали та права'
          ],
          result: 'Після підтвердження сервер отримує готову структуру, а відкат лишається доступним одну годину.'
        },
        serverExport: {
          command: '/server-export',
          label: 'Експорт JSON',
          title: 'Вивантажує структуру сервера',
          description: 'Команда збирає ролі, канали, права та налаштування сервера в JSON-файл для перенесення через Core.',
          steps: [
            'Зчитує ролі та порядок каналів',
            'Пакує права та налаштування',
            'Надсилає JSON-файл у відповіді'
          ],
          result: 'Виходить файл, який можна використати для імпорту на іншому сервері з Core.'
        },
        serverImport: {
          command: '/server-import file:<json>',
          label: 'Імпорт JSON',
          title: 'Відтворює сервер із файлу',
          description: 'Core приймає JSON, перевіряє дані, зберігає знімок для відкату та створює структуру на сервері.',
          steps: [
            'Завантажує прикріплений JSON',
            'Зберігає знімок поточного стану',
            'Створює відсутні ролі та канали'
          ],
          result: 'Структура з файлу з’являється на сервері після перевірки та підтвердження власником.'
        },
        serverRollback: {
          command: '/server-rollback',
          label: 'Відкат',
          title: 'Повертає стан сервера',
          description: 'Команда використовує останній тимчасовий знімок, якщо після імпорту або шаблону минуло менше години.',
          steps: [
            'Шукає активний знімок сервера',
            'Показує підтвердження відкату',
            'Відновлює ролі, канали та налаштування'
          ],
          result: 'Якщо строк не минув, сервер повертається до стану перед останньою великою зміною.'
        }
      }
    },
    benefits: {
      eyebrow: 'Що вміє Core',
      title: 'Швидкий старт без ручного збирання кожного каналу.',
      build: {
        title: 'Ставить шаблон',
        copy: 'Обирай публічну заготовку й застосовуй готові категорії, канали, ролі та права для нового сервера.'
      },
      transfer: {
        title: 'Переносить структуру',
        copy: 'Експортуй налаштування сервера в JSON та імпортуй їх там, де потрібно повторити оформлення.'
      },
      protect: {
        title: 'Показує заздалегідь',
        copy: 'Перед застосуванням власник бачить превью ролей, категорій і каналів, а потім підтверджує дію.'
      },
      restore: {
        title: 'Дає шлях назад',
        copy: 'Перед імпортом Core зберігає тимчасовий знімок, щоб власник міг відкотити зміни протягом години.'
      }
    },
    templates: {
      eyebrow: 'Публічні шаблони',
      title: 'Галерея заготовок прямо з Core.',
      copy: 'Статичний сайт читає API бота й сам малює картки без скриншотів, щоб каталог лишався легким для GitHub Pages.',
      sourceLabel: 'Джерело',
      loading: 'Завантажую шаблони...',
      ready: 'Доступно: {count}',
      empty: 'Публічних шаблонів поки немає.',
      error: 'Не вдалося завантажити шаблони. Перевір API бота.',
      refresh: 'Оновити',
      open: 'Відкрити шаблон',
      add: 'Додати Core',
      commandLabel: 'Команда',
      noDescription: 'Опис скоро з’явиться.',
      roles: 'Ролі',
      categories: 'Категорії',
      textChannels: 'Текст',
      voiceChannels: 'Голос',
      updated: 'Оновлено',
      pageTitle: 'Обери заготовку й переглянь структуру.',
      backHome: 'На головну',
      notConfigured: 'Для GitHub Pages вкажи HTTPS URL Google Apps Script в assets/site-config.js.',
      previewTitle: 'Превью сервера',
      selectHint: 'Обери заготовку зліва, щоб відкрити структуру.',
      discordPreview: 'Discord preview',
      serverRoles: 'Ролі сервера',
      noChannels: 'Канали не вказані.',
      emptyCategory: 'Порожня категорія',
      viewDetails: 'Відкрити превью',
      useCommand: 'Команда застосування',
      channelSettings: 'Налаштування каналу',
      channelType: 'Тип',
      channelPosition: 'Позиція',
      channelTopic: 'Опис',
      channelSlowmode: 'Повільний режим',
      channelNsfw: 'NSFW',
      channelBitrate: 'Бітрейт',
      channelUserLimit: 'Ліміт учасників',
      channelOverwrites: 'Прав доступу',
      noChannelSettings: 'У каналу немає окремих налаштувань.',
      selectChannel: 'Натисни на канал, щоб переглянути його налаштування.',
      typeText: 'Текстовий',
      typeVoice: 'Голосовий',
      typeAnnouncement: 'Оголошення',
      typeForum: 'Форум',
      closePreview: 'Закрити превью',
      summaryTitle: 'Зведення',
      tabSummary: 'Зведення',
      tabPreview: 'Превью',
      copy: 'Скопіювати',
      copied: 'Скопійовано',
      yes: 'Так',
      no: 'Ні'
    },
    preview: {
      eyebrow: 'Як це виглядає',
      title: 'Структура з’являється одразу',
      copy: 'Core створює зрозумілі місця для привітання, правил, оголошень, спілкування, медіа та службових каналів, якщо вони є в обраному шаблоні.'
    },
    demo: {
      category1: 'Старт',
      category2: 'Спілкування',
      category3: 'Керування',
      channel1: 'ласкаво-просимо',
      channel2: 'правила',
      channel3: 'оголошення',
      channel4: 'чат',
      channel5: 'медіа',
      channel6: 'голосовий',
      channel7: 'нотатки',
      channel8: 'логи',
      messageTitle: 'Шаблон застосовано',
      messageCopy: 'Канали, ролі та права створено. Сервер можна налаштовувати далі або запускати одразу.',
      buildTitle: 'Створення структури',
      buildStep1: 'Створює категорії',
      buildStep2: 'Додає канали',
      buildStep3: 'Розставляє права',
      buildStep4: 'Публікує результат',
      pill1: 'Шаблон',
      pill2: 'Превью',
      pill3: 'Імпорт',
      pill4: 'Відкат'
    },
    safety: {
      eyebrow: 'Спокійні зміни',
      title: 'Можна пробувати сміливіше',
      copy: 'Перед застосуванням шаблону Core зберігає резервний стан сервера. Якщо результат не підійшов, власник може відкотитися протягом години.',
      item1: 'Застосування і відкат доступні власнику сервера.',
      item2: 'Резервна копія зберігається обмежений час.',
      item3: 'Якщо Discord не дає видалити канал, Core повідомляє про це замість тихого пропуску.'
    },
    final: {
      title: 'Додай Core і почни з готової структури',
      copy: 'Підійде власникам спільнот, проєктів, ігрових серверів і медіа-команд, яким потрібен акуратний Discord без довгого ручного збирання.',
      add: 'Додати у Discord',
      server: 'Офіційний сервер'
    },
    footer: {
      text: 'Створено для акуратних Discord-серверів.',
      server: 'Офіційний сервер'
    }
  },
  de: {
    meta: {
      title: 'Core - Bot für Discord-Server',
      description: 'Core hilft Discord-Serverbesitzern mit öffentlichen Vorlagen, Import und Export von Serverstrukturen, Vorschau und sicherem Rollback.'
    },
    nav: {
      home: 'Start',
      commands: 'Befehle',
      templates: 'Vorlagen',
      preview: 'Vorschau',
      safety: 'Rollback',
      catalog: 'Katalog',
      server: 'Server',
      add: 'Hinzufügen'
    },
    hero: {
      eyebrow: 'Core for Discord',
      title: 'Dein Server ist schneller bereit.',
      copy: 'Core hilft Serverbesitzern, eine fertige Struktur anzuwenden, Layouts per JSON zu übertragen und alles vor der Anwendung zu prüfen.',
      add: 'Core hinzufügen',
      server: 'Offizieller Server',
      commands: 'Befehle ansehen'
    },
    commands: {
      eyebrow: 'Verfügbare Befehle',
      title: 'Wähle einen Befehl und sieh, was er macht.',
      copy: 'Die Befehle funktionieren auf Servern, auf denen Core die nötigen Rechte hat. Gefährliche Änderungen brauchen eine Bestätigung des Besitzers.',
      selected: 'Ausgewählter Befehl',
      inputLabel: 'Discord input',
      items: {
        templateList: {
          command: '/template list',
          label: 'Vorlagenliste',
          title: 'Zeigt öffentliche Vorlagen',
          description: 'Core listet verfügbare öffentliche Vorlagen, die angesehen oder auf dem Server angewendet werden können.',
          steps: [
            'Liest den Ordner mit öffentlichen Vorlagen',
            'Sammelt Namen und Beschreibungen',
            'Sendet die Liste an den Serverbesitzer'
          ],
          result: 'Der Besitzer erhält eine kompakte Liste der verfügbaren öffentlichen Vorlagen.'
        },
        templatePreview: {
          command: '/template preview name:<template>',
          label: 'Vorlagenvorschau',
          title: 'Zeigt die Struktur vor der Anwendung',
          description: 'Der Befehl zeigt Rollen, Kategorien, Kanäle und Einstellungen der gewählten öffentlichen Vorlage.',
          steps: [
            'Lädt die gewählte Vorlage',
            'Sortiert Rollen und Kanäle',
            'Zeigt die Vorschau in Discord'
          ],
          result: 'Der Besitzer sieht vor der Bestätigung genau, was auf dem Server erscheint.'
        },
        templateSend: {
          command: '/template send name:<template>',
          label: 'Vorlage anwenden',
          title: 'Wendet eine öffentliche Vorlage an',
          description: 'Core fragt nach Bestätigung, speichert einen temporären Rollback-Schnappschuss und überträgt die Struktur.',
          steps: [
            'Zeigt die Bestätigung',
            'Speichert einen Rollback-Schnappschuss',
            'Erstellt Rollen, Kanäle und Rechte'
          ],
          result: 'Nach der Bestätigung erhält der Server die fertige Struktur und Rollback bleibt eine Stunde verfügbar.'
        },
        serverExport: {
          command: '/server-export',
          label: 'JSON-Export',
          title: 'Exportiert die Serverstruktur',
          description: 'Der Befehl sammelt Rollen, Kanäle, Rechte und Einstellungen in einer JSON-Datei für den Transfer mit Core.',
          steps: [
            'Liest Rollen und Kanalreihenfolge',
            'Packt Rechte und Einstellungen',
            'Sendet die JSON-Datei in der Antwort'
          ],
          result: 'Du erhältst eine Datei, die auf einem anderen Server mit Core importiert werden kann.'
        },
        serverImport: {
          command: '/server-import file:<json>',
          label: 'JSON-Import',
          title: 'Stellt einen Server aus einer Datei nach',
          description: 'Core liest die JSON-Datei, prüft die Daten, speichert einen Rollback-Schnappschuss und erstellt die Struktur.',
          steps: [
            'Lädt die angehängte JSON-Datei',
            'Speichert den aktuellen Serverzustand',
            'Erstellt fehlende Rollen und Kanäle'
          ],
          result: 'Die Struktur aus der Datei erscheint nach Prüfung und Bestätigung des Besitzers auf dem Server.'
        },
        serverRollback: {
          command: '/server-rollback',
          label: 'Rollback',
          title: 'Stellt den Serverzustand wieder her',
          description: 'Der Befehl nutzt den letzten temporären Schnappschuss, wenn seit Import oder Vorlage weniger als eine Stunde vergangen ist.',
          steps: [
            'Sucht den aktiven Server-Schnappschuss',
            'Zeigt die Rollback-Bestätigung',
            'Stellt Rollen, Kanäle und Einstellungen wieder her'
          ],
          result: 'Wenn das Zeitfenster noch offen ist, kehrt der Server zum Zustand vor der letzten großen Änderung zurück.'
        }
      }
    },
    benefits: {
      eyebrow: 'Was Core kann',
      title: 'Schneller Start ohne jeden Kanal von Hand zu bauen.',
      build: {
        title: 'Wendet Vorlagen an',
        copy: 'Wähle eine öffentliche Vorlage und erstelle fertige Kategorien, Kanäle, Rollen und Rechte für einen neuen Server.'
      },
      transfer: {
        title: 'Überträgt Struktur',
        copy: 'Exportiere Servereinstellungen als JSON und importiere sie dort, wo dasselbe Layout gebraucht wird.'
      },
      protect: {
        title: 'Zeigt es vorher',
        copy: 'Vor der Anwendung sieht der Besitzer eine Vorschau von Rollen, Kategorien und Kanälen und bestätigt danach die Aktion.'
      },
      restore: {
        title: 'Gibt einen Weg zurück',
        copy: 'Vor dem Import speichert Core einen temporären Schnappschuss, damit der Besitzer Änderungen innerhalb einer Stunde zurückrollen kann.'
      }
    },
    templates: {
      eyebrow: 'Öffentliche Vorlagen',
      title: 'Eine Live-Galerie direkt aus Core.',
      copy: 'Die statische Seite liest die Bot-API und zeichnet Vorlagenkarten ohne Screenshots, damit der Katalog auf GitHub Pages leicht bleibt.',
      sourceLabel: 'Quelle',
      loading: 'Vorlagen werden geladen...',
      ready: 'Verfügbar: {count}',
      empty: 'Es sind noch keine öffentlichen Vorlagen verfügbar.',
      error: 'Vorlagen konnten nicht geladen werden. Prüfe die Bot-API.',
      refresh: 'Aktualisieren',
      open: 'Vorlage öffnen',
      add: 'Core hinzufügen',
      commandLabel: 'Befehl',
      noDescription: 'Beschreibung erscheint bald.',
      roles: 'Rollen',
      categories: 'Kategorien',
      textChannels: 'Text',
      voiceChannels: 'Sprache',
      updated: 'Aktualisiert',
      pageTitle: 'Wähle eine Vorlage und prüfe die Struktur.',
      backHome: 'Startseite',
      notConfigured: 'Für GitHub Pages trage die HTTPS-URL von Google Apps Script in assets/site-config.js ein.',
      previewTitle: 'Servervorschau',
      selectHint: 'Wähle links eine Vorlage, um ihre Struktur zu öffnen.',
      discordPreview: 'Discord preview',
      serverRoles: 'Serverrollen',
      noChannels: 'Keine Kanäle gelistet.',
      emptyCategory: 'Leere Kategorie',
      viewDetails: 'Vorschau öffnen',
      useCommand: 'Anwendungsbefehl',
      channelSettings: 'Kanaleinstellungen',
      channelType: 'Typ',
      channelPosition: 'Position',
      channelTopic: 'Beschreibung',
      channelSlowmode: 'Slowmode',
      channelNsfw: 'NSFW',
      channelBitrate: 'Bitrate',
      channelUserLimit: 'Nutzerlimit',
      channelOverwrites: 'Rechte-Overrides',
      noChannelSettings: 'Dieser Kanal hat keine eigenen Einstellungen.',
      selectChannel: 'Klicke auf einen Kanal, um seine Einstellungen zu sehen.',
      typeText: 'Text',
      typeVoice: 'Sprache',
      typeAnnouncement: 'Ankündigung',
      typeForum: 'Forum',
      closePreview: 'Vorschau schließen',
      summaryTitle: 'Übersicht',
      tabSummary: 'Übersicht',
      tabPreview: 'Vorschau',
      copy: 'Kopieren',
      copied: 'Kopiert',
      yes: 'Ja',
      no: 'Nein'
    },
    preview: {
      eyebrow: 'So sieht es aus',
      title: 'Die Struktur erscheint sofort',
      copy: 'Core erstellt klare Orte für Willkommen, Regeln, Ankündigungen, Chat, Medien und Hilfskanäle, wenn sie in der gewählten Vorlage enthalten sind.'
    },
    demo: {
      category1: 'Start',
      category2: 'Community',
      category3: 'Verwaltung',
      channel1: 'willkommen',
      channel2: 'regeln',
      channel3: 'ankündigungen',
      channel4: 'chat',
      channel5: 'medien',
      channel6: 'sprachraum',
      channel7: 'notizen',
      channel8: 'logs',
      messageTitle: 'Vorlage angewendet',
      messageCopy: 'Kanäle, Rollen und Rechte sind bereit. Passe weiter an oder starte den Server direkt.',
      buildTitle: 'Struktur erstellen',
      buildStep1: 'Erstellt Kategorien',
      buildStep2: 'Fügt Kanäle hinzu',
      buildStep3: 'Setzt Rechte',
      buildStep4: 'Veröffentlicht das Ergebnis',
      pill1: 'Vorlage',
      pill2: 'Vorschau',
      pill3: 'Import',
      pill4: 'Rollback'
    },
    safety: {
      eyebrow: 'Ruhigere Änderungen',
      title: 'Du kannst mutiger ausprobieren',
      copy: 'Vor einer Vorlage speichert Core einen Backup-Zustand. Wenn das Ergebnis nicht passt, kann der Besitzer innerhalb einer Stunde zurückrollen.',
      item1: 'Anwendung und Rollback sind für den Serverbesitzer verfügbar.',
      item2: 'Das Backup wird nur begrenzte Zeit gespeichert.',
      item3: 'Wenn Discord das Löschen blockiert, zeigt Core es an statt still zu überspringen.'
    },
    final: {
      title: 'Füge Core hinzu und starte mit Struktur',
      copy: 'Geeignet für Community-Besitzer, Projekte, Gaming-Server und Medienteams, die einen sauberen Discord ohne lange Handarbeit wollen.',
      add: 'Zu Discord hinzufügen',
      server: 'Offizieller Server'
    },
    footer: {
      text: 'Gebaut für sauberere Discord-Server.',
      server: 'Offizieller Server'
    }
  }
};

let activeCommand = 'templateList';
let currentLanguage = 'ru';
let commandTypingTimers = [];
const templateGalleryState = {
  status: 'idle',
  templates: [],
  error: '',
  activeName: '',
  activeChannelKey: '',
  activeTab: 'summary'
};

const simulationCopy = {
  ru: {
    owner: 'Владелец',
    ownerShort: 'В',
    bot: 'Core',
    actions: {
      preview: 'Превью',
      apply: 'Применить',
      cancel: 'Отмена',
      import: 'Импортировать',
      rollback: 'Откатить'
    },
    modes: {
      templateList: {
        status: 'Core ищет доступные публичные шаблоны...',
        meta: '3 templates',
        cardTitle: 'Публичные шаблоны',
        copy: 'Список появляется прямо в ответе бота.',
        type: 'list',
        rows: ['minimalistic-template', 'community-start', 'gaming-rooms'],
        actions: ['preview', 'apply']
      },
      templatePreview: {
        status: 'Core собирает превью выбранной заготовки...',
        meta: 'preview',
        cardTitle: 'minimalistic-template',
        copy: 'В ответе видны роли, категории, каналы и основные настройки.',
        type: 'preview',
        rows: ['Owner, Admin, Member', 'Старт: welcome, rules', 'Общение: chat, media, voice'],
        actions: ['apply']
      },
      templateSend: {
        status: 'Core ждёт подтверждение владельца...',
        meta: '60 sec',
        cardTitle: 'Применить minimalistic-template',
        copy: 'Перед созданием структуры бот показывает подтверждение и сохраняет снимок для отката.',
        type: 'create',
        rows: ['Создана роль Member', 'Создан канал #welcome', 'Создан голосовой канал voice'],
        actions: ['apply', 'cancel']
      },
      serverExport: {
        status: 'Core собирает структуру сервера в JSON...',
        meta: 'download',
        cardTitle: 'Файл создан',
        copy: 'После экспорта бот прикрепляет JSON-файл в ответе.',
        type: 'file',
        fileName: 'minimalistic-server-config.json',
        fileMeta: 'roles + channels + permissions + settings'
      },
      serverImport: {
        status: 'Core читает прикреплённый JSON-файл...',
        meta: 'upload',
        cardTitle: 'Импорт из файла',
        copy: 'Бот проверяет файл, сохраняет снимок и создаёт недостающую структуру.',
        type: 'create',
        rows: ['Файл принят: server-config.json', 'Создана категория Start', 'Созданы каналы #rules и #chat'],
        actions: ['import', 'cancel']
      },
      serverRollback: {
        status: 'Core ищет активный снимок сервера...',
        meta: '1 hour',
        cardTitle: 'Доступен откат',
        copy: 'Если срок не истёк, бот показывает снимок и возвращает структуру назад.',
        type: 'snapshot',
        rows: ['Снимок: 38 минут назад', 'Источник: /server-import', 'Вернуть роли, каналы и настройки'],
        actions: ['rollback', 'cancel']
      }
    }
  },
  en: {
    owner: 'Owner',
    ownerShort: 'O',
    bot: 'Core',
    actions: {
      preview: 'Preview',
      apply: 'Apply',
      cancel: 'Cancel',
      import: 'Import',
      rollback: 'Rollback'
    },
    modes: {
      templateList: {
        status: 'Core is looking for public templates...',
        meta: '3 templates',
        cardTitle: 'Public templates',
        copy: 'The list appears directly in the bot reply.',
        type: 'list',
        rows: ['minimalistic-template', 'community-start', 'gaming-rooms'],
        actions: ['preview', 'apply']
      },
      templatePreview: {
        status: 'Core is building the selected template preview...',
        meta: 'preview',
        cardTitle: 'minimalistic-template',
        copy: 'The reply shows roles, categories, channels and main settings.',
        type: 'preview',
        rows: ['Owner, Admin, Member', 'Start: welcome, rules', 'Community: chat, media, voice'],
        actions: ['apply']
      },
      templateSend: {
        status: 'Core is waiting for owner confirmation...',
        meta: '60 sec',
        cardTitle: 'Apply minimalistic-template',
        copy: 'Before creating the structure, the bot shows confirmation and saves a rollback snapshot.',
        type: 'create',
        rows: ['Created role Member', 'Created channel #welcome', 'Created voice channel voice'],
        actions: ['apply', 'cancel']
      },
      serverExport: {
        status: 'Core is packing the server structure into JSON...',
        meta: 'download',
        cardTitle: 'File created',
        copy: 'After export, the bot attaches the JSON file in the reply.',
        type: 'file',
        fileName: 'minimalistic-server-config.json',
        fileMeta: 'roles + channels + permissions + settings'
      },
      serverImport: {
        status: 'Core is reading the attached JSON file...',
        meta: 'upload',
        cardTitle: 'Import from file',
        copy: 'The bot validates the file, saves a snapshot and creates missing structure.',
        type: 'create',
        rows: ['Accepted file: server-config.json', 'Created category Start', 'Created channels #rules and #chat'],
        actions: ['import', 'cancel']
      },
      serverRollback: {
        status: 'Core is looking for an active server snapshot...',
        meta: '1 hour',
        cardTitle: 'Rollback available',
        copy: 'If the window is still open, the bot shows the snapshot and restores the structure.',
        type: 'snapshot',
        rows: ['Snapshot: 38 minutes ago', 'Source: /server-import', 'Restore roles, channels and settings'],
        actions: ['rollback', 'cancel']
      }
    }
  },
  ua: {
    owner: 'Власник',
    ownerShort: 'В',
    bot: 'Core',
    actions: {
      preview: 'Превью',
      apply: 'Застосувати',
      cancel: 'Скасувати',
      import: 'Імпортувати',
      rollback: 'Відкотити'
    },
    modes: {
      templateList: {
        status: 'Core шукає доступні публічні шаблони...',
        meta: '3 templates',
        cardTitle: 'Публічні шаблони',
        copy: 'Список з’являється прямо у відповіді бота.',
        type: 'list',
        rows: ['minimalistic-template', 'community-start', 'gaming-rooms'],
        actions: ['preview', 'apply']
      },
      templatePreview: {
        status: 'Core збирає превью обраної заготовки...',
        meta: 'preview',
        cardTitle: 'minimalistic-template',
        copy: 'У відповіді видно ролі, категорії, канали та основні налаштування.',
        type: 'preview',
        rows: ['Owner, Admin, Member', 'Старт: welcome, rules', 'Спілкування: chat, media, voice'],
        actions: ['apply']
      },
      templateSend: {
        status: 'Core чекає підтвердження власника...',
        meta: '60 sec',
        cardTitle: 'Застосувати minimalistic-template',
        copy: 'Перед створенням структури бот показує підтвердження і зберігає знімок для відкату.',
        type: 'create',
        rows: ['Створено роль Member', 'Створено канал #welcome', 'Створено голосовий канал voice'],
        actions: ['apply', 'cancel']
      },
      serverExport: {
        status: 'Core збирає структуру сервера в JSON...',
        meta: 'download',
        cardTitle: 'Файл створено',
        copy: 'Після експорту бот прикріплює JSON-файл у відповіді.',
        type: 'file',
        fileName: 'minimalistic-server-config.json',
        fileMeta: 'roles + channels + permissions + settings'
      },
      serverImport: {
        status: 'Core читає прикріплений JSON-файл...',
        meta: 'upload',
        cardTitle: 'Імпорт із файлу',
        copy: 'Бот перевіряє файл, зберігає знімок і створює відсутню структуру.',
        type: 'create',
        rows: ['Файл прийнято: server-config.json', 'Створено категорію Start', 'Створено канали #rules і #chat'],
        actions: ['import', 'cancel']
      },
      serverRollback: {
        status: 'Core шукає активний знімок сервера...',
        meta: '1 hour',
        cardTitle: 'Доступний відкат',
        copy: 'Якщо строк не минув, бот показує знімок і повертає структуру назад.',
        type: 'snapshot',
        rows: ['Знімок: 38 хвилин тому', 'Джерело: /server-import', 'Повернути ролі, канали та налаштування'],
        actions: ['rollback', 'cancel']
      }
    }
  },
  de: {
    owner: 'Besitzer',
    ownerShort: 'B',
    bot: 'Core',
    actions: {
      preview: 'Vorschau',
      apply: 'Anwenden',
      cancel: 'Abbrechen',
      import: 'Importieren',
      rollback: 'Rollback'
    },
    modes: {
      templateList: {
        status: 'Core sucht verfügbare öffentliche Vorlagen...',
        meta: '3 templates',
        cardTitle: 'Öffentliche Vorlagen',
        copy: 'Die Liste erscheint direkt in der Bot-Antwort.',
        type: 'list',
        rows: ['minimalistic-template', 'community-start', 'gaming-rooms'],
        actions: ['preview', 'apply']
      },
      templatePreview: {
        status: 'Core baut die Vorschau der gewählten Vorlage...',
        meta: 'preview',
        cardTitle: 'minimalistic-template',
        copy: 'Die Antwort zeigt Rollen, Kategorien, Kanäle und wichtige Einstellungen.',
        type: 'preview',
        rows: ['Owner, Admin, Member', 'Start: welcome, rules', 'Community: chat, media, voice'],
        actions: ['apply']
      },
      templateSend: {
        status: 'Core wartet auf die Bestätigung des Besitzers...',
        meta: '60 sec',
        cardTitle: 'minimalistic-template anwenden',
        copy: 'Vor dem Erstellen zeigt der Bot eine Bestätigung und speichert einen Rollback-Schnappschuss.',
        type: 'create',
        rows: ['Rolle Member erstellt', 'Kanal #welcome erstellt', 'Sprachkanal voice erstellt'],
        actions: ['apply', 'cancel']
      },
      serverExport: {
        status: 'Core packt die Serverstruktur in JSON...',
        meta: 'download',
        cardTitle: 'Datei erstellt',
        copy: 'Nach dem Export hängt der Bot die JSON-Datei an die Antwort.',
        type: 'file',
        fileName: 'minimalistic-server-config.json',
        fileMeta: 'roles + channels + permissions + settings'
      },
      serverImport: {
        status: 'Core liest die angehängte JSON-Datei...',
        meta: 'upload',
        cardTitle: 'Import aus Datei',
        copy: 'Der Bot prüft die Datei, speichert einen Schnappschuss und erstellt fehlende Struktur.',
        type: 'create',
        rows: ['Datei angenommen: server-config.json', 'Kategorie Start erstellt', 'Kanäle #rules und #chat erstellt'],
        actions: ['import', 'cancel']
      },
      serverRollback: {
        status: 'Core sucht einen aktiven Server-Schnappschuss...',
        meta: '1 hour',
        cardTitle: 'Rollback verfügbar',
        copy: 'Wenn das Zeitfenster offen ist, zeigt der Bot den Schnappschuss und stellt die Struktur wieder her.',
        type: 'snapshot',
        rows: ['Schnappschuss: vor 38 Minuten', 'Quelle: /server-import', 'Rollen, Kanäle und Einstellungen wiederherstellen'],
        actions: ['rollback', 'cancel']
      }
    }
  }
};

function getNestedValue(object, path) {
  return path.split('.').reduce((current, key) => current?.[key], object);
}

function getDictionary(lang) {
  return translations[lang] || translations.ru;
}

function getSimulationCopy(lang) {
  return simulationCopy[lang] || simulationCopy.en;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatText(template, values = {}) {
  return String(template || '').replace(/\{(\w+)\}/g, (_, key) => (
    values[key] === undefined ? `{${key}}` : String(values[key])
  ));
}

function getTemplatesDictionary() {
  return getDictionary(currentLanguage).templates || translations.en.templates;
}

function safeHttpUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  try {
    const url = new URL(raw, window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function formatDateLabel(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(document.documentElement.lang || 'en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(date);
}

function makeTemplateAccent(name, index) {
  const accents = ['#f2a51a', '#44b8de', '#35b46f', '#df6b55', '#9a87ff', '#e4c85d'];
  const seed = Array.from(String(name || '')).reduce((sum, char) => sum + char.charCodeAt(0), index);
  return accents[Math.abs(seed) % accents.length];
}

function makeTemplateInitials(name) {
  const parts = String(name || 'Core')
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return (parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : (parts[0] || 'C').slice(0, 2)).toUpperCase();
}

function getTemplateDisplayName(template) {
  return template.displayName || template.serverName || template.name || 'Core Template';
}

function getTemplateByName(name) {
  return templateGalleryState.templates.find((template) => template.name === name) || null;
}

function getActiveTemplate() {
  return getTemplateByName(templateGalleryState.activeName);
}

function getChannelIcon(kind) {
  if (kind === 'voice') return '🔊';
  if (kind === 'announcement') return '📢';
  if (kind === 'forum') return '▣';
  return '#';
}

function normalizeHexColor(value) {
  const color = String(value || '').trim();
  return /^#[0-9a-f]{6}$/i.test(color) ? color : '';
}

function getPreviewChannels(template) {
  const categories = template.preview?.categories || [];
  const channels = [];

  categories.forEach((category, categoryIndex) => {
    (category.channels || []).forEach((channel, channelIndex) => {
      channels.push({
        ...channel,
        categoryName: category.name || 'Category',
        key: `${categoryIndex}:${channelIndex}`
      });
    });
  });

  return channels;
}

function getActivePreviewChannel(template) {
  const channels = getPreviewChannels(template);
  return channels.find((channel) => channel.key === templateGalleryState.activeChannelKey) || channels[0] || null;
}

function renderMiniDiscordPreview(template, labels, limitCategories = 3, limitChannels = 5, options = {}) {
  const categories = template.preview?.categories || [];
  const interactive = Boolean(options.interactive);
  const activeChannel = getActivePreviewChannel(template);

  if (!categories.length) {
    return `<div class="mini-discord-empty">${escapeHtml(labels.noChannels)}</div>`;
  }

  return `
    <div class="mini-discord">
      ${categories.slice(0, limitCategories).map((category) => `
        <div class="mini-discord-category">
          <span>${escapeHtml(category.name || 'Category')}</span>
          ${(category.channels || []).length ? (category.channels || []).slice(0, limitChannels).map((channel, channelIndex) => {
            const categoryIndex = categories.indexOf(category);
            const channelKey = `${categoryIndex}:${channelIndex}`;
            const isActive = activeChannel?.key === channelKey;
            const channelContent = `
              <i>${escapeHtml(getChannelIcon(channel.kind))}</i>
              <strong>${escapeHtml(channel.name || 'channel')}</strong>
            `;

            return interactive
              ? `<button class="mini-discord-channel${isActive ? ' is-active' : ''}" type="button" data-preview-channel="${escapeHtml(channelKey)}">${channelContent}</button>`
              : `<p>${channelContent}</p>`;
          }).join('') : `<p><i>-</i><strong>${escapeHtml(labels.emptyCategory)}</strong></p>`}
        </div>
      `).join('')}
    </div>
  `;
}

function formatChannelKind(kind, labels) {
  if (kind === 'voice') return labels.typeVoice;
  if (kind === 'announcement') return labels.typeAnnouncement;
  if (kind === 'forum') return labels.typeForum;
  return labels.typeText;
}

function renderChannelSettings(channel, labels) {
  if (!channel) {
    return `
      <div class="channel-settings-empty">
        <strong>${escapeHtml(labels.selectChannel)}</strong>
      </div>
    `;
  }

  const settings = channel.settings || {};
  const rows = [
    [labels.channelType, formatChannelKind(channel.kind, labels)],
    [labels.channelPosition, Number.isFinite(Number(channel.position)) ? Number(channel.position) : 0]
  ];

  if (settings.topic) rows.push([labels.channelTopic, settings.topic]);
  if (settings.slowmodeSeconds) rows.push([labels.channelSlowmode, `${settings.slowmodeSeconds}s`]);
  if (typeof settings.nsfw === 'boolean') rows.push([labels.channelNsfw, settings.nsfw ? labels.yes : labels.no]);
  if (settings.bitrate) rows.push([labels.channelBitrate, `${Math.round(Number(settings.bitrate) / 1000)} kbps`]);
  if (settings.userLimit) rows.push([labels.channelUserLimit, settings.userLimit]);
  if (settings.permissionOverwrites) rows.push([labels.channelOverwrites, settings.permissionOverwrites]);

  return `
    <div class="discord-channel-settings-inner">
      <h4>${escapeHtml(labels.channelSettings)}</h4>
      <strong>${escapeHtml(channel.name || 'channel')}</strong>
      ${rows.map(([label, value]) => `
        <p>
          <span>${escapeHtml(label)}</span>
          <b>${escapeHtml(value)}</b>
        </p>
      `).join('')}
      ${rows.length <= 2 ? `<small>${escapeHtml(labels.noChannelSettings)}</small>` : ''}
    </div>
  `;
}

function renderTemplateEmpty(message) {
  return `
    <div class="template-empty">
      <strong>${escapeHtml(message)}</strong>
    </div>
  `;
}

function renderTemplateSkeletons() {
  return Array.from({ length: 3 }, () => `
    <article class="template-list-item is-loading" aria-hidden="true">
      <div class="template-list-button">
        <span class="template-list-mark"></span>
        <span class="template-list-copy">
          <strong></strong>
          <p></p>
        </span>
        <span class="template-list-meta"></span>
      </div>
    </article>
  `).join('');
}

function renderTemplateCard(template, labels, index) {
  const name = template.name || 'core-template';
  const displayName = getTemplateDisplayName(template);
  const description = template.description || labels.noDescription;
  const updatedAt = formatDateLabel(template.updatedAt || template.publishedAt || template.createdAt);
  const accent = makeTemplateAccent(displayName, index);
  const initials = makeTemplateInitials(displayName);
  const isActive = getActiveTemplate()?.name === name;

  return `
    <article class="template-list-item${isActive ? ' is-active' : ''}" style="--template-accent: ${accent}" data-template-card="${escapeHtml(name)}">
      <button class="template-list-button" type="button" data-template-select="${escapeHtml(name)}">
        <span class="template-list-mark">${escapeHtml(initials)}</span>
        <span class="template-list-copy">
          <small>${escapeHtml(template.serverName || name)}</small>
          <strong>${escapeHtml(displayName)}</strong>
          <p>${escapeHtml(description)}</p>
        </span>
        <span class="template-list-meta">
          <small>${escapeHtml(labels.updated)}</small>
          <b>${updatedAt ? escapeHtml(updatedAt) : '-'}</b>
        </span>
      </button>
    </article>
  `;
}

function renderTemplateModalSummary(template, labels, index = 0) {
  const counts = template.counts || {};
  const name = template.name || 'core-template';
  const displayName = getTemplateDisplayName(template);
  const description = template.description || labels.noDescription;
  const command = template.command || `/template send name:${name}`;
  const templateUrl = safeHttpUrl(template.templateUrl || template.publishedUrl);
  const updatedAt = formatDateLabel(template.updatedAt || template.publishedAt || template.createdAt);
  const accent = makeTemplateAccent(displayName, index);
  const initials = makeTemplateInitials(displayName);

  return `
    <div class="template-modal-summary" style="--template-accent: ${accent}">
      <div class="template-modal-title">
        <span class="template-list-mark">${escapeHtml(initials)}</span>
        <div>
          <small>${escapeHtml(labels.summaryTitle)}</small>
          <h2 id="template-modal-title">${escapeHtml(displayName)}</h2>
          <p>${escapeHtml(description)}</p>
        </div>
      </div>
      <div class="template-modal-meta">
        <span><small>${escapeHtml(labels.updated)}</small><b>${updatedAt ? escapeHtml(updatedAt) : '-'}</b></span>
        <span><small>${escapeHtml(labels.roles)}</small><b>${Number(counts.roles || 0)}</b></span>
        <span><small>${escapeHtml(labels.categories)}</small><b>${Number(counts.categories || 0)}</b></span>
        <span><small>${escapeHtml(labels.textChannels)}</small><b>${Number(counts.textChannels || 0)}</b></span>
        <span><small>${escapeHtml(labels.voiceChannels)}</small><b>${Number(counts.voiceChannels || 0)}</b></span>
      </div>
      <div class="template-modal-command">
        <small>${escapeHtml(labels.commandLabel)}</small>
        <div class="template-modal-command-row">
          <code data-command-text="${escapeHtml(command)}">${escapeHtml(command)}</code>
          <button class="template-copy-btn" type="button" data-copy-command="${escapeHtml(command)}" aria-label="${escapeHtml(labels.copyCommand || 'Copy')}">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
              <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2H3.5A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
            ${escapeHtml(labels.copy || 'Копировать')}
          </button>
        </div>
      </div>
      <div class="template-modal-actions">
        ${templateUrl ? `<a href="${escapeHtml(templateUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(labels.open)}</a>` : ''}
        <a href="${escapeHtml(INVITE_URL)}" target="_blank" rel="noopener noreferrer">${escapeHtml(labels.add)}</a>
      </div>
    </div>
  `;
}

function renderDiscordPreviewWindow(template, labels) {
  const displayName = getTemplateDisplayName(template);
  const roles = template.preview?.roles || [];

  return `
    <div class="discord-preview-window">
      <aside class="discord-preview-sidebar">
        <div class="discord-preview-guild">${escapeHtml(makeTemplateInitials(displayName))}</div>
        <strong>${escapeHtml(displayName)}</strong>
        <span>${escapeHtml(labels.discordPreview)}</span>
      </aside>
      <div class="discord-preview-main">
        <div class="discord-preview-topbar">
          <div>
            <span>#</span>
            <strong>${escapeHtml(displayName)}</strong>
          </div>
          <small>${escapeHtml(template.command || `/template send name:${template.name}`)}</small>
        </div>
        <div class="discord-preview-content">
          <div class="discord-preview-channel-list">
            ${renderMiniDiscordPreview(template, labels, 12, 16, { interactive: true })}
          </div>
          <aside class="discord-channel-settings">
            ${renderChannelSettings(getActivePreviewChannel(template), labels)}
          </aside>
          <aside class="discord-preview-roles">
            <h4>${escapeHtml(labels.serverRoles)}</h4>
            ${roles.length ? roles.map((role) => `
              <p>
                <i style="${normalizeHexColor(role.color) ? `background:${normalizeHexColor(role.color)}` : ''}"></i>
                <span>${escapeHtml(role.name)}</span>
              </p>
            `).join('') : `<p><span>${escapeHtml(labels.noChannels)}</span></p>`}
          </aside>
        </div>
      </div>
    </div>
  `;
}

function renderTemplatePreviewPanel() {
  const preview = document.querySelector('[data-template-preview]');
  const previewPanel = document.querySelector('[data-template-preview-panel]');
  if (!preview) return;

  const labels = getTemplatesDictionary();
  const template = getActiveTemplate();
  const isOpen = Boolean(template);

  previewPanel?.classList.toggle('is-open', isOpen);
  previewPanel?.setAttribute('aria-hidden', String(!isOpen));
  document.body.classList.toggle('is-template-modal-open', isOpen);

  if (templateGalleryState.status === 'loading') {
    preview.innerHTML = renderTemplateEmpty(labels.loading);
    return;
  }

  if (templateGalleryState.status === 'error') {
    preview.innerHTML = renderTemplateEmpty(templateGalleryState.error === 'not_configured' ? labels.notConfigured : labels.error);
    return;
  }

  if (!template) {
    preview.innerHTML = renderTemplateEmpty(labels.selectHint);
    return;
  }

  const templateIndex = Math.max(0, templateGalleryState.templates.findIndex((item) => item.name === template.name));
  preview.innerHTML = `
    <div class="template-modal-body${templateGalleryState.activeTab === 'preview' ? ' is-tab-preview' : ''}">
      <div class="template-modal-tabs">
        <button class="template-modal-tab${templateGalleryState.activeTab === 'summary' ? ' is-active' : ''}" type="button" data-modal-tab="summary">${escapeHtml(labels.tabSummary)}</button>
        <button class="template-modal-tab${templateGalleryState.activeTab === 'preview' ? ' is-active' : ''}" type="button" data-modal-tab="preview">${escapeHtml(labels.tabPreview)}</button>
        <button class="template-preview-close" type="button" data-template-close aria-label="${escapeHtml(labels.closePreview)}">&times;</button>
      </div>
      <div class="template-modal-summary-wrap">
        ${renderTemplateModalSummary(template, labels, templateIndex)}
        <div class="template-modal-preview">
          ${renderDiscordPreviewWindow(template, labels)}
        </div>
      </div>
    </div>
  `;
}

function renderTemplateGallery() {
  const gallery = document.querySelector('[data-template-gallery]');
  const status = document.querySelector('[data-template-api-status]');
  const refresh = document.querySelector('[data-template-refresh]');
  const labels = getTemplatesDictionary();
  if (!gallery) return;

  if (refresh) refresh.disabled = templateGalleryState.status === 'loading';
  renderTemplatePreviewPanel();

  if (templateGalleryState.status === 'loading') {
    gallery.innerHTML = renderTemplateSkeletons();
    if (status) status.textContent = labels.loading;
    return;
  }

  if (templateGalleryState.status === 'error') {
    const message = templateGalleryState.error === 'not_configured' ? labels.notConfigured : labels.error;
    gallery.innerHTML = renderTemplateEmpty(message);
    if (status) status.textContent = message;
    return;
  }

  if (!templateGalleryState.templates.length) {
    gallery.innerHTML = renderTemplateEmpty(labels.empty);
    if (status) status.textContent = labels.empty;
    return;
  }

  gallery.innerHTML = templateGalleryState.templates
    .map((template, index) => renderTemplateCard(template, labels, index))
    .join('');

  if (status) {
    status.textContent = formatText(labels.ready, { count: templateGalleryState.templates.length });
  }
}

async function loadTemplateGallery() {
  if (!document.querySelector('[data-template-gallery]')) return;

  if (!TEMPLATE_API_URL) {
    templateGalleryState.status = 'error';
    templateGalleryState.error = 'not_configured';
    templateGalleryState.templates = [];
    renderTemplateGallery();
    return;
  }

  templateGalleryState.status = 'loading';
  templateGalleryState.error = '';
  renderTemplateGallery();

  try {
    const response = await fetch(TEMPLATE_API_URL, {
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (payload.ok === false || !Array.isArray(payload.templates)) {
      throw new Error('Invalid template response');
    }

    templateGalleryState.status = 'ready';
    templateGalleryState.templates = payload.templates;
    if (!getTemplateByName(templateGalleryState.activeName)) {
      templateGalleryState.activeName = '';
      templateGalleryState.activeChannelKey = '';
    }
  } catch (error) {
    templateGalleryState.status = 'error';
    templateGalleryState.error = error?.message || 'Failed to load templates';
    templateGalleryState.templates = [];
  }

  renderTemplateGallery();
}

function renderSimulationArtifact(mode) {
  const rows = mode.rows || [];
  if (mode.type === 'file') {
    return `
      <div class="sim-file">
        <span>JSON</span>
        <div>
          <strong>${escapeHtml(mode.fileName || 'server-config.json')}</strong>
          <small>${escapeHtml(mode.fileMeta || '')}</small>
        </div>
      </div>
    `;
  }

  if (mode.type === 'preview') {
    return `
      <div class="sim-tree">
        ${rows.map((row, index) => `
          <div class="sim-tree-row">
            <span>${index === 0 ? '@' : '#'}</span>
            <p>${escapeHtml(row)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (mode.type === 'snapshot') {
    return `
      <div class="sim-snapshot">
        ${rows.map((row) => `<p>${escapeHtml(row)}</p>`).join('')}
      </div>
    `;
  }

  return `
    <div class="sim-created-list">
      ${rows.map((row) => `
        <div>
          <span></span>
          <p>${escapeHtml(row)}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSimulation(panel, item, lang) {
  const copy = getSimulationCopy(lang);
  const mode = copy.modes[activeCommand] || copy.modes.templateList;

  const owner = panel.querySelector('[data-sim-owner]');
  const ownerAvatar = panel.querySelector('[data-sim-owner-avatar]');
  const bot = panel.querySelector('[data-sim-bot]');
  const status = panel.querySelector('[data-sim-status]');
  const title = panel.querySelector('[data-sim-card-title]');
  const meta = panel.querySelector('[data-sim-card-meta]');
  const cardCopy = panel.querySelector('[data-sim-card-copy]');
  const artifact = panel.querySelector('[data-sim-artifact]');
  const actions = panel.querySelector('[data-sim-actions]');

  if (owner) owner.textContent = copy.owner;
  if (ownerAvatar) ownerAvatar.textContent = copy.ownerShort;
  if (bot) bot.textContent = copy.bot;
  if (status) status.textContent = mode.status;
  if (title) title.textContent = mode.cardTitle || item.title;
  if (meta) meta.textContent = mode.meta || '';
  if (cardCopy) cardCopy.textContent = mode.copy || item.description;
  if (artifact) artifact.innerHTML = renderSimulationArtifact(mode);

  if (actions) {
    const actionItems = mode.actions || [];
    actions.innerHTML = actionItems.map((action) => (
      `<span>${escapeHtml(copy.actions[action] || action)}</span>`
    )).join('');
    actions.classList.toggle('is-empty', actionItems.length === 0);
  }
}

function setLanguageButtons(lang) {
  document.querySelectorAll('.language-button').forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderCommandButtons(dictionary) {
  document.querySelectorAll('.command-button').forEach((button) => {
    const item = dictionary.commands.items[button.dataset.command];
    if (!item) return;

    const command = button.querySelector('code');
    const label = button.querySelector('span');
    if (command) command.textContent = item.command;
    if (label) label.textContent = item.label;

    const isActive = button.dataset.command === activeCommand;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
}

function renderCommandPanel(dictionary, animate = true) {
  const item = dictionary.commands.items[activeCommand] || dictionary.commands.items.templateList;
  const shell = document.querySelector('.command-shell');
  const panel = document.querySelector('.command-panel');
  if (!item || !panel) return;

  const typedCommand = panel.querySelector('[data-typed-command]');
  const title = panel.querySelector('.command-title');
  const description = panel.querySelector('.command-description');
  const result = panel.querySelector('.command-result');
  if (title) title.textContent = item.title;
  if (description) description.textContent = item.description;
  if (result) result.textContent = item.result;
  renderSimulation(panel, item, currentLanguage);

  panel.querySelectorAll('[data-command-step]').forEach((step, index) => {
    step.textContent = item.steps[index] || '';
  });

  if (animate) {
    panel.classList.remove('is-swapping');
    shell?.classList.remove('is-running');
    shell?.classList.remove('is-typing');
    void panel.offsetWidth;
    panel.classList.add('is-swapping');
  }

  animateTypedCommand(typedCommand, item.command.replace(/^\//, ''), animate, () => {
    shell?.classList.add('is-running');
  });
}

function clearCommandTypingTimers() {
  commandTypingTimers.forEach((timer) => window.clearTimeout(timer));
  commandTypingTimers = [];
}

function animateTypedCommand(element, command, animate, onComplete) {
  clearCommandTypingTimers();
  const shell = document.querySelector('.command-shell');
  if (!element) {
    onComplete?.();
    return;
  }

  element.textContent = '';
  shell?.classList.remove('is-running');
  shell?.classList.remove('is-typing');

  if (!animate) {
    element.textContent = command;
    onComplete?.();
    return;
  }

  shell?.classList.add('is-typing');
  const chars = Array.from(command);
  chars.forEach((char, index) => {
    commandTypingTimers.push(window.setTimeout(() => {
      element.textContent += char;
    }, 32 * index));
  });

  commandTypingTimers.push(window.setTimeout(() => {
    shell?.classList.remove('is-typing');
    onComplete?.();
  }, Math.max(260, chars.length * 32 + 260)));
}

function applyLanguageNow(lang, animateCommand = false) {
  const dictionary = getDictionary(lang);
  currentLanguage = translations[lang] ? lang : 'ru';
  document.documentElement.lang = currentLanguage === 'ua' ? 'uk' : currentLanguage;
  document.title = dictionary.meta.title;

  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (description) description.setAttribute('content', dictionary.meta.description);
  if (ogTitle) ogTitle.setAttribute('content', dictionary.meta.title);
  if (ogDescription) ogDescription.setAttribute('content', dictionary.meta.description);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = getNestedValue(dictionary, element.dataset.i18n);
    if (value !== undefined) element.textContent = value;
  });

  setLanguageButtons(currentLanguage);
  renderCommandButtons(dictionary);
  renderCommandPanel(dictionary, animateCommand);
  renderTemplateGallery();
  localStorage.setItem('core-site-language', currentLanguage);
}

function applyLanguage(lang, options = {}) {
  const nextLanguage = translations[lang] ? lang : 'en';
  if (!options.animate || nextLanguage === currentLanguage) {
    applyLanguageNow(nextLanguage, options.animateCommand);
    return;
  }

  document.body.classList.add('is-language-switching');
  document.querySelector(`.language-button[data-lang="${nextLanguage}"]`)?.classList.add('is-pending');

  window.setTimeout(() => {
    applyLanguageNow(nextLanguage, true);
  }, 110);

  window.setTimeout(() => {
    document.body.classList.remove('is-language-switching');
    document.querySelectorAll('.language-button').forEach((button) => button.classList.remove('is-pending'));
  }, 360);
}

function setupReveal() {
  const revealItems = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18
  });

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll('a[href*="discord.com/oauth2/authorize"]').forEach((link) => {
  link.href = INVITE_URL;
});

document.querySelectorAll('[data-official-server-url]').forEach((link) => {
  link.href = OFFICIAL_SERVER_URL;
});

document.querySelectorAll('.language-button').forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang, { animate: true }));
});

document.querySelectorAll('.command-button').forEach((button) => {
  button.addEventListener('click', () => {
    activeCommand = button.dataset.command || 'templateList';
    renderCommandButtons(getDictionary(currentLanguage));
    renderCommandPanel(getDictionary(currentLanguage), true);
  });
});

document.querySelector('[data-template-refresh]')?.addEventListener('click', () => {
  loadTemplateGallery();
});

function closeTemplatePreview() {
  templateGalleryState.activeName = '';
  templateGalleryState.activeChannelKey = '';
  templateGalleryState.activeTab = 'summary';
  renderTemplateGallery();
}

document.querySelector('[data-template-gallery]')?.addEventListener('click', (event) => {
  if (event.target.closest('a')) return;

  const trigger = event.target.closest('[data-template-select]');
  const card = event.target.closest('[data-template-card]');
  const templateName = trigger?.dataset.templateSelect || card?.dataset.templateCard || '';
  if (!templateName) return;

  templateGalleryState.activeName = templateName;
  templateGalleryState.activeChannelKey = '';
  renderTemplateGallery();
});

document.querySelector('[data-template-preview-panel]')?.addEventListener('click', (event) => {
  if (!event.target.closest('[data-template-close]')) return;
  closeTemplatePreview();
});

document.querySelector('[data-template-preview]')?.addEventListener('click', (event) => {
  const tabTrigger = event.target.closest('[data-modal-tab]');
  if (tabTrigger) {
    templateGalleryState.activeTab = tabTrigger.dataset.modalTab || 'summary';
    templateGalleryState.activeChannelKey = '';
    renderTemplatePreviewPanel();
    return;
  }

  const copyBtn = event.target.closest('[data-copy-command]');
  if (copyBtn) {
    const text = copyBtn.dataset.copyCommand || '';
    navigator.clipboard?.writeText(text).then(() => {
      copyBtn.classList.add('is-copied');
      const labels = getTemplatesDictionary();
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><polyline points="2 8 6 12 14 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> ${escapeHtml(labels.copied || 'Скопировано')}`;
      window.setTimeout(() => {
        copyBtn.classList.remove('is-copied');
        copyBtn.innerHTML = originalHtml;
      }, 2000);
    }).catch(() => {});
    return;
  }

  const trigger = event.target.closest('[data-preview-channel]');
  if (!trigger) return;

  templateGalleryState.activeChannelKey = trigger.dataset.previewChannel || '';
  renderTemplatePreviewPanel();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && templateGalleryState.activeName) {
    closeTemplatePreview();
  }
});

const savedLanguage = localStorage.getItem('core-site-language');
const browserLanguage = navigator.language?.toLowerCase() || '';
const defaultLanguage = savedLanguage
  || (browserLanguage.startsWith('ru') ? 'ru'
    : browserLanguage.startsWith('uk') ? 'ua'
      : browserLanguage.startsWith('de') ? 'de'
        : 'en');

applyLanguage(defaultLanguage, { animate: false, animateCommand: true });
setupReveal();
loadTemplateGallery();
requestAnimationFrame(() => document.body.classList.add('is-ready'));
