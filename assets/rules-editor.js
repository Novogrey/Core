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
    selectOptions: 25,
    buttonLabel: 80,
    url: 500
  };

  const instances = new WeakMap();
  const WEBHOOK_STORAGE_KEY = 'core-webhook-editor-saves-v1';
  const WEBHOOK_TRANSFER_PREFIX = 'CORE_WEBHOOK_EDITOR_V1.';
  const DEFAULT_CORE_IMAGE_URL = 'https://cdn.discordapp.com/attachments/1452039397435244677/1458169510447153255/ChatGPT_Image_20_._2025_._17_38_56_1.png?ex=6a0963ee&is=6a08126e&hm=8328eb6055d24a95673ecceb0833dd74f26a819f5a9bfc6ce50918515dc4e70d&';
  const TIMESTAMP_STYLES = ['t', 'T', 'd', 'D', 'f', 'F', 'R'];
  const ANSI_COLORS = [
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
  const ANSI_BACKGROUNDS = [
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
  const MARKDOWN_SNIPPETS = [
    ['**Bold text**', '**Bold text**'],
    ['*Italic text*', '*Italic text*'],
    ['__Underlined text__', '__Underlined text__'],
    ['~~Strikethrough~~', '~~Strikethrough~~'],
    ['||Spoiler||', '||Spoiler||'],
    ['> Quote', '> Quote'],
    ['# Heading', '# Heading'],
    ['[Link](https://example.com)', '[Link](https://example.com)'],
    ['`Inline code`', '`Inline code`'],
    ['```js\nconsole.log(\"Core\");\n```', '```js\nconsole.log(\"Core\");\n```']
  ];

  const EDITOR_TEXT = {
    ru: {
      ready: 'Готово',
      webhookName: 'Имя вебхука',
      webhookAvatar: 'Аватар вебхука',
      send: 'Отправить',
      sending: 'Отправляю...',
      exportJson: 'Экспорт JSON',
      copyJson: 'Скопировать JSON',
      importJson: 'Импорт JSON',
      messages: 'Сообщения',
      add: 'Добавить',
      duplicate: 'Дубль',
      delete: 'Удалить',
      preview: 'Превью',
      message: 'Сообщение',
      messageOne: 'сообщение',
      messageMany: 'сообщений',
      addComponent: 'Добавить компонент',
      component: 'Компонент',
      componentHint: 'В Components V2 обычные content/эмбеды не используются. Для текста добавляйте Text Display или Container.',
      copied: 'JSON скопирован.',
      webhookRequired: 'Укажите Discord webhook URL.',
      sent: 'Отправлено сообщений',
      sendFailed: 'Не удалось отправить webhook.',
      corsHint: 'Если браузер блокирует CORS, отправляйте через серверный proxy или Google Apps Script.',
      errors: 'ошибок',
      warnings: 'предупреждений',
      webhookUrl: 'Discord webhook URL',
      modeClassic: 'Текст + эмбеды',
      modeComponents: 'Components V2',
      modeRaw: 'Raw JSON',
      embed: 'Эмбед',
      addEmbed: '+ Эмбед',
      duplicateEmbed: 'Дублировать эмбед',
      deleteEmbed: 'Удалить эмбед',
      color: 'Цвет',
      title: 'Заголовок',
      titleUrl: 'URL заголовка',
      embedDescription: 'Описание эмбеда',
      author: 'Автор',
      authorUrl: 'URL автора',
      authorIcon: 'Иконка автора',
      thumbnailUrl: 'URL миниатюры',
      imageUrl: 'URL изображения',
      footer: 'Нижний текст',
      footerIcon: 'Иконка нижнего текста',
      timestampIso: 'Время',
      timestampDate: 'Дата',
      timestampTime: 'Время',
      timestampNow: 'Сейчас',
      timestampClear: 'Очистить время',
      webhookThreadTitle: 'Ветка',
      webhookThreadName: 'Название новой ветки',
      webhookThreadId: 'ID существующей ветки',
      webhookTags: 'ID тегов форума',
      webhookThreadHint: 'Для форумных и media-каналов можно создать новую ветку. Для существующей ветки укажите её ID. Теги перечисляйте через запятую.',
      editorTools: 'Инструменты',
      closeTools: 'Закрыть инструменты',
      timestampTool: 'Timestamp',
      colorTool: 'Цветной текст',
      markdownTool: 'Markdown',
      timestampStyle: 'Формат',
      timestampOutput: 'Код Discord',
      copyToolValue: 'Скопировать',
      insertToolValue: 'Вставить',
      colorText: 'Текст',
      colorForeground: 'Цвет текста',
      colorBackground: 'Фон',
      colorBold: 'Жирный',
      colorUnderline: 'Подчёркнутый',
      noColor: 'Без цвета',
      markdownSnippets: 'Готовые фрагменты',
      toolCopied: 'Скопировано.',
      toolInsertHint: 'Вставка попадёт в активное текстовое поле редактора.',
      fields: 'Поля',
      addField: 'Добавить поле',
      fieldName: 'Название',
      fieldValue: 'Значение',
      inline: 'В строку',
      noFields: 'Полей пока нет.',
      messageContent: 'Текст сообщения',
      rulesPlaceholder: '# Правила сервера',
      moveUp: 'Выше',
      moveDown: 'Ниже',
      componentText: 'Текстовый блок',
      componentSeparator: 'Разделитель',
      componentGallery: 'Медиа-галерея',
      componentFile: 'Файл',
      componentButton: 'Кнопка',
      componentSelect: 'Меню выбора',
      componentSection: 'Секция',
      componentContainer: 'Контейнер',
      componentUnknown: 'Неизвестный компонент',
      markdownText: 'Markdown-текст',
      showLine: 'Показывать линию',
      spacing: 'Отступ',
      small: 'Маленький',
      large: 'Большой',
      mediaUrls: 'URL по одному на строку. Описание через |',
      attachmentUrl: 'URL файла',
      spoiler: 'Спойлер',
      buttonLabel: 'Текст кнопки',
      emoji: 'Emoji',
      style: 'Стиль',
      stylePrimary: 'Primary',
      styleSecondary: 'Secondary',
      styleSuccess: 'Success',
      styleDanger: 'Danger',
      styleLink: 'Link',
      url: 'URL',
      customId: 'Custom ID',
      disabled: 'Отключено',
      buttonUrlHint: 'Если заполнен URL, Discord отправит кнопку-ссылку. Без URL используются стиль и Custom ID.',
      type: 'Тип',
      selectString: 'String select',
      selectUser: 'User select',
      selectRole: 'Role select',
      selectMentionable: 'Mentionable select',
      selectChannel: 'Channel select',
      placeholder: 'Placeholder',
      minValues: 'Минимум выборов',
      maxValues: 'Максимум выборов',
      selectOptions: 'Опции для String select: label | value | description | emoji | default',
      sectionText: 'Текст секции',
      accessory: 'Accessory',
      buttonUrl: 'Button URL',
      accentColor: 'Accent color',
      spoilerContainer: 'Спойлер-контейнер',
      insideContainer: 'Внутри контейнера',
      emptyContainer: 'В контейнере пока нет компонентов.',
      firstComponent: 'Добавь первый компонент.',
      rawDiscordJson: 'Raw Discord message JSON',
      rawModeHint: 'Raw-режим сохраняет сложный Discord payload без изменений: content, эмбеды, старые кнопки и Components V2. Лимиты Discord всё равно проверяются.',
      defaultText: '# Заголовок\nТекст блока.',
      defaultSectionText: '# Важный блок\nТекст секции.',
      defaultContainerText: '# Заголовок\nТекст контейнера.',
      defaultButtonLabel: 'Открыть',
      defaultSelectPlaceholder: 'Выберите опцию',
      defaultSelectOptions: 'Первая опция | first | Описание | ✨\nВторая опция | second',
      defaultTitle: 'Редактор сообщений',
      defaultMessageContent: '# Правила сервера\n\nПожалуйста, ознакомься с правилами перед началом общения.',
      defaultEmbedTitle: 'Основные правила',
      defaultEmbedDescription: '1. Уважай участников.\n2. Не публикуй спам и рекламу.\n3. Используй каналы по назначению.\n4. Не передавай личные данные.',
      defaultEmbedFooter: 'Правила могут обновляться.',
      defaultComponentRules: '# Правила сервера\n\n1. Уважай участников.\n2. Не публикуй спам и рекламу.\n3. Используй каналы по назначению.',
      invalidRawJson: 'Raw JSON некорректный.',
      rawPayloadRequired: 'Raw JSON должен содержать content, эмбеды или компоненты.',
      limitMessages: 'Сообщения',
      limitRawJson: 'Raw JSON',
      limitComponentsTotal: 'Всего компонентов',
      limitTopComponents: 'Компоненты верхнего уровня',
      limitComponentText: 'Текст компонентов',
      limitSelectOptions: 'Опции меню',
      limitTextTotal: 'Всего текста',
      limitMessageText: 'Текст',
      limitEmbeds: 'Эмбеды',
      limitActiveEmbed: 'Активный эмбед',
      limitEmbedsTotal: 'Всего эмбедов',
      block: 'блок',
      child: 'элемент',
      errorNeedComponent: 'добавьте хотя бы один Components V2 блок.',
      errorMaxComponents: 'максимум компонентов',
      errorTextTooLong: 'текст больше',
      errorSectionButtonUrl: 'для кнопки секции нужен URL.',
      errorSectionThumbnailUrl: 'для секции нужен URL миниатюры.',
      errorContainerTextTooLong: 'текст контейнера больше',
      errorMaxMedia: 'максимум медиа',
      errorMaxChildren: 'максимум элементов в контейнере',
      errorMustBeUrl: 'должен быть ссылкой.',
      errorNeedTextOrEmbed: 'нужен текст или эмбед.',
      errorMaxEmbeds: 'максимум эмбедов',
      errorTitleTooLong: 'заголовок больше',
      errorDescriptionTooLong: 'описание больше',
      errorMaxFields: 'максимум полей',
      errorEmbedTotalTooLong: 'общий размер эмбеда больше',
      warningManyWebhookMessages: 'Много webhook-сообщений лучше разделять по назначению, чтобы канал не выглядел перегруженным.',
      warningManyRuleMessages: 'Много сообщений лучше отправлять в отдельный канал правил.'
    },
    en: {
      ready: 'Ready',
      webhookName: 'Webhook name',
      webhookAvatar: 'Webhook avatar',
      send: 'Send',
      sending: 'Sending...',
      exportJson: 'Export JSON',
      copyJson: 'Copy JSON',
      importJson: 'Import JSON',
      messages: 'Messages',
      add: 'Add',
      duplicate: 'Duplicate',
      delete: 'Delete',
      preview: 'Preview',
      message: 'Message',
      messageOne: 'message',
      messageMany: 'messages',
      addComponent: 'Add component',
      component: 'Component',
      componentHint: 'Components V2 does not use classic content/embeds. Add Text Display or Container for text.',
      copied: 'JSON copied.',
      webhookRequired: 'Enter a Discord webhook URL.',
      sent: 'Messages sent',
      sendFailed: 'Webhook sending failed.',
      corsHint: 'If the browser blocks CORS, send through a server proxy or Google Apps Script.',
      errors: 'errors',
      warnings: 'warnings',
      webhookUrl: 'Discord webhook URL',
      modeClassic: 'Content + embeds',
      modeComponents: 'Components V2',
      modeRaw: 'Raw JSON',
      embed: 'Embed',
      addEmbed: '+ Embed',
      duplicateEmbed: 'Duplicate embed',
      deleteEmbed: 'Delete embed',
      color: 'Color',
      title: 'Title',
      titleUrl: 'Title URL',
      embedDescription: 'Embed description',
      author: 'Author',
      authorUrl: 'Author URL',
      authorIcon: 'Author icon',
      thumbnailUrl: 'Thumbnail URL',
      imageUrl: 'Image URL',
      footer: 'Footer',
      footerIcon: 'Footer icon',
      timestampIso: 'Time',
      timestampDate: 'Date',
      timestampTime: 'Time',
      timestampNow: 'Now',
      timestampClear: 'Clear time',
      webhookThreadTitle: 'Thread',
      webhookThreadName: 'New thread name',
      webhookThreadId: 'Existing thread ID',
      webhookTags: 'Forum tag IDs',
      webhookThreadHint: 'Forum and media channels can create a new thread. To post into an existing thread, enter its ID. Separate tag IDs with commas.',
      editorTools: 'Tools',
      closeTools: 'Close tools',
      timestampTool: 'Timestamp',
      colorTool: 'Colored text',
      markdownTool: 'Markdown',
      timestampStyle: 'Format',
      timestampOutput: 'Discord code',
      copyToolValue: 'Copy',
      insertToolValue: 'Insert',
      colorText: 'Text',
      colorForeground: 'Text color',
      colorBackground: 'Background',
      colorBold: 'Bold',
      colorUnderline: 'Underline',
      noColor: 'No color',
      markdownSnippets: 'Ready snippets',
      toolCopied: 'Copied.',
      toolInsertHint: 'Insert sends the value into the active editor text field.',
      fields: 'Fields',
      addField: 'Add field',
      fieldName: 'Name',
      fieldValue: 'Value',
      inline: 'Inline',
      noFields: 'No fields yet.',
      messageContent: 'Message text',
      rulesPlaceholder: '# Server rules',
      moveUp: 'Move up',
      moveDown: 'Move down',
      componentText: 'Text Display',
      componentSeparator: 'Separator',
      componentGallery: 'Media Gallery',
      componentFile: 'File',
      componentButton: 'Button',
      componentSelect: 'Select Menu',
      componentSection: 'Section',
      componentContainer: 'Container',
      componentUnknown: 'Unknown component',
      markdownText: 'Markdown text',
      showLine: 'Show line',
      spacing: 'Spacing',
      small: 'Small',
      large: 'Large',
      mediaUrls: 'One URL per line. Add description after |',
      attachmentUrl: 'Attachment URL',
      spoiler: 'Spoiler',
      buttonLabel: 'Button label',
      emoji: 'Emoji',
      style: 'Style',
      stylePrimary: 'Primary',
      styleSecondary: 'Secondary',
      styleSuccess: 'Success',
      styleDanger: 'Danger',
      styleLink: 'Link',
      url: 'URL',
      customId: 'Custom ID',
      disabled: 'Disabled',
      buttonUrlHint: 'If URL is filled, Discord sends a link button. Without URL, style and Custom ID are used.',
      type: 'Type',
      selectString: 'String select',
      selectUser: 'User select',
      selectRole: 'Role select',
      selectMentionable: 'Mentionable select',
      selectChannel: 'Channel select',
      placeholder: 'Placeholder',
      minValues: 'Min values',
      maxValues: 'Max values',
      selectOptions: 'Options for String select: label | value | description | emoji | default',
      sectionText: 'Section text',
      accessory: 'Accessory',
      buttonUrl: 'Button URL',
      accentColor: 'Accent color',
      spoilerContainer: 'Spoiler container',
      insideContainer: 'Inside container',
      emptyContainer: 'This container has no components yet.',
      firstComponent: 'Add the first component.',
      rawDiscordJson: 'Raw Discord message JSON',
      rawModeHint: 'Raw mode keeps complex Discord payloads exact: content, embeds, legacy buttons and Components V2. Discord limits still apply.',
      defaultText: '# Title\nBlock text.',
      defaultSectionText: '# Important block\nSection text.',
      defaultContainerText: '# Title\nContainer text.',
      defaultButtonLabel: 'Open',
      defaultSelectPlaceholder: 'Choose an option',
      defaultSelectOptions: 'First option | first | Description | ✨\nSecond option | second',
      defaultTitle: 'Message editor',
      defaultMessageContent: '# Server rules\n\nPlease read the rules before you start chatting.',
      defaultEmbedTitle: 'Main rules',
      defaultEmbedDescription: '1. Respect other members.\n2. Do not post spam or advertising.\n3. Use channels for their intended purpose.\n4. Do not share personal data.',
      defaultEmbedFooter: 'Rules may be updated.',
      defaultComponentRules: '# Server rules\n\n1. Respect other members.\n2. Do not post spam or advertising.\n3. Use channels for their intended purpose.',
      invalidRawJson: 'Raw JSON is invalid.',
      rawPayloadRequired: 'Raw JSON must include content, embeds, or components.',
      limitMessages: 'Messages',
      limitRawJson: 'Raw JSON',
      limitComponentsTotal: 'Components total',
      limitTopComponents: 'Top-level components',
      limitComponentText: 'Component text',
      limitSelectOptions: 'Select options',
      limitTextTotal: 'Text total',
      limitMessageText: 'Text',
      limitEmbeds: 'Embeds',
      limitActiveEmbed: 'Active embed',
      limitEmbedsTotal: 'Embeds total',
      block: 'block',
      child: 'child',
      errorNeedComponent: 'add at least one Components V2 block.',
      errorMaxComponents: 'maximum components',
      errorTextTooLong: 'text is longer than',
      errorSectionButtonUrl: 'section button URL is required.',
      errorSectionThumbnailUrl: 'section thumbnail URL is required.',
      errorContainerTextTooLong: 'container text is longer than',
      errorMaxMedia: 'maximum media items',
      errorMaxChildren: 'maximum children in container',
      errorMustBeUrl: 'must be a URL.',
      errorNeedTextOrEmbed: 'text or embed is required.',
      errorMaxEmbeds: 'maximum embeds',
      errorTitleTooLong: 'title is longer than',
      errorDescriptionTooLong: 'description is longer than',
      errorMaxFields: 'maximum fields',
      errorEmbedTotalTooLong: 'total embed size is longer than',
      warningManyWebhookMessages: 'Many webhook messages are easier to manage when split by purpose, so the channel does not look overloaded.',
      warningManyRuleMessages: 'Many rule messages are better sent to a dedicated rules channel.'
    },
    ua: {
      ready: 'Готово',
      webhookName: 'Імʼя вебхука',
      webhookAvatar: 'Аватар вебхука',
      send: 'Надіслати',
      sending: 'Надсилаю...',
      exportJson: 'Експорт JSON',
      copyJson: 'Скопіювати JSON',
      importJson: 'Імпорт JSON',
      messages: 'Повідомлення',
      add: 'Додати',
      duplicate: 'Дубль',
      delete: 'Видалити',
      preview: 'Превʼю',
      message: 'Повідомлення',
      messageOne: 'повідомлення',
      messageMany: 'повідомлень',
      addComponent: 'Додати компонент',
      component: 'Компонент',
      componentHint: 'Components V2 не використовує звичайні content/ембеди. Для тексту додавайте Text Display або Container.',
      copied: 'JSON скопійовано.',
      webhookRequired: 'Вкажіть Discord webhook URL.',
      sent: 'Надіслано повідомлень',
      sendFailed: 'Не вдалося надіслати webhook.',
      corsHint: 'Якщо браузер блокує CORS, надсилайте через серверний proxy або Google Apps Script.',
      errors: 'помилок',
      warnings: 'попереджень',
      webhookUrl: 'Discord webhook URL',
      modeClassic: 'Текст + ембеди',
      modeComponents: 'Components V2',
      modeRaw: 'Raw JSON',
      embed: 'Ембед',
      addEmbed: '+ Ембед',
      duplicateEmbed: 'Дублювати ембед',
      deleteEmbed: 'Видалити ембед',
      color: 'Колір',
      title: 'Заголовок',
      titleUrl: 'URL заголовка',
      embedDescription: 'Опис ембеда',
      author: 'Автор',
      authorUrl: 'URL автора',
      authorIcon: 'Іконка автора',
      thumbnailUrl: 'URL мініатюри',
      imageUrl: 'URL зображення',
      footer: 'Нижній текст',
      footerIcon: 'Іконка нижнього тексту',
      timestampIso: 'Час',
      timestampDate: 'Дата',
      timestampTime: 'Час',
      timestampNow: 'Зараз',
      timestampClear: 'Очистити час',
      webhookThreadTitle: 'Гілка',
      webhookThreadName: 'Назва нової гілки',
      webhookThreadId: 'ID наявної гілки',
      webhookTags: 'ID тегів форуму',
      webhookThreadHint: 'Для форумних і media-каналів можна створити нову гілку. Для наявної гілки вкажіть її ID. Теги перелічуйте через кому.',
      editorTools: 'Інструменти',
      closeTools: 'Закрити інструменти',
      timestampTool: 'Timestamp',
      colorTool: 'Кольоровий текст',
      markdownTool: 'Markdown',
      timestampStyle: 'Формат',
      timestampOutput: 'Код Discord',
      copyToolValue: 'Скопіювати',
      insertToolValue: 'Вставити',
      colorText: 'Текст',
      colorForeground: 'Колір тексту',
      colorBackground: 'Фон',
      colorBold: 'Жирний',
      colorUnderline: 'Підкреслений',
      noColor: 'Без кольору',
      markdownSnippets: 'Готові фрагменти',
      toolCopied: 'Скопійовано.',
      toolInsertHint: 'Вставка потрапить в активне текстове поле редактора.',
      fields: 'Поля',
      addField: 'Додати поле',
      fieldName: 'Назва',
      fieldValue: 'Значення',
      inline: 'В рядку',
      noFields: 'Полів поки немає.',
      messageContent: 'Текст повідомлення',
      rulesPlaceholder: '# Правила сервера',
      moveUp: 'Вище',
      moveDown: 'Нижче',
      componentText: 'Текстовий блок',
      componentSeparator: 'Розділювач',
      componentGallery: 'Медіагалерея',
      componentFile: 'Файл',
      componentButton: 'Кнопка',
      componentSelect: 'Меню вибору',
      componentSection: 'Секція',
      componentContainer: 'Контейнер',
      componentUnknown: 'Невідомий компонент',
      markdownText: 'Markdown-текст',
      showLine: 'Показувати лінію',
      spacing: 'Відступ',
      small: 'Малий',
      large: 'Великий',
      mediaUrls: 'URL по одному на рядок. Опис через |',
      attachmentUrl: 'URL файлу',
      spoiler: 'Спойлер',
      buttonLabel: 'Текст кнопки',
      emoji: 'Emoji',
      style: 'Стиль',
      stylePrimary: 'Primary',
      styleSecondary: 'Secondary',
      styleSuccess: 'Success',
      styleDanger: 'Danger',
      styleLink: 'Link',
      url: 'URL',
      customId: 'Custom ID',
      disabled: 'Вимкнено',
      buttonUrlHint: 'Якщо URL заповнений, Discord надішле кнопку-посилання. Без URL використовуються стиль і Custom ID.',
      type: 'Тип',
      selectString: 'String select',
      selectUser: 'User select',
      selectRole: 'Role select',
      selectMentionable: 'Mentionable select',
      selectChannel: 'Channel select',
      placeholder: 'Placeholder',
      minValues: 'Мінімум виборів',
      maxValues: 'Максимум виборів',
      selectOptions: 'Опції для String select: label | value | description | emoji | default',
      sectionText: 'Текст секції',
      accessory: 'Accessory',
      buttonUrl: 'Button URL',
      accentColor: 'Accent color',
      spoilerContainer: 'Спойлер-контейнер',
      insideContainer: 'Усередині контейнера',
      emptyContainer: 'У контейнері поки немає компонентів.',
      firstComponent: 'Додайте перший компонент.',
      rawDiscordJson: 'Raw Discord message JSON',
      rawModeHint: 'Raw-режим зберігає складний Discord payload без змін: content, ембеди, старі кнопки і Components V2. Ліміти Discord все одно перевіряються.',
      defaultText: '# Заголовок\nТекст блоку.',
      defaultSectionText: '# Важливий блок\nТекст секції.',
      defaultContainerText: '# Заголовок\nТекст контейнера.',
      defaultButtonLabel: 'Відкрити',
      defaultSelectPlaceholder: 'Виберіть опцію',
      defaultSelectOptions: 'Перша опція | first | Опис | ✨\nДруга опція | second',
      defaultTitle: 'Редактор повідомлень',
      defaultMessageContent: '# Правила сервера\n\nБудь ласка, ознайомтеся з правилами перед початком спілкування.',
      defaultEmbedTitle: 'Основні правила',
      defaultEmbedDescription: '1. Поважайте учасників.\n2. Не публікуйте спам і рекламу.\n3. Використовуйте канали за призначенням.\n4. Не передавайте особисті дані.',
      defaultEmbedFooter: 'Правила можуть оновлюватися.',
      defaultComponentRules: '# Правила сервера\n\n1. Поважайте учасників.\n2. Не публікуйте спам і рекламу.\n3. Використовуйте канали за призначенням.',
      invalidRawJson: 'Raw JSON некоректний.',
      rawPayloadRequired: 'Raw JSON має містити content, ембеди або компоненти.',
      limitMessages: 'Повідомлення',
      limitRawJson: 'Raw JSON',
      limitComponentsTotal: 'Усього компонентів',
      limitTopComponents: 'Компоненти верхнього рівня',
      limitComponentText: 'Текст компонентів',
      limitSelectOptions: 'Опції меню',
      limitTextTotal: 'Усього тексту',
      limitMessageText: 'Текст',
      limitEmbeds: 'Ембеди',
      limitActiveEmbed: 'Активний ембед',
      limitEmbedsTotal: 'Усього ембедів',
      block: 'блок',
      child: 'елемент',
      errorNeedComponent: 'додайте хоча б один Components V2 блок.',
      errorMaxComponents: 'максимум компонентів',
      errorTextTooLong: 'текст більший за',
      errorSectionButtonUrl: 'для кнопки секції потрібен URL.',
      errorSectionThumbnailUrl: 'для секції потрібен URL мініатюри.',
      errorContainerTextTooLong: 'текст контейнера більший за',
      errorMaxMedia: 'максимум медіа',
      errorMaxChildren: 'максимум елементів у контейнері',
      errorMustBeUrl: 'має бути посиланням.',
      errorNeedTextOrEmbed: 'потрібен текст або ембед.',
      errorMaxEmbeds: 'максимум ембедів',
      errorTitleTooLong: 'заголовок більший за',
      errorDescriptionTooLong: 'опис більший за',
      errorMaxFields: 'максимум полів',
      errorEmbedTotalTooLong: 'загальний розмір ембеда більший за',
      warningManyWebhookMessages: 'Багато webhook-повідомлень краще розділяти за призначенням, щоб канал не виглядав перевантаженим.',
      warningManyRuleMessages: 'Багато повідомлень краще надсилати в окремий канал правил.'
    },
    de: {
      ready: 'Bereit',
      webhookName: 'Webhook-Name',
      webhookAvatar: 'Webhook-Avatar',
      send: 'Senden',
      sending: 'Sende...',
      exportJson: 'JSON exportieren',
      copyJson: 'JSON kopieren',
      importJson: 'JSON importieren',
      messages: 'Nachrichten',
      add: 'Hinzufügen',
      duplicate: 'Duplizieren',
      delete: 'Löschen',
      preview: 'Vorschau',
      message: 'Nachricht',
      messageOne: 'Nachricht',
      messageMany: 'Nachrichten',
      addComponent: 'Komponente hinzufügen',
      component: 'Komponente',
      componentHint: 'Components V2 nutzt keine klassischen content/Einbettungen. Für Text Text Display oder Container hinzufügen.',
      copied: 'JSON kopiert.',
      webhookRequired: 'Discord-Webhook-URL eingeben.',
      sent: 'Nachrichten gesendet',
      sendFailed: 'Webhook konnte nicht gesendet werden.',
      corsHint: 'Wenn der Browser CORS blockiert, über einen Server-Proxy oder Google Apps Script senden.',
      errors: 'Fehler',
      warnings: 'Warnungen',
      webhookUrl: 'Discord webhook URL',
      modeClassic: 'Text + Einbettungen',
      modeComponents: 'Components V2',
      modeRaw: 'Raw JSON',
      embed: 'Einbettung',
      addEmbed: '+ Einbettung',
      duplicateEmbed: 'Einbettung duplizieren',
      deleteEmbed: 'Einbettung löschen',
      color: 'Farbe',
      title: 'Titel',
      titleUrl: 'Titel-URL',
      embedDescription: 'Einbettungsbeschreibung',
      author: 'Autor',
      authorUrl: 'Autor-URL',
      authorIcon: 'Autor-Icon',
      thumbnailUrl: 'Vorschaubild-URL',
      imageUrl: 'Bild-URL',
      footer: 'Fußzeile',
      footerIcon: 'Fußzeilen-Icon',
      timestampIso: 'Zeit',
      timestampDate: 'Datum',
      timestampTime: 'Uhrzeit',
      timestampNow: 'Jetzt',
      timestampClear: 'Zeit leeren',
      webhookThreadTitle: 'Thread',
      webhookThreadName: 'Neuer Thread-Name',
      webhookThreadId: 'Bestehende Thread-ID',
      webhookTags: 'Forum-Tag-IDs',
      webhookThreadHint: 'Forum- und Media-Kanaele koennen einen neuen Thread erstellen. Fuer einen bestehenden Thread die ID eintragen. Tag-IDs mit Kommas trennen.',
      editorTools: 'Werkzeuge',
      closeTools: 'Werkzeuge schliessen',
      timestampTool: 'Timestamp',
      colorTool: 'Farbiger Text',
      markdownTool: 'Markdown',
      timestampStyle: 'Format',
      timestampOutput: 'Discord-Code',
      copyToolValue: 'Kopieren',
      insertToolValue: 'Einfuegen',
      colorText: 'Text',
      colorForeground: 'Textfarbe',
      colorBackground: 'Hintergrund',
      colorBold: 'Fett',
      colorUnderline: 'Unterstrichen',
      noColor: 'Keine Farbe',
      markdownSnippets: 'Fertige Bausteine',
      toolCopied: 'Kopiert.',
      toolInsertHint: 'Einfuegen schreibt den Wert in das aktive Textfeld des Editors.',
      fields: 'Felder',
      addField: 'Feld hinzufügen',
      fieldName: 'Name',
      fieldValue: 'Wert',
      inline: 'In einer Zeile',
      noFields: 'Noch keine Felder.',
      messageContent: 'Nachrichtentext',
      rulesPlaceholder: '# Serverregeln',
      moveUp: 'Nach oben',
      moveDown: 'Nach unten',
      componentText: 'Text Display',
      componentSeparator: 'Trenner',
      componentGallery: 'Mediengalerie',
      componentFile: 'Datei',
      componentButton: 'Button',
      componentSelect: 'Auswahlmenü',
      componentSection: 'Sektion',
      componentContainer: 'Container',
      componentUnknown: 'Unbekannte Komponente',
      markdownText: 'Markdown-Text',
      showLine: 'Linie anzeigen',
      spacing: 'Abstand',
      small: 'Klein',
      large: 'Groß',
      mediaUrls: 'Eine URL pro Zeile. Beschreibung nach |',
      attachmentUrl: 'Datei-URL',
      spoiler: 'Spoiler',
      buttonLabel: 'Button-Text',
      emoji: 'Emoji',
      style: 'Stil',
      stylePrimary: 'Primary',
      styleSecondary: 'Secondary',
      styleSuccess: 'Success',
      styleDanger: 'Danger',
      styleLink: 'Link',
      url: 'URL',
      customId: 'Custom ID',
      disabled: 'Deaktiviert',
      buttonUrlHint: 'Wenn eine URL eingetragen ist, sendet Discord einen Link-Button. Ohne URL werden Stil und Custom ID genutzt.',
      type: 'Typ',
      selectString: 'String select',
      selectUser: 'User select',
      selectRole: 'Role select',
      selectMentionable: 'Mentionable select',
      selectChannel: 'Channel select',
      placeholder: 'Placeholder',
      minValues: 'Min. Werte',
      maxValues: 'Max. Werte',
      selectOptions: 'Optionen für String select: label | value | description | emoji | default',
      sectionText: 'Sektionstext',
      accessory: 'Accessory',
      buttonUrl: 'Button-URL',
      accentColor: 'Akzentfarbe',
      spoilerContainer: 'Spoiler-Container',
      insideContainer: 'Im Container',
      emptyContainer: 'Dieser Container enthält noch keine Komponenten.',
      firstComponent: 'Erste Komponente hinzufügen.',
      rawDiscordJson: 'Raw Discord message JSON',
      rawModeHint: 'Raw-Modus speichert komplexe Discord-Payloads exakt: content, Einbettungen, alte Buttons und Components V2. Discord-Limits werden weiterhin geprüft.',
      defaultText: '# Titel\nBlocktext.',
      defaultSectionText: '# Wichtiger Block\nSektionstext.',
      defaultContainerText: '# Titel\nContainertext.',
      defaultButtonLabel: 'Öffnen',
      defaultSelectPlaceholder: 'Option auswählen',
      defaultSelectOptions: 'Erste Option | first | Beschreibung | ✨\nZweite Option | second',
      defaultTitle: 'Nachrichteneditor',
      defaultMessageContent: '# Serverregeln\n\nBitte lesen Sie die Regeln, bevor Sie mit dem Schreiben beginnen.',
      defaultEmbedTitle: 'Hauptregeln',
      defaultEmbedDescription: '1. Respektieren Sie andere Mitglieder.\n2. Veröffentlichen Sie keinen Spam und keine Werbung.\n3. Nutzen Sie Kanäle entsprechend ihrem Zweck.\n4. Geben Sie keine persönlichen Daten weiter.',
      defaultEmbedFooter: 'Regeln können aktualisiert werden.',
      defaultComponentRules: '# Serverregeln\n\n1. Respektieren Sie andere Mitglieder.\n2. Veröffentlichen Sie keinen Spam und keine Werbung.\n3. Nutzen Sie Kanäle entsprechend ihrem Zweck.',
      invalidRawJson: 'Raw JSON ist ungültig.',
      rawPayloadRequired: 'Raw JSON muss content, Einbettungen oder Komponenten enthalten.',
      limitMessages: 'Nachrichten',
      limitRawJson: 'Raw JSON',
      limitComponentsTotal: 'Komponenten gesamt',
      limitTopComponents: 'Top-Level-Komponenten',
      limitComponentText: 'Komponententext',
      limitSelectOptions: 'Auswahloptionen',
      limitTextTotal: 'Text gesamt',
      limitMessageText: 'Text',
      limitEmbeds: 'Einbettungen',
      limitActiveEmbed: 'Aktive Einbettung',
      limitEmbedsTotal: 'Einbettungen gesamt',
      block: 'Block',
      child: 'Element',
      errorNeedComponent: 'fügen Sie mindestens einen Components V2 Block hinzu.',
      errorMaxComponents: 'maximale Komponenten',
      errorTextTooLong: 'Text ist länger als',
      errorSectionButtonUrl: 'für den Sektionsbutton ist eine URL erforderlich.',
      errorSectionThumbnailUrl: 'für die Sektion ist eine Vorschaubild-URL erforderlich.',
      errorContainerTextTooLong: 'Containertext ist länger als',
      errorMaxMedia: 'maximale Medienanzahl',
      errorMaxChildren: 'maximale Elemente im Container',
      errorMustBeUrl: 'muss eine URL sein.',
      errorNeedTextOrEmbed: 'Text oder Einbettung ist erforderlich.',
      errorMaxEmbeds: 'maximale Einbettungen',
      errorTitleTooLong: 'Titel ist länger als',
      errorDescriptionTooLong: 'Beschreibung ist länger als',
      errorMaxFields: 'maximale Felder',
      errorEmbedTotalTooLong: 'gesamte Einbettungsgröße ist länger als',
      warningManyWebhookMessages: 'Viele Webhook-Nachrichten sollten nach Zweck getrennt werden, damit der Kanal nicht überladen wirkt.',
      warningManyRuleMessages: 'Viele Regel-Nachrichten sollten besser in einen eigenen Regelkanal gesendet werden.'
    }
  };

  const STORAGE_TEXT = {
    ru: {
      settingsTab: 'Webhook',
      savesTab: 'Сохранения',
      storageTitle: 'Локальные сохранения',
      storageKicker: 'localStorage',
      storageNotice: 'Сохранения остаются только в этом браузере через localStorage. На другом устройстве или в другом браузере их, скорее всего, не будет. Для переноса используйте закодированный экспорт и импорт.',
      storageFileNotice: 'Закодированный файл содержит все настройки текущего редактора, включая сообщения, Components V2, имя вебхука, аватар и webhook URL, если он заполнен.',
      closeSaves: 'Закрыть сохранения',
      saveName: 'Название сохранения',
      saveNamePlaceholder: 'Например: правила, анонс, приветствие',
      saveCurrent: 'Сохранить текущее',
      exportCurrentEncoded: 'Экспорт текущего',
      exportAllEncoded: 'Экспорт всех',
      importEncoded: 'Импорт файла',
      loadSave: 'Загрузить',
      exportSave: 'Экспорт',
      deleteSave: 'Удалить',
      noSaves: 'Сохранений пока нет.',
      savedAt: 'Сохранено',
      updatedAt: 'Обновлено',
      storageSaved: 'Сохранение добавлено локально.',
      storageLoaded: 'Сохранение загружено.',
      storageDeleted: 'Сохранение удалено.',
      storageExported: 'Закодированный файл создан.',
      storageImported: 'Импорт завершен.',
      storageImportFailed: 'Не удалось импортировать закодированный файл.',
      storageUnavailable: 'localStorage недоступен в этом браузере.',
      importMissingMessages: 'Файл не содержит сообщений редактора.',
      encodedOnly: 'Выберите файл, экспортированный из этой вкладки.',
      savedCountOne: 'сообщение',
      savedCountMany: 'сообщений'
    },
    en: {
      settingsTab: 'Webhook',
      savesTab: 'Saves',
      storageTitle: 'Local saves',
      storageKicker: 'localStorage',
      storageNotice: 'Saves stay only in this browser through localStorage. They will probably not exist on another device or in another browser. Use encoded export and import to move them.',
      storageFileNotice: 'The encoded file contains all current editor settings, including messages, Components V2, webhook name, avatar and webhook URL if filled.',
      closeSaves: 'Close saves',
      saveName: 'Save name',
      saveNamePlaceholder: 'For example: rules, announcement, welcome',
      saveCurrent: 'Save current',
      exportCurrentEncoded: 'Export current',
      exportAllEncoded: 'Export all',
      importEncoded: 'Import file',
      loadSave: 'Load',
      exportSave: 'Export',
      deleteSave: 'Delete',
      noSaves: 'No saves yet.',
      savedAt: 'Saved',
      updatedAt: 'Updated',
      storageSaved: 'Save added locally.',
      storageLoaded: 'Save loaded.',
      storageDeleted: 'Save deleted.',
      storageExported: 'Encoded file created.',
      storageImported: 'Import completed.',
      storageImportFailed: 'Failed to import encoded file.',
      storageUnavailable: 'localStorage is not available in this browser.',
      importMissingMessages: 'The file does not contain editor messages.',
      encodedOnly: 'Choose a file exported from this tab.',
      savedCountOne: 'message',
      savedCountMany: 'messages'
    },
    ua: {
      settingsTab: 'Webhook',
      savesTab: 'Збереження',
      storageTitle: 'Локальні збереження',
      storageKicker: 'localStorage',
      storageNotice: 'Збереження залишаються тільки в цьому браузері через localStorage. На іншому пристрої або в іншому браузері їх, найімовірніше, не буде. Для перенесення використовуйте закодований експорт та імпорт.',
      storageFileNotice: 'Закодований файл містить усі налаштування поточного редактора, включно з повідомленнями, Components V2, іменем вебхука, аватаром і webhook URL, якщо він заповнений.',
      closeSaves: 'Закрити збереження',
      saveName: 'Назва збереження',
      saveNamePlaceholder: 'Наприклад: правила, анонс, привітання',
      saveCurrent: 'Зберегти поточне',
      exportCurrentEncoded: 'Експорт поточного',
      exportAllEncoded: 'Експорт усіх',
      importEncoded: 'Імпорт файла',
      loadSave: 'Завантажити',
      exportSave: 'Експорт',
      deleteSave: 'Видалити',
      noSaves: 'Збережень поки немає.',
      savedAt: 'Збережено',
      updatedAt: 'Оновлено',
      storageSaved: 'Збереження додано локально.',
      storageLoaded: 'Збереження завантажено.',
      storageDeleted: 'Збереження видалено.',
      storageExported: 'Закодований файл створено.',
      storageImported: 'Імпорт завершено.',
      storageImportFailed: 'Не вдалося імпортувати закодований файл.',
      storageUnavailable: 'localStorage недоступний у цьому браузері.',
      importMissingMessages: 'Файл не містить повідомлень редактора.',
      encodedOnly: 'Виберіть файл, експортований з цієї вкладки.',
      savedCountOne: 'повідомлення',
      savedCountMany: 'повідомлень'
    },
    de: {
      settingsTab: 'Webhook',
      savesTab: 'Speicher',
      storageTitle: 'Lokale Speicherungen',
      storageKicker: 'localStorage',
      storageNotice: 'Speicherungen bleiben nur in diesem Browser ueber localStorage. Auf einem anderen Geraet oder in einem anderen Browser sind sie wahrscheinlich nicht vorhanden. Nutzen Sie kodierten Export und Import zum Uebertragen.',
      storageFileNotice: 'Die kodierte Datei enthaelt alle aktuellen Editor-Einstellungen, einschliesslich Nachrichten, Components V2, Webhook-Name, Avatar und Webhook-URL, wenn sie ausgefuellt ist.',
      closeSaves: 'Speicherungen schliessen',
      saveName: 'Name der Speicherung',
      saveNamePlaceholder: 'Zum Beispiel: Regeln, Ankuendigung, Begruessung',
      saveCurrent: 'Aktuelles speichern',
      exportCurrentEncoded: 'Aktuelles exportieren',
      exportAllEncoded: 'Alle exportieren',
      importEncoded: 'Datei importieren',
      loadSave: 'Laden',
      exportSave: 'Export',
      deleteSave: 'Loeschen',
      noSaves: 'Noch keine Speicherungen.',
      savedAt: 'Gespeichert',
      updatedAt: 'Aktualisiert',
      storageSaved: 'Speicherung lokal hinzugefuegt.',
      storageLoaded: 'Speicherung geladen.',
      storageDeleted: 'Speicherung geloescht.',
      storageExported: 'Kodierte Datei erstellt.',
      storageImported: 'Import abgeschlossen.',
      storageImportFailed: 'Kodierte Datei konnte nicht importiert werden.',
      storageUnavailable: 'localStorage ist in diesem Browser nicht verfuegbar.',
      importMissingMessages: 'Die Datei enthaelt keine Editor-Nachrichten.',
      encodedOnly: 'Waehlen Sie eine Datei, die aus dieser Registerkarte exportiert wurde.',
      savedCountOne: 'Nachricht',
      savedCountMany: 'Nachrichten'
    }
  };

  function editorLanguage() {
    const saved = localStorage.getItem('core-site-language');
    if (EDITOR_TEXT[saved]) return saved;
    const htmlLang = document.documentElement.lang;
    if (htmlLang === 'uk') return 'ua';
    if (EDITOR_TEXT[htmlLang]) return htmlLang;
    return 'ru';
  }

  function et(key) {
    const language = editorLanguage();
    return EDITOR_TEXT[language]?.[key] || EDITOR_TEXT.ru[key] || key;
  }

  function st(key) {
    const language = editorLanguage();
    return STORAGE_TEXT[language]?.[key] || STORAGE_TEXT.en[key] || key;
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function componentKindLabel(kind) {
    const keys = {
      text: 'componentText',
      separator: 'componentSeparator',
      gallery: 'componentGallery',
      file: 'componentFile',
      button: 'componentButton',
      select: 'componentSelect',
      section: 'componentSection',
      container: 'componentContainer'
    };
    return et(keys[kind] || 'componentUnknown');
  }

  function renderComponentKindOptions(kinds) {
    return kinds
      .map((kind) => `<option value="${escapeHtml(kind)}">${escapeHtml(componentKindLabel(kind))}</option>`)
      .join('');
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function readWebhookSaves() {
    try {
      const parsed = JSON.parse(localStorage.getItem(WEBHOOK_STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item === 'object') : [];
    } catch {
      return [];
    }
  }

  function writeWebhookSaves(items) {
    try {
      localStorage.setItem(WEBHOOK_STORAGE_KEY, JSON.stringify(items.slice(0, 40)));
      return true;
    } catch {
      return false;
    }
  }

  function makeSaveId() {
    return `save-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function slugFilePart(value, fallback = 'webhook') {
    const slug = String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9а-яёіїєґäöüß]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 64);
    return slug || fallback;
  }

  function encodeTransferPayload(payload) {
    const json = JSON.stringify(payload);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return `${WEBHOOK_TRANSFER_PREFIX}${btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')}`;
  }

  function decodeTransferPayload(text) {
    const raw = String(text || '').trim();
    if (!raw.startsWith(WEBHOOK_TRANSFER_PREFIX)) throw new Error(st('encodedOnly'));
    const encoded = raw.slice(WEBHOOK_TRANSFER_PREFIX.length).replace(/-/g, '+').replace(/_/g, '/');
    const padded = encoded.padEnd(Math.ceil(encoded.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  function downloadTextFile(filename, content, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
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

  function padTimePart(value) {
    return String(value).padStart(2, '0');
  }

  function dateToLocalInput(value) {
    const date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) return '';
    return `${date.getFullYear()}-${padTimePart(date.getMonth() + 1)}-${padTimePart(date.getDate())}`;
  }

  function dateToTimeInput(value) {
    const date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) return '';
    return `${padTimePart(date.getHours())}:${padTimePart(date.getMinutes())}`;
  }

  function localInputsToIso(dateValue, timeValue) {
    if (!dateValue) return '';
    const [year, month, day] = String(dateValue).split('-').map(Number);
    const [hour = 0, minute = 0] = String(timeValue || '00:00').split(':').map(Number);
    const date = new Date(year, month - 1, day, hour, minute, 0, 0);
    return Number.isNaN(date.getTime()) ? '' : date.toISOString();
  }

  function discordTimestampCode(dateValue, timeValue, style = 'F') {
    const iso = localInputsToIso(dateValue, timeValue);
    if (!iso) return '';
    const unix = Math.floor(new Date(iso).getTime() / 1000);
    return `<t:${unix}:${style || 'F'}>`;
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

  function measureComponents(components = []) {
    const totals = {
      components: 0,
      text: 0,
      buttons: 0,
      selects: 0,
      selectOptions: 0,
      containers: 0
    };

    const visit = (component = {}) => {
      const type = Number(component.type);
      totals.components += 1;
      if (type === 17) totals.containers += 1;
      if (type === 10) totals.text += String(component.content || '').length;
      if (type === 2) {
        totals.buttons += 1;
        totals.text += String(component.label || '').length + String(component.emoji?.name || '').length;
      }
      if ([3, 5, 6, 7, 8].includes(type)) {
        totals.selects += 1;
        totals.text += String(component.placeholder || '').length;
        const options = Array.isArray(component.options) ? component.options : [];
        totals.selectOptions = Math.max(totals.selectOptions, options.length);
        options.forEach((option) => {
          totals.text += String(option.label || '').length;
          totals.text += String(option.value || '').length;
          totals.text += String(option.description || '').length;
          totals.text += String(option.emoji?.name || '').length;
        });
      }
      if (type === 12) {
        const items = Array.isArray(component.items) ? component.items : [];
        totals.text += items.reduce((sum, item) => sum + String(item.description || '').length, 0);
      }
      if (type === 9 && component.accessory) visit(component.accessory);
      (component.components || []).forEach(visit);
    };

    components.forEach(visit);
    return totals;
  }

  function measurePayload(payload = {}) {
    const embeds = Array.isArray(payload.embeds) ? payload.embeds : [];
    const components = Array.isArray(payload.components) ? payload.components : [];
    const componentTotals = measureComponents(components);
    return {
      content: String(payload.content || '').length,
      embeds: embeds.length,
      embedTotal: embeds.reduce((sum, item) => sum + embedTotal(item), 0),
      topComponents: components.length,
      ...componentTotals
    };
  }

  function defaultEmbed(useDefaultThumbnail = true) {
    return {
      color: '#44b8de',
      author: { name: '', url: '', icon_url: '' },
      title: '',
      url: '',
      description: '',
      thumbnail: { url: useDefaultThumbnail ? DEFAULT_CORE_IMAGE_URL : '' },
      image: { url: '' },
      fields: [],
      footer: { text: '', icon_url: '' },
      timestamp: ''
    };
  }

  function defaultMessage() {
    return {
      mode: 'classic',
      content: et('defaultMessageContent'),
      embeds: [{
        ...defaultEmbed(),
        title: et('defaultEmbedTitle'),
        description: et('defaultEmbedDescription'),
        footer: { text: et('defaultEmbedFooter'), icon_url: '' }
      }],
      activeEmbed: 0,
      blocks: [{
        kind: 'container',
        accent: '#44b8de',
        text: et('defaultComponentRules'),
        thumbnail: DEFAULT_CORE_IMAGE_URL,
        media: '',
        buttonLabel: '',
        buttonUrl: '',
        spoiler: false
      }]
    };
  }

  function normalizeIncomingEmbed(embed = {}) {
    const normalized = defaultEmbed(false);
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

  function optionValueFromLabel(label) {
    return String(label || 'option')
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}_-]+/gu, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 100) || 'option';
  }

  function selectOptionsToText(options = []) {
    return options
      .map((option) => [
        option.label || '',
        option.value || '',
        option.description || '',
        option.emoji?.name || '',
        option.default ? 'default' : ''
      ].join(' | ').replace(/\s+\|\s+$/, ''))
      .filter(Boolean)
      .join('\n');
  }

  function parseSelectOptions(value) {
    return String(value || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, LIMITS.selectOptions)
      .map((line) => {
        const [labelPart, valuePart, descriptionPart, emojiPart, defaultPart] = line.split('|').map((part) => part.trim());
        const label = clampText(labelPart, 100);
        if (!label) return null;
        const option = {
          label,
          value: clampText(valuePart || optionValueFromLabel(label), 100)
        };
        if (descriptionPart) option.description = clampText(descriptionPart, 100);
        if (emojiPart) option.emoji = { name: clampText(emojiPart, 32) };
        if (/^(1|true|yes|default)$/i.test(defaultPart || '')) option.default = true;
        return option;
      })
      .filter(Boolean);
  }

  function isContainerChildBlock(block) {
    return Boolean(block && ['text', 'section', 'gallery', 'separator', 'button', 'select', 'file'].includes(block.kind));
  }

  function normalizeContainerChildren(block = {}) {
    if (Array.isArray(block.children)) {
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

    block.children = children.slice(0, LIMITS.containerChildren);
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
        .flatMap((child) => blockFromComponent(child))
        .filter(Boolean);
    }
    if (type === 2) {
      return [{
          kind: 'button',
          label: clampText(component.label, LIMITS.buttonLabel),
          url: normalizeUrl(component.url),
          style: Number(component.style || (component.url ? 5 : 2)),
          customId: clampText(component.custom_id || component.customId, 100),
          emoji: clampText(component.emoji?.name, 32),
          disabled: Boolean(component.disabled)
        }];
    }
    if ([3, 5, 6, 7, 8].includes(type)) {
      return [{
        kind: 'select',
        selectType: type,
        customId: clampText(component.custom_id || component.customId || 'core-select', 100),
        placeholder: clampText(component.placeholder, 150),
        minValues: Number.isFinite(Number(component.min_values)) ? Number(component.min_values) : 0,
        maxValues: Number.isFinite(Number(component.max_values)) ? Number(component.max_values) : 1,
        disabled: Boolean(component.disabled),
        options: type === 3 ? selectOptionsToText(component.options || []) : ''
      }];
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
    const label = clampText(block.buttonLabel || block.label || 'Open', LIMITS.buttonLabel);
    const emojiName = clampText(block.emoji, 32);
    const base = {
      type: 2,
      label,
      ...(emojiName ? { emoji: { name: emojiName } } : {}),
      ...(block.disabled ? { disabled: true } : {})
    };
    const url = normalizeUrl(block.buttonUrl || block.url);
    if (url) return { ...base, style: 5, url };
    const customId = clampText(block.customId || block.custom_id, 100);
    if (!customId) return null;
    const style = Math.max(1, Math.min(4, Number(block.style || 2)));
    return { ...base, style, custom_id: customId };
  }

  function buildSelect(block) {
    const type = [3, 5, 6, 7, 8].includes(Number(block.selectType)) ? Number(block.selectType) : 3;
    const customId = clampText(block.customId || 'core-select', 100);
    if (!customId) return null;
    const minValues = Math.max(0, Math.min(25, Number(block.minValues || 0)));
    const maxValues = Math.max(1, Math.min(25, Number(block.maxValues || 1)));
    const select = {
      type,
      custom_id: customId,
      min_values: Math.min(minValues, maxValues),
      max_values: Math.max(minValues || 1, maxValues),
      ...(block.placeholder ? { placeholder: clampText(block.placeholder, 150) } : {}),
      ...(block.disabled ? { disabled: true } : {})
    };
    if (type === 3) {
      const options = parseSelectOptions(block.options);
      if (!options.length) return null;
      select.options = options;
    }
    return select;
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
    if (block.kind === 'select') {
      const select = buildSelect(block);
      return select ? { type: 1, components: [select] } : null;
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
      throw new Error(et('rawPayloadRequired'));
    }

    return normalized;
  }

  function parseSnowflakeList(value) {
    return String(value || '')
      .split(/[,\s]+/)
      .map((item) => item.trim())
      .filter((item) => /^\d{10,32}$/.test(item))
      .slice(0, 5);
  }

  function buildWebhookPayload(state, message, options = {}) {
    const payload = {
      allowed_mentions: { parse: [] },
      ...buildRuleMessage(message)
    };
    if (state.username) payload.username = clampText(state.username, 80);
    if (normalizeUrl(state.avatarUrl)) payload.avatar_url = normalizeUrl(state.avatarUrl);
    if (options.includeThreadName && state.threadName) payload.thread_name = clampText(state.threadName, 100);
    const appliedTags = options.includeThreadName ? parseSnowflakeList(state.appliedTags) : [];
    if (appliedTags.length) payload.applied_tags = appliedTags;
    return payload;
  }

  function buildWebhookRequestUrl(baseUrl, threadId = '') {
    const url = new URL(baseUrl);
    url.searchParams.set('wait', 'true');
    if (/^\d{10,32}$/.test(String(threadId || '').trim())) {
      url.searchParams.set('thread_id', String(threadId).trim());
    }
    return url.toString();
  }

  function formatStorageDate(value) {
    const date = new Date(value || 0);
    if (Number.isNaN(date.getTime())) return '';
    try {
      return new Intl.DateTimeFormat(editorLanguage() === 'ua' ? 'uk' : editorLanguage(), {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return date.toLocaleString();
    }
  }

  function renderWebhookStoragePanel() {
    const saves = readWebhookSaves();
    const list = saves.length
      ? saves.map((item) => {
        const messages = item.snapshot?.messages?.length || 0;
        const countLabel = messages === 1 ? st('savedCountOne') : st('savedCountMany');
        return `
          <article class="webhook-save-card">
            <div>
              <strong>${escapeHtml(item.name || 'Webhook')}</strong>
              <span>${escapeHtml(st('updatedAt'))}: ${escapeHtml(formatStorageDate(item.updatedAt || item.createdAt))}</span>
              <small>${messages} ${escapeHtml(countLabel)}</small>
            </div>
            <div class="webhook-save-actions">
              <button type="button" data-load-webhook-save="${escapeHtml(item.id)}">${escapeHtml(st('loadSave'))}</button>
              <button type="button" data-export-webhook-save="${escapeHtml(item.id)}">${escapeHtml(st('exportSave'))}</button>
              <button type="button" data-delete-webhook-save="${escapeHtml(item.id)}">${escapeHtml(st('deleteSave'))}</button>
            </div>
          </article>
        `;
      }).join('')
      : `<div class="webhook-save-empty">${escapeHtml(st('noSaves'))}</div>`;

    return `
      <button type="button" class="webhook-storage-backdrop" data-storage-tab="settings" aria-label="${escapeHtml(st('closeSaves'))}"></button>
      <div class="webhook-storage-dialog" role="dialog" aria-modal="true" aria-labelledby="webhook-storage-title">
        <div class="webhook-storage-header">
          <div>
            <span>${escapeHtml(st('storageKicker'))}</span>
            <h2 id="webhook-storage-title">${escapeHtml(st('storageTitle'))}</h2>
          </div>
          <button type="button" class="webhook-storage-close" data-storage-tab="settings" aria-label="${escapeHtml(st('closeSaves'))}">&times;</button>
        </div>
        <div class="webhook-storage-panel">
          <section class="webhook-storage-copy">
            <strong>${escapeHtml(st('storageTitle'))}</strong>
            <p>${escapeHtml(st('storageNotice'))}</p>
            <p>${escapeHtml(st('storageFileNotice'))}</p>
          </section>
          <section class="webhook-storage-create">
            <label class="rules-field">
              <span>${escapeHtml(st('saveName'))}</span>
              <input type="text" data-webhook-save-name maxlength="80" placeholder="${escapeHtml(st('saveNamePlaceholder'))}">
            </label>
            <div class="rules-actions webhook-storage-actions">
              <button type="button" class="button primary" data-save-webhook-current>${escapeHtml(st('saveCurrent'))}</button>
              <button type="button" class="button secondary" data-export-webhook-current>${escapeHtml(st('exportCurrentEncoded'))}</button>
              <button type="button" class="button secondary" data-export-webhook-all>${escapeHtml(st('exportAllEncoded'))}</button>
              <label class="button secondary rules-file-button">
                ${escapeHtml(st('importEncoded'))}
                <input type="file" data-webhook-storage-import accept=".corehook,.txt,.json,application/json,text/plain">
              </label>
            </div>
            <div class="webhook-storage-status" data-webhook-storage-status></div>
          </section>
          <section class="webhook-save-list-wrap">
            <div class="webhook-save-list" data-webhook-save-list>
              ${list}
            </div>
          </section>
        </div>
      </div>
    `;
  }

  function renderEditorShell(state = {}) {
    const hasStorage = state.kind === 'webhook';
    const activeTab = hasStorage && state.storageTab === 'saves' ? 'saves' : 'settings';
    const storageTabs = hasStorage
      ? `
        <div class="rules-storage-tabs" role="tablist" aria-label="Webhook editor sections">
          <button type="button" class="${activeTab === 'settings' ? 'is-active' : ''}" data-storage-tab="settings">${escapeHtml(st('settingsTab'))}</button>
          <button type="button" class="${activeTab === 'saves' ? 'is-active' : ''}" data-storage-tab="saves" aria-haspopup="dialog">${escapeHtml(st('savesTab'))}</button>
        </div>
      `
      : '';
    return `
      <div class="rules-editor">
        <div class="rules-left-column">
          <div class="rules-panel rules-settings">
            ${storageTabs}
            <div data-storage-section="settings">
              <div class="rules-panel-heading">
                <span>Webhook</span>
                <strong data-editor-status>${escapeHtml(et('ready'))}</strong>
              </div>
              <label class="rules-field">
                <span>${escapeHtml(et('webhookUrl'))}</span>
                <input type="url" data-setting="webhookUrl" placeholder="https://discord.com/api/webhooks/...">
              </label>
              <div class="rules-two">
                <label class="rules-field">
                  <span>${escapeHtml(et('webhookName'))}</span>
                  <input type="text" data-setting="username" maxlength="80" placeholder="Core">
                </label>
                <label class="rules-field">
                  <span>${escapeHtml(et('webhookAvatar'))}</span>
                  <input type="url" data-setting="avatarUrl" placeholder="https://...">
                </label>
              </div>
              <div class="webhook-thread-settings">
                <div class="rules-panel-heading">
                  <span>${escapeHtml(et('webhookThreadTitle'))}</span>
                </div>
                <label class="rules-field">
                  <span>${escapeHtml(et('webhookThreadName'))}</span>
                  <input type="text" data-setting="threadName" maxlength="100" placeholder="updates">
                </label>
                <div class="rules-two">
                  <label class="rules-field">
                    <span>${escapeHtml(et('webhookThreadId'))}</span>
                    <input type="text" data-setting="threadId" maxlength="32" inputmode="numeric" placeholder="123456789012345678">
                  </label>
                  <label class="rules-field">
                    <span>${escapeHtml(et('webhookTags'))}</span>
                    <input type="text" data-setting="appliedTags" placeholder="123, 456">
                  </label>
                </div>
                <p class="editor-muted">${escapeHtml(et('webhookThreadHint'))}</p>
              </div>
              <div class="rules-actions">
                <button type="button" class="button primary" data-editor-send>${escapeHtml(et('send'))}</button>
                <button type="button" class="button secondary" data-editor-export>${escapeHtml(et('exportJson'))}</button>
                <button type="button" class="button secondary" data-editor-copy>${escapeHtml(et('copyJson'))}</button>
                ${hasStorage ? `<button type="button" class="button secondary" data-editor-tools-open>${escapeHtml(et('editorTools'))}</button>` : ''}
                <label class="button secondary rules-file-button">
                  ${escapeHtml(et('importJson'))}
                  <input type="file" data-editor-import accept="application/json,.json">
                </label>
              </div>
              <div class="rules-limit-list" data-editor-limits></div>
              <div class="rules-alert" data-editor-alert hidden></div>
            </div>
          </div>

          <div class="rules-panel rules-message-list">
            <div class="rules-panel-heading">
              <span>${escapeHtml(et('messages'))}</span>
              <button type="button" data-add-message>${escapeHtml(et('add'))}</button>
            </div>
            <div class="rules-message-buttons" data-message-list></div>
          </div>
        </div>

        <div class="rules-panel rules-edit-panel">
          <div class="rules-panel-heading">
            <span data-current-message-title>${escapeHtml(et('message'))} 1</span>
            <div class="rules-mini-actions">
              <button type="button" data-duplicate-message>${escapeHtml(et('duplicate'))}</button>
              <button type="button" data-delete-message>${escapeHtml(et('delete'))}</button>
            </div>
          </div>
          <div class="message-mode-switch" role="group" aria-label="Message type">
            <button type="button" data-message-mode="classic">${escapeHtml(et('modeClassic'))}</button>
            <button type="button" data-message-mode="components">${escapeHtml(et('modeComponents'))}</button>
            <button type="button" data-message-mode="raw">${escapeHtml(et('modeRaw'))}</button>
          </div>
          <div data-message-editor-body></div>
        </div>

        <div class="rules-panel rules-preview-panel">
          <div class="rules-panel-heading">
            <span>${escapeHtml(et('preview'))}</span>
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
              ${escapeHtml(embed.title || `${et('embed')} ${index + 1}`)}
            </button>
          `).join('')}
        </div>
        <button type="button" data-add-embed ${embeds.length >= LIMITS.embeds ? 'disabled' : ''}>${escapeHtml(et('addEmbed'))}</button>
      </div>
    `;
  }

  function renderEmbedEditor(message) {
    const embed = message.embeds[message.activeEmbed] || defaultEmbed();
    return `
      ${renderEmbedList(message)}
      <div class="embed-editor">
        <div class="rules-mini-actions">
          <button type="button" data-duplicate-embed ${message.embeds.length >= LIMITS.embeds ? 'disabled' : ''}>${escapeHtml(et('duplicateEmbed'))}</button>
          <button type="button" data-delete-embed ${message.embeds.length <= 1 ? 'disabled' : ''}>${escapeHtml(et('deleteEmbed'))}</button>
        </div>
        <div class="rules-two">
          <label class="rules-field">
            <span>${escapeHtml(et('color'))}</span>
            <input type="color" data-embed-path="color" value="${escapeHtml(normalizeHexColor(embed.color))}">
          </label>
          <label class="rules-field">
            <span>${escapeHtml(et('title'))}</span>
            <input type="text" data-embed-path="title" maxlength="${LIMITS.embedTitle}" value="${escapeHtml(embed.title)}">
          </label>
        </div>
        <label class="rules-field">
          <span>${escapeHtml(et('titleUrl'))}</span>
          <input type="url" data-embed-path="url" value="${escapeHtml(embed.url)}" placeholder="https://...">
        </label>
        <label class="rules-field">
          <span>${escapeHtml(et('embedDescription'))}</span>
          <textarea data-embed-path="description" maxlength="${LIMITS.embedDescription}" rows="8">${escapeHtml(embed.description)}</textarea>
        </label>
        <div class="rules-two">
          <label class="rules-field">
            <span>${escapeHtml(et('author'))}</span>
            <input type="text" data-embed-path="author.name" maxlength="${LIMITS.embedAuthor}" value="${escapeHtml(embed.author?.name)}">
          </label>
          <label class="rules-field">
            <span>${escapeHtml(et('authorUrl'))}</span>
            <input type="url" data-embed-path="author.url" value="${escapeHtml(embed.author?.url)}" placeholder="https://...">
          </label>
        </div>
        <label class="rules-field">
          <span>${escapeHtml(et('authorIcon'))}</span>
          <input type="url" data-embed-path="author.icon_url" value="${escapeHtml(embed.author?.icon_url)}" placeholder="https://...">
        </label>
        <div class="rules-two">
          <label class="rules-field">
            <span>${escapeHtml(et('thumbnailUrl'))}</span>
            <input type="url" data-embed-path="thumbnail.url" value="${escapeHtml(embed.thumbnail?.url)}" placeholder="https://...">
          </label>
          <label class="rules-field">
            <span>${escapeHtml(et('imageUrl'))}</span>
            <input type="url" data-embed-path="image.url" value="${escapeHtml(embed.image?.url)}" placeholder="https://...">
          </label>
        </div>
        <div class="rules-two">
          <label class="rules-field">
            <span>${escapeHtml(et('footer'))}</span>
            <input type="text" data-embed-path="footer.text" maxlength="${LIMITS.embedFooter}" value="${escapeHtml(embed.footer?.text)}">
          </label>
          <label class="rules-field">
            <span>${escapeHtml(et('footerIcon'))}</span>
            <input type="url" data-embed-path="footer.icon_url" value="${escapeHtml(embed.footer?.icon_url)}" placeholder="https://...">
          </label>
        </div>
        <div class="embed-time-picker">
          <div class="rules-panel-heading">
            <span>${escapeHtml(et('timestampIso'))}</span>
            <div class="rules-mini-actions">
              <button type="button" data-embed-timestamp-now>${escapeHtml(et('timestampNow'))}</button>
              <button type="button" data-embed-timestamp-clear>${escapeHtml(et('timestampClear'))}</button>
            </div>
          </div>
          <div class="rules-two">
            <label class="rules-field">
              <span>${escapeHtml(et('timestampDate'))}</span>
              <input type="date" data-embed-timestamp-date value="${escapeHtml(embed.timestamp ? dateToLocalInput(embed.timestamp) : '')}">
            </label>
            <label class="rules-field">
              <span>${escapeHtml(et('timestampTime'))}</span>
              <input type="time" data-embed-timestamp-time value="${escapeHtml(embed.timestamp ? dateToTimeInput(embed.timestamp) : '')}">
            </label>
          </div>
        </div>
        <div class="embed-fields">
          <div class="rules-panel-heading">
            <span>${escapeHtml(et('fields'))}</span>
            <button type="button" data-add-field ${embed.fields.length >= LIMITS.embedFields ? 'disabled' : ''}>${escapeHtml(et('addField'))}</button>
          </div>
          ${embed.fields.length ? embed.fields.map((field, index) => `
            <div class="embed-field-row" data-field-index="${index}">
              <label class="rules-field">
                <span>${escapeHtml(et('fieldName'))}</span>
                <input type="text" data-field-name="${index}" maxlength="${LIMITS.embedFieldName}" value="${escapeHtml(field.name)}">
              </label>
              <label class="rules-field">
                <span>${escapeHtml(et('fieldValue'))}</span>
                <textarea data-field-value="${index}" maxlength="${LIMITS.embedFieldValue}" rows="3">${escapeHtml(field.value)}</textarea>
              </label>
              <label class="rules-check">
                <input type="checkbox" data-field-inline="${index}" ${field.inline ? 'checked' : ''}>
                <span>${escapeHtml(et('inline'))}</span>
              </label>
              <button type="button" class="template-copy-btn" data-delete-field="${index}">${escapeHtml(et('delete'))}</button>
            </div>
          `).join('') : `<p class="editor-muted">${escapeHtml(et('noFields'))}</p>`}
        </div>
      </div>
    `;
  }

  function renderClassicEditor(message) {
    message.embeds ||= [];
    if (!message.embeds.length) message.embeds.push(defaultEmbed());
    return `
      <label class="rules-field">
        <span>${escapeHtml(et('messageContent'))}</span>
        <textarea data-message-content maxlength="${LIMITS.content}" rows="8" placeholder="${escapeHtml(et('rulesPlaceholder'))}">${escapeHtml(message.content)}</textarea>
      </label>
      ${renderEmbedEditor(message)}
    `;
  }

  function renderComponentBlock(block, index, parentIndex = null, siblingCount = null) {
    const isNested = parentIndex !== null && parentIndex !== undefined;
    const isLast = Number.isFinite(Number(siblingCount)) ? index >= Number(siblingCount) - 1 : false;
    const fieldAttrs = isNested
      ? `data-container-index="${parentIndex}" data-child-index="${index}"`
      : `data-component-index="${index}"`;
    const controls = isNested ? `
      <div class="component-block-actions">
        <button type="button" data-move-container-component data-container-index="${parentIndex}" data-child-index="${index}" data-direction="-1" title="${escapeHtml(et('moveUp'))}" aria-label="${escapeHtml(et('moveUp'))}" ${index === 0 ? 'disabled' : ''}>↑</button>
        <button type="button" data-move-container-component data-container-index="${parentIndex}" data-child-index="${index}" data-direction="1" title="${escapeHtml(et('moveDown'))}" aria-label="${escapeHtml(et('moveDown'))}" ${isLast ? 'disabled' : ''}>↓</button>
        <button type="button" data-duplicate-container-component data-container-index="${parentIndex}" data-child-index="${index}">${escapeHtml(et('duplicate'))}</button>
        <button type="button" data-delete-container-component data-container-index="${parentIndex}" data-child-index="${index}">${escapeHtml(et('delete'))}</button>
      </div>
    ` : `
      <div class="component-block-actions">
        <button type="button" data-move-component="${index}" data-direction="-1" title="${escapeHtml(et('moveUp'))}" aria-label="${escapeHtml(et('moveUp'))}" ${index === 0 ? 'disabled' : ''}>↑</button>
        <button type="button" data-move-component="${index}" data-direction="1" title="${escapeHtml(et('moveDown'))}" aria-label="${escapeHtml(et('moveDown'))}" ${isLast ? 'disabled' : ''}>↓</button>
        <button type="button" data-duplicate-component="${index}">${escapeHtml(et('duplicate'))}</button>
        <button type="button" data-delete-component="${index}">${escapeHtml(et('delete'))}</button>
      </div>
    `;

    if (block.kind === 'text') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>${escapeHtml(et('componentText'))}</strong>${controls}</div>
          <label class="rules-field">
            <span>${escapeHtml(et('markdownText'))}</span>
            <textarea rows="6" maxlength="${LIMITS.componentText}" data-component-field="content" ${fieldAttrs}>${escapeHtml(block.content)}</textarea>
          </label>
        </article>
      `;
    }

    if (block.kind === 'separator') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>${escapeHtml(et('componentSeparator'))}</strong>${controls}</div>
          <label class="rules-check">
            <input type="checkbox" data-component-field="divider" ${fieldAttrs} ${block.divider !== false ? 'checked' : ''}>
            <span>${escapeHtml(et('showLine'))}</span>
          </label>
          <label class="rules-field">
            <span>${escapeHtml(et('spacing'))}</span>
            <select data-component-field="spacing" ${fieldAttrs}>
              <option value="1" ${Number(block.spacing) !== 2 ? 'selected' : ''}>${escapeHtml(et('small'))}</option>
              <option value="2" ${Number(block.spacing) === 2 ? 'selected' : ''}>${escapeHtml(et('large'))}</option>
            </select>
          </label>
        </article>
      `;
    }

    if (block.kind === 'gallery') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>${escapeHtml(et('componentGallery'))}</strong>${controls}</div>
          <label class="rules-field">
            <span>${escapeHtml(et('mediaUrls'))}</span>
            <textarea rows="6" data-component-field="media" ${fieldAttrs} placeholder="https://site/image.png | Description">${escapeHtml(block.media)}</textarea>
          </label>
        </article>
      `;
    }

    if (block.kind === 'file') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>${escapeHtml(et('componentFile'))}</strong>${controls}</div>
          <label class="rules-field">
            <span>${escapeHtml(et('attachmentUrl'))}</span>
            <input type="text" data-component-field="fileName" ${fieldAttrs} value="${escapeHtml(block.fileName)}" placeholder="attachment://rules.pdf">
          </label>
          <label class="rules-check">
            <input type="checkbox" data-component-field="spoiler" ${fieldAttrs} ${block.spoiler ? 'checked' : ''}>
            <span>${escapeHtml(et('spoiler'))}</span>
          </label>
        </article>
      `;
    }

    if (block.kind === 'button') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>${escapeHtml(et('componentButton'))}</strong>${controls}</div>
          <div class="rules-two">
            <label class="rules-field">
              <span>${escapeHtml(et('buttonLabel'))}</span>
              <input type="text" maxlength="${LIMITS.buttonLabel}" data-component-field="label" ${fieldAttrs} value="${escapeHtml(block.label)}">
            </label>
            <label class="rules-field">
              <span>${escapeHtml(et('emoji'))}</span>
              <input type="text" maxlength="32" data-component-field="emoji" ${fieldAttrs} value="${escapeHtml(block.emoji)}" placeholder="✨">
            </label>
          </div>
          <div class="rules-two">
            <label class="rules-field">
              <span>${escapeHtml(et('style'))}</span>
              <select data-component-field="style" ${fieldAttrs}>
                <option value="1" ${Number(block.style) === 1 ? 'selected' : ''}>${escapeHtml(et('stylePrimary'))}</option>
                <option value="2" ${!block.style || Number(block.style) === 2 ? 'selected' : ''}>${escapeHtml(et('styleSecondary'))}</option>
                <option value="3" ${Number(block.style) === 3 ? 'selected' : ''}>${escapeHtml(et('styleSuccess'))}</option>
                <option value="4" ${Number(block.style) === 4 ? 'selected' : ''}>${escapeHtml(et('styleDanger'))}</option>
                <option value="5" ${Number(block.style) === 5 || block.url ? 'selected' : ''}>${escapeHtml(et('styleLink'))}</option>
              </select>
            </label>
            <label class="rules-field">
              <span>${escapeHtml(et('url'))}</span>
              <input type="url" data-component-field="url" ${fieldAttrs} value="${escapeHtml(block.url)}" placeholder="https://...">
            </label>
          </div>
          <label class="rules-field">
            <span>${escapeHtml(et('customId'))}</span>
            <input type="text" maxlength="100" data-component-field="customId" ${fieldAttrs} value="${escapeHtml(block.customId)}" placeholder="core_button">
          </label>
          <label class="rules-check">
            <input type="checkbox" data-component-field="disabled" ${fieldAttrs} ${block.disabled ? 'checked' : ''}>
            <span>${escapeHtml(et('disabled'))}</span>
          </label>
          <p class="editor-muted">${escapeHtml(et('buttonUrlHint'))}</p>
        </article>
      `;
    }

    if (block.kind === 'select') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>${escapeHtml(et('componentSelect'))}</strong>${controls}</div>
          <div class="rules-two">
            <label class="rules-field">
              <span>${escapeHtml(et('type'))}</span>
              <select data-component-field="selectType" ${fieldAttrs}>
                <option value="3" ${Number(block.selectType) === 3 ? 'selected' : ''}>${escapeHtml(et('selectString'))}</option>
                <option value="5" ${Number(block.selectType) === 5 ? 'selected' : ''}>${escapeHtml(et('selectUser'))}</option>
                <option value="6" ${Number(block.selectType) === 6 ? 'selected' : ''}>${escapeHtml(et('selectRole'))}</option>
                <option value="7" ${Number(block.selectType) === 7 ? 'selected' : ''}>${escapeHtml(et('selectMentionable'))}</option>
                <option value="8" ${Number(block.selectType) === 8 ? 'selected' : ''}>${escapeHtml(et('selectChannel'))}</option>
              </select>
            </label>
            <label class="rules-field">
              <span>${escapeHtml(et('customId'))}</span>
              <input type="text" maxlength="100" data-component-field="customId" ${fieldAttrs} value="${escapeHtml(block.customId)}" placeholder="core_select">
            </label>
          </div>
          <label class="rules-field">
            <span>${escapeHtml(et('placeholder'))}</span>
            <input type="text" maxlength="150" data-component-field="placeholder" ${fieldAttrs} value="${escapeHtml(block.placeholder)}" placeholder="${escapeHtml(et('defaultSelectPlaceholder'))}">
          </label>
          <div class="rules-two">
            <label class="rules-field">
              <span>${escapeHtml(et('minValues'))}</span>
              <input type="number" min="0" max="25" data-component-field="minValues" ${fieldAttrs} value="${escapeHtml(block.minValues)}">
            </label>
            <label class="rules-field">
              <span>${escapeHtml(et('maxValues'))}</span>
              <input type="number" min="1" max="25" data-component-field="maxValues" ${fieldAttrs} value="${escapeHtml(block.maxValues)}">
            </label>
          </div>
          <label class="rules-field">
            <span>${escapeHtml(et('selectOptions'))}</span>
            <textarea rows="6" data-component-field="options" ${fieldAttrs} placeholder="First option | first | Description | ✨">${escapeHtml(block.options)}</textarea>
          </label>
          <label class="rules-check">
            <input type="checkbox" data-component-field="disabled" ${fieldAttrs} ${block.disabled ? 'checked' : ''}>
            <span>${escapeHtml(et('disabled'))}</span>
          </label>
        </article>
      `;
    }

    if (block.kind === 'section') {
      return `
        <article class="component-block">
          <div class="component-block-heading"><strong>${escapeHtml(et('componentSection'))}</strong>${controls}</div>
          <label class="rules-field">
            <span>${escapeHtml(et('sectionText'))}</span>
            <textarea rows="6" maxlength="${LIMITS.componentText}" data-component-field="content" ${fieldAttrs}>${escapeHtml(block.content)}</textarea>
          </label>
          <div class="rules-two">
            <label class="rules-field">
              <span>${escapeHtml(et('accessory'))}</span>
              <select data-component-field="accessoryType" ${fieldAttrs}>
                <option value="thumbnail" ${block.accessoryType !== 'button' ? 'selected' : ''}>${escapeHtml(et('thumbnailUrl'))}</option>
                <option value="button" ${block.accessoryType === 'button' ? 'selected' : ''}>${escapeHtml(et('componentButton'))}</option>
              </select>
            </label>
            <label class="rules-field">
              <span>${escapeHtml(block.accessoryType === 'button' ? et('buttonUrl') : et('thumbnailUrl'))}</span>
              <input type="url" data-component-field="${block.accessoryType === 'button' ? 'buttonUrl' : 'accessoryUrl'}" ${fieldAttrs} value="${escapeHtml(block.accessoryType === 'button' ? block.buttonUrl : block.accessoryUrl)}" placeholder="https://...">
            </label>
          </div>
          ${block.accessoryType === 'button' ? `
            <label class="rules-field">
              <span>${escapeHtml(et('buttonLabel'))}</span>
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
          <div class="component-block-heading"><strong>${escapeHtml(et('componentContainer'))}</strong>${controls}</div>
          <div class="rules-two">
            <label class="rules-field">
              <span>${escapeHtml(et('accentColor'))}</span>
              <input type="color" data-component-field="accent" data-component-index="${index}" value="${escapeHtml(normalizeHexColor(block.accent))}">
            </label>
            <label class="rules-check">
              <input type="checkbox" data-component-field="spoiler" data-component-index="${index}" ${block.spoiler ? 'checked' : ''}>
              <span>${escapeHtml(et('spoilerContainer'))}</span>
            </label>
          </div>
          <div class="container-child-toolbar">
            <span>${escapeHtml(et('insideContainer'))}</span>
            <div class="components-toolbar">
              <label class="rules-field component-add-field">
                <span>${escapeHtml(et('component'))}</span>
                <select data-add-container-component-kind data-container-index="${index}" ${children.length >= LIMITS.containerChildren ? 'disabled' : ''}>
                  ${renderComponentKindOptions(['text', 'section', 'gallery', 'separator', 'button', 'select', 'file'])}
                </select>
              </label>
              <button type="button" data-add-container-selected data-container-index="${index}" ${children.length >= LIMITS.containerChildren ? 'disabled' : ''}>${escapeHtml(et('add'))}</button>
            </div>
          </div>
          <div class="container-child-list">
            ${children.length ? children.map((child, childIndex) => renderComponentBlock(child, childIndex, index, children.length)).join('') : `<div class="template-empty"><strong>${escapeHtml(et('emptyContainer'))}</strong></div>`}
          </div>
        </article>
      `;
    }

    return `
      <article class="component-block">
        <div class="component-block-heading"><strong>${escapeHtml(et('componentUnknown'))}</strong>${controls}</div>
        <div class="rules-two">
          <label class="rules-field">
            <span>${escapeHtml(et('accentColor'))}</span>
            <input type="color" data-component-field="accent" data-component-index="${index}" value="${escapeHtml(normalizeHexColor(block.accent))}">
          </label>
          <label class="rules-field">
            <span>${escapeHtml(et('thumbnailUrl'))}</span>
            <input type="url" data-component-field="thumbnail" data-component-index="${index}" value="${escapeHtml(block.thumbnail)}" placeholder="https://...">
          </label>
        </div>
        <label class="rules-field">
          <span>${escapeHtml(et('componentText'))}</span>
          <textarea rows="7" maxlength="${LIMITS.componentText}" data-component-field="text" data-component-index="${index}">${escapeHtml(block.text)}</textarea>
        </label>
        <label class="rules-field">
          <span>${escapeHtml(et('mediaUrls'))}</span>
          <textarea rows="4" data-component-field="media" data-component-index="${index}" placeholder="https://site/image.png | Description">${escapeHtml(block.media)}</textarea>
        </label>
        <div class="rules-two">
          <label class="rules-field">
            <span>${escapeHtml(et('componentButton'))}</span>
            <input type="text" maxlength="${LIMITS.buttonLabel}" data-component-field="buttonLabel" data-component-index="${index}" value="${escapeHtml(block.buttonLabel)}" placeholder="${escapeHtml(et('defaultButtonLabel'))}">
          </label>
          <label class="rules-field">
            <span>${escapeHtml(et('buttonUrl'))}</span>
            <input type="url" data-component-field="buttonUrl" data-component-index="${index}" value="${escapeHtml(block.buttonUrl)}" placeholder="https://...">
          </label>
        </div>
        <label class="rules-check">
          <input type="checkbox" data-component-field="spoiler" data-component-index="${index}" ${block.spoiler ? 'checked' : ''}>
          <span>${escapeHtml(et('spoilerContainer'))}</span>
        </label>
      </article>
    `;
  }

  function renderComponentsEditor(message) {
    return `
      <div class="components-toolbar">
        <label class="rules-field component-add-field">
          <span>${escapeHtml(et('addComponent'))}</span>
          <select data-add-component-kind>
            ${renderComponentKindOptions(['container', 'text', 'section', 'gallery', 'separator', 'button', 'select', 'file'])}
          </select>
        </label>
        <button type="button" data-add-selected-component>${escapeHtml(et('add'))}</button>
      </div>
      <p class="editor-muted">${escapeHtml(et('componentHint'))}</p>
      <div class="component-block-list">
        ${message.blocks?.length ? message.blocks.map((block, index) => renderComponentBlock(block, index, null, message.blocks.length)).join('') : `<div class="template-empty"><strong>${escapeHtml(et('firstComponent'))}</strong></div>`}
      </div>
    `;
  }

  function renderRawEditor(message) {
    if (!message.raw) {
      message.raw = JSON.stringify(buildRuleMessage({ ...message, mode: 'classic' }), null, 2);
    }

    return `
      <label class="rules-field">
        <span>${escapeHtml(et('rawDiscordJson'))}</span>
        <textarea data-message-raw rows="18" spellcheck="false">${escapeHtml(message.raw)}</textarea>
      </label>
      <p class="editor-muted">${escapeHtml(et('rawModeHint'))}</p>
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
    if (kind === 'text') return { kind, content: et('defaultText') };
    if (kind === 'separator') return { kind, divider: true, spacing: 1 };
    if (kind === 'gallery') return { kind, media: '' };
    if (kind === 'file') return { kind, fileName: 'attachment://file.pdf', spoiler: false };
    if (kind === 'button') return { kind, label: et('defaultButtonLabel'), emoji: '', style: 5, url: '', customId: '', disabled: false };
    if (kind === 'select') {
      return {
        kind,
        selectType: 3,
        customId: 'core_select',
        placeholder: et('defaultSelectPlaceholder'),
        minValues: 0,
        maxValues: 1,
        options: et('defaultSelectOptions'),
        disabled: false
      };
    }
    if (kind === 'container') {
      return {
      kind: 'container',
      accent: '#44b8de',
      children: [
        { kind: 'text', content: et('defaultContainerText') }
      ],
      spoiler: false
    };
    }
    if (kind === 'section') {
      return { kind, content: et('defaultSectionText'), accessoryType: 'thumbnail', accessoryUrl: DEFAULT_CORE_IMAGE_URL, buttonLabel: et('defaultButtonLabel'), buttonUrl: '' };
    }
    return { kind: 'container', accent: '#44b8de', text: et('defaultContainerText'), thumbnail: DEFAULT_CORE_IMAGE_URL, media: '', buttonLabel: '', buttonUrl: '', spoiler: false };
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
      avatarUrl: options.avatarUrl || DEFAULT_CORE_IMAGE_URL,
      threadName: '',
      threadId: '',
      appliedTags: '',
      toolsOpen: false,
      kind: options.kind || root.dataset.editorKind || 'rules',
      title: options.title || root.dataset.editorTitle || et('defaultTitle'),
      storageTab: 'settings',
      messages: normalizeMessages(initialMessages)
    };
  }

  function init(root, options = {}) {
    if (!root || instances.has(root)) return instances.get(root);

    let storagePortal = null;
    let toolsPortal = null;
    let lastTextTarget = null;
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
        kind: state.kind === 'webhook' ? 'webhook-messages' : 'rules',
        version: 2,
        createdAt: new Date().toISOString(),
        webhook: state.kind === 'webhook' ? {
          username: state.username || '',
          avatarUrl: state.avatarUrl || '',
          threadName: state.threadName || '',
          threadId: state.threadId || '',
          appliedTags: state.appliedTags || ''
        } : undefined,
        messages,
        message: messages[0] || { content: '', embeds: [] }
      };
    }

    function buildWebhookSnapshot() {
      const exported = buildExportJson();
      return {
        version: 1,
        exportedAt: new Date().toISOString(),
        webhookUrl: state.webhookUrl || '',
        username: state.username || '',
        avatarUrl: state.avatarUrl || '',
        threadName: state.threadName || '',
        threadId: state.threadId || '',
        appliedTags: state.appliedTags || '',
        messages: exported.messages
      };
    }

    function applyWebhookSnapshot(snapshot = {}) {
      const messages = Array.isArray(snapshot.messages)
        ? snapshot.messages
        : snapshot.message
          ? [snapshot.message]
          : [];
      if (!messages.length) throw new Error(st('importMissingMessages'));
      state.webhookUrl = String(snapshot.webhookUrl || '');
      state.username = String(snapshot.username || 'Core');
      state.avatarUrl = String(snapshot.avatarUrl || DEFAULT_CORE_IMAGE_URL);
      state.threadName = String(snapshot.threadName || snapshot.webhook?.threadName || '');
      state.threadId = String(snapshot.threadId || snapshot.webhook?.threadId || '');
      state.appliedTags = String(snapshot.appliedTags || snapshot.webhook?.appliedTags || '');
      state.messages = normalizeMessages(messages);
      state.active = 0;
    }

    function queryEditor(selector) {
      return root.querySelector(selector) || storagePortal?.querySelector(selector) || null;
    }

    function setStorageStatus(message, tone = 'success') {
      const status = queryEditor('[data-webhook-storage-status]');
      if (!status) return;
      status.textContent = message || '';
      status.dataset.tone = tone;
    }

    function saveCurrentWebhook() {
      const input = queryEditor('[data-webhook-save-name]');
      const now = new Date().toISOString();
      const fallbackName = `${st('savedAt')} ${formatStorageDate(now)}`;
      const item = {
        id: makeSaveId(),
        name: String(input?.value || '').trim() || fallbackName,
        createdAt: now,
        updatedAt: now,
        snapshot: buildWebhookSnapshot()
      };
      const saves = [item, ...readWebhookSaves()];
      if (!writeWebhookSaves(saves)) {
        setStorageStatus(st('storageUnavailable'), 'error');
        return;
      }
      state.storageTab = 'saves';
      render();
      setStorageStatus(st('storageSaved'));
    }

    function findWebhookSave(id) {
      return readWebhookSaves().find((item) => item.id === id);
    }

    function loadWebhookSave(id) {
      const item = findWebhookSave(id);
      if (!item?.snapshot) return;
      try {
        applyWebhookSnapshot(item.snapshot);
        state.storageTab = 'saves';
        render();
        setStorageStatus(st('storageLoaded'));
      } catch (error) {
        setStorageStatus(error.message || st('storageImportFailed'), 'error');
      }
    }

    function deleteWebhookSave(id) {
      const saves = readWebhookSaves().filter((item) => item.id !== id);
      if (!writeWebhookSaves(saves)) {
        setStorageStatus(st('storageUnavailable'), 'error');
        return;
      }
      state.storageTab = 'saves';
      render();
      setStorageStatus(st('storageDeleted'));
    }

    function exportEncodedPayload(filename, payload) {
      downloadTextFile(filename, `${encodeTransferPayload(payload)}\n`, 'text/plain');
      setStorageStatus(st('storageExported'));
    }

    function exportCurrentWebhook() {
      const name = queryEditor('[data-webhook-save-name]')?.value || 'current';
      exportEncodedPayload(`core-webhook-${slugFilePart(name, 'current')}.corehook`, {
        kind: 'core-webhook-editor-snapshot',
        version: 1,
        exportedAt: new Date().toISOString(),
        snapshot: buildWebhookSnapshot()
      });
    }

    function exportWebhookSave(id) {
      const item = findWebhookSave(id);
      if (!item?.snapshot) return;
      exportEncodedPayload(`core-webhook-${slugFilePart(item.name, 'save')}.corehook`, {
        kind: 'core-webhook-editor-snapshot',
        version: 1,
        exportedAt: new Date().toISOString(),
        save: {
          id: item.id,
          name: item.name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        },
        snapshot: item.snapshot
      });
    }

    function exportAllWebhookSaves() {
      exportEncodedPayload('core-webhook-saves.corehook', {
        kind: 'core-webhook-editor-saves',
        version: 1,
        exportedAt: new Date().toISOString(),
        current: buildWebhookSnapshot(),
        saves: readWebhookSaves()
      });
    }

    function importEncodedWebhookFile(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        try {
          const payload = decodeTransferPayload(reader.result);
          if (payload.kind === 'core-webhook-editor-saves' && Array.isArray(payload.saves)) {
            const existing = readWebhookSaves();
            const imported = payload.saves
              .filter((item) => item?.snapshot?.messages?.length)
              .map((item) => ({
                id: makeSaveId(),
                name: String(item.name || 'Webhook').slice(0, 80),
                createdAt: item.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                snapshot: item.snapshot
              }));
            if (!writeWebhookSaves([...imported, ...existing])) throw new Error(st('storageUnavailable'));
            if (payload.current?.messages?.length) applyWebhookSnapshot(payload.current);
            state.storageTab = 'saves';
            render();
            setStorageStatus(st('storageImported'));
            return;
          }

          const snapshot = payload.snapshot || payload.current || payload;
          applyWebhookSnapshot(snapshot);
          state.storageTab = 'saves';
          render();
          setStorageStatus(st('storageImported'));
        } catch (error) {
          setStorageStatus(`${st('storageImportFailed')} ${error.message || ''}`.trim(), 'error');
        }
      });
      reader.readAsText(file);
    }

    function ensureStoragePortal() {
      if (storagePortal) return storagePortal;
      storagePortal = document.createElement('div');
      storagePortal.className = 'webhook-storage-portal';
      storagePortal.hidden = true;
      document.body.appendChild(storagePortal);
      storagePortal.addEventListener('click', (event) => {
        const target = event.target.closest('button, a, label');
        if (target) handleStorageAction(target);
      });
      storagePortal.addEventListener('change', (event) => {
        handleStorageChange(event);
      });
      return storagePortal;
    }

    function renderStoragePortal() {
      const isOpen = state.kind === 'webhook' && state.storageTab === 'saves';
      document.body.classList.toggle('is-webhook-storage-open', isOpen);
      if (!isOpen) {
        if (storagePortal) {
          storagePortal.hidden = true;
          storagePortal.innerHTML = '';
        }
        return;
      }
      const portal = ensureStoragePortal();
      portal.hidden = false;
      portal.innerHTML = `<div data-storage-section="saves">${renderWebhookStoragePanel()}</div>`;
    }

    function renderTimestampTool() {
      const now = new Date();
      return `
        <section class="editor-tool-card">
          <h3>${escapeHtml(et('timestampTool'))}</h3>
          <div class="rules-two">
            <label class="rules-field">
              <span>${escapeHtml(et('timestampDate'))}</span>
              <input type="date" data-tool-date value="${escapeHtml(dateToLocalInput(now))}">
            </label>
            <label class="rules-field">
              <span>${escapeHtml(et('timestampTime'))}</span>
              <input type="time" data-tool-time value="${escapeHtml(dateToTimeInput(now))}">
            </label>
          </div>
          <label class="rules-field">
            <span>${escapeHtml(et('timestampStyle'))}</span>
            <select data-tool-timestamp-style>
              ${TIMESTAMP_STYLES.map((style) => `<option value="${style}" ${style === 'F' ? 'selected' : ''}>&lt;t:unix:${style}&gt;</option>`).join('')}
            </select>
          </label>
          <label class="rules-field">
            <span>${escapeHtml(et('timestampOutput'))}</span>
            <input type="text" data-tool-output="timestamp" readonly>
          </label>
          <div class="rules-actions">
            <button type="button" class="button secondary" data-tool-copy="timestamp">${escapeHtml(et('copyToolValue'))}</button>
            <button type="button" class="button primary" data-tool-insert="timestamp">${escapeHtml(et('insertToolValue'))}</button>
          </div>
        </section>
      `;
    }

    function renderColorOptions(items, active = '') {
      return items.map(([key, label]) => `<option value="${escapeHtml(key)}" ${key === active ? 'selected' : ''}>${escapeHtml(key ? label : et('noColor'))}</option>`).join('');
    }

    function renderColorTool() {
      return `
        <section class="editor-tool-card">
          <h3>${escapeHtml(et('colorTool'))}</h3>
          <label class="rules-field">
            <span>${escapeHtml(et('colorText'))}</span>
            <textarea rows="4" data-tool-color-text>Core message</textarea>
          </label>
          <div class="rules-two">
            <label class="rules-field">
              <span>${escapeHtml(et('colorForeground'))}</span>
              <select data-tool-color-fg>${renderColorOptions(ANSI_COLORS, 'cyan')}</select>
            </label>
            <label class="rules-field">
              <span>${escapeHtml(et('colorBackground'))}</span>
              <select data-tool-color-bg>${renderColorOptions(ANSI_BACKGROUNDS)}</select>
            </label>
          </div>
          <div class="rules-two">
            <label class="rules-check">
              <input type="checkbox" data-tool-color-bold>
              <span>${escapeHtml(et('colorBold'))}</span>
            </label>
            <label class="rules-check">
              <input type="checkbox" data-tool-color-underline>
              <span>${escapeHtml(et('colorUnderline'))}</span>
            </label>
          </div>
          <label class="rules-field">
            <span>${escapeHtml(et('timestampOutput'))}</span>
            <textarea rows="4" data-tool-output="ansi" readonly></textarea>
          </label>
          <div class="rules-actions">
            <button type="button" class="button secondary" data-tool-copy="ansi">${escapeHtml(et('copyToolValue'))}</button>
            <button type="button" class="button primary" data-tool-insert="ansi">${escapeHtml(et('insertToolValue'))}</button>
          </div>
        </section>
      `;
    }

    function renderMarkdownTool() {
      return `
        <section class="editor-tool-card">
          <h3>${escapeHtml(et('markdownTool'))}</h3>
          <p class="editor-muted">${escapeHtml(et('toolInsertHint'))}</p>
          <div class="markdown-snippet-grid">
            ${MARKDOWN_SNIPPETS.map(([label, value]) => `
              <button type="button" data-markdown-snippet="${escapeHtml(value)}">${escapeHtml(label).replace(/\n/g, '<br>')}</button>
            `).join('')}
          </div>
        </section>
      `;
    }

    function ensureToolsPortal() {
      if (toolsPortal) return toolsPortal;
      toolsPortal = document.createElement('div');
      toolsPortal.className = 'editor-tools-portal';
      toolsPortal.hidden = true;
      document.body.appendChild(toolsPortal);
      toolsPortal.addEventListener('input', updateToolOutputs);
      toolsPortal.addEventListener('change', updateToolOutputs);
      toolsPortal.addEventListener('click', (event) => {
        const target = event.target.closest('button');
        if (target) handleToolAction(target);
      });
      return toolsPortal;
    }

    function renderToolsPortal() {
      const isOpen = state.kind === 'webhook' && state.toolsOpen;
      document.body.classList.toggle('is-editor-tools-open', isOpen);
      if (!isOpen) {
        if (toolsPortal) {
          toolsPortal.hidden = true;
          toolsPortal.innerHTML = '';
        }
        return;
      }
      const portal = ensureToolsPortal();
      portal.hidden = false;
      portal.innerHTML = `
        <button type="button" class="editor-tools-backdrop" data-editor-tools-close aria-label="${escapeHtml(et('closeTools'))}"></button>
        <aside class="editor-tools-drawer" aria-label="${escapeHtml(et('editorTools'))}">
          <div class="webhook-storage-header">
            <div>
              <span>${escapeHtml(et('editorTools'))}</span>
              <h2>${escapeHtml(et('editorTools'))}</h2>
            </div>
            <button type="button" class="webhook-storage-close" data-editor-tools-close aria-label="${escapeHtml(et('closeTools'))}">&times;</button>
          </div>
          <div class="editor-tools-body">
            ${renderTimestampTool()}
            ${renderColorTool()}
            ${renderMarkdownTool()}
          </div>
        </aside>
      `;
      updateToolOutputs();
    }

    function findAnsiCode(items, key) {
      return items.find((item) => item[0] === key)?.[2] || '';
    }

    function buildAnsiBlock() {
      const text = toolsPortal?.querySelector('[data-tool-color-text]')?.value || '';
      const fg = findAnsiCode(ANSI_COLORS, toolsPortal?.querySelector('[data-tool-color-fg]')?.value || '');
      const bg = findAnsiCode(ANSI_BACKGROUNDS, toolsPortal?.querySelector('[data-tool-color-bg]')?.value || '');
      const codes = [];
      if (toolsPortal?.querySelector('[data-tool-color-bold]')?.checked) codes.push(1);
      if (toolsPortal?.querySelector('[data-tool-color-underline]')?.checked) codes.push(4);
      if (fg) codes.push(fg);
      if (bg) codes.push(bg);
      const prefix = codes.length ? `\u001b[${codes.join(';')}m` : '';
      const body = `${prefix}${text || 'Core message'}${prefix ? '\u001b[0m' : ''}`;
      return `\`\`\`ansi\n${body}\n\`\`\``;
    }

    function getToolOutput(kind) {
      if (kind === 'timestamp') {
        return discordTimestampCode(
          toolsPortal?.querySelector('[data-tool-date]')?.value || '',
          toolsPortal?.querySelector('[data-tool-time]')?.value || '',
          toolsPortal?.querySelector('[data-tool-timestamp-style]')?.value || 'F'
        );
      }
      if (kind === 'ansi') return buildAnsiBlock();
      return '';
    }

    function updateToolOutputs() {
      if (!toolsPortal || toolsPortal.hidden) return;
      const timestamp = toolsPortal.querySelector('[data-tool-output="timestamp"]');
      const ansi = toolsPortal.querySelector('[data-tool-output="ansi"]');
      if (timestamp) timestamp.value = getToolOutput('timestamp');
      if (ansi) ansi.value = getToolOutput('ansi');
    }

    function rememberTextTarget(target) {
      if (!target?.matches?.('textarea, input[type="text"], input[type="url"]')) return;
      if (target.readOnly || target.disabled) return;
      lastTextTarget = target;
    }

    function insertIntoEditor(value) {
      const target = lastTextTarget?.isConnected ? lastTextTarget : root.querySelector('[data-message-content], [data-embed-path="description"], [data-message-raw]');
      if (!target) return;
      const start = Number.isFinite(target.selectionStart) ? target.selectionStart : target.value.length;
      const end = Number.isFinite(target.selectionEnd) ? target.selectionEnd : start;
      target.value = `${target.value.slice(0, start)}${value}${target.value.slice(end)}`;
      const next = start + value.length;
      target.focus();
      target.setSelectionRange?.(next, next);
      target.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function handleToolAction(target) {
      if (target.matches('[data-editor-tools-close]')) {
        state.toolsOpen = false;
        render();
        return true;
      }
      if (target.dataset.markdownSnippet !== undefined) {
        insertIntoEditor(target.dataset.markdownSnippet);
        return true;
      }
      if (target.dataset.toolCopy) {
        const value = getToolOutput(target.dataset.toolCopy);
        navigator.clipboard?.writeText(value).catch(() => {});
        target.textContent = et('toolCopied');
        window.setTimeout(() => { target.textContent = et('copyToolValue'); }, 1400);
        return true;
      }
      if (target.dataset.toolInsert) {
        insertIntoEditor(getToolOutput(target.dataset.toolInsert));
        return true;
      }
      return false;
    }

    function validatePayload() {
      const errors = [];
      const warnings = [];
      const messageLabel = (number) => `${et('message')} ${number}`;
      const blockLabel = (number, blockIndex) => `${messageLabel(number)}, ${et('block')} ${blockIndex + 1}`;
      const childLabel = (label, childIndex) => `${label}, ${et('child')} ${childIndex + 1}`;

      state.messages.forEach((item, index) => {
        const number = index + 1;
        if (item.mode === 'raw') {
          try {
            parseRawPayload(item.raw);
          } catch (error) {
            errors.push(`${messageLabel(number)}: ${error.message || et('invalidRawJson')}`);
          }
          return;
        }

        if (item.mode === 'components') {
          const components = buildComponents(item.blocks);
          if (!components.length) errors.push(`${messageLabel(number)}: ${et('errorNeedComponent')}`);
          if (components.length > LIMITS.components) errors.push(`${messageLabel(number)}: ${et('errorMaxComponents')} ${LIMITS.components}.`);
          (item.blocks || []).forEach((block, blockIndex) => {
            const label = blockLabel(number, blockIndex);
            if (['text', 'section'].includes(block.kind) && (block.content || '').length > LIMITS.componentText) errors.push(`${label}: ${et('errorTextTooLong')} ${LIMITS.componentText}.`);
            if (block.kind === 'section' && block.accessoryType === 'button' && !normalizeUrl(block.buttonUrl)) errors.push(`${label}: ${et('errorSectionButtonUrl')}`);
            if (block.kind === 'section' && block.accessoryType !== 'button' && !normalizeUrl(block.accessoryUrl)) errors.push(`${label}: ${et('errorSectionThumbnailUrl')}`);
            if (block.kind === 'container' && (block.text || '').length > LIMITS.componentText) errors.push(`${label}: ${et('errorContainerTextTooLong')} ${LIMITS.componentText}.`);
            if (block.kind === 'gallery' && parseMediaItems(block.media).length > LIMITS.galleryItems) errors.push(`${label}: ${et('errorMaxMedia')} ${LIMITS.galleryItems}.`);
            if (block.kind === 'container') {
              const children = normalizeContainerChildren(block);
              if (children.length > LIMITS.containerChildren) errors.push(`${label}: ${et('errorMaxChildren')} ${LIMITS.containerChildren}.`);
              children.forEach((child, childIndex) => {
                const nestedLabel = childLabel(label, childIndex);
                if (['text', 'section'].includes(child.kind) && (child.content || '').length > LIMITS.componentText) errors.push(`${nestedLabel}: ${et('errorTextTooLong')} ${LIMITS.componentText}.`);
                if (child.kind === 'section' && child.accessoryType === 'button' && !normalizeUrl(child.buttonUrl)) errors.push(`${nestedLabel}: ${et('errorSectionButtonUrl')}`);
                if (child.kind === 'section' && child.accessoryType !== 'button' && !normalizeUrl(child.accessoryUrl)) errors.push(`${nestedLabel}: ${et('errorSectionThumbnailUrl')}`);
                if (child.kind === 'gallery' && parseMediaItems(child.media).length > LIMITS.galleryItems) errors.push(`${nestedLabel}: ${et('errorMaxMedia')} ${LIMITS.galleryItems}.`);
                ['media', 'buttonUrl', 'url', 'accessoryUrl'].forEach((field) => {
                  if (child[field] && field === 'media') return;
                  if (child[field] && !isValidUrl(child[field])) errors.push(`${nestedLabel}: ${field} ${et('errorMustBeUrl')}`);
                });
              });
            }
            ['media', 'thumbnail', 'buttonUrl', 'url', 'accessoryUrl'].forEach((field) => {
              if (block[field] && field === 'media') return;
              if (block[field] && !isValidUrl(block[field])) errors.push(`${label}: ${field} ${et('errorMustBeUrl')}`);
            });
          });
          return;
        }

        const embeds = (item.embeds || []).map(buildEmbed).filter(Boolean);
        if (!item.content && !embeds.length) errors.push(`${messageLabel(number)}: ${et('errorNeedTextOrEmbed')}`);
        if ((item.content || '').length > LIMITS.content) errors.push(`${messageLabel(number)}: ${et('errorTextTooLong')} ${LIMITS.content}.`);
        if ((item.embeds || []).length > LIMITS.embeds) errors.push(`${messageLabel(number)}: ${et('errorMaxEmbeds')} ${LIMITS.embeds}.`);
        (item.embeds || []).forEach((embedItem, embedIndex) => {
          const label = `${messageLabel(number)}, ${et('embed')} ${embedIndex + 1}`;
          if ((embedItem.title || '').length > LIMITS.embedTitle) errors.push(`${label}: ${et('errorTitleTooLong')} ${LIMITS.embedTitle}.`);
          if ((embedItem.description || '').length > LIMITS.embedDescription) errors.push(`${label}: ${et('errorDescriptionTooLong')} ${LIMITS.embedDescription}.`);
          if ((embedItem.fields || []).length > LIMITS.embedFields) errors.push(`${label}: ${et('errorMaxFields')} ${LIMITS.embedFields}.`);
          if (embedTotal(embedItem) > LIMITS.embedTotal) errors.push(`${label}: ${et('errorEmbedTotalTooLong')} ${LIMITS.embedTotal}.`);
          ['url', 'thumbnail.url', 'image.url', 'author.url', 'author.icon_url', 'footer.icon_url'].forEach((path) => {
            const value = path.split('.').reduce((object, key) => object?.[key], embedItem);
            if (value && !isValidUrl(value)) errors.push(`${label}: ${path} ${et('errorMustBeUrl')}`);
          });
        });
      });

      if (state.messages.length > 6) warnings.push(state.kind === 'webhook' ? et('warningManyWebhookMessages') : et('warningManyRuleMessages'));
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
          : firstFilledLine(item.embeds?.[0]?.title || item.content, `${et('message')} ${index + 1}`);
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
      root.querySelector('[data-current-message-title]').textContent = `${et('message')} ${state.active + 1}`;
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
      if (count) count.textContent = `${state.messages.length} ${state.messages.length === 1 ? et('messageOne') : et('messageMany')}`;
      if (!preview) return;

      preview.innerHTML = renderDiscordMessages(state.messages.map((item) => {
        try {
          return buildRuleMessage(item);
        } catch {
          return { content: et('invalidRawJson'), embeds: [] };
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
      const measure = measurePayload(currentPayload);
      const items = current.mode === 'raw'
        ? [
          [et('limitMessages'), state.messages.length, LIMITS.messages],
          [et('limitRawJson'), String(current.raw || '').length, 30000],
          [et('limitComponentsTotal'), measure.components, LIMITS.components],
          [et('limitTextTotal'), measure.content + measure.text + measure.embedTotal, 6000]
        ]
        : current.mode === 'components'
        ? [
          [et('limitMessages'), state.messages.length, LIMITS.messages],
          [et('limitComponentsTotal'), measure.components, LIMITS.components],
          [et('limitTopComponents'), measure.topComponents, LIMITS.components],
          [et('limitComponentText'), measure.text, LIMITS.componentText],
          [et('limitSelectOptions'), measure.selectOptions, LIMITS.selectOptions]
        ]
        : [
          [et('limitMessages'), state.messages.length, LIMITS.messages],
          [et('limitMessageText'), measure.content, LIMITS.content],
          [et('limitEmbeds'), measure.embeds, LIMITS.embeds],
          [et('limitActiveEmbed'), activeEmbed ? embedTotal(activeEmbed) : 0, LIMITS.embedTotal],
          [et('limitEmbedsTotal'), measure.embedTotal, LIMITS.embedTotal]
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
      if (status) status.textContent = errors.length ? `${errors.length} ${et('errors')}` : warnings.length ? `${warnings.length} ${et('warnings')}` : et('ready');
      if (send) send.disabled = Boolean(errors.length) || !isValidWebhookUrl(state.webhookUrl);
    }

    function refreshDynamic() {
      renderPreview();
      renderLimits();
      renderValidation();
    }

    function render() {
      root.innerHTML = renderEditorShell(state);
      const webhook = root.querySelector('[data-setting="webhookUrl"]');
      const username = root.querySelector('[data-setting="username"]');
      const avatar = root.querySelector('[data-setting="avatarUrl"]');
      const threadName = root.querySelector('[data-setting="threadName"]');
      const threadId = root.querySelector('[data-setting="threadId"]');
      const appliedTags = root.querySelector('[data-setting="appliedTags"]');
      if (webhook) webhook.value = state.webhookUrl;
      if (username) username.value = state.username;
      if (avatar) avatar.value = state.avatarUrl;
      if (threadName) threadName.value = state.threadName || '';
      if (threadId) threadId.value = state.threadId || '';
      if (appliedTags) appliedTags.value = state.appliedTags || '';
      renderMessageList();
      renderEditorBody();
      refreshDynamic();
      renderStoragePortal();
      renderToolsPortal();
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
      if (target.matches('[data-embed-timestamp-date], [data-embed-timestamp-time]')) {
        const box = target.closest('.embed-time-picker');
        const dateValue = box?.querySelector('[data-embed-timestamp-date]')?.value || '';
        const timeValue = box?.querySelector('[data-embed-timestamp-time]')?.value || '';
        embed().timestamp = localInputsToIso(dateValue, timeValue);
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
      link.download = state.kind === 'webhook' ? 'core-webhook-messages.json' : 'core-rules-template.json';
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
          if (state.kind === 'webhook' && json.webhook) {
            state.username = String(json.webhook.username || state.username || 'Core');
            state.avatarUrl = String(json.webhook.avatarUrl || state.avatarUrl || DEFAULT_CORE_IMAGE_URL);
            state.threadName = String(json.webhook.threadName || '');
            state.threadId = String(json.webhook.threadId || '');
            state.appliedTags = String(json.webhook.appliedTags || '');
          }
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

    function handleStorageChange(event) {
      if (!event.target.matches('[data-webhook-storage-import]')) return false;
      importEncodedWebhookFile(event.target.files?.[0]);
      event.target.value = '';
      return true;
    }

    function handleStorageAction(target) {
      if (target.dataset.storageTab) {
        state.storageTab = target.dataset.storageTab === 'saves' ? 'saves' : 'settings';
        render();
        return true;
      }
      if (target.matches('[data-save-webhook-current]')) {
        saveCurrentWebhook();
        return true;
      }
      if (target.matches('[data-export-webhook-current]')) {
        exportCurrentWebhook();
        return true;
      }
      if (target.matches('[data-export-webhook-all]')) {
        exportAllWebhookSaves();
        return true;
      }
      if (target.dataset.loadWebhookSave !== undefined) {
        loadWebhookSave(target.dataset.loadWebhookSave);
        return true;
      }
      if (target.dataset.exportWebhookSave !== undefined) {
        exportWebhookSave(target.dataset.exportWebhookSave);
        return true;
      }
      if (target.dataset.deleteWebhookSave !== undefined) {
        deleteWebhookSave(target.dataset.deleteWebhookSave);
        return true;
      }
      return false;
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
            ? et('webhookRequired')
            : errors.join('\n');
        }
        return;
      }

      if (send) {
        send.disabled = true;
        send.textContent = et('sending');
      }

      try {
        let createdThreadId = '';
        for (let index = 0; index < state.messages.length; index += 1) {
          const useCreatedThread = createdThreadId || state.threadId;
          const includeThreadName = Boolean(state.threadName && !useCreatedThread && index === 0);
          const response = await fetch(buildWebhookRequestUrl(state.webhookUrl, useCreatedThread), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildWebhookPayload(state, state.messages[index], { includeThreadName }))
          });
          if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`Discord отклонил сообщение ${index + 1}: ${response.status} ${text}`.slice(0, 700));
          }
          if (includeThreadName && state.messages.length > 1) {
            const json = await response.json().catch(() => null);
            if (json?.channel_id) createdThreadId = String(json.channel_id);
          }
        }
        if (alert) {
          alert.hidden = false;
          alert.classList.remove('is-error');
          alert.textContent = `${et('sent')}: ${state.messages.length}.`;
        }
      } catch (error) {
        if (alert) {
          alert.hidden = false;
          alert.classList.add('is-error');
          alert.textContent = `${error.message || et('sendFailed')} ${et('corsHint')}`;
        }
      } finally {
        if (send) send.textContent = et('send');
        refreshDynamic();
      }
    }

    root.addEventListener('input', (event) => {
      rememberTextTarget(event.target);
      if (updateSetting(event.target) || updateActiveInput(event.target)) {
        refreshDynamic();
      }
    });

    root.addEventListener('focusin', (event) => {
      rememberTextTarget(event.target);
    });

    root.addEventListener('change', (event) => {
      if (handleStorageChange(event)) return;
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

      if (handleStorageAction(target)) return;
      if (target.matches('[data-editor-tools-open]')) {
        state.toolsOpen = true;
        render();
        return;
      }
      if (target.matches('[data-embed-timestamp-now]')) {
        embed().timestamp = new Date().toISOString();
        render();
        return;
      }
      if (target.matches('[data-embed-timestamp-clear]')) {
        embed().timestamp = '';
        render();
        return;
      }

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
      if (target.matches('[data-add-selected-component]')) {
        const kind = root.querySelector('[data-add-component-kind]')?.value || 'container';
        current.blocks.push(createBlock(kind));
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
      if (target.matches('[data-add-container-selected]')) {
        const children = getContainerChildren(current, target.dataset.containerIndex);
        const select = root.querySelector(`[data-add-container-component-kind][data-container-index="${target.dataset.containerIndex}"]`);
        if (children && children.length < LIMITS.containerChildren) {
          children.push(createBlock(select?.value || 'text'));
          render();
        }
        return;
      }
      if (target.dataset.deleteContainerComponent !== undefined) {
        const children = getContainerChildren(current, target.dataset.containerIndex);
        if (children) {
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
          alert.textContent = et('copied');
        }
        return;
      }
      if (target.matches('[data-editor-send]')) {
        sendWebhook();
      }
    });

    window.addEventListener('core-language-change', () => render());

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
