(() => {
  const FALLBACK_LANG = 'ru';
  const UPDATED_AT = '16.05.2026';
  const OFFICIAL_SERVER_URL = 'https://discord.gg/FjfZkHEuyv';

  const ui = {
    ru: {
      updated: 'Обновлено',
      back: 'На главную',
      contact: 'Контакт',
      officialServer: 'Официальный сервер'
    },
    en: {
      updated: 'Updated',
      back: 'Back home',
      contact: 'Contact',
      officialServer: 'Official server'
    },
    ua: {
      updated: 'Оновлено',
      back: 'На головну',
      contact: 'Контакт',
      officialServer: 'Офіційний сервер'
    },
    de: {
      updated: 'Aktualisiert',
      back: 'Zur Startseite',
      contact: 'Kontakt',
      officialServer: 'Offizieller Server'
    }
  };

  const docs = {
    sitePrivacy: {
      ru: {
        title: 'Политика конфиденциальности сайта Core',
        description: 'Подробно о том, какие данные обрабатывает сайт Core, зачем они нужны, где они остаются и как пользователь может контролировать их использование.',
        sections: [
          {
            heading: '1. Область действия',
            body: [
              'Эта политика относится к публичному сайту Core, включая главную страницу, каталог шаблонов, страницы символов и emoji, генератор timestamp, генератор цветного ANSI-текста, справочник Discord Markdown, справку по командам, редактор webhook-сообщений и юридические страницы.',
              'Сайт Core является отдельным публичным интерфейсом проекта Core. Он не является продуктом Discord Inc., GitHub Inc., Google LLC, MongoDB Inc. или других внешних поставщиков.',
              'Эта политика описывает техническую обработку данных на сайте. Она не заменяет условия Discord, правила Discord-серверов, настройки браузера или отдельные политики внешних сервисов, через которые пользователь открывает сайт.'
            ]
          },
          {
            heading: '2. Данные, которые сайт не запрашивает',
            body: [
              'Сайт не требует регистрации, не создает личный аккаунт Core, не просит пароль Discord, не просит токен Discord-аккаунта и не требует авторизацию через OAuth для просмотра страниц.',
              'Сайт не запрашивает платежные данные, паспортные данные, адрес проживания, номер телефона, дату рождения или другие документы, удостоверяющие личность.',
              'Сайт не получает доступ к личным сообщениям Discord, списку серверов пользователя, списку друзей, настройкам аккаунта Discord или закрытым каналам Discord через браузер пользователя.'
            ]
          },
          {
            heading: '3. Данные, которые могут обрабатываться в браузере',
            body: [
              'Сайт может сохранять выбранный язык в localStorage браузера. Это нужно только для того, чтобы страницы открывались на выбранном языке после обновления или повторного посещения.',
              'Инструменты копирования символов и emoji используют системный буфер обмена браузера только после действия пользователя. Сайт не читает буфер обмена без необходимости и не отправляет его содержимое на сервер Core.',
              'Редактор webhook-сообщений обрабатывает введенный webhook URL, текст сообщения, embed-поля, Components V2, ссылки на изображения, цвета, имена профиля, настройки ветки, включая название новой ветки, ID существующей ветки и ID тегов форума, а также другие настройки сообщения в браузере пользователя до момента отправки.',
              'Генератор timestamp, генератор цветного ANSI-текста и справочник Markdown работают локально в браузере и создают текстовые фрагменты, которые пользователь сам копирует или вставляет в редактор.',
              'Если пользователь закрывает страницу, очищает данные сайта или использует приватный режим браузера, локальные настройки могут быть удалены или недоступны.'
            ]
          },
          {
            heading: '4. Каталог шаблонов и публичный API',
            body: [
              'При открытии каталога шаблонов сайт получает публичные данные о шаблонах Core: название, описание, тип, дату публикации или обновления, счетчики, рейтинг, команду применения, краткое превью структуры и публичные ссылки.',
              'Для обхода ограничений GitHub Pages сайт может получать эти данные через Google Apps Script proxy. Такой proxy передает публичный JSON каталога и может временно кэшировать ответ для снижения нагрузки.',
              'Запрос каталога не содержит Discord-пароль пользователя, Discord-токен пользователя, приватный JSON сервера пользователя или webhook URL, введенный в редакторе.',
              'Публичные шаблоны могут содержать сведения, которые были опубликованы владельцем проекта Core или отправлены пользователями как предложения и затем одобрены для публикации.'
            ]
          },
          {
            heading: '5. Webhook-редактор',
            body: [
              'Webhook URL является секретной ссылкой Discord. Любой, кто получил действующий webhook URL, может отправлять сообщения через соответствующий webhook, пока он не удален или не изменен в Discord.',
              'Core не сохраняет webhook URL на сайте и не добавляет его в собственную базу данных сайта. При отправке сообщения браузер отправляет запрос напрямую на Discord webhook URL, который указал пользователь.',
              'Содержимое webhook-сообщения, название создаваемой ветки, ID существующей ветки и ID тегов могут быть переданы Discord, потому что Discord является сервисом, который фактически принимает и публикует сообщение. После отправки дальнейшее хранение и удаление сообщения регулируется Discord и правами на конкретном сервере.',
              'Пользователь должен вставлять только те webhook URL, которыми он вправе пользоваться. Если webhook URL был раскрыт ошибочно, его нужно удалить или пересоздать в настройках канала Discord.',
              'Вкладка сохранений webhook-редактора может записывать в localStorage именованные локальные сохранения. Такие сохранения могут включать тексты сообщений, embed-данные, Components V2, имя сохранения, имя вебхука, аватар и webhook URL, если пользователь оставил его в редакторе.',
              'Файл переноса .corehook является закодированным экспортом настроек для удобного импорта в другом браузере. Он не считается криптографической защитой, поэтому его не следует отправлять третьим лицам, если внутри есть приватный webhook URL или материалы, которые не должны стать публичными.'
            ]
          },
          {
            heading: '6. Хостинг, журналы и внешние поставщики',
            body: [
              'Если сайт опубликован через GitHub Pages, браузер пользователя взаимодействует с инфраструктурой GitHub. GitHub может обрабатывать технические журналы доступа, IP-адрес, user-agent и похожие технические сведения по своей политике.',
              'Если сайт использует Google Apps Script proxy для каталога шаблонов, запрос к proxy проходит через инфраструктуру Google. Google может обрабатывать технические сведения запроса по своим правилам.',
              'Если пользователь отправляет webhook-сообщение, браузер взаимодействует с Discord API. Discord обрабатывает сообщение, вложения, embed-данные, компоненты и технические данные по своим условиям и политике конфиденциальности.',
              'Core не контролирует внутренние журналы Discord, GitHub, Google, браузера, операционной системы, интернет-провайдера или антивирусных расширений пользователя.'
            ]
          },
          {
            heading: '7. Cookies, localStorage и аналитика',
            body: [
              'Сайт Core не использует собственные рекламные cookies, не строит рекламный профиль пользователя и не продает данные рекламным сетям.',
              'Основное локальное хранение сайта ограничивается техническими настройками интерфейса, например выбранным языком, и сохранениями webhook-редактора, если пользователь сам нажал сохранение. Эти данные находятся в браузере пользователя и могут быть очищены средствами браузера.',
              'Если в будущем на сайт будет добавлена аналитика, этот документ должен быть обновлен до начала ее полноценного использования, а назначение такой аналитики должно быть описано отдельно.'
            ]
          },
          {
            heading: '8. Цели обработки',
            body: [
              'Данные обрабатываются для отображения страниц, переключения языка, работы каталога шаблонов, копирования символов и emoji, предпросмотра webhook-сообщений и отправки webhook-сообщений по явному действию пользователя.',
              'Технические данные внешних поставщиков могут использоваться ими для безопасности, предотвращения злоупотреблений, диагностики, соблюдения закона и поддержки стабильности сервиса.',
              'Core не использует сайт для скрытого сбора личных сообщений, паролей, платежных данных или закрытых Discord-данных пользователя.'
            ]
          },
          {
            heading: '9. Сроки хранения',
            body: [
              'Локальные настройки сайта и локальные сохранения webhook-редактора хранятся в браузере до очистки localStorage, смены браузера, удаления данных сайта, ручного удаления сохранения или сброса профиля браузера.',
              'Публичные данные каталога шаблонов хранятся до удаления или обновления соответствующего шаблона в системе Core.',
              'Технические журналы внешних поставщиков хранятся по правилам этих поставщиков. Core не может вручную удалить журналы GitHub, Google, Discord, браузера или интернет-провайдера.'
            ]
          },
          {
            heading: '10. Управление данными пользователем',
            body: [
              'Пользователь может очистить localStorage и cookies сайта в настройках браузера, чтобы удалить локальный выбор языка, сохранения webhook-редактора и другие локальные следы работы интерфейса.',
              'Пользователь может не использовать webhook-редактор, если не хочет передавать сообщение напрямую в Discord через webhook.',
              'Пользователь может удалить или пересоздать webhook в Discord, если ссылка была скомпрометирована, использована ошибочно или больше не должна работать.',
              'По вопросам публичных шаблонов, спорных материалов или данных, опубликованных в каталоге, нужно обращаться через официальный сервер Core.'
            ]
          },
          {
            heading: '11. Безопасность',
            body: [
              'Не вставляйте в редактор чужие webhook URL, токены ботов, токены аккаунтов, пароли, приватные ключи, cookie, резервные коды, платежные данные или личные данные третьих лиц.',
              'Перед отправкой webhook-сообщения проверяйте канал, права webhook, содержимое embed, ссылки на изображения и кнопки-ссылки.',
              'Не используйте публичный компьютер или чужой браузер для работы с приватными webhook URL, если не уверены, что после работы сможете очистить данные браузера.',
              'Сайт снижает риск случайной передачи данных за счет локальной обработки, но не может защитить пользователя от расширений браузера, вредоносных программ, перехвата сети или публикации секретов самим пользователем.'
            ]
          },
          {
            heading: '12. Несовершеннолетние',
            body: [
              'Сайт не предназначен для обхода возрастных требований Discord. Пользователь должен соблюдать минимальный возраст и требования своей страны для использования Discord.',
              'Если сервер Discord обслуживает несовершеннолетних участников, владелец сервера должен самостоятельно учитывать применимые требования к уведомлениям, модерации и обработке данных в своем сообществе.'
            ]
          },
          {
            heading: '13. Изменения политики',
            body: [
              'Core может обновлять эту политику при изменении сайта, каталога, редактора, источников данных, хостинга или требований внешних сервисов.',
              'Дата обновления показывает последнюю редакцию документа. Продолжение использования сайта после обновления означает, что пользователь ознакомился с актуальной редакцией.',
              'Если изменение существенно влияет на обработку данных, оно должно быть отражено в этой политике до или одновременно с публикацией соответствующей функции.'
            ]
          }
        ]
      },
      en: {
        title: 'Core Website Privacy Policy',
        description: 'A detailed explanation of what data the Core website handles, why it is needed, where it remains and how users can control it.',
        sections: [
          {
            heading: '1. Scope',
            body: [
              'This policy applies to the public Core website, including the home page, template catalog, symbols and emoji pages, timestamp generator, ANSI colored text generator, Discord Markdown reference, command help, webhook message editor and legal pages.',
              'The Core website is an independent public interface for the Core project. It is not a product of Discord Inc., GitHub Inc., Google LLC, MongoDB Inc. or any other external provider.',
              'This policy describes technical data handling on the website. It does not replace Discord terms, Discord server rules, browser settings or the separate policies of external services used to open the site.'
            ]
          },
          {
            heading: '2. Data the website does not request',
            body: [
              'The website does not require registration, does not create a Core account, does not ask for a Discord password and does not require Discord OAuth login for browsing pages.',
              'The website does not request payment data, government documents, home address, phone number, date of birth or identity documents.',
              'The website does not access Discord direct messages, the user server list, friend list, Discord account settings or private Discord channels through the user browser.'
            ]
          },
          {
            heading: '3. Data handled in the browser',
            body: [
              'The website may store the selected language in browser localStorage so pages can reopen in the chosen language after refresh or return visits.',
              'Symbol and emoji copy tools use the browser clipboard only after a user action. The site does not read the clipboard unnecessarily and does not send clipboard contents to a Core server.',
              'The webhook editor handles the supplied webhook URL, message text, embed fields, Components V2, image links, colors, profile names, thread settings such as a new thread name, existing thread ID and forum tag IDs, and other message settings in the user browser until sending.',
              'The timestamp generator, ANSI colored text generator and Markdown reference work locally in the browser and create text snippets that the user copies or inserts into the editor.',
              'If the user closes the page, clears site data or uses a private browser session, local settings may be deleted or unavailable.'
            ]
          },
          {
            heading: '4. Template catalog and public API',
            body: [
              'When the template catalog is opened, the site loads public Core template data: name, description, type, publication or update date, counters, rating, apply command, short structure preview and public links.',
              'To avoid GitHub Pages limitations, the site may load this data through a Google Apps Script proxy. That proxy forwards public catalog JSON and may cache the response briefly to reduce load.',
              'Catalog requests do not include the user Discord password, user Discord token, private server JSON or webhook URL entered in the editor.',
              'Public templates may include information published by the Core owner or submitted by users as suggestions and later approved for publication.'
            ]
          },
          {
            heading: '5. Webhook editor',
            body: [
              'A webhook URL is a secret Discord link. Anyone with a valid webhook URL can send messages through that webhook until it is deleted or changed in Discord.',
              'Core does not store webhook URLs on the website and does not add them to a website database. When sending a message, the browser sends the request directly to the Discord webhook URL supplied by the user.',
              'Webhook message content, a new thread name, existing thread ID and tag IDs may be transmitted to Discord because Discord is the service that accepts and publishes the message. After sending, further storage and deletion are governed by Discord and permissions on the relevant server.',
              'Users should only enter webhook URLs they are allowed to use. If a webhook URL is exposed by mistake, it should be deleted or regenerated in the Discord channel settings.',
              'The webhook editor saves tab may write named local saves to localStorage. Those saves may include message text, embed data, Components V2, the save name, webhook profile name, avatar and webhook URL if the user left it in the editor.',
              'A .corehook transfer file is an encoded export of editor settings for convenient import in another browser. It is not cryptographic protection, so it should not be shared with third parties if it contains a private webhook URL or material that should not become public.'
            ]
          },
          {
            heading: '6. Hosting, logs and external providers',
            body: [
              'If the website is published through GitHub Pages, the user browser interacts with GitHub infrastructure. GitHub may process access logs, IP address, user-agent and similar technical information under its own policy.',
              'If the website uses a Google Apps Script proxy for the template catalog, the request to that proxy passes through Google infrastructure. Google may process technical request information under its own rules.',
              'If the user sends a webhook message, the browser interacts with the Discord API. Discord handles the message, attachments, embed data, components and technical information under its own terms and privacy policy.',
              'Core does not control internal logs of Discord, GitHub, Google, the browser, operating system, internet provider or antivirus extensions.'
            ]
          },
          {
            heading: '7. Cookies, localStorage and analytics',
            body: [
              'The Core website does not use its own advertising cookies, does not build an advertising profile and does not sell data to ad networks.',
              'The main local storage is limited to technical interface settings such as the selected language and webhook editor saves when the user explicitly saves them. This data remains in the user browser and can be cleared through browser settings.',
              'If analytics are added in the future, this document must be updated before full use, and the purpose of the analytics must be described separately.'
            ]
          },
          {
            heading: '8. Purposes',
            body: [
              'Data is handled to display pages, switch language, operate the template catalog, copy symbols and emoji, preview webhook messages and send webhook messages after an explicit user action.',
              'Technical data handled by external providers may be used by them for security, abuse prevention, diagnostics, legal compliance and service stability.',
              'Core does not use the website for hidden collection of direct messages, passwords, payment data or private Discord data.'
            ]
          },
          {
            heading: '9. Retention',
            body: [
              'Local website settings and local webhook editor saves remain in the browser until localStorage is cleared, the browser is changed, site data is deleted, the save is manually removed or the browser profile is reset.',
              'Public template catalog data remains available until the relevant template is removed or updated in the Core system.',
              'Technical logs of external providers are retained under their own rules. Core cannot manually delete logs held by GitHub, Google, Discord, a browser vendor or an internet provider.'
            ]
          },
          {
            heading: '10. User control',
            body: [
              'Users can clear localStorage and cookies in browser settings to remove the local language choice, webhook editor saves and other local traces of the interface.',
              'Users can avoid the webhook editor if they do not want to send a message directly to Discord through a webhook.',
              'Users can delete or regenerate a webhook in Discord if the link was compromised, used by mistake or should no longer work.',
              'Questions about public templates, disputed materials or catalog data should be sent through the official Core server.'
            ]
          },
          {
            heading: '11. Security',
            body: [
              'Do not paste other people webhook URLs, bot tokens, account tokens, passwords, private keys, cookies, backup codes, payment data or third-party personal data into the editor.',
              'Before sending a webhook message, check the channel, webhook permissions, embed content, image links and link buttons.',
              'Do not use a public computer or someone else browser for private webhook URLs unless you can clear browser data after the session.',
              'The website reduces accidental transfer risk by processing data locally, but it cannot protect users from browser extensions, malware, network interception or secrets published by the user.'
            ]
          },
          {
            heading: '12. Minors',
            body: [
              'The website is not intended to bypass Discord age requirements. Users must follow the minimum age and country requirements for using Discord.',
              'If a Discord server serves minors, the server owner is responsible for any required notices, moderation rules and data handling practices in that community.'
            ]
          },
          {
            heading: '13. Changes',
            body: [
              'Core may update this policy when the website, catalog, editor, data sources, hosting or external service requirements change.',
              'The update date shows the latest version of the document. Continued use of the website after an update means the user has reviewed the current version.',
              'If a change materially affects data handling, it should be reflected in this policy before or at the same time as the related feature is published.'
            ]
          }
        ]
      },
      ua: {
        title: 'Політика конфіденційності сайту Core',
        description: 'Докладно про те, які дані обробляє сайт Core, навіщо вони потрібні, де вони залишаються і як користувач може керувати їх використанням.',
        sections: [
          {
            heading: '1. Сфера дії',
            body: [
              'Ця політика стосується публічного сайту Core, включно з головною сторінкою, каталогом шаблонів, сторінками символів та emoji, генератором timestamp, генератором кольорового ANSI-тексту, довідником Discord Markdown, довідкою команд, редактором webhook-повідомлень і юридичними сторінками.',
              'Сайт Core є окремим публічним інтерфейсом проєкту Core. Він не є продуктом Discord Inc., GitHub Inc., Google LLC, MongoDB Inc. або інших зовнішніх постачальників.',
              'Ця політика описує технічну обробку даних на сайті. Вона не замінює умови Discord, правила Discord-серверів, налаштування браузера або окремі політики зовнішніх сервісів.'
            ]
          },
          {
            heading: '2. Дані, які сайт не запитує',
            body: [
              'Сайт не вимагає реєстрації, не створює обліковий запис Core, не просить пароль Discord і не вимагає входу через Discord OAuth для перегляду сторінок.',
              'Сайт не запитує платіжні дані, державні документи, адресу проживання, номер телефону, дату народження або документи, що посвідчують особу.',
              'Сайт не отримує доступ до особистих повідомлень Discord, списку серверів користувача, списку друзів, налаштувань Discord-акаунта або закритих каналів Discord через браузер користувача.'
            ]
          },
          {
            heading: '3. Дані в браузері',
            body: [
              'Сайт може зберігати вибрану мову в localStorage браузера, щоб сторінки відкривалися вибраною мовою після оновлення або повторного відвідування.',
              'Інструменти копіювання символів та emoji використовують буфер обміну браузера тільки після дії користувача. Сайт не читає буфер обміну без потреби і не надсилає його вміст на сервер Core.',
              'Редактор webhook-повідомлень обробляє введений webhook URL, текст, embed-поля, Components V2, посилання на зображення, кольори, імена профілю, налаштування гілки, зокрема назву нової гілки, ID наявної гілки та ID тегів форуму, а також інші налаштування повідомлення у браузері до моменту надсилання.',
              'Генератор timestamp, генератор кольорового ANSI-тексту і довідник Markdown працюють локально в браузері та створюють текстові фрагменти, які користувач сам копіює або вставляє в редактор.',
              'Якщо користувач закриває сторінку, очищає дані сайту або використовує приватний режим браузера, локальні налаштування можуть бути видалені або недоступні.'
            ]
          },
          {
            heading: '4. Каталог шаблонів і публічний API',
            body: [
              'Під час відкриття каталогу шаблонів сайт отримує публічні дані Core: назву, опис, тип, дату публікації або оновлення, лічильники, рейтинг, команду застосування, коротке превью структури та публічні посилання.',
              'Щоб обійти обмеження GitHub Pages, сайт може отримувати ці дані через Google Apps Script proxy. Такий proxy передає публічний JSON каталогу і може тимчасово кешувати відповідь.',
              'Запит каталогу не містить Discord-пароль користувача, Discord-токен користувача, приватний JSON сервера або webhook URL, введений у редакторі.',
              'Публічні шаблони можуть містити відомості, опубліковані власником Core або надіслані користувачами як пропозиції та потім схвалені для публікації.'
            ]
          },
          {
            heading: '5. Webhook-редактор',
            body: [
              'Webhook URL є секретним посиланням Discord. Будь-хто, хто має чинний webhook URL, може надсилати повідомлення через відповідний webhook, доки його не видалено або не змінено в Discord.',
              'Core не зберігає webhook URL на сайті і не додає його до бази даних сайту. Під час надсилання повідомлення браузер надсилає запит напряму на Discord webhook URL, який вказав користувач.',
              'Вміст webhook-повідомлення, назва створюваної гілки, ID наявної гілки та ID тегів можуть передаватися Discord, тому що Discord фактично приймає і публікує повідомлення. Після надсилання подальше зберігання та видалення регулюються Discord і правами на конкретному сервері.',
              'Користувач повинен вставляти тільки ті webhook URL, якими має право користуватися. Якщо webhook URL було розкрито помилково, його потрібно видалити або створити заново в налаштуваннях каналу Discord.',
              'Вкладка збережень webhook-редактора може записувати в localStorage іменовані локальні збереження. Такі збереження можуть містити тексти повідомлень, embed-дані, Components V2, назву збереження, імʼя вебхука, аватар і webhook URL, якщо користувач залишив його в редакторі.',
              'Файл перенесення .corehook є закодованим експортом налаштувань для зручного імпорту в іншому браузері. Він не є криптографічним захистом, тому його не слід передавати третім особам, якщо всередині є приватний webhook URL або матеріали, які не мають стати публічними.'
            ]
          },
          {
            heading: '6. Хостинг, журнали та зовнішні постачальники',
            body: [
              'Якщо сайт опубліковано через GitHub Pages, браузер користувача взаємодіє з інфраструктурою GitHub. GitHub може обробляти технічні журнали доступу, IP-адресу, user-agent та схожі технічні дані за своєю політикою.',
              'Якщо сайт використовує Google Apps Script proxy для каталогу шаблонів, запит до proxy проходить через інфраструктуру Google. Google може обробляти технічні дані запиту за власними правилами.',
              'Якщо користувач надсилає webhook-повідомлення, браузер взаємодіє з Discord API. Discord обробляє повідомлення, вкладення, embed-дані, компоненти і технічні дані за своїми умовами та політикою конфіденційності.',
              'Core не контролює внутрішні журнали Discord, GitHub, Google, браузера, операційної системи, інтернет-провайдера або антивірусних розширень.'
            ]
          },
          {
            heading: '7. Cookies, localStorage та аналітика',
            body: [
              'Сайт Core не використовує власні рекламні cookies, не створює рекламний профіль користувача і не продає дані рекламним мережам.',
              'Основне локальне зберігання обмежується технічними налаштуваннями інтерфейсу, наприклад вибраною мовою, і збереженнями webhook-редактора, якщо користувач сам натиснув збереження. Ці дані знаходяться у браузері користувача і можуть бути очищені засобами браузера.',
              'Якщо в майбутньому на сайт буде додано аналітику, цей документ має бути оновлений до її повноцінного використання, а призначення аналітики має бути описане окремо.'
            ]
          },
          {
            heading: '8. Цілі обробки',
            body: [
              'Дані обробляються для відображення сторінок, перемикання мови, роботи каталогу шаблонів, копіювання символів та emoji, предпросмотру webhook-повідомлень і надсилання webhook-повідомлень після явної дії користувача.',
              'Технічні дані зовнішніх постачальників можуть використовуватися ними для безпеки, запобігання зловживанням, діагностики, виконання закону і стабільності сервісу.',
              'Core не використовує сайт для прихованого збору особистих повідомлень, паролів, платіжних даних або закритих Discord-даних користувача.'
            ]
          },
          {
            heading: '9. Строки зберігання',
            body: [
              'Локальні налаштування сайту і локальні збереження webhook-редактора зберігаються у браузері до очищення localStorage, зміни браузера, видалення даних сайту, ручного видалення збереження або скидання профілю браузера.',
              'Публічні дані каталогу шаблонів зберігаються до видалення або оновлення відповідного шаблону в системі Core.',
              'Технічні журнали зовнішніх постачальників зберігаються за їхніми правилами. Core не може вручну видалити журнали GitHub, Google, Discord, браузера або інтернет-провайдера.'
            ]
          },
          {
            heading: '10. Керування даними',
            body: [
              'Користувач може очистити localStorage і cookies сайту в налаштуваннях браузера, щоб видалити локальний вибір мови, збереження webhook-редактора та інші локальні сліди роботи інтерфейсу.',
              'Користувач може не використовувати webhook-редактор, якщо не хоче передавати повідомлення напряму в Discord через webhook.',
              'Користувач може видалити або створити заново webhook у Discord, якщо посилання було скомпрометоване, використане помилково або більше не повинно працювати.',
              'З питаннями щодо публічних шаблонів, спірних матеріалів або даних каталогу потрібно звертатися через офіційний сервер Core.'
            ]
          },
          {
            heading: '11. Безпека',
            body: [
              'Не вставляйте в редактор чужі webhook URL, токени ботів, токени акаунтів, паролі, приватні ключі, cookie, резервні коди, платіжні дані або персональні дані третіх осіб.',
              'Перед надсиланням webhook-повідомлення перевіряйте канал, права webhook, вміст embed, посилання на зображення та кнопки-посилання.',
              'Не використовуйте публічний компʼютер або чужий браузер для роботи з приватними webhook URL, якщо не впевнені, що після роботи зможете очистити дані браузера.',
              'Сайт знижує ризик випадкової передачі даних завдяки локальній обробці, але не може захистити користувача від розширень браузера, шкідливих програм, перехоплення мережі або публікації секретів самим користувачем.'
            ]
          },
          {
            heading: '12. Неповнолітні',
            body: [
              'Сайт не призначений для обходу вікових вимог Discord. Користувач повинен дотримуватися мінімального віку та вимог своєї країни для використання Discord.',
              'Якщо Discord-сервер обслуговує неповнолітніх учасників, власник сервера самостійно враховує застосовні вимоги до повідомлень, модерації та обробки даних у своїй спільноті.'
            ]
          },
          {
            heading: '13. Зміни політики',
            body: [
              'Core може оновлювати цю політику при зміні сайту, каталогу, редактора, джерел даних, хостингу або вимог зовнішніх сервісів.',
              'Дата оновлення показує останню редакцію документа. Подальше використання сайту після оновлення означає, що користувач ознайомився з актуальною редакцією.',
              'Якщо зміна суттєво впливає на обробку даних, вона має бути відображена в цій політиці до або одночасно з публікацією відповідної функції.'
            ]
          }
        ]
      },
      de: {
        title: 'Core Website-Datenschutzrichtlinie',
        description: 'Ausfuehrlich dazu, welche Daten die Core-Website verarbeitet, warum sie benoetigt werden, wo sie verbleiben und wie Nutzer sie kontrollieren koennen.',
        sections: [
          {
            heading: '1. Geltungsbereich',
            body: [
              'Diese Richtlinie gilt fuer die oeffentliche Core-Website, einschliesslich Startseite, Vorlagenkatalog, Symbol- und Emoji-Seiten, Timestamp-Generator, ANSI-Farbtext-Generator, Discord-Markdown-Referenz, Befehlshilfe, Webhook-Editor und rechtliche Seiten.',
              'Die Core-Website ist eine eigenstaendige oeffentliche Oberflaeche des Core-Projekts. Sie ist kein Produkt von Discord Inc., GitHub Inc., Google LLC, MongoDB Inc. oder anderen externen Anbietern.',
              'Diese Richtlinie beschreibt die technische Datenverarbeitung auf der Website. Sie ersetzt nicht die Discord-Bedingungen, Serverregeln, Browsereinstellungen oder Richtlinien externer Dienste.'
            ]
          },
          {
            heading: '2. Daten, die die Website nicht anfordert',
            body: [
              'Die Website verlangt keine Registrierung, erstellt kein Core-Konto, fragt nicht nach einem Discord-Passwort und benoetigt fuer das Anzeigen der Seiten keinen Discord-OAuth-Login.',
              'Die Website fragt keine Zahlungsdaten, Ausweisdokumente, Wohnadresse, Telefonnummer, Geburtsdatum oder Identitaetsnachweise ab.',
              'Die Website greift ueber den Browser nicht auf Discord-Direktnachrichten, Serverlisten, Freundeslisten, Discord-Kontoeinstellungen oder private Discord-Kanaele zu.'
            ]
          },
          {
            heading: '3. Daten im Browser',
            body: [
              'Die Website kann die ausgewaehlte Sprache im localStorage des Browsers speichern, damit Seiten nach Aktualisierung oder erneutem Besuch in dieser Sprache geoeffnet werden.',
              'Symbol- und Emoji-Werkzeuge verwenden die Zwischenablage nur nach einer Nutzeraktion. Die Website liest die Zwischenablage nicht ohne Notwendigkeit und sendet deren Inhalt nicht an einen Core-Server.',
              'Der Webhook-Editor verarbeitet die angegebene Webhook-URL, Nachrichtentext, Embed-Felder, Components V2, Bildlinks, Farben, Profilnamen, Thread-Einstellungen wie neuen Thread-Namen, bestehende Thread-ID und Forum-Tag-IDs sowie weitere Einstellungen im Browser bis zum Senden.',
              'Timestamp-Generator, ANSI-Farbtext-Generator und Markdown-Referenz arbeiten lokal im Browser und erstellen Textbausteine, die der Nutzer selbst kopiert oder in den Editor einfuegt.',
              'Wenn der Nutzer die Seite schliesst, Website-Daten loescht oder einen privaten Browsermodus verwendet, koennen lokale Einstellungen geloescht oder nicht verfuegbar sein.'
            ]
          },
          {
            heading: '4. Vorlagenkatalog und oeffentliche API',
            body: [
              'Beim Oeffnen des Vorlagenkatalogs laedt die Website oeffentliche Core-Daten: Name, Beschreibung, Typ, Veroeffentlichungs- oder Aktualisierungsdatum, Zaehler, Bewertung, Befehl, kurze Strukturvorschau und oeffentliche Links.',
              'Um Einschraenkungen von GitHub Pages zu umgehen, kann die Website diese Daten ueber einen Google Apps Script Proxy laden. Dieser Proxy gibt oeffentliches Katalog-JSON weiter und kann Antworten kurz zwischenspeichern.',
              'Kataloganfragen enthalten kein Discord-Passwort, keinen Discord-Nutzertoken, kein privates Server-JSON und keine im Editor eingegebene Webhook-URL.',
              'Oeffentliche Vorlagen koennen Informationen enthalten, die vom Core-Betreiber veroeffentlicht oder von Nutzern vorgeschlagen und spaeter freigegeben wurden.'
            ]
          },
          {
            heading: '5. Webhook-Editor',
            body: [
              'Eine Webhook-URL ist ein geheimer Discord-Link. Wer eine gueltige Webhook-URL besitzt, kann darueber Nachrichten senden, bis sie in Discord geloescht oder geaendert wird.',
              'Core speichert Webhook-URLs nicht auf der Website und fuegt sie keiner Website-Datenbank hinzu. Beim Senden sendet der Browser direkt an die vom Nutzer angegebene Discord-Webhook-URL.',
              'Der Inhalt einer Webhook-Nachricht, ein neuer Thread-Name, eine bestehende Thread-ID und Tag-IDs koennen an Discord uebertragen werden, weil Discord die Nachricht annimmt und veroeffentlicht. Danach richten sich Speicherung und Loeschung nach Discord und den Rechten auf dem jeweiligen Server.',
              'Nutzer sollten nur Webhook-URLs eingeben, die sie verwenden duerfen. Wurde eine Webhook-URL versehentlich offengelegt, sollte sie in den Discord-Kanaleinstellungen geloescht oder neu erstellt werden.',
              'Die Speicher-Ansicht des Webhook-Editors kann benannte lokale Speicherungen in localStorage ablegen. Diese Speicherungen koennen Nachrichtentexte, Embed-Daten, Components V2, den Speichernamen, Webhook-Profilnamen, Avatar und die Webhook-URL enthalten, wenn der Nutzer sie im Editor belassen hat.',
              'Eine .corehook-Uebertragungsdatei ist ein kodierter Export der Editor-Einstellungen fuer den Import in einem anderen Browser. Sie ist kein kryptografischer Schutz und sollte nicht an Dritte weitergegeben werden, wenn sie eine private Webhook-URL oder nicht oeffentliche Inhalte enthaelt.'
            ]
          },
          {
            heading: '6. Hosting, Protokolle und externe Anbieter',
            body: [
              'Wenn die Website ueber GitHub Pages veroeffentlicht wird, interagiert der Browser mit GitHub-Infrastruktur. GitHub kann technische Zugriffsprotokolle, IP-Adresse, User-Agent und aehnliche Informationen nach eigener Richtlinie verarbeiten.',
              'Wenn die Website einen Google Apps Script Proxy fuer den Vorlagenkatalog nutzt, laeuft die Anfrage ueber Google-Infrastruktur. Google kann technische Anfragedaten nach eigenen Regeln verarbeiten.',
              'Wenn der Nutzer eine Webhook-Nachricht sendet, interagiert der Browser mit der Discord API. Discord verarbeitet Nachricht, Anhaenge, Embed-Daten, Komponenten und technische Daten nach eigenen Bedingungen und Datenschutzregeln.',
              'Core kontrolliert keine internen Protokolle von Discord, GitHub, Google, Browser, Betriebssystem, Internetanbieter oder Sicherheits-Erweiterungen.'
            ]
          },
          {
            heading: '7. Cookies, localStorage und Analyse',
            body: [
              'Die Core-Website verwendet keine eigenen Werbe-Cookies, erstellt kein Werbeprofil und verkauft keine Daten an Werbenetzwerke.',
              'Die lokale Speicherung beschraenkt sich im Wesentlichen auf technische Oberflaechen-Einstellungen wie die Sprache und auf Webhook-Editor-Speicherungen, wenn der Nutzer sie ausdruecklich speichert. Diese Daten bleiben im Browser und koennen dort geloescht werden.',
              'Falls kuenftig Analytik hinzugefuegt wird, muss dieses Dokument vor der vollstaendigen Nutzung aktualisiert und der Zweck separat beschrieben werden.'
            ]
          },
          {
            heading: '8. Zwecke',
            body: [
              'Daten werden verarbeitet, um Seiten anzuzeigen, Sprache zu wechseln, den Vorlagenkatalog zu betreiben, Symbole und Emoji zu kopieren, Webhook-Nachrichten vorzuschauen und sie nach ausdruecklicher Nutzeraktion zu senden.',
              'Technische Daten externer Anbieter koennen von diesen fuer Sicherheit, Missbrauchsvermeidung, Diagnose, rechtliche Pflichten und Stabilitaet genutzt werden.',
              'Core nutzt die Website nicht zur versteckten Erhebung von Direktnachrichten, Passwoertern, Zahlungsdaten oder privaten Discord-Daten.'
            ]
          },
          {
            heading: '9. Aufbewahrung',
            body: [
              'Lokale Website-Einstellungen und lokale Webhook-Editor-Speicherungen bleiben im Browser, bis localStorage geleert, der Browser gewechselt, Website-Daten geloescht, die Speicherung manuell entfernt oder das Browserprofil zurueckgesetzt wird.',
              'Oeffentliche Vorlagendaten bleiben verfuegbar, bis die jeweilige Vorlage im Core-System entfernt oder aktualisiert wird.',
              'Technische Protokolle externer Anbieter werden nach deren Regeln gespeichert. Core kann Protokolle von GitHub, Google, Discord, Browseranbietern oder Internetanbietern nicht manuell loeschen.'
            ]
          },
          {
            heading: '10. Kontrolle durch Nutzer',
            body: [
              'Nutzer koennen localStorage und Cookies in den Browsereinstellungen loeschen, um lokale Sprachwahl, Webhook-Editor-Speicherungen und andere lokale Spuren der Oberflaeche zu entfernen.',
              'Nutzer koennen den Webhook-Editor vermeiden, wenn sie keine Nachricht direkt ueber einen Webhook an Discord senden wollen.',
              'Nutzer koennen einen Webhook in Discord loeschen oder neu erstellen, wenn der Link kompromittiert, versehentlich genutzt oder nicht mehr benoetigt wird.',
              'Fragen zu oeffentlichen Vorlagen, strittigen Inhalten oder Katalogdaten sollten ueber den offiziellen Core-Server gestellt werden.'
            ]
          },
          {
            heading: '11. Sicherheit',
            body: [
              'Fuegen Sie keine fremden Webhook-URLs, Bot-Tokens, Account-Tokens, Passwoerter, privaten Schluessel, Cookies, Backup-Codes, Zahlungsdaten oder personenbezogenen Daten Dritter in den Editor ein.',
              'Pruefen Sie vor dem Senden Kanal, Webhook-Rechte, Embed-Inhalt, Bildlinks und Link-Buttons.',
              'Verwenden Sie fuer private Webhook-URLs keinen oeffentlichen Computer oder fremden Browser, wenn Sie die Browserdaten danach nicht sicher loeschen koennen.',
              'Die Website reduziert versehentliche Uebertragungen durch lokale Verarbeitung, kann Nutzer aber nicht vor Browser-Erweiterungen, Schadsoftware, Netzwerkabgriff oder selbst veroeffentlichten Geheimnissen schuetzen.'
            ]
          },
          {
            heading: '12. Minderjaehrige',
            body: [
              'Die Website ist nicht dazu bestimmt, Discord-Altersanforderungen zu umgehen. Nutzer muessen das Mindestalter und die Anforderungen ihres Landes fuer Discord beachten.',
              'Wenn ein Discord-Server Minderjaehrige bedient, ist der Serverbetreiber fuer erforderliche Hinweise, Moderationsregeln und Datenverarbeitung in seiner Community verantwortlich.'
            ]
          },
          {
            heading: '13. Aenderungen',
            body: [
              'Core kann diese Richtlinie aktualisieren, wenn sich Website, Katalog, Editor, Datenquellen, Hosting oder Anforderungen externer Dienste aendern.',
              'Das Aktualisierungsdatum zeigt die neueste Fassung. Weitere Nutzung nach einer Aktualisierung bedeutet, dass der Nutzer die aktuelle Fassung zur Kenntnis genommen hat.',
              'Wenn eine Aenderung die Datenverarbeitung wesentlich beeinflusst, soll sie vor oder gleichzeitig mit der betreffenden Funktion in dieser Richtlinie beschrieben werden.'
            ]
          }
        ]
      }
    },
    siteTerms: {
      ru: {
        title: 'Условия использования сайта Core',
        description: 'Подробные правила использования сайта Core, публичного каталога, справки, инструментов копирования и редактора webhook-сообщений.',
        sections: [
          {
            heading: '1. Принятие условий',
            body: [
              'Используя сайт Core, пользователь соглашается с этими условиями, политикой конфиденциальности сайта, применимыми правилами Discord и правилами внешних сервисов, через которые работает сайт.',
              'Если пользователь не согласен с этими условиями, он должен прекратить использование сайта и не отправлять данные через его инструменты.',
              'Если пользователь действует от имени команды, сервера, организации или проекта, он подтверждает, что имеет право использовать сайт и связанные инструменты от имени такого проекта.'
            ]
          },
          {
            heading: '2. Назначение сайта',
            body: [
              'Сайт предназначен для публичного описания возможностей Core, просмотра шаблонов, поиска символов и emoji, чтения справки по публичным командам, подготовки webhook-сообщений и просмотра юридической информации.',
              'Сайт не является панелью полного управления Discord-сервером, платежным сервисом, юридической консультацией или официальным интерфейсом Discord.',
              'Информация на сайте предоставляется для удобства пользователей. Перед применением шаблонов, отправкой webhook-сообщений или использованием команд пользователь обязан проверить результат самостоятельно.'
            ]
          },
          {
            heading: '3. Доступ и доступность',
            body: [
              'Сайт может быть недоступен, работать медленно или отображать устаревшие данные из-за GitHub Pages, Discord API, публичного API Core, Google Apps Script proxy, браузера пользователя или сетевых ограничений.',
              'Core не гарантирует непрерывную работу сайта, мгновенное обновление всех публичных данных, отсутствие ошибок предпросмотра или полное соответствие внешнего вида Discord во всех клиентах Discord.',
              'Core может изменять структуру сайта, страницы, дизайн, тексты, публичные ссылки и доступность инструментов без предварительного персонального уведомления.'
            ]
          },
          {
            heading: '4. Webhook-редактор',
            body: [
              'Пользователь может использовать webhook-редактор только для webhook URL, которыми он вправе управлять или пользоваться с разрешения владельца канала или сервера.',
              'Пользователь несет ответственность за содержимое сообщений, embed, Components V2, ссылки, изображения, упоминания, кнопки-ссылки, названия веток, ID существующих веток, ID форумных тегов и любые действия, которые выполняются через указанный webhook.',
              'Запрещено использовать webhook-редактор для спама, фишинга, вредоносных ссылок, массовых нежелательных сообщений, обхода блокировок, выдачи себя за других людей, обмана, публикации чужих данных или нарушения правил Discord.',
              'Если сообщение отправлено через webhook, отмена публикации, удаление сообщения или изменение webhook выполняются средствами Discord и зависят от прав пользователя на сервере.',
              'Именованные сохранения в редакторе предназначены только для удобства работы пользователя в его браузере. Пользователь сам решает, что сохранять, как называть сохранение, когда удалять его из localStorage и кому передавать экспортированный файл.',
              'Закодированный файл переноса предназначен для импорта настроек редактора между браузерами и устройствами. Перед передачей такого файла пользователь обязан проверить, нет ли в нем webhook URL, закрытых ссылок, данных веток, внутренних текстов сервера или других сведений, которые не должны попасть к третьим лицам.',
              'Инструменты timestamp, цветного ANSI-текста и Markdown только подготавливают текстовые фрагменты. Пользователь обязан самостоятельно проверить, как они отображаются в текущем клиенте Discord перед публикацией.'
            ]
          },
          {
            heading: '5. Шаблоны, превью и публичный каталог',
            body: [
              'Публичные шаблоны серверов, ролей и правил предоставляются как заготовки. Они могут требовать ручной настройки под конкретный сервер, аудиторию, язык, модерацию, права и правила сообщества.',
              'Превью шаблонов на сайте является визуальной симуляцией и справочным описанием. Оно может отличаться от фактического результата в Discord из-за обновлений Discord, ограничений API, прав бота, лимитов клиента или особенностей конкретного сервера.',
              'Пользователь обязан проверить каналы, роли, права, тексты правил, webhook-сообщения, ссылки, цвета, упоминания и другие параметры до публикации или применения шаблона.',
              'Core может скрыть, изменить или удалить публичный шаблон, если он устарел, небезопасен, нарушает правила проекта, содержит ошибку, вводит в заблуждение или нарушает права третьих лиц.'
            ]
          },
          {
            heading: '6. Права на материалы',
            body: [
              'Дизайн сайта, структура страниц, тексты Core, визуальные элементы Core и логика интерфейса принадлежат проекту Core или используются на законном основании.',
              'Пользовательские предложения, описания шаблонов и материалы, отправленные для публикации, могут быть отредактированы, отформатированы, переведены, объединены с другими материалами или отклонены для качества и безопасности каталога.',
              'Отправляя материал для публичного шаблона, пользователь подтверждает, что имеет право передать этот материал и что публикация не нарушает права других людей, правила Discord или применимое законодательство.'
            ]
          },
          {
            heading: '7. Запрещенное использование',
            body: [
              'Запрещено использовать сайт для атак на Discord, Core, чужие webhook, серверы, API, пользователей или инфраструктуру внешних поставщиков.',
              'Запрещено автоматизированно нагружать каталог, proxy или редактор запросами, которые мешают нормальной работе сервиса или обходят технические ограничения.',
              'Запрещено публиковать или передавать через сайт вредоносный код, токены, украденные данные, угрозы, материалы сексуальной эксплуатации, экстремистские материалы, незаконный контент, фишинговые страницы или инструкции по вредоносным действиям.',
              'Запрещено использовать сайт так, чтобы нарушать условия Discord, Developer Terms Discord, права интеллектуальной собственности, приватность третьих лиц или правила конкретного Discord-сервера.'
            ]
          },
          {
            heading: '8. Сторонние сервисы',
            body: [
              'Сайт может ссылаться на Discord, GitHub, Google Apps Script, публичный API Core, изображения, invite-ссылки и другие внешние ресурсы. Использование этих ресурсов регулируется их собственными правилами.',
              'Core не отвечает за доступность, безопасность, изменения, журналы, обработку данных или решения модерации внешних сервисов.',
              'Пользователь должен самостоятельно проверять адреса страниц, webhook URL, invite-ссылки и домены перед отправкой данных или переходом по ссылке.'
            ]
          },
          {
            heading: '9. Отказ от гарантий',
            body: [
              'Сайт предоставляется в состоянии как есть и по мере доступности. Core не гарантирует, что сайт будет работать без ошибок, простоев, несовместимостей, потери локальных настроек или расхождений с Discord.',
              'Core не гарантирует, что шаблоны подходят для каждого сервера, что webhook-сообщение будет принято Discord, что визуальное превью полностью совпадет с каждым клиентом Discord или что внешний API всегда вернет актуальные данные.',
              'Пользователь использует сайт на свой риск и обязан делать собственную проверку перед применением действий, которые могут повлиять на сервер или опубликованный контент.'
            ]
          },
          {
            heading: '10. Ограничение ответственности',
            body: [
              'В максимальной степени, допустимой применимым правом, Core не отвечает за потерю данных, ошибочные сообщения, удаление каналов или ролей, неправильные права, публикацию webhook-сообщения, блокировки Discord, действия пользователей или недоступность внешних сервисов.',
              'Core не отвечает за ущерб, возникший из-за того, что пользователь вставил чужой webhook URL, раскрыл секретную ссылку, применил шаблон без проверки, нарушил правила Discord или использовал сайт не по назначению.',
              'Ничто в этих условиях не ограничивает ответственность, если такое ограничение прямо запрещено применимым законом.'
            ]
          },
          {
            heading: '11. Изменения условий',
            body: [
              'Core может обновлять эти условия при изменении сайта, функций, публичного каталога, внешних поставщиков, требований безопасности или правил Discord.',
              'Дата обновления показывает актуальную редакцию. Продолжение использования сайта после обновления означает принятие новой редакции.',
              'Если пользователь не согласен с новой редакцией, он должен прекратить использование сайта.'
            ]
          },
          {
            heading: '12. Контакт и споры',
            body: [
              'По вопросам сайта, удаления спорных публичных материалов, ошибок в шаблонах или безопасности нужно обращаться через официальный сервер Core.',
              'Перед обращением желательно подготовить ссылку на страницу, название шаблона, описание проблемы и скриншот, если он помогает воспроизвести ошибку.',
              'Эти условия не являются индивидуальной юридической консультацией. Для оценки юридических требований конкретного проекта владелец сервера должен обратиться к профильному специалисту.'
            ]
          }
        ]
      },
      en: {
        title: 'Core Website Terms of Use',
        description: 'Detailed rules for using the Core website, public catalog, command help, copy tools and webhook message editor.',
        sections: [
          {
            heading: '1. Acceptance',
            body: [
              'By using the Core website, the user agrees to these terms, the website privacy policy, applicable Discord rules and the rules of external services used by the site.',
              'If the user does not agree with these terms, they must stop using the website and must not send data through its tools.',
              'If the user acts for a team, server, organization or project, the user confirms they are authorized to use the site and related tools for that project.'
            ]
          },
          {
            heading: '2. Purpose',
            body: [
              'The site is intended to describe Core features, display templates, search symbols and emoji, provide public command help, prepare webhook messages and show legal information.',
              'The site is not a full Discord server control panel, payment service, legal advice service or official Discord interface.',
              'Information on the site is provided for user convenience. Before applying templates, sending webhook messages or using commands, the user must review the result independently.'
            ]
          },
          {
            heading: '3. Access and availability',
            body: [
              'The site may be unavailable, slow or show stale data because of GitHub Pages, Discord API, the public Core API, Google Apps Script proxy, the user browser or network limits.',
              'Core does not guarantee uninterrupted operation, instant updates of public data, error-free previews or exact Discord visual matching in every Discord client.',
              'Core may change the site structure, pages, design, texts, public links and tool availability without individual prior notice.'
            ]
          },
          {
            heading: '4. Webhook editor',
            body: [
              'Users may use the webhook editor only with webhook URLs they are allowed to control or use with permission from the channel or server owner.',
              'The user is responsible for message content, embeds, Components V2, links, images, mentions, link buttons, thread names, existing thread IDs, forum tag IDs and any action performed through the supplied webhook.',
              'The webhook editor must not be used for spam, phishing, malicious links, unwanted mass messages, evading blocks, impersonation, deception, publishing other people data or violating Discord rules.',
              'After a message is sent through a webhook, deletion, editing or webhook changes are handled in Discord and depend on server permissions.',
              'Named saves in the editor are provided only for the user convenience in their browser. The user decides what to save, how to name a save, when to remove it from localStorage and who may receive an exported file.',
              'The encoded transfer file is intended for importing editor settings between browsers and devices. Before sharing such a file, the user must check whether it contains webhook URLs, private links, thread data, internal server text or other information that should not reach third parties.',
              'Timestamp, ANSI colored text and Markdown tools only prepare text fragments. The user remains responsible for verifying how those fragments render in the current Discord client before publishing them.'
            ]
          },
          {
            heading: '5. Templates, previews and catalog',
            body: [
              'Public server, role and rule templates are starter materials. They may require manual adjustment for a specific server, audience, language, moderation policy, permissions and community rules.',
              'Template previews on the site are visual simulations and reference descriptions. They may differ from the actual Discord result due to Discord updates, API limits, bot permissions, client limits or server-specific settings.',
              'The user must review channels, roles, permissions, rule text, webhook messages, links, colors, mentions and other settings before publishing or applying a template.',
              'Core may hide, modify or remove a public template if it is outdated, unsafe, against project rules, incorrect, misleading or infringing third-party rights.'
            ]
          },
          {
            heading: '6. Rights to materials',
            body: [
              'The site design, page structure, Core texts, Core visual elements and interface logic belong to the Core project or are used under a lawful basis.',
              'User suggestions, template descriptions and submitted publication materials may be edited, formatted, translated, combined with other materials or rejected for catalog quality and safety.',
              'By submitting material for a public template, the user confirms they have the right to provide it and that publication does not violate other people rights, Discord rules or applicable law.'
            ]
          },
          {
            heading: '7. Prohibited use',
            body: [
              'The site must not be used to attack Discord, Core, other people webhooks, servers, APIs, users or external provider infrastructure.',
              'Users must not automate excessive requests to the catalog, proxy or editor in a way that disrupts normal operation or bypasses technical limits.',
              'Users must not publish or transmit malicious code, tokens, stolen data, threats, sexual exploitation material, extremist material, illegal content, phishing pages or instructions for harmful activity through the site.',
              'Users must not use the site in a way that violates Discord terms, Discord Developer Terms, intellectual property rights, third-party privacy or rules of a specific Discord server.'
            ]
          },
          {
            heading: '8. Third-party services',
            body: [
              'The site may link to Discord, GitHub, Google Apps Script, the public Core API, images, invite links and other external resources. Those resources are governed by their own rules.',
              'Core is not responsible for availability, security, changes, logs, data handling or moderation decisions of external services.',
              'The user should verify page addresses, webhook URLs, invite links and domains before sending data or following a link.'
            ]
          },
          {
            heading: '9. No warranties',
            body: [
              'The site is provided as is and as available. Core does not guarantee error-free operation, uninterrupted access, compatibility, preservation of local settings or exact matching with Discord.',
              'Core does not guarantee that templates fit every server, that a webhook message will be accepted by Discord, that previews match every Discord client or that external APIs always return current data.',
              'The user uses the site at their own risk and must perform their own review before actions that may affect a server or published content.'
            ]
          },
          {
            heading: '10. Limitation of liability',
            body: [
              'To the maximum extent permitted by applicable law, Core is not responsible for data loss, incorrect messages, deleted channels or roles, wrong permissions, webhook publication, Discord enforcement, user actions or external service outages.',
              'Core is not responsible for harm caused by entering someone else webhook URL, exposing a secret link, applying a template without review, violating Discord rules or misusing the site.',
              'Nothing in these terms limits liability where such limitation is not allowed by applicable law.'
            ]
          },
          {
            heading: '11. Changes',
            body: [
              'Core may update these terms when the website, features, public catalog, external providers, security requirements or Discord rules change.',
              'The update date shows the current version. Continued use after an update means acceptance of the new version.',
              'If the user does not agree with the new version, the user must stop using the site.'
            ]
          },
          {
            heading: '12. Contact and disputes',
            body: [
              'Questions about the site, removal of disputed public materials, template errors or security should be sent through the official Core server.',
              'When contacting Core, it is useful to provide the page link, template name, issue description and a screenshot if it helps reproduce the problem.',
              'These terms are not individual legal advice. Server owners should consult a qualified professional for legal requirements of their specific project.'
            ]
          }
        ]
      },
      ua: {
        title: 'Умови використання сайту Core',
        description: 'Докладні правила використання сайту Core, публічного каталогу, довідки, інструментів копіювання та редактора webhook-повідомлень.',
        sections: [
          {
            heading: '1. Прийняття умов',
            body: [
              'Використовуючи сайт Core, користувач погоджується з цими умовами, політикою конфіденційності сайту, застосовними правилами Discord і правилами зовнішніх сервісів, через які працює сайт.',
              'Якщо користувач не погоджується з цими умовами, він повинен припинити використання сайту і не надсилати дані через його інструменти.',
              'Якщо користувач діє від імені команди, сервера, організації або проєкту, він підтверджує, що має право використовувати сайт і повʼязані інструменти від імені такого проєкту.'
            ]
          },
          {
            heading: '2. Призначення сайту',
            body: [
              'Сайт призначений для публічного опису можливостей Core, перегляду шаблонів, пошуку символів та emoji, читання довідки з публічних команд, підготовки webhook-повідомлень і перегляду юридичної інформації.',
              'Сайт не є панеллю повного керування Discord-сервером, платіжним сервісом, юридичною консультацією або офіційним інтерфейсом Discord.',
              'Інформація на сайті надається для зручності користувачів. Перед застосуванням шаблонів, надсиланням webhook-повідомлень або використанням команд користувач зобовʼязаний самостійно перевірити результат.'
            ]
          },
          {
            heading: '3. Доступ і доступність',
            body: [
              'Сайт може бути недоступним, працювати повільно або показувати застарілі дані через GitHub Pages, Discord API, публічний API Core, Google Apps Script proxy, браузер користувача або мережеві обмеження.',
              'Core не гарантує безперервну роботу сайту, миттєве оновлення всіх публічних даних, відсутність помилок предпросмотру або повну відповідність зовнішнього вигляду Discord у всіх клієнтах Discord.',
              'Core може змінювати структуру сайту, сторінки, дизайн, тексти, публічні посилання і доступність інструментів без попереднього персонального повідомлення.'
            ]
          },
          {
            heading: '4. Webhook-редактор',
            body: [
              'Користувач може використовувати webhook-редактор тільки для webhook URL, якими має право керувати або користуватися з дозволу власника каналу чи сервера.',
              'Користувач відповідає за вміст повідомлень, embed, Components V2, посилання, зображення, згадки, кнопки-посилання, назви гілок, ID наявних гілок, ID форумних тегів та будь-які дії, виконані через вказаний webhook.',
              'Заборонено використовувати webhook-редактор для спаму, фішингу, шкідливих посилань, масових небажаних повідомлень, обходу блокувань, видавання себе за інших, обману, публікації чужих даних або порушення правил Discord.',
              'Якщо повідомлення надіслано через webhook, скасування публікації, видалення повідомлення або зміна webhook виконуються засобами Discord і залежать від прав користувача на сервері.',
              'Іменовані збереження в редакторі призначені тільки для зручності користувача в його браузері. Користувач сам вирішує, що зберігати, як називати збереження, коли видаляти його з localStorage і кому передавати експортований файл.',
              'Закодований файл перенесення призначений для імпорту налаштувань редактора між браузерами та пристроями. Перед передаванням такого файла користувач має перевірити, чи немає в ньому webhook URL, закритих посилань, даних гілок, внутрішніх текстів сервера або інших даних, які не мають потрапити до третіх осіб.',
              'Інструменти timestamp, кольорового ANSI-тексту та Markdown тільки готують текстові фрагменти. Користувач має самостійно перевірити, як вони відображаються в поточному клієнті Discord перед публікацією.'
            ]
          },
          {
            heading: '5. Шаблони, превью і каталог',
            body: [
              'Публічні шаблони серверів, ролей і правил надаються як заготовки. Вони можуть вимагати ручного налаштування під конкретний сервер, аудиторію, мову, модерацію, права і правила спільноти.',
              'Превью шаблонів на сайті є візуальною симуляцією і довідковим описом. Воно може відрізнятися від фактичного результату в Discord через оновлення Discord, обмеження API, права бота, ліміти клієнта або особливості конкретного сервера.',
              'Користувач зобовʼязаний перевірити канали, ролі, права, тексти правил, webhook-повідомлення, посилання, кольори, згадки та інші параметри до публікації або застосування шаблону.',
              'Core може приховати, змінити або видалити публічний шаблон, якщо він застарів, небезпечний, порушує правила проєкту, містить помилку, вводить в оману або порушує права третіх осіб.'
            ]
          },
          {
            heading: '6. Права на матеріали',
            body: [
              'Дизайн сайту, структура сторінок, тексти Core, візуальні елементи Core і логіка інтерфейсу належать проєкту Core або використовуються на законній підставі.',
              'Користувацькі пропозиції, описи шаблонів і матеріали, надіслані для публікації, можуть бути відредаговані, відформатовані, перекладені, обʼєднані з іншими матеріалами або відхилені для якості та безпеки каталогу.',
              'Надсилаючи матеріал для публічного шаблону, користувач підтверджує, що має право передати цей матеріал і що публікація не порушує права інших людей, правила Discord або застосовне законодавство.'
            ]
          },
          {
            heading: '7. Заборонене використання',
            body: [
              'Заборонено використовувати сайт для атак на Discord, Core, чужі webhook, сервери, API, користувачів або інфраструктуру зовнішніх постачальників.',
              'Заборонено автоматизовано навантажувати каталог, proxy або редактор запитами, які заважають нормальній роботі сервісу або обходять технічні обмеження.',
              'Заборонено публікувати або передавати через сайт шкідливий код, токени, викрадені дані, погрози, матеріали сексуальної експлуатації, екстремістські матеріали, незаконний контент, фішингові сторінки або інструкції щодо шкідливих дій.',
              'Заборонено використовувати сайт так, щоб порушувати умови Discord, Developer Terms Discord, права інтелектуальної власності, приватність третіх осіб або правила конкретного Discord-сервера.'
            ]
          },
          {
            heading: '8. Сторонні сервіси',
            body: [
              'Сайт може посилатися на Discord, GitHub, Google Apps Script, публічний API Core, зображення, invite-посилання та інші зовнішні ресурси. Використання цих ресурсів регулюється їхніми власними правилами.',
              'Core не відповідає за доступність, безпеку, зміни, журнали, обробку даних або рішення модерації зовнішніх сервісів.',
              'Користувач повинен самостійно перевіряти адреси сторінок, webhook URL, invite-посилання та домени перед надсиланням даних або переходом за посиланням.'
            ]
          },
          {
            heading: '9. Відмова від гарантій',
            body: [
              'Сайт надається у стані як є і за наявності доступу. Core не гарантує, що сайт працюватиме без помилок, простоїв, несумісностей, втрати локальних налаштувань або розбіжностей з Discord.',
              'Core не гарантує, що шаблони підходять для кожного сервера, що webhook-повідомлення буде прийняте Discord, що візуальне превью повністю збігатиметься з кожним клієнтом Discord або що зовнішній API завжди поверне актуальні дані.',
              'Користувач використовує сайт на власний ризик і повинен виконувати власну перевірку перед діями, які можуть вплинути на сервер або опублікований контент.'
            ]
          },
          {
            heading: '10. Обмеження відповідальності',
            body: [
              'У максимальній мірі, дозволеній застосовним правом, Core не відповідає за втрату даних, помилкові повідомлення, видалення каналів або ролей, неправильні права, публікацію webhook-повідомлення, блокування Discord, дії користувачів або недоступність зовнішніх сервісів.',
              'Core не відповідає за шкоду, що виникла через те, що користувач вставив чужий webhook URL, розкрив секретне посилання, застосував шаблон без перевірки, порушив правила Discord або використав сайт не за призначенням.',
              'Ніщо в цих умовах не обмежує відповідальність, якщо таке обмеження прямо заборонене застосовним законом.'
            ]
          },
          {
            heading: '11. Зміни умов',
            body: [
              'Core може оновлювати ці умови при зміні сайту, функцій, публічного каталогу, зовнішніх постачальників, вимог безпеки або правил Discord.',
              'Дата оновлення показує актуальну редакцію. Подальше використання сайту після оновлення означає прийняття нової редакції.',
              'Якщо користувач не погоджується з новою редакцією, він повинен припинити використання сайту.'
            ]
          },
          {
            heading: '12. Контакт і спори',
            body: [
              'З питаннями сайту, видалення спірних публічних матеріалів, помилок у шаблонах або безпеки потрібно звертатися через офіційний сервер Core.',
              'Перед зверненням бажано підготувати посилання на сторінку, назву шаблону, опис проблеми і скриншот, якщо він допомагає відтворити помилку.',
              'Ці умови не є індивідуальною юридичною консультацією. Для оцінки юридичних вимог конкретного проєкту власник сервера повинен звернутися до профільного спеціаліста.'
            ]
          }
        ]
      },
      de: {
        title: 'Core Website-Nutzungsbedingungen',
        description: 'Ausfuehrliche Regeln fuer die Nutzung der Core-Website, des oeffentlichen Katalogs, der Hilfe, Kopierwerkzeuge und des Webhook-Editors.',
        sections: [
          {
            heading: '1. Annahme',
            body: [
              'Durch die Nutzung der Core-Website akzeptiert der Nutzer diese Bedingungen, die Datenschutzrichtlinie der Website, anwendbare Discord-Regeln und Regeln externer Dienste, ueber die die Website funktioniert.',
              'Wenn der Nutzer diesen Bedingungen nicht zustimmt, muss er die Nutzung der Website beenden und darf keine Daten ueber ihre Werkzeuge senden.',
              'Handelt der Nutzer fuer ein Team, einen Server, eine Organisation oder ein Projekt, bestaetigt er, zur Nutzung der Website und Werkzeuge fuer dieses Projekt berechtigt zu sein.'
            ]
          },
          {
            heading: '2. Zweck',
            body: [
              'Die Website dient der oeffentlichen Beschreibung von Core-Funktionen, dem Anzeigen von Vorlagen, der Suche nach Symbolen und Emoji, der Hilfe zu oeffentlichen Befehlen, der Vorbereitung von Webhook-Nachrichten und rechtlichen Informationen.',
              'Die Website ist kein vollstaendiges Discord-Server-Kontrollpanel, kein Zahlungsdienst, keine Rechtsberatung und keine offizielle Discord-Oberflaeche.',
              'Informationen auf der Website dienen der Bequemlichkeit. Vor Anwendung von Vorlagen, Senden von Webhook-Nachrichten oder Nutzung von Befehlen muss der Nutzer das Ergebnis selbst pruefen.'
            ]
          },
          {
            heading: '3. Zugriff und Verfuegbarkeit',
            body: [
              'Die Website kann wegen GitHub Pages, Discord API, oeffentlicher Core API, Google Apps Script Proxy, Browser oder Netzwerkgrenzen nicht verfuegbar sein, langsam arbeiten oder veraltete Daten anzeigen.',
              'Core garantiert keinen ununterbrochenen Betrieb, keine sofortige Aktualisierung aller oeffentlichen Daten, keine fehlerfreien Vorschauen und keine exakte Discord-Darstellung in jedem Discord-Client.',
              'Core kann Struktur, Seiten, Design, Texte, oeffentliche Links und Werkzeugverfuegbarkeit ohne individuelle Vorankuendigung aendern.'
            ]
          },
          {
            heading: '4. Webhook-Editor',
            body: [
              'Nutzer duerfen den Webhook-Editor nur mit Webhook-URLs verwenden, die sie verwalten duerfen oder mit Erlaubnis des Kanal- oder Serverbetreibers nutzen duerfen.',
              'Der Nutzer ist fuer Nachrichtentexte, Embeds, Components V2, Links, Bilder, Erwähnungen, Link-Buttons, Thread-Namen, bestehende Thread-IDs, Forum-Tag-IDs und jede Aktion ueber den angegebenen Webhook verantwortlich.',
              'Der Editor darf nicht fuer Spam, Phishing, schädliche Links, unerwuenschte Massennachrichten, Umgehung von Sperren, Identitaetstaeuschung, Betrug, Veroeffentlichung fremder Daten oder Discord-Regelverstoesse genutzt werden.',
              'Nach dem Senden ueber einen Webhook erfolgen Loeschung, Bearbeitung oder Webhook-Aenderungen in Discord und haengen von den Serverrechten ab.',
              'Benannte Speicherungen im Editor dienen nur der Bequemlichkeit des Nutzers in seinem Browser. Der Nutzer entscheidet selbst, was gespeichert wird, wie die Speicherung heisst, wann sie aus localStorage entfernt wird und wer eine exportierte Datei erhalten darf.',
              'Die kodierte Uebertragungsdatei dient dem Import von Editor-Einstellungen zwischen Browsern und Geraeten. Vor einer Weitergabe muss der Nutzer pruefen, ob sie Webhook-URLs, private Links, Thread-Daten, interne Servertexte oder andere Informationen enthaelt, die nicht an Dritte gelangen sollen.',
              'Timestamp-, ANSI-Farbtext- und Markdown-Werkzeuge bereiten nur Textbausteine vor. Der Nutzer muss selbst pruefen, wie sie im aktuellen Discord-Client vor der Veroeffentlichung dargestellt werden.'
            ]
          },
          {
            heading: '5. Vorlagen, Vorschauen und Katalog',
            body: [
              'Oeffentliche Server-, Rollen- und Regelvorlagen sind Ausgangsmaterial. Sie koennen manuelle Anpassungen fuer Server, Zielgruppe, Sprache, Moderation, Rechte und Community-Regeln erfordern.',
              'Vorlagenvorschauen auf der Website sind visuelle Simulationen und Referenzbeschreibungen. Sie koennen wegen Discord-Updates, API-Grenzen, Bot-Rechten, Client-Limits oder Servereinstellungen vom tatsaechlichen Ergebnis abweichen.',
              'Der Nutzer muss Kanaele, Rollen, Rechte, Regeltexte, Webhook-Nachrichten, Links, Farben, Erwähnungen und andere Einstellungen vor Veroeffentlichung oder Anwendung pruefen.',
              'Core kann oeffentliche Vorlagen ausblenden, aendern oder entfernen, wenn sie veraltet, unsicher, regelwidrig, fehlerhaft, irrefuehrend oder rechtsverletzend sind.'
            ]
          },
          {
            heading: '6. Rechte an Materialien',
            body: [
              'Website-Design, Seitenstruktur, Core-Texte, Core-Grafiken und Oberflaechenlogik gehoeren zum Core-Projekt oder werden rechtmaessig genutzt.',
              'Nutzervorschlaege, Vorlagenbeschreibungen und eingereichte Materialien koennen fuer Qualitaet und Sicherheit bearbeitet, formatiert, uebersetzt, mit anderen Materialien kombiniert oder abgelehnt werden.',
              'Mit dem Einreichen von Material fuer eine oeffentliche Vorlage bestaetigt der Nutzer, dass er dazu berechtigt ist und die Veroeffentlichung keine Rechte anderer, Discord-Regeln oder geltendes Recht verletzt.'
            ]
          },
          {
            heading: '7. Verbotene Nutzung',
            body: [
              'Die Website darf nicht fuer Angriffe auf Discord, Core, fremde Webhooks, Server, APIs, Nutzer oder externe Infrastruktur genutzt werden.',
              'Automatisierte uebermaessige Anfragen an Katalog, Proxy oder Editor, die den normalen Betrieb stoeren oder technische Grenzen umgehen, sind untersagt.',
              'Es ist verboten, ueber die Website Schadcode, Tokens, gestohlene Daten, Drohungen, Material sexueller Ausbeutung, extremistisches Material, illegale Inhalte, Phishing-Seiten oder Anleitungen fuer schädliche Handlungen zu verbreiten.',
              'Die Website darf nicht so genutzt werden, dass Discord-Bedingungen, Discord Developer Terms, Urheberrechte, Privatsphaere Dritter oder Regeln eines Discord-Servers verletzt werden.'
            ]
          },
          {
            heading: '8. Drittanbieter',
            body: [
              'Die Website kann auf Discord, GitHub, Google Apps Script, die oeffentliche Core API, Bilder, Invite-Links und andere externe Ressourcen verweisen. Diese Ressourcen unterliegen eigenen Regeln.',
              'Core ist nicht verantwortlich fuer Verfuegbarkeit, Sicherheit, Aenderungen, Protokolle, Datenverarbeitung oder Moderationsentscheidungen externer Dienste.',
              'Der Nutzer sollte Seitenadressen, Webhook-URLs, Invite-Links und Domains pruefen, bevor er Daten sendet oder Links folgt.'
            ]
          },
          {
            heading: '9. Keine Garantien',
            body: [
              'Die Website wird wie besehen und nach Verfuegbarkeit bereitgestellt. Core garantiert keinen fehlerfreien Betrieb, keine staendige Erreichbarkeit, keine Kompatibilitaet, keine Speicherung lokaler Einstellungen und keine exakte Uebereinstimmung mit Discord.',
              'Core garantiert nicht, dass Vorlagen fuer jeden Server passen, dass Discord eine Webhook-Nachricht akzeptiert, dass Vorschauen in jedem Discord-Client gleich aussehen oder externe APIs immer aktuelle Daten liefern.',
              'Der Nutzer verwendet die Website auf eigenes Risiko und muss eigene Pruefungen vor Aktionen durchfuehren, die Server oder veroeffentlichte Inhalte betreffen koennen.'
            ]
          },
          {
            heading: '10. Haftungsbegrenzung',
            body: [
              'Soweit gesetzlich zulaessig, haftet Core nicht fuer Datenverlust, falsche Nachrichten, geloeschte Kanaele oder Rollen, falsche Rechte, Webhook-Veroeffentlichung, Discord-Massnahmen, Nutzerhandlungen oder Ausfaelle externer Dienste.',
              'Core haftet nicht fuer Schaeden, die entstehen, weil ein Nutzer fremde Webhook-URLs einfuegt, geheime Links offenlegt, Vorlagen ohne Pruefung anwendet, Discord-Regeln verletzt oder die Website missbraucht.',
              'Nichts in diesen Bedingungen begrenzt Haftung, wenn eine solche Begrenzung gesetzlich unzulaessig ist.'
            ]
          },
          {
            heading: '11. Aenderungen',
            body: [
              'Core kann diese Bedingungen aktualisieren, wenn sich Website, Funktionen, oeffentlicher Katalog, externe Anbieter, Sicherheitsanforderungen oder Discord-Regeln aendern.',
              'Das Aktualisierungsdatum zeigt die aktuelle Fassung. Weitere Nutzung nach einer Aenderung bedeutet Zustimmung zur neuen Fassung.',
              'Wenn der Nutzer der neuen Fassung nicht zustimmt, muss er die Nutzung der Website beenden.'
            ]
          },
          {
            heading: '12. Kontakt und Streitfragen',
            body: [
              'Fragen zur Website, Entfernung strittiger oeffentlicher Materialien, Vorlagenfehlern oder Sicherheit sollten ueber den offiziellen Core-Server gestellt werden.',
              'Hilfreich sind Seitenlink, Vorlagenname, Problembeschreibung und ein Screenshot, falls er die Reproduktion erleichtert.',
              'Diese Bedingungen sind keine individuelle Rechtsberatung. Serverbetreiber sollten fuer rechtliche Anforderungen ihres konkreten Projekts qualifizierte Beratung einholen.'
            ]
          }
        ]
      }
    },
    botPrivacy: {
      ru: {
        title: 'Политика конфиденциальности бота Core',
        description: 'Подробно о том, какие Discord-данные обрабатывает бот Core для команд, шаблонов, уровней, модерации, отката, обратной связи и служебных функций.',
        sections: [
          {
            heading: '1. Область действия',
            body: [
              'Эта политика относится к Discord-боту Core, его публичным командам, контекстным действиям, системам шаблонов, уровням, автомодерации, откату, уведомлениям, предложениям, фидбеку и служебным каналам Core.',
              'Core является сторонним Discord-ботом. Он не является официальным продуктом Discord Inc. и работает поверх Discord API в рамках выданных сервером прав.',
              'Обработка данных зависит от того, на каких серверах добавлен бот, какие права ему выданы, какие команды запускают пользователи и какие функции включены владельцем или администрацией сервера.',
              'Локальные сохранения webhook-редактора сайта Core не передаются боту автоматически. Бот получает такие данные только если пользователь сам отправит их через Discord, команду, вложение, webhook или другой явный канал передачи.'
            ]
          },
          {
            heading: '2. Основные категории данных',
            body: [
              'Бот может обрабатывать Discord ID пользователя, сервера, канала, роли, сообщения, webhook, участника, команды, взаимодействия, кнопки, меню, вложения и другие идентификаторы, которые Discord передает через API.',
              'Бот может обрабатывать публичные сведения Discord-профиля, доступные через API: имя пользователя, глобальное имя, аватар, язык взаимодействия, сведения об участнике на сервере, роли и базовые timestamps событий.',
              'Бот может обрабатывать структуру сервера: название сервера, иконку, каналы, категории, роли, порядок, цвета ролей, права, темы каналов, slowmode, NSFW-флаги, разрешения каналов и похожие настройки.',
              'Бот не получает пароль Discord пользователя, платежные данные Discord, список личных сообщений пользователя вне событий бота или доступ к аккаунту Discord за пределами разрешений API.'
            ]
          },
          {
            heading: '3. Команды и взаимодействия',
            body: [
              'Когда пользователь запускает команду, нажимает кнопку, выбирает меню или использует контекстное действие, Discord передает боту данные взаимодействия. Core использует их для проверки прав, выполнения команды и ответа пользователю.',
              'Для локализации команд бот может использовать язык, переданный Discord в interaction locale. Если язык недоступен или не поддерживается, используется язык по умолчанию.',
              'Некоторые команды доступны только владельцу сервера, разработчику бота или пользователям с нужными правами. Для такой проверки бот обрабатывает ID пользователя, ID владельца сервера, роли и разрешения.'
            ]
          },
          {
            heading: '4. Шаблоны серверов, ролей и правил',
            body: [
              'Для экспорта, импорта, предпросмотра и публикации шаблонов бот может читать структуру сервера, роли, каналы, права, настройки каналов, тексты правил, сообщения, выбранные пользователем файлы JSON и связанные метаданные.',
              'Экспорт приватных шаблонов и перенос через JSON выполняются в закодированном или зашифрованном формате там, где эта защита включена в боте. Публичные шаблоны, опубликованные в каталоге, предназначены для просмотра и применения другими пользователями.',
              'При предложении шаблона бот может отправить зашифрованный JSON, краткие счетчики и превью в служебный канал Core для проверки разработчиком.',
              'При публикации публичного шаблона бот может сохранять название, описание, автора, тип, дату создания и обновления, рейтинг, ссылку на пост, команду применения и превью структуры.'
            ]
          },
          {
            heading: '5. Откат и резервные снимки',
            body: [
              'Перед действиями, которые существенно меняют сервер, Core может создать временный снимок текущей структуры сервера для отката. Такой снимок может включать роли, каналы, категории, права, порядок, темы, настройки и другие параметры, необходимые для восстановления.',
              'Снимок отката хранится ограниченное время, обычно в пределах настроенного окна отката. После истечения срока запись должна удаляться, а откат становится недоступен.',
              'Снимки отката сохраняются в базе данных в зашифрованном виде, если функция шифрования включена для этого типа данных. Это снижает риск чтения содержимого напрямую из базы, но не отменяет необходимость защищать ключи шифрования и доступ к серверу.'
            ]
          },
          {
            heading: '6. Уровни, активность и автомодерация',
            body: [
              'Если включена система уровней, бот может хранить ID пользователя, ID сервера, опыт, уровень, timestamps активности и служебные ограничения, необходимые для защиты от накрутки.',
              'Если включена автомодерация, бот может анализировать сообщения, вложения, ссылки, упоминания, повторяющийся текст, запрещенные слова и похожие признаки нарушения правил сервера.',
              'Если включено отслеживание голосовой активности, бот может обрабатывать ID голосового канала, время входа и выхода, продолжительность активности и связанные служебные записи. Содержимое голосового разговора бот не записывает, если такая функция явно не реализована отдельно.',
              'Решения автомодерации могут приводить к удалению сообщений, предупреждениям, логам, временным ограничениям или другим действиям в рамках выданных прав Discord.'
            ]
          },
          {
            heading: '7. Приветствия, личные сообщения и уведомления',
            body: [
              'При входе участника на сервер бот может отправить приветственное сообщение в личные сообщения, если Discord позволяет доставку и пользователь не запретил личные сообщения от участников сервера.',
              'Из-за ограничений Discord бот не всегда может узнать реальный язык аккаунта при событии входа участника. В таких случаях используется язык по умолчанию или язык, доступный из контекста команды.',
              'Бот может отправлять служебные уведомления владельцу проекта или в служебные каналы Core, например о добавлении бота на сервер, количестве серверов, владельце сервера и названии сервера.'
            ]
          },
          {
            heading: '8. Фидбек, предложения и сообщения пользователей',
            body: [
              'Команды фидбека и предложений передают текст пользователя, вложения, ID пользователя, ID сервера и служебные сведения в канал, предназначенный для просмотра разработчиком Core.',
              'Если пользователь отправляет предложение шаблона, он понимает, что содержимое будет просмотрено владельцем проекта и может быть принято, отклонено, отредактировано или опубликовано в переработанном виде.',
              'Не следует отправлять через фидбек пароли, токены, приватные ключи, чужие персональные данные, закрытые материалы сервера или сведения, которые нельзя показывать владельцу Core.'
            ]
          },
          {
            heading: '9. AI-функции',
            body: [
              'Если пользователь запускает AI-создание структуры сервера или похожую AI-функцию, бот может отправить текстовый запрос, тему, требования к серверу и технический контекст внешнему AI-поставщику, например Cohere.',
              'AI-поставщику не должны передаваться Discord-пароли, токены бота, приватные ключи или данные, не нужные для генерации структуры. Пользователь не должен вводить секреты в AI-запросы.',
              'AI-результат является черновиком. Перед применением пользователь должен проверить каналы, роли, права, тексты, символы, упоминания и соответствие правилам своего сервера.'
            ]
          },
          {
            heading: '10. База данных и хранение',
            body: [
              'Core может хранить часть данных в MongoDB: настройки серверов, уровни, публичные шаблоны, рейтинги, служебные записи, временные снимки отката, состояния публикаций, предложения и связанные технические данные.',
              'Срок хранения зависит от функции. Временные снимки отката удаляются по истечении окна отката, публичные шаблоны хранятся до удаления или обновления, настройки сервера хранятся пока нужны для работы функций или до удаления по обоснованному запросу.',
              'Зашифрованные данные остаются зашифрованными при передаче в MongoDB, если конкретная функция реализована через шифрование. Метаданные, нужные для поиска и работы команд, могут храниться отдельно в незашифрованном или частично структурированном виде.',
              'Удаление бота с сервера прекращает дальнейшую обработку новых событий этого сервера, но не всегда автоматически удаляет уже сохраненные служебные записи, публичные шаблоны, рейтинги или логи, если они нужны для безопасности, истории публикаций или обработки запроса.'
            ]
          },
          {
            heading: '11. Передача данных третьим сторонам',
            body: [
              'Core передает данные Discord через Discord API, потому что команды, сообщения, роли, каналы и серверные действия выполняются внутри Discord.',
              'Core может использовать MongoDB как базу данных, хостинг-провайдера для запуска бота, Google Apps Script proxy для публичного каталога сайта и AI-поставщика для AI-функций.',
              'Core не продает пользовательские данные рекламным сетям. Данные могут передаваться третьим сторонам только для работы функций, хранения, безопасности, выполнения закона, диагностики или по явному действию пользователя.',
              'Пользователь и владелец сервера должны учитывать, что Discord, MongoDB, хостинг, Google и AI-поставщик имеют собственные условия и политики обработки данных.'
            ]
          },
          {
            heading: '12. Права и управление данными',
            body: [
              'Владелец сервера может удалить бота с сервера, чтобы прекратить дальнейшую обработку событий этого сервера.',
              'Владелец сервера или автор материала может обратиться через официальный сервер Core для удаления или исправления публичного шаблона, спорной записи, фидбека или предложения, если это технически возможно и не противоречит требованиям безопасности.',
              'Участник сервера может обратиться к администрации своего сервера по поводу уровней, модерации, ролей или действий, выполненных ботом на этом сервере.',
              'Некоторые данные невозможно удалить из Discord самим Core, если они уже опубликованы как сообщение, сохранены в журналах Discord, процитированы другими пользователями или находятся у внешнего поставщика.'
            ]
          },
          {
            heading: '13. Безопасность',
            body: [
              'Доступ к токену бота, строке подключения MongoDB, ключам шифрования, webhook URL и AI-ключам должен быть ограничен владельцем инфраструктуры Core.',
              'Администраторы серверов должны выдавать боту только те права, которые нужны для выбранных функций, и понимать, что права управления ролями и каналами позволяют изменять структуру сервера.',
              'Пользователь не должен загружать JSON, полученный из неизвестного источника, если не понимает, какие каналы, роли, права и сообщения он создаст.',
              'Шифрование снижает риск чтения содержимого в базе данных, но не защищает от компрометации ключа, токена бота, хостинга, аккаунта Discord с правами администратора или действий пользователя, подтвердившего опасную операцию.'
            ]
          },
          {
            heading: '14. Изменения политики',
            body: [
              'Core может обновлять эту политику при изменении команд, базы данных, внешних поставщиков, AI-функций, системы шаблонов, автомодерации или требований Discord.',
              'Дата обновления показывает последнюю редакцию документа. Продолжение использования бота после обновления означает ознакомление с актуальной редакцией.',
              'Если изменение существенно влияет на обработку данных, оно должно быть отражено в этой политике до или одновременно с публикацией соответствующей функции.'
            ]
          }
        ]
      },
      en: {
        title: 'Core Bot Privacy Policy',
        description: 'A detailed explanation of what Discord data the Core bot handles for commands, templates, levels, moderation, rollback, feedback and service features.',
        sections: [
          {
            heading: '1. Scope',
            body: [
              'This policy applies to the Core Discord bot, its public commands, context actions, template systems, levels, automoderation, rollback, notifications, suggestions, feedback and Core service channels.',
              'Core is a third-party Discord bot. It is not an official Discord Inc. product and operates through the Discord API under permissions granted on a server.',
              'Data handling depends on the servers where the bot is installed, the permissions granted, commands used by users and features enabled by the owner or server administration.',
              'Local saves from the Core website webhook editor are not sent to the bot automatically. The bot receives that data only if a user deliberately sends it through Discord, a command, an attachment, a webhook or another explicit transfer channel.'
            ]
          },
          {
            heading: '2. Main data categories',
            body: [
              'The bot may process Discord IDs of users, servers, channels, roles, messages, webhooks, members, commands, interactions, buttons, menus, attachments and other identifiers provided by the Discord API.',
              'The bot may process public Discord profile information available through the API: username, global name, avatar, interaction locale, member information, roles and basic event timestamps.',
              'The bot may process server structure: server name, icon, channels, categories, roles, order, role colors, permissions, channel topics, slowmode, NSFW flags, channel overwrites and similar settings.',
              'The bot does not receive a user Discord password, Discord payment data, user direct messages outside bot events or access to a Discord account beyond API permissions.'
            ]
          },
          {
            heading: '3. Commands and interactions',
            body: [
              'When a user runs a command, presses a button, selects a menu or uses a context action, Discord sends interaction data to the bot. Core uses it to check permissions, execute the command and respond.',
              'For localization, the bot may use the interaction locale supplied by Discord. If the language is unavailable or unsupported, a default language is used.',
              'Some commands are limited to the server owner, bot developer or users with required permissions. The bot processes user ID, server owner ID, roles and permissions for those checks.'
            ]
          },
          {
            heading: '4. Server, role and rule templates',
            body: [
              'For export, import, preview and publication of templates, the bot may read server structure, roles, channels, permissions, channel settings, rule text, messages, JSON files selected by the user and related metadata.',
              'Private template export and JSON transfer use encoded or encrypted formats where that protection is enabled in the bot. Public templates published in the catalog are intended for viewing and use by other users.',
              'When a template is suggested, the bot may send encrypted JSON, short counters and a preview to a Core service channel for developer review.',
              'When a public template is published, the bot may store name, description, author, type, creation and update dates, rating, post link, apply command and structure preview.'
            ]
          },
          {
            heading: '5. Rollback and snapshots',
            body: [
              'Before actions that significantly change a server, Core may create a temporary snapshot of the current server structure for rollback. A snapshot may include roles, channels, categories, permissions, order, topics, settings and other recovery parameters.',
              'Rollback snapshots are stored for a limited time, usually within the configured rollback window. After expiration the record should be deleted and rollback becomes unavailable.',
              'Rollback snapshots are stored in encrypted form when encryption is enabled for that data type. This reduces direct database readability but does not remove the need to protect encryption keys and server access.'
            ]
          },
          {
            heading: '6. Levels, activity and automoderation',
            body: [
              'If the level system is enabled, the bot may store user ID, server ID, experience, level, activity timestamps and service limits needed to prevent abuse.',
              'If automoderation is enabled, the bot may analyze messages, attachments, links, mentions, repeated text, blocked words and similar rule violation signals.',
              'If voice activity tracking is enabled, the bot may process voice channel ID, join and leave time, activity duration and related service records. The bot does not record voice conversation content unless such a function is explicitly implemented separately.',
              'Automoderation decisions may lead to message deletion, warnings, logs, temporary restrictions or other actions within granted Discord permissions.'
            ]
          },
          {
            heading: '7. Welcome messages and notifications',
            body: [
              'When a member joins a server, the bot may send a welcome direct message if Discord allows delivery and the user has not blocked direct messages from server members.',
              'Because of Discord limitations, the bot may not always know the real account language during a member join event. In those cases, the default language or a language available from command context is used.',
              'The bot may send service notifications to the project owner or Core service channels, such as bot added to server, server count, server owner and server name.'
            ]
          },
          {
            heading: '8. Feedback, suggestions and user messages',
            body: [
              'Feedback and suggestion commands forward user text, attachments, user ID, server ID and service details to a channel intended for review by the Core developer.',
              'If a user submits a template suggestion, the user understands that the content will be reviewed by the project owner and may be accepted, rejected, edited or published in modified form.',
              'Users should not send passwords, tokens, private keys, other people personal data, private server materials or information that cannot be shown to the Core owner through feedback.'
            ]
          },
          {
            heading: '9. AI features',
            body: [
              'If the user runs AI server generation or a similar AI feature, the bot may send the prompt, topic, server requirements and technical context to an external AI provider such as Cohere.',
              'Discord passwords, bot tokens, private keys or data not needed for generation should not be sent to the AI provider. Users must not enter secrets into AI prompts.',
              'AI output is a draft. Before applying it, the user must review channels, roles, permissions, text, symbols, mentions and compliance with server rules.'
            ]
          },
          {
            heading: '10. Database and retention',
            body: [
              'Core may store some data in MongoDB: server settings, levels, public templates, ratings, service records, temporary rollback snapshots, publication states, suggestions and related technical data.',
              'Retention depends on the feature. Temporary rollback snapshots are deleted after the rollback window, public templates remain until removal or update, and server settings remain while needed for features or until deletion is handled after a valid request.',
              'Encrypted data remains encrypted when transmitted to MongoDB if the specific feature is implemented with encryption. Metadata needed for lookup and command operation may be stored separately in unencrypted or structured form.',
              'Removing the bot from a server stops future event processing for that server, but may not automatically delete already stored service records, public templates, ratings or logs if they are needed for security, publication history or request handling.'
            ]
          },
          {
            heading: '11. Third-party sharing',
            body: [
              'Core transmits data through the Discord API because commands, messages, roles, channels and server actions happen inside Discord.',
              'Core may use MongoDB as the project database, a hosting provider to run the bot, Google Apps Script proxy for the public website catalog and an AI provider for AI features.',
              'Core does not sell user data to advertising networks. Data may be shared only for feature operation, storage, security, legal compliance, diagnostics or by explicit user action.',
              'Users and server owners should account for the separate terms and privacy policies of Discord, MongoDB, hosting, Google and AI providers.'
            ]
          },
          {
            heading: '12. Rights and control',
            body: [
              'A server owner may remove the bot from a server to stop further event processing for that server.',
              'A server owner or material author may contact Core through the official server to remove or correct a public template, disputed record, feedback item or suggestion where technically possible and not inconsistent with safety needs.',
              'A server member may contact their server administration about levels, moderation, roles or actions performed by the bot on that server.',
              'Some data cannot be deleted by Core from Discord if it has already been published as a message, stored in Discord logs, quoted by other users or retained by an external provider.'
            ]
          },
          {
            heading: '13. Security',
            body: [
              'Access to the bot token, MongoDB connection string, encryption keys, webhook URLs and AI keys must be limited by the Core infrastructure owner.',
              'Server administrators should grant only permissions required for selected features and understand that role and channel management permissions allow server structure changes.',
              'Users should not upload JSON from unknown sources unless they understand what channels, roles, permissions and messages it will create.',
              'Encryption reduces the risk of reading database contents, but it does not protect against compromise of the key, bot token, hosting, Discord administrator account or actions confirmed by the user.'
            ]
          },
          {
            heading: '14. Changes',
            body: [
              'Core may update this policy when commands, database, external providers, AI features, template system, automoderation or Discord requirements change.',
              'The update date shows the latest document version. Continued bot use after an update means the user has reviewed the current version.',
              'If a change materially affects data processing, it should be reflected in this policy before or at the same time as the related feature is published.'
            ]
          }
        ]
      },
      ua: {
        title: 'Політика конфіденційності бота Core',
        description: 'Докладно про те, які Discord-дані обробляє бот Core для команд, шаблонів, рівнів, модерації, відкату, фідбеку та службових функцій.',
        sections: [
          {
            heading: '1. Сфера дії',
            body: [
              'Ця політика стосується Discord-бота Core, його публічних команд, контекстних дій, систем шаблонів, рівнів, автомодерації, відкату, сповіщень, пропозицій, фідбеку та службових каналів Core.',
              'Core є стороннім Discord-ботом. Він не є офіційним продуктом Discord Inc. і працює через Discord API у межах прав, виданих на сервері.',
              'Обробка даних залежить від серверів, де додано бота, виданих прав, команд, які запускають користувачі, і функцій, увімкнених власником або адміністрацією сервера.',
              'Локальні збереження webhook-редактора сайту Core не передаються боту автоматично. Бот отримує такі дані тільки якщо користувач сам надішле їх через Discord, команду, вкладення, webhook або інший явний канал передавання.'
            ]
          },
          {
            heading: '2. Основні категорії даних',
            body: [
              'Бот може обробляти Discord ID користувача, сервера, каналу, ролі, повідомлення, webhook, учасника, команди, взаємодії, кнопки, меню, вкладення та інші ідентифікатори, які Discord передає через API.',
              'Бот може обробляти публічні дані Discord-профілю, доступні через API: імʼя користувача, глобальне імʼя, аватар, мову взаємодії, відомості про учасника на сервері, ролі та базові timestamps подій.',
              'Бот може обробляти структуру сервера: назву сервера, іконку, канали, категорії, ролі, порядок, кольори ролей, права, теми каналів, slowmode, NSFW-позначки, дозволи каналів і схожі налаштування.',
              'Бот не отримує пароль Discord користувача, платіжні дані Discord, список особистих повідомлень користувача поза подіями бота або доступ до Discord-акаунта за межами дозволів API.'
            ]
          },
          {
            heading: '3. Команди і взаємодії',
            body: [
              'Коли користувач запускає команду, натискає кнопку, вибирає меню або використовує контекстну дію, Discord передає боту дані взаємодії. Core використовує їх для перевірки прав, виконання команди і відповіді.',
              'Для локалізації команд бот може використовувати мову interaction locale, передану Discord. Якщо мова недоступна або не підтримується, використовується мова за замовчуванням.',
              'Деякі команди доступні тільки власнику сервера, розробнику бота або користувачам з потрібними правами. Для такої перевірки бот обробляє ID користувача, ID власника сервера, ролі та дозволи.'
            ]
          },
          {
            heading: '4. Шаблони серверів, ролей і правил',
            body: [
              'Для експорту, імпорту, предпросмотру і публікації шаблонів бот може читати структуру сервера, ролі, канали, права, налаштування каналів, тексти правил, повідомлення, вибрані користувачем JSON-файли та повʼязані метадані.',
              'Експорт приватних шаблонів і перенесення через JSON виконуються в закодованому або зашифрованому форматі там, де цей захист увімкнений у боті. Публічні шаблони в каталозі призначені для перегляду і застосування іншими користувачами.',
              'Під час пропозиції шаблону бот може надіслати зашифрований JSON, короткі лічильники і превью у службовий канал Core для перевірки розробником.',
              'Під час публікації публічного шаблону бот може зберігати назву, опис, автора, тип, дату створення й оновлення, рейтинг, посилання на пост, команду застосування і превью структури.'
            ]
          },
          {
            heading: '5. Відкат і резервні знімки',
            body: [
              'Перед діями, які суттєво змінюють сервер, Core може створити тимчасовий знімок поточної структури сервера для відкату. Такий знімок може містити ролі, канали, категорії, права, порядок, теми, налаштування та інші параметри для відновлення.',
              'Знімок відкату зберігається обмежений час, зазвичай у межах налаштованого вікна відкату. Після закінчення строку запис має видалятися, а відкат стає недоступним.',
              'Знімки відкату зберігаються у базі даних у зашифрованому вигляді, якщо шифрування увімкнене для цього типу даних. Це знижує ризик прямого читання з бази, але не скасовує потребу захищати ключі шифрування і доступ до сервера.'
            ]
          },
          {
            heading: '6. Рівні, активність і автомодерація',
            body: [
              'Якщо увімкнена система рівнів, бот може зберігати ID користувача, ID сервера, досвід, рівень, timestamps активності та службові обмеження, потрібні для захисту від накрутки.',
              'Якщо увімкнена автомодерація, бот може аналізувати повідомлення, вкладення, посилання, згадки, повторюваний текст, заборонені слова і схожі ознаки порушення правил сервера.',
              'Якщо увімкнене відстеження голосової активності, бот може обробляти ID голосового каналу, час входу і виходу, тривалість активності та повʼязані службові записи. Вміст голосової розмови бот не записує, якщо така функція явно не реалізована окремо.',
              'Рішення автомодерації можуть призводити до видалення повідомлень, попереджень, логів, тимчасових обмежень або інших дій у межах виданих прав Discord.'
            ]
          },
          {
            heading: '7. Привітання, особисті повідомлення і сповіщення',
            body: [
              'Коли учасник заходить на сервер, бот може надіслати привітальне повідомлення в особисті повідомлення, якщо Discord дозволяє доставку і користувач не заборонив особисті повідомлення від учасників сервера.',
              'Через обмеження Discord бот не завжди може дізнатися реальну мову акаунта при події входу учасника. У таких випадках використовується мова за замовчуванням або мова, доступна з контексту команди.',
              'Бот може надсилати службові сповіщення власнику проєкту або в службові канали Core, наприклад про додавання бота на сервер, кількість серверів, власника сервера і назву сервера.'
            ]
          },
          {
            heading: '8. Фідбек, пропозиції та повідомлення користувачів',
            body: [
              'Команди фідбеку і пропозицій передають текст користувача, вкладення, ID користувача, ID сервера і службові дані в канал, призначений для перегляду розробником Core.',
              'Якщо користувач надсилає пропозицію шаблону, він розуміє, що вміст буде переглянутий власником проєкту і може бути прийнятий, відхилений, відредагований або опублікований у переробленому вигляді.',
              'Не слід надсилати через фідбек паролі, токени, приватні ключі, чужі персональні дані, закриті матеріали сервера або відомості, які не можна показувати власнику Core.'
            ]
          },
          {
            heading: '9. AI-функції',
            body: [
              'Якщо користувач запускає AI-створення структури сервера або схожу AI-функцію, бот може надіслати текстовий запит, тему, вимоги до сервера і технічний контекст зовнішньому AI-постачальнику, наприклад Cohere.',
              'AI-постачальнику не повинні передаватися Discord-паролі, токени бота, приватні ключі або дані, не потрібні для генерації структури. Користувач не повинен вводити секрети в AI-запити.',
              'AI-результат є чернеткою. Перед застосуванням користувач повинен перевірити канали, ролі, права, тексти, символи, згадки і відповідність правилам свого сервера.'
            ]
          },
          {
            heading: '10. База даних і зберігання',
            body: [
              'Core може зберігати частину даних у MongoDB: налаштування серверів, рівні, публічні шаблони, рейтинги, службові записи, тимчасові знімки відкату, стани публікацій, пропозиції та повʼязані технічні дані.',
              'Строк зберігання залежить від функції. Тимчасові знімки відкату видаляються після вікна відкату, публічні шаблони зберігаються до видалення або оновлення, налаштування сервера зберігаються доки потрібні для роботи функцій або до видалення за обґрунтованим запитом.',
              'Зашифровані дані залишаються зашифрованими під час передавання в MongoDB, якщо конкретна функція реалізована через шифрування. Метадані, потрібні для пошуку і роботи команд, можуть зберігатися окремо в незашифрованому або частково структурованому вигляді.',
              'Видалення бота з сервера припиняє подальшу обробку нових подій цього сервера, але не завжди автоматично видаляє вже збережені службові записи, публічні шаблони, рейтинги або логи, якщо вони потрібні для безпеки, історії публікацій або обробки запиту.'
            ]
          },
          {
            heading: '11. Передача даних третім сторонам',
            body: [
              'Core передає дані Discord через Discord API, тому що команди, повідомлення, ролі, канали і серверні дії виконуються всередині Discord.',
              'Core може використовувати MongoDB як базу даних, хостинг-провайдера для запуску бота, Google Apps Script proxy для публічного каталогу сайту і AI-постачальника для AI-функцій.',
              'Core не продає дані користувачів рекламним мережам. Дані можуть передаватися третім сторонам тільки для роботи функцій, зберігання, безпеки, виконання закону, діагностики або за явною дією користувача.',
              'Користувач і власник сервера повинні враховувати, що Discord, MongoDB, хостинг, Google і AI-постачальник мають власні умови та політики обробки даних.'
            ]
          },
          {
            heading: '12. Права і керування даними',
            body: [
              'Власник сервера може видалити бота з сервера, щоб припинити подальшу обробку подій цього сервера.',
              'Власник сервера або автор матеріалу може звернутися через офіційний сервер Core для видалення або виправлення публічного шаблону, спірного запису, фідбеку або пропозиції, якщо це технічно можливо і не суперечить вимогам безпеки.',
              'Учасник сервера може звернутися до адміністрації свого сервера щодо рівнів, модерації, ролей або дій, виконаних ботом на цьому сервері.',
              'Деякі дані неможливо видалити з Discord самим Core, якщо вони вже опубліковані як повідомлення, збережені в журналах Discord, процитовані іншими користувачами або знаходяться у зовнішнього постачальника.'
            ]
          },
          {
            heading: '13. Безпека',
            body: [
              'Доступ до токена бота, рядка підключення MongoDB, ключів шифрування, webhook URL і AI-ключів має бути обмежений власником інфраструктури Core.',
              'Адміністратори серверів повинні видавати боту тільки ті права, які потрібні для вибраних функцій, і розуміти, що права керування ролями та каналами дозволяють змінювати структуру сервера.',
              'Користувач не повинен завантажувати JSON, отриманий з невідомого джерела, якщо не розуміє, які канали, ролі, права і повідомлення він створить.',
              'Шифрування знижує ризик читання вмісту в базі даних, але не захищає від компрометації ключа, токена бота, хостингу, Discord-акаунта з правами адміністратора або дій користувача, який підтвердив небезпечну операцію.'
            ]
          },
          {
            heading: '14. Зміни політики',
            body: [
              'Core може оновлювати цю політику при зміні команд, бази даних, зовнішніх постачальників, AI-функцій, системи шаблонів, автомодерації або вимог Discord.',
              'Дата оновлення показує останню редакцію документа. Подальше використання бота після оновлення означає ознайомлення з актуальною редакцією.',
              'Якщо зміна суттєво впливає на обробку даних, вона має бути відображена в цій політиці до або одночасно з публікацією відповідної функції.'
            ]
          }
        ]
      },
      de: {
        title: 'Core Bot-Datenschutzrichtlinie',
        description: 'Ausfuehrlich dazu, welche Discord-Daten der Core-Bot fuer Befehle, Vorlagen, Level, Moderation, Rollback, Feedback und Dienstfunktionen verarbeitet.',
        sections: [
          {
            heading: '1. Geltungsbereich',
            body: [
              'Diese Richtlinie gilt fuer den Core Discord-Bot, seine oeffentlichen Befehle, Kontextaktionen, Vorlagensysteme, Level, Automoderation, Rollback, Benachrichtigungen, Vorschlaege, Feedback und Core-Servicekanaele.',
              'Core ist ein Drittanbieter-Discord-Bot. Er ist kein offizielles Produkt von Discord Inc. und arbeitet ueber die Discord API im Rahmen der auf einem Server erteilten Berechtigungen.',
              'Die Datenverarbeitung haengt davon ab, auf welchen Servern der Bot installiert ist, welche Rechte er hat, welche Befehle Nutzer ausfuehren und welche Funktionen vom Besitzer oder der Administration aktiviert wurden.',
              'Lokale Speicherungen aus dem Core-Website-Webhook-Editor werden nicht automatisch an den Bot gesendet. Der Bot erhaelt solche Daten nur, wenn ein Nutzer sie bewusst ueber Discord, einen Befehl, einen Anhang, einen Webhook oder einen anderen ausdruecklichen Uebertragungskanal sendet.'
            ]
          },
          {
            heading: '2. Hauptdatenkategorien',
            body: [
              'Der Bot kann Discord-IDs von Nutzern, Servern, Kanaelen, Rollen, Nachrichten, Webhooks, Mitgliedern, Befehlen, Interaktionen, Buttons, Menues, Anhaengen und anderen von Discord API gelieferten Kennungen verarbeiten.',
              'Der Bot kann oeffentliche Discord-Profildaten verarbeiten: Benutzername, globaler Name, Avatar, Interaktionssprache, Mitgliedsinformationen, Rollen und grundlegende Zeitstempel von Ereignissen.',
              'Der Bot kann Serverstruktur verarbeiten: Servername, Icon, Kanaele, Kategorien, Rollen, Reihenfolge, Rollenfarben, Rechte, Kanalthemen, Slowmode, NSFW-Flags, Kanalberechtigungen und aehnliche Einstellungen.',
              'Der Bot erhaelt kein Discord-Passwort, keine Discord-Zahlungsdaten, keine Direktnachrichten ausserhalb von Bot-Ereignissen und keinen Zugriff auf ein Discord-Konto ausserhalb der API-Berechtigungen.'
            ]
          },
          {
            heading: '3. Befehle und Interaktionen',
            body: [
              'Wenn ein Nutzer einen Befehl ausfuehrt, einen Button drueckt, ein Menue waehlt oder eine Kontextaktion nutzt, sendet Discord Interaktionsdaten an den Bot. Core nutzt sie fuer Rechtepruefung, Ausfuehrung und Antwort.',
              'Fuer Lokalisierung kann der Bot die von Discord gelieferte Interaktionssprache verwenden. Ist die Sprache nicht verfuegbar oder nicht unterstuetzt, wird eine Standardsprache verwendet.',
              'Einige Befehle sind nur fuer Serverbesitzer, Bot-Entwickler oder Nutzer mit noetigen Rechten verfuegbar. Dafuer verarbeitet der Bot Nutzer-ID, Serverbesitzer-ID, Rollen und Berechtigungen.'
            ]
          },
          {
            heading: '4. Server-, Rollen- und Regelvorlagen',
            body: [
              'Fuer Export, Import, Vorschau und Veroeffentlichung von Vorlagen kann der Bot Serverstruktur, Rollen, Kanaele, Rechte, Kanaleinstellungen, Regeltexte, Nachrichten, vom Nutzer ausgewaehlte JSON-Dateien und Metadaten lesen.',
              'Private Vorlagenexporte und JSON-Transfers nutzen kodierte oder verschluesselte Formate, wo dieser Schutz im Bot aktiviert ist. Oeffentliche Vorlagen im Katalog sind fuer andere Nutzer sichtbar und verwendbar.',
              'Bei einem Vorlagenvorschlag kann der Bot verschluesseltes JSON, kurze Zaehler und eine Vorschau an einen Core-Servicekanal zur Entwicklerpruefung senden.',
              'Bei Veroeffentlichung einer oeffentlichen Vorlage kann der Bot Name, Beschreibung, Autor, Typ, Erstellungs- und Aktualisierungsdaten, Bewertung, Post-Link, Anwendungsbefehl und Strukturvorschau speichern.'
            ]
          },
          {
            heading: '5. Rollback und Snapshots',
            body: [
              'Vor Aktionen, die einen Server stark veraendern, kann Core einen temporaeren Snapshot der aktuellen Serverstruktur fuer Rollback erstellen. Er kann Rollen, Kanaele, Kategorien, Rechte, Reihenfolge, Themen, Einstellungen und Wiederherstellungsparameter enthalten.',
              'Rollback-Snapshots werden nur begrenzte Zeit gespeichert, normalerweise innerhalb des konfigurierten Rollback-Fensters. Nach Ablauf soll der Eintrag geloescht werden und Rollback ist nicht mehr verfuegbar.',
              'Rollback-Snapshots werden verschluesselt gespeichert, wenn Verschluesselung fuer diesen Datentyp aktiviert ist. Das reduziert direkte Lesbarkeit in der Datenbank, ersetzt aber nicht den Schutz von Schluesseln und Serverzugriff.'
            ]
          },
          {
            heading: '6. Level, Aktivitaet und Automoderation',
            body: [
              'Wenn das Levelsystem aktiviert ist, kann der Bot Nutzer-ID, Server-ID, Erfahrung, Level, Aktivitaetszeitstempel und technische Grenzen gegen Missbrauch speichern.',
              'Wenn Automoderation aktiviert ist, kann der Bot Nachrichten, Anhaenge, Links, Erwaehnungen, wiederholten Text, gesperrte Woerter und aehnliche Regelverstoss-Signale analysieren.',
              'Wenn Sprachaktivitaetsverfolgung aktiviert ist, kann der Bot Sprachkanal-ID, Beitritts- und Verlassenszeit, Aktivitaetsdauer und dazugehoerige Datensaetze verarbeiten. Inhalte von Sprachgespraechen werden nicht aufgezeichnet, sofern keine separate Funktion ausdruecklich implementiert ist.',
              'Automoderation kann zu Nachrichtenloeschung, Warnungen, Logs, zeitweiligen Einschraenkungen oder anderen Aktionen im Rahmen der Discord-Rechte fuehren.'
            ]
          },
          {
            heading: '7. Begruessungen, Direktnachrichten und Hinweise',
            body: [
              'Wenn ein Mitglied einem Server beitritt, kann der Bot eine Begruessungs-Direktnachricht senden, wenn Discord die Zustellung erlaubt und der Nutzer Direktnachrichten von Servermitgliedern nicht blockiert hat.',
              'Wegen Discord-Einschraenkungen kann der Bot bei einem Beitrittsereignis nicht immer die echte Kontosprache erkennen. Dann wird eine Standardsprache oder eine aus dem Befehlskontext verfuegbare Sprache verwendet.',
              'Der Bot kann Diensthinweise an den Projektbesitzer oder Core-Servicekanaele senden, etwa Bot wurde hinzugefuegt, Serveranzahl, Serverbesitzer und Servername.'
            ]
          },
          {
            heading: '8. Feedback, Vorschlaege und Nutzernachrichten',
            body: [
              'Feedback- und Vorschlagsbefehle leiten Nutzertext, Anhaenge, Nutzer-ID, Server-ID und technische Angaben an einen Kanal zur Pruefung durch den Core-Entwickler weiter.',
              'Sendet ein Nutzer einen Vorlagenvorschlag, versteht er, dass der Inhalt vom Projektbesitzer geprueft und angenommen, abgelehnt, bearbeitet oder in geaenderter Form veroeffentlicht werden kann.',
              'Ueber Feedback sollten keine Passwoerter, Tokens, privaten Schluessel, personenbezogenen Daten Dritter, privaten Servermaterialien oder Informationen gesendet werden, die der Core-Besitzer nicht sehen darf.'
            ]
          },
          {
            heading: '9. AI-Funktionen',
            body: [
              'Wenn ein Nutzer AI-Servererstellung oder eine aehnliche AI-Funktion startet, kann der Bot Prompt, Thema, Serveranforderungen und technischen Kontext an einen externen AI-Anbieter wie Cohere senden.',
              'Discord-Passwoerter, Bot-Tokens, private Schluessel oder nicht benoetigte Daten sollen nicht an den AI-Anbieter gesendet werden. Nutzer duerfen keine Geheimnisse in AI-Prompts eingeben.',
              'AI-Ausgaben sind Entwuerfe. Vor Anwendung muss der Nutzer Kanaele, Rollen, Rechte, Texte, Symbole, Erwaehnungen und die Einhaltung der Serverregeln pruefen.'
            ]
          },
          {
            heading: '10. Datenbank und Aufbewahrung',
            body: [
              'Core kann Daten in MongoDB speichern: Servereinstellungen, Level, oeffentliche Vorlagen, Bewertungen, Dienstaufzeichnungen, temporaere Rollback-Snapshots, Publikationsstatus, Vorschlaege und technische Daten.',
              'Die Aufbewahrung haengt von der Funktion ab. Temporaere Rollback-Snapshots werden nach dem Rollback-Fenster geloescht, oeffentliche Vorlagen bleiben bis Entfernung oder Aktualisierung, Servereinstellungen bleiben solange sie fuer Funktionen noetig sind oder bis Loeschung nach gueltiger Anfrage erfolgt.',
              'Verschluesselte Daten bleiben bei Uebertragung an MongoDB verschluesselt, wenn die konkrete Funktion Verschluesselung nutzt. Metadaten fuer Suche und Befehlsbetrieb koennen separat unverschluesselt oder strukturiert gespeichert werden.',
              'Das Entfernen des Bots stoppt kuenftige Ereignisverarbeitung fuer den Server, loescht aber nicht zwingend bereits gespeicherte Dienstaufzeichnungen, oeffentliche Vorlagen, Bewertungen oder Logs, wenn sie fuer Sicherheit, Publikationshistorie oder Anfragen noetig sind.'
            ]
          },
          {
            heading: '11. Weitergabe an Dritte',
            body: [
              'Core uebertraegt Daten ueber die Discord API, weil Befehle, Nachrichten, Rollen, Kanaele und Serveraktionen in Discord stattfinden.',
              'Core kann MongoDB als Projektdatenbank, einen Hosting-Anbieter fuer den Bot, Google Apps Script Proxy fuer den oeffentlichen Website-Katalog und einen AI-Anbieter fuer AI-Funktionen verwenden.',
              'Core verkauft keine Nutzerdaten an Werbenetzwerke. Daten koennen nur fuer Funktionen, Speicherung, Sicherheit, rechtliche Pflichten, Diagnose oder durch ausdrueckliche Nutzeraktion geteilt werden.',
              'Nutzer und Serverbesitzer sollten die eigenen Bedingungen und Datenschutzrichtlinien von Discord, MongoDB, Hosting, Google und AI-Anbietern beachten.'
            ]
          },
          {
            heading: '12. Rechte und Kontrolle',
            body: [
              'Ein Serverbesitzer kann den Bot vom Server entfernen, um weitere Ereignisverarbeitung fuer diesen Server zu stoppen.',
              'Ein Serverbesitzer oder Materialautor kann Core ueber den offiziellen Server kontaktieren, um eine oeffentliche Vorlage, strittige Aufzeichnung, Feedback oder Vorschlag zu entfernen oder zu korrigieren, soweit technisch moeglich und mit Sicherheitsanforderungen vereinbar.',
              'Ein Servermitglied kann sich wegen Leveln, Moderation, Rollen oder Bot-Aktionen auf diesem Server an die Serveradministration wenden.',
              'Einige Daten kann Core nicht aus Discord loeschen, wenn sie bereits als Nachricht veroeffentlicht, in Discord-Logs gespeichert, von anderen zitiert oder bei einem externen Anbieter aufbewahrt werden.'
            ]
          },
          {
            heading: '13. Sicherheit',
            body: [
              'Zugriff auf Bot-Token, MongoDB-Verbindungszeichenfolge, Verschluesselungsschluessel, Webhook-URLs und AI-Schluessel muss vom Core-Infrastrukturbetreiber beschraenkt werden.',
              'Serveradministratoren sollten dem Bot nur Rechte geben, die fuer gewaehlte Funktionen noetig sind, und verstehen, dass Rollen- und Kanalverwaltung die Serverstruktur aendern kann.',
              'Nutzer sollten kein JSON aus unbekannter Quelle hochladen, wenn sie nicht verstehen, welche Kanaele, Rollen, Rechte und Nachrichten dadurch erstellt werden.',
              'Verschluesselung reduziert das Risiko des Datenbanklesens, schuetzt aber nicht vor kompromittiertem Schluessel, Bot-Token, Hosting, Discord-Administratorkonto oder vom Nutzer bestaetigten gefaehrlichen Aktionen.'
            ]
          },
          {
            heading: '14. Aenderungen',
            body: [
              'Core kann diese Richtlinie aktualisieren, wenn sich Befehle, Datenbank, externe Anbieter, AI-Funktionen, Vorlagensystem, Automoderation oder Discord-Anforderungen aendern.',
              'Das Aktualisierungsdatum zeigt die neueste Fassung. Weitere Bot-Nutzung nach einer Aktualisierung bedeutet Kenntnisnahme der aktuellen Fassung.',
              'Wenn eine Aenderung die Datenverarbeitung wesentlich beeinflusst, soll sie vor oder gleichzeitig mit der Funktion in dieser Richtlinie beschrieben werden.'
            ]
          }
        ]
      }
    },
    botTerms: {
      ru: {
        title: 'Условия использования бота Core',
        description: 'Подробные правила использования Discord-бота Core на серверах, в командах импорта, шаблонах, модерации, AI-функциях и публичных предложениях.',
        sections: [
          {
            heading: '1. Принятие условий',
            body: [
              'Добавляя Core на сервер, используя команды бота или разрешая другим участникам использовать его функции, пользователь и владелец сервера соглашаются с этими условиями и политикой конфиденциальности бота.',
              'Если пользователь не согласен с условиями, он не должен добавлять бота, запускать команды, применять шаблоны, отправлять предложения или использовать функции Core.',
              'Использование Core также требует соблюдения условий Discord, правил Discord Developer Platform, правил конкретного сервера и применимого законодательства.',
              'Если пользователь переносит данные из инструментов сайта Core в бота, Discord или webhook, он отвечает за проверку содержимого файла, прав на публикацию и отсутствие приватных webhook URL или внутренних материалов в передаваемых данных.'
            ]
          },
          {
            heading: '2. Право добавлять и управлять ботом',
            body: [
              'Бота можно добавлять на сервер только при наличии права управлять этим сервером или явного разрешения владельца сервера.',
              'Владелец сервера отвечает за то, какие права выданы боту, какие команды доступны участникам и какие функции включены на сервере.',
              'Если сервером управляет команда администраторов, они должны заранее согласовать использование команд, которые могут менять структуру сервера, удалять роли, создавать каналы или публиковать правила.'
            ]
          },
          {
            heading: '3. Права Discord и технические ограничения',
            body: [
              'Для работы Core могут требоваться права Discord: просмотр каналов, отправка сообщений, управление сообщениями, управление ролями, управление каналами, прикрепление файлов, чтение истории, использование команд и другие права в зависимости от функции.',
              'Если прав недостаточно, команда может завершиться ошибкой, выполнить только часть действий или не иметь возможности восстановить прежнее состояние сервера.',
              'Core не может обойти ограничения Discord API, иерархию ролей, rate limits, ограничения владельца сервера, ограничения клиента Discord или недоступность Discord.'
            ]
          },
          {
            heading: '4. Команды, меняющие сервер',
            body: [
              'Команды импорта, применения публичного шаблона, AI-создания структуры, переноса ролей, переноса правил, удаления старых каналов или ролей и похожие функции должны использоваться только после проверки предпросмотра.',
              'Пользователь должен понимать, что подтверждение операции может создать, удалить или изменить каналы, категории, роли, права, сообщения, настройки и порядок объектов на сервере.',
              'Если команда предлагает вариант удалить предыдущие каналы или роли, выбор Да означает согласие на массовое изменение структуры. Перед подтверждением нужно убедиться, что есть актуальный откат или резервная копия.',
              'Core может отказать в выполнении операции, если у пользователя нет нужных прав, если команда ограничена владельцем сервера, если бот не имеет нужных прав или если входной JSON не проходит проверку.'
            ]
          },
          {
            heading: '5. Откат',
            body: [
              'Функция отката предназначена для ограниченного восстановления сервера после операций Core, но не является гарантированной полной резервной копией Discord-сервера.',
              'Откат доступен только в установленное время. После истечения срока запись удаляется, и восстановление через эту команду становится невозможным.',
              'Даже в пределах срока откат зависит от прав бота, иерархии ролей, ограничений Discord, уже удаленных объектов, конфликтов имен, rate limits и текущего состояния сервера.',
              'Владелец сервера должен проверять результат после отката. Core не гарантирует восстановление каждого параметра, если Discord API не позволяет вернуть его точно.'
            ]
          },
          {
            heading: '6. JSON, импорт и экспорт',
            body: [
              'Приватный импорт и экспорт должны использовать закодированный или зашифрованный формат там, где это предусмотрено ботом. Пользователь не должен вручную изменять защищенный файл, если не понимает формат.',
              'Запрещено загружать JSON из неизвестного источника без проверки. Такой файл может создать нежелательные каналы, роли, права, сообщения, упоминания или ссылки.',
              'Публичные шаблоны отличаются от приватных экспортов: они предназначены для распространения и могут отображаться на сайте, в постах, превью и командах Core.',
              'Core может отклонить импорт, если файл поврежден, не относится к Core, не проходит расшифровку, содержит неизвестную схему, превышает лимиты Discord или несет риск для сервера.'
            ]
          },
          {
            heading: '7. Публичные шаблоны и предложения',
            body: [
              'Пользователь может предлагать шаблоны серверов, ролей и правил только если он имеет право передавать эти материалы и они не содержат чужих приватных данных.',
              'Предложения могут быть проверены разработчиком Core, отредактированы, переведены, переработаны, объединены с другими материалами, отклонены или опубликованы.',
              'Запрещено отправлять шаблоны с вредоносными ссылками, токенами, фишингом, оскорблениями, незаконным контентом, чужими персональными данными, обманным описанием или нарушением прав третьих лиц.',
              'Core может удалить или изменить опубликованный шаблон без отдельного согласия автора, если это нужно для безопасности, качества каталога, соблюдения правил Discord или исправления ошибок.'
            ]
          },
          {
            heading: '8. Рейтинги и публичные оценки',
            body: [
              'Система рейтингов предназначена для оценки полезности публичных шаблонов. Запрещены накрутка, массовые фиктивные оценки, обход ограничений и манипуляция результатами.',
              'Core может пересчитать, скрыть или удалить рейтинг, если есть признаки злоупотребления, технической ошибки или нарушения правил проекта.',
              'Рейтинг не является гарантией безопасности шаблона. Пользователь обязан проверять шаблон перед применением независимо от количества звезд.'
            ]
          },
          {
            heading: '9. AI-функции',
            body: [
              'AI-функции создают черновики. Они могут ошибаться, повторять шаблоны, создавать неподходящие права, странные названия, спорные тексты или структуру, требующую ручной правки.',
              'Пользователь не должен вводить в AI-запросы токены, пароли, приватные ключи, чужие персональные данные, закрытые материалы сервера или сведения, которые нельзя передавать внешнему поставщику.',
              'Перед применением AI-результата пользователь обязан проверить каждую роль, канал, право, текст, упоминание, ссылку и соответствие правилам своего сообщества.',
              'Core может ограничивать AI-команды по ролям, владельцу сервера, разработчику бота, лимитам, доступности поставщика или требованиям безопасности.'
            ]
          },
          {
            heading: '10. Модерация, уровни и уведомления',
            body: [
              'Функции автомодерации, уровней, приветствий, логов и уведомлений должны настраиваться с учетом правил конкретного сервера и ожиданий участников.',
              'Администрация сервера отвечает за информирование участников о правилах, модерации, системе уровней, возможных личных сообщениях и каналах обратной связи, если это требуется правилами сообщества или законом.',
              'Core может удалять сообщения, выдавать предупреждения, отправлять логи или выполнять другие действия только в пределах выданных прав и настроек. Ошибки прав, конфликт ролей или ограничения Discord могут помешать выполнению.'
            ]
          },
          {
            heading: '11. Запрещенное использование бота',
            body: [
              'Запрещено использовать Core для спама, рейдов, фишинга, публикации вредоносных ссылок, массовых нежелательных сообщений, обхода банов, преследования, угроз, доксинга или нарушения правил Discord.',
              'Запрещено использовать Core для сбора данных без законного основания, публикации чужих приватных данных, создания обманных серверов, имитации официальных сервисов или введения пользователей в заблуждение.',
              'Запрещено пытаться получить доступ к токену бота, базе данных, ключам шифрования, служебным каналам, закрытым командам разработчика или чужим приватным шаблонам.',
              'Core может ограничить доступ, отказать в выполнении команды, удалить шаблон или сообщить о нарушении, если использование создает риск для проекта, Discord, серверов или пользователей.'
            ]
          },
          {
            heading: '12. Ответственность владельца сервера',
            body: [
              'Владелец сервера отвечает за итоговую структуру сервера, выданные права, опубликованные правила, настройки модерации, выбор шаблонов и действия администраторов.',
              'Если администратор сервера запускает опасную команду, применяет неподходящий JSON или удаляет каналы через Core, это считается действием в рамках прав, выданных на сервере.',
              'Владелец сервера должен регулярно проверять права бота, иерархию ролей, доступ к каналам логов, настройки команд и то, кто может запускать функции с высоким риском.'
            ]
          },
          {
            heading: '13. Ограничение ответственности',
            body: [
              'Core предоставляется в состоянии как есть и по мере доступности. Возможны ошибки Discord API, rate limits, сбои хостинга, ошибки базы данных, неполный откат, несовместимость клиента Discord и проблемы внешних поставщиков.',
              'В максимальной степени, допустимой законом, Core не отвечает за потерю данных, удаленные каналы или роли, неправильные права, ошибочную модерацию, недоставленные личные сообщения, ошибки AI, действия администраторов или санкции Discord.',
              'Ничто в этих условиях не ограничивает ответственность, если такое ограничение прямо запрещено применимым законом.'
            ]
          },
          {
            heading: '14. Приостановка и прекращение доступа',
            body: [
              'Core может ограничить или прекратить доступ к отдельным функциям, шаблонам или командам, если обнаружены злоупотребления, технический риск, нарушение условий, угроза безопасности или требование внешнего сервиса.',
              'Владелец сервера может прекратить использование Core, удалив бота с сервера и проверив, какие данные или публикации нужно удалить отдельно через официальный сервер Core.',
              'Некоторые последствия действий, выполненных до удаления бота, могут сохраняться в Discord, например созданные каналы, роли, сообщения, права или опубликованные шаблоны.'
            ]
          },
          {
            heading: '15. Изменения условий',
            body: [
              'Core может обновлять эти условия при изменении функций, команд, базы данных, публичного каталога, AI-поставщиков, правил Discord или требований безопасности.',
              'Дата обновления показывает актуальную редакцию. Продолжение использования бота после обновления означает принятие новой редакции.',
              'Если пользователь или владелец сервера не согласен с новой редакцией, он должен прекратить использование Core и удалить бота с сервера.'
            ]
          },
          {
            heading: '16. Контакт',
            body: [
              'По вопросам доступа, удаления публичных материалов, спорных шаблонов, безопасности, фидбека или ошибок нужно обращаться через официальный сервер Core.',
              'Для ускорения проверки полезно указать ID сервера, ID пользователя, название команды, время события, название шаблона и описание проблемы.',
              'Эти условия не являются индивидуальной юридической консультацией. Владелец сервера отвечает за соблюдение правил и законов, применимых к его конкретному сообществу.'
            ]
          }
        ]
      },
      en: {
        title: 'Core Bot Terms of Use',
        description: 'Detailed rules for using the Core Discord bot on servers, in import commands, templates, moderation, AI features and public suggestions.',
        sections: [
          {
            heading: '1. Acceptance',
            body: [
              'By adding Core to a server, using bot commands or allowing other members to use its features, the user and server owner agree to these terms and the bot privacy policy.',
              'If the user does not agree, they must not add the bot, run commands, apply templates, send suggestions or use Core features.',
              'Using Core also requires compliance with Discord terms, Discord Developer Platform rules, the rules of the specific server and applicable law.',
              'If a user moves data from Core website tools into the bot, Discord or a webhook, the user is responsible for checking the file content, publication permissions and the absence of private webhook URLs or internal material in the transferred data.'
            ]
          },
          {
            heading: '2. Permission to add and manage the bot',
            body: [
              'The bot may be added to a server only by someone who has permission to manage that server or express approval from the server owner.',
              'The server owner is responsible for permissions granted to the bot, commands available to members and features enabled on the server.',
              'If a server is managed by an admin team, they should agree in advance on commands that may change server structure, delete roles, create channels or publish rules.'
            ]
          },
          {
            heading: '3. Discord permissions and technical limits',
            body: [
              'Core features may require Discord permissions: view channels, send messages, manage messages, manage roles, manage channels, attach files, read message history, use commands and other permissions depending on the feature.',
              'If permissions are insufficient, a command may fail, complete only part of the actions or be unable to restore the previous server state.',
              'Core cannot bypass Discord API limits, role hierarchy, rate limits, server owner restrictions, Discord client limitations or Discord outages.'
            ]
          },
          {
            heading: '4. Commands that change a server',
            body: [
              'Import, public template application, AI structure generation, role transfer, rule transfer, deletion of old channels or roles and similar features must be used only after preview review.',
              'The user must understand that confirming an operation can create, delete or modify channels, categories, roles, permissions, messages, settings and object order on the server.',
              'If a command offers to delete previous channels or roles, choosing Yes means consent to a mass structure change. Before confirming, the user should make sure rollback or a backup is available.',
              'Core may refuse an operation if the user lacks permissions, the command is server-owner-only, the bot lacks permissions or the input JSON fails validation.'
            ]
          },
          {
            heading: '5. Rollback',
            body: [
              'Rollback is intended for limited recovery after Core operations, but it is not a guaranteed complete backup of a Discord server.',
              'Rollback is available only within the configured time window. After expiration, the record is deleted and recovery through that command becomes impossible.',
              'Even within the window, rollback depends on bot permissions, role hierarchy, Discord limits, already deleted objects, name conflicts, rate limits and current server state.',
              'The server owner must review the result after rollback. Core does not guarantee restoration of every setting if the Discord API cannot restore it exactly.'
            ]
          },
          {
            heading: '6. JSON, import and export',
            body: [
              'Private import and export should use encoded or encrypted format where provided by the bot. The user should not manually modify a protected file unless they understand the format.',
              'Users must not upload JSON from unknown sources without review. Such a file may create unwanted channels, roles, permissions, messages, mentions or links.',
              'Public templates differ from private exports: they are intended for distribution and may appear on the site, in posts, previews and Core commands.',
              'Core may reject import if a file is corrupted, unrelated to Core, cannot be decrypted, uses an unknown schema, exceeds Discord limits or creates risk for the server.'
            ]
          },
          {
            heading: '7. Public templates and suggestions',
            body: [
              'Users may suggest server, role and rule templates only if they have the right to provide the materials and the materials do not include other people private data.',
              'Suggestions may be reviewed by the Core developer, edited, translated, reworked, combined with other materials, rejected or published.',
              'Templates with malicious links, tokens, phishing, abuse, illegal content, other people personal data, misleading descriptions or third-party rights violations are prohibited.',
              'Core may remove or change a published template without separate author approval when needed for security, catalog quality, Discord rule compliance or error correction.'
            ]
          },
          {
            heading: '8. Ratings',
            body: [
              'The rating system is intended to evaluate usefulness of public templates. Vote manipulation, fake mass ratings, limit bypassing and result manipulation are prohibited.',
              'Core may recalculate, hide or remove a rating if there are signs of abuse, technical error or violation of project rules.',
              'A rating is not a safety guarantee. The user must review a template before applying it regardless of star count.'
            ]
          },
          {
            heading: '9. AI features',
            body: [
              'AI features create drafts. They may be wrong, repetitive, generate unsuitable permissions, strange names, disputed text or structures requiring manual correction.',
              'Users must not enter tokens, passwords, private keys, other people personal data, private server materials or information that cannot be sent to an external provider into AI prompts.',
              'Before applying AI output, the user must review every role, channel, permission, text, mention, link and compliance with their community rules.',
              'Core may limit AI commands by role, server owner, bot developer, quotas, provider availability or safety requirements.'
            ]
          },
          {
            heading: '10. Moderation, levels and notifications',
            body: [
              'Automoderation, levels, welcome messages, logs and notifications should be configured with the rules of the specific server and member expectations in mind.',
              'Server administration is responsible for informing members about rules, moderation, level systems, possible direct messages and feedback channels where required by community rules or law.',
              'Core may delete messages, issue warnings, send logs or perform other actions only within granted permissions and settings. Permission errors, role conflicts or Discord limits may prevent execution.'
            ]
          },
          {
            heading: '11. Prohibited bot use',
            body: [
              'Core must not be used for spam, raids, phishing, malicious links, unwanted mass messages, ban evasion, harassment, threats, doxxing or Discord rule violations.',
              'Core must not be used to collect data without a lawful basis, publish other people private data, create deceptive servers, imitate official services or mislead users.',
              'Users must not attempt to access the bot token, database, encryption keys, service channels, developer-only commands or other people private templates.',
              'Core may restrict access, refuse a command, remove a template or report abuse if use creates risk for the project, Discord, servers or users.'
            ]
          },
          {
            heading: '12. Server owner responsibility',
            body: [
              'The server owner is responsible for final server structure, granted permissions, published rules, moderation settings, template choices and administrator actions.',
              'If a server administrator runs a risky command, applies unsuitable JSON or deletes channels through Core, it is treated as an action within permissions granted on the server.',
              'The server owner should regularly review bot permissions, role hierarchy, access to log channels, command settings and who can run high-risk features.'
            ]
          },
          {
            heading: '13. Limitation of liability',
            body: [
              'Core is provided as is and as available. Discord API errors, rate limits, hosting failures, database errors, incomplete rollback, Discord client incompatibility and external provider problems may happen.',
              'To the maximum extent allowed by law, Core is not responsible for data loss, deleted channels or roles, wrong permissions, incorrect moderation, undelivered direct messages, AI errors, administrator actions or Discord enforcement.',
              'Nothing in these terms limits liability where such limitation is not allowed by applicable law.'
            ]
          },
          {
            heading: '14. Suspension and termination',
            body: [
              'Core may restrict or terminate access to specific features, templates or commands if abuse, technical risk, terms violation, security threat or an external service requirement is detected.',
              'A server owner may stop using Core by removing the bot from the server and checking which data or publications should be removed separately through the official Core server.',
              'Some effects of actions performed before bot removal may remain in Discord, such as created channels, roles, messages, permissions or published templates.'
            ]
          },
          {
            heading: '15. Changes',
            body: [
              'Core may update these terms when features, commands, database, public catalog, AI providers, Discord rules or security requirements change.',
              'The update date shows the current version. Continued bot use after an update means acceptance of the new version.',
              'If the user or server owner does not agree with the new version, they must stop using Core and remove the bot from the server.'
            ]
          },
          {
            heading: '16. Contact',
            body: [
              'Questions about access, removal of public materials, disputed templates, security, feedback or errors should be sent through the official Core server.',
              'To speed up review, provide server ID, user ID, command name, event time, template name and issue description where relevant.',
              'These terms are not individual legal advice. The server owner is responsible for rules and laws that apply to their specific community.'
            ]
          }
        ]
      },
      ua: {
        title: 'Умови використання бота Core',
        description: 'Докладні правила використання Discord-бота Core на серверах, у командах імпорту, шаблонах, модерації, AI-функціях і публічних пропозиціях.',
        sections: [
          {
            heading: '1. Прийняття умов',
            body: [
              'Додаючи Core на сервер, використовуючи команди бота або дозволяючи іншим учасникам використовувати його функції, користувач і власник сервера погоджуються з цими умовами та політикою конфіденційності бота.',
              'Якщо користувач не погоджується з умовами, він не повинен додавати бота, запускати команди, застосовувати шаблони, надсилати пропозиції або використовувати функції Core.',
              'Використання Core також потребує дотримання умов Discord, правил Discord Developer Platform, правил конкретного сервера і застосовного законодавства.',
              'Якщо користувач переносить дані з інструментів сайту Core у бота, Discord або webhook, він відповідає за перевірку вмісту файла, прав на публікацію та відсутність приватних webhook URL або внутрішніх матеріалів у переданих даних.'
            ]
          },
          {
            heading: '2. Право додавати і керувати ботом',
            body: [
              'Бота можна додавати на сервер тільки за наявності права керувати цим сервером або явного дозволу власника сервера.',
              'Власник сервера відповідає за те, які права видані боту, які команди доступні учасникам і які функції увімкнені на сервері.',
              'Якщо сервером керує команда адміністраторів, вони мають заздалегідь узгодити використання команд, які можуть змінювати структуру сервера, видаляти ролі, створювати канали або публікувати правила.'
            ]
          },
          {
            heading: '3. Права Discord і технічні обмеження',
            body: [
              'Для роботи Core можуть бути потрібні права Discord: перегляд каналів, надсилання повідомлень, керування повідомленнями, керування ролями, керування каналами, прикріплення файлів, читання історії, використання команд та інші права залежно від функції.',
              'Якщо прав недостатньо, команда може завершитися помилкою, виконати тільки частину дій або не мати можливості відновити попередній стан сервера.',
              'Core не може обійти обмеження Discord API, ієрархію ролей, rate limits, обмеження власника сервера, обмеження клієнта Discord або недоступність Discord.'
            ]
          },
          {
            heading: '4. Команди, що змінюють сервер',
            body: [
              'Команди імпорту, застосування публічного шаблону, AI-створення структури, перенесення ролей, перенесення правил, видалення старих каналів або ролей і схожі функції потрібно використовувати тільки після перевірки предпросмотру.',
              'Користувач має розуміти, що підтвердження операції може створити, видалити або змінити канали, категорії, ролі, права, повідомлення, налаштування і порядок обʼєктів на сервері.',
              'Якщо команда пропонує варіант видалити попередні канали або ролі, вибір Так означає згоду на масову зміну структури. Перед підтвердженням потрібно переконатися, що є актуальний відкат або резервна копія.',
              'Core може відмовити у виконанні операції, якщо користувач не має потрібних прав, команда обмежена власником сервера, бот не має потрібних прав або вхідний JSON не проходить перевірку.'
            ]
          },
          {
            heading: '5. Відкат',
            body: [
              'Функція відкату призначена для обмеженого відновлення сервера після операцій Core, але не є гарантованою повною резервною копією Discord-сервера.',
              'Відкат доступний тільки у встановлений час. Після закінчення строку запис видаляється, і відновлення через цю команду стає неможливим.',
              'Навіть у межах строку відкат залежить від прав бота, ієрархії ролей, обмежень Discord, уже видалених обʼєктів, конфліктів імен, rate limits і поточного стану сервера.',
              'Власник сервера повинен перевіряти результат після відкату. Core не гарантує відновлення кожного параметра, якщо Discord API не дозволяє повернути його точно.'
            ]
          },
          {
            heading: '6. JSON, імпорт і експорт',
            body: [
              'Приватний імпорт і експорт повинні використовувати закодований або зашифрований формат там, де це передбачено ботом. Користувач не повинен вручну змінювати захищений файл, якщо не розуміє формат.',
              'Заборонено завантажувати JSON з невідомого джерела без перевірки. Такий файл може створити небажані канали, ролі, права, повідомлення, згадки або посилання.',
              'Публічні шаблони відрізняються від приватних експортів: вони призначені для поширення і можуть відображатися на сайті, у постах, превью і командах Core.',
              'Core може відхилити імпорт, якщо файл пошкоджений, не стосується Core, не проходить розшифрування, містить невідому схему, перевищує ліміти Discord або створює ризик для сервера.'
            ]
          },
          {
            heading: '7. Публічні шаблони і пропозиції',
            body: [
              'Користувач може пропонувати шаблони серверів, ролей і правил тільки якщо має право передавати ці матеріали і вони не містять чужих приватних даних.',
              'Пропозиції можуть бути перевірені розробником Core, відредаговані, перекладені, перероблені, обʼєднані з іншими матеріалами, відхилені або опубліковані.',
              'Заборонено надсилати шаблони зі шкідливими посиланнями, токенами, фішингом, образами, незаконним контентом, чужими персональними даними, оманливим описом або порушенням прав третіх осіб.',
              'Core може видалити або змінити опублікований шаблон без окремої згоди автора, якщо це потрібно для безпеки, якості каталогу, дотримання правил Discord або виправлення помилок.'
            ]
          },
          {
            heading: '8. Рейтинги і публічні оцінки',
            body: [
              'Система рейтингів призначена для оцінки корисності публічних шаблонів. Заборонені накрутка, масові фіктивні оцінки, обхід обмежень і маніпуляція результатами.',
              'Core може перерахувати, приховати або видалити рейтинг, якщо є ознаки зловживання, технічної помилки або порушення правил проєкту.',
              'Рейтинг не є гарантією безпеки шаблону. Користувач зобовʼязаний перевіряти шаблон перед застосуванням незалежно від кількості зірок.'
            ]
          },
          {
            heading: '9. AI-функції',
            body: [
              'AI-функції створюють чернетки. Вони можуть помилятися, повторювати шаблони, створювати невідповідні права, дивні назви, спірні тексти або структуру, що потребує ручної правки.',
              'Користувач не повинен вводити в AI-запити токени, паролі, приватні ключі, чужі персональні дані, закриті матеріали сервера або відомості, які не можна передавати зовнішньому постачальнику.',
              'Перед застосуванням AI-результату користувач зобовʼязаний перевірити кожну роль, канал, право, текст, згадку, посилання і відповідність правилам своєї спільноти.',
              'Core може обмежувати AI-команди за ролями, власником сервера, розробником бота, лімітами, доступністю постачальника або вимогами безпеки.'
            ]
          },
          {
            heading: '10. Модерація, рівні і сповіщення',
            body: [
              'Функції автомодерації, рівнів, привітань, логів і сповіщень повинні налаштовуватися з урахуванням правил конкретного сервера й очікувань учасників.',
              'Адміністрація сервера відповідає за інформування учасників про правила, модерацію, систему рівнів, можливі особисті повідомлення і канали зворотного звʼязку, якщо це потрібно правилами спільноти або законом.',
              'Core може видаляти повідомлення, видавати попередження, надсилати логи або виконувати інші дії тільки в межах виданих прав і налаштувань. Помилки прав, конфлікт ролей або обмеження Discord можуть завадити виконанню.'
            ]
          },
          {
            heading: '11. Заборонене використання бота',
            body: [
              'Заборонено використовувати Core для спаму, рейдів, фішингу, публікації шкідливих посилань, масових небажаних повідомлень, обходу банів, переслідування, погроз, доксингу або порушення правил Discord.',
              'Заборонено використовувати Core для збору даних без законної підстави, публікації чужих приватних даних, створення оманливих серверів, імітації офіційних сервісів або введення користувачів в оману.',
              'Заборонено намагатися отримати доступ до токена бота, бази даних, ключів шифрування, службових каналів, закритих команд розробника або чужих приватних шаблонів.',
              'Core може обмежити доступ, відмовити у виконанні команди, видалити шаблон або повідомити про порушення, якщо використання створює ризик для проєкту, Discord, серверів або користувачів.'
            ]
          },
          {
            heading: '12. Відповідальність власника сервера',
            body: [
              'Власник сервера відповідає за підсумкову структуру сервера, видані права, опубліковані правила, налаштування модерації, вибір шаблонів і дії адміністраторів.',
              'Якщо адміністратор сервера запускає небезпечну команду, застосовує невідповідний JSON або видаляє канали через Core, це вважається дією в межах прав, виданих на сервері.',
              'Власник сервера повинен регулярно перевіряти права бота, ієрархію ролей, доступ до каналів логів, налаштування команд і те, хто може запускати функції з високим ризиком.'
            ]
          },
          {
            heading: '13. Обмеження відповідальності',
            body: [
              'Core надається у стані як є і за наявності доступу. Можливі помилки Discord API, rate limits, збої хостингу, помилки бази даних, неповний відкат, несумісність клієнта Discord і проблеми зовнішніх постачальників.',
              'У максимальній мірі, дозволеній законом, Core не відповідає за втрату даних, видалені канали або ролі, неправильні права, помилкову модерацію, недоставлені особисті повідомлення, помилки AI, дії адміністраторів або санкції Discord.',
              'Ніщо в цих умовах не обмежує відповідальність, якщо таке обмеження прямо заборонене застосовним законом.'
            ]
          },
          {
            heading: '14. Призупинення і припинення доступу',
            body: [
              'Core може обмежити або припинити доступ до окремих функцій, шаблонів або команд, якщо виявлено зловживання, технічний ризик, порушення умов, загрозу безпеці або вимогу зовнішнього сервісу.',
              'Власник сервера може припинити використання Core, видаливши бота з сервера і перевіривши, які дані або публікації потрібно видалити окремо через офіційний сервер Core.',
              'Деякі наслідки дій, виконаних до видалення бота, можуть зберігатися в Discord, наприклад створені канали, ролі, повідомлення, права або опубліковані шаблони.'
            ]
          },
          {
            heading: '15. Зміни умов',
            body: [
              'Core може оновлювати ці умови при зміні функцій, команд, бази даних, публічного каталогу, AI-постачальників, правил Discord або вимог безпеки.',
              'Дата оновлення показує актуальну редакцію. Подальше використання бота після оновлення означає прийняття нової редакції.',
              'Якщо користувач або власник сервера не погоджується з новою редакцією, він повинен припинити використання Core і видалити бота з сервера.'
            ]
          },
          {
            heading: '16. Контакт',
            body: [
              'З питань доступу, видалення публічних матеріалів, спірних шаблонів, безпеки, фідбеку або помилок потрібно звертатися через офіційний сервер Core.',
              'Для прискорення перевірки корисно вказати ID сервера, ID користувача, назву команди, час події, назву шаблону і опис проблеми.',
              'Ці умови не є індивідуальною юридичною консультацією. Власник сервера відповідає за дотримання правил і законів, застосовних до його конкретної спільноти.'
            ]
          }
        ]
      },
      de: {
        title: 'Core Bot-Nutzungsbedingungen',
        description: 'Ausfuehrliche Regeln fuer die Nutzung des Core Discord-Bots auf Servern, in Importbefehlen, Vorlagen, Moderation, AI-Funktionen und oeffentlichen Vorschlaegen.',
        sections: [
          {
            heading: '1. Annahme',
            body: [
              'Durch Hinzufuegen von Core zu einem Server, Nutzung von Befehlen oder Erlaubnis fuer andere Mitglieder, Funktionen zu nutzen, akzeptieren Nutzer und Serverbesitzer diese Bedingungen und die Bot-Datenschutzrichtlinie.',
              'Wer nicht zustimmt, darf den Bot nicht hinzufuegen, keine Befehle ausfuehren, keine Vorlagen anwenden, keine Vorschlaege senden und keine Core-Funktionen nutzen.',
              'Die Nutzung von Core erfordert auch Einhaltung der Discord-Bedingungen, Discord Developer Platform-Regeln, Regeln des konkreten Servers und geltenden Rechts.',
              'Wenn ein Nutzer Daten aus Core-Website-Werkzeugen in den Bot, Discord oder einen Webhook uebertraegt, ist er fuer die Pruefung des Dateiinhalts, der Veroeffentlichungsrechte und das Fehlen privater Webhook-URLs oder interner Materialien verantwortlich.'
            ]
          },
          {
            heading: '2. Recht zum Hinzufuegen und Verwalten',
            body: [
              'Der Bot darf nur von Personen hinzugefuegt werden, die den Server verwalten duerfen oder eine ausdrueckliche Erlaubnis des Serverbesitzers haben.',
              'Der Serverbesitzer ist fuer Bot-Rechte, fuer Mitglieder verfuegbare Befehle und aktivierte Funktionen verantwortlich.',
              'Wenn ein Server von einem Admin-Team verwaltet wird, sollten Befehle, die Serverstruktur aendern, Rollen loeschen, Kanaele erstellen oder Regeln veroeffentlichen, vorher abgestimmt werden.'
            ]
          },
          {
            heading: '3. Discord-Rechte und technische Grenzen',
            body: [
              'Core-Funktionen koennen Discord-Rechte erfordern: Kanaele anzeigen, Nachrichten senden, Nachrichten verwalten, Rollen verwalten, Kanaele verwalten, Dateien anhaengen, Verlauf lesen, Befehle nutzen und weitere Rechte je nach Funktion.',
              'Wenn Rechte fehlen, kann ein Befehl fehlschlagen, nur teilweise ausgefuehrt werden oder den vorherigen Serverzustand nicht wiederherstellen.',
              'Core kann Discord API-Grenzen, Rollenhierarchie, Rate Limits, Serverbesitzer-Einschraenkungen, Discord-Client-Limits oder Discord-Ausfaelle nicht umgehen.'
            ]
          },
          {
            heading: '4. Serveraendernde Befehle',
            body: [
              'Import, Anwendung oeffentlicher Vorlagen, AI-Strukturerstellung, Rollenuebertragung, Regeluebertragung, Loeschung alter Kanaele oder Rollen und aehnliche Funktionen duerfen nur nach Pruefung der Vorschau genutzt werden.',
              'Der Nutzer muss verstehen, dass eine bestaetigte Operation Kanaele, Kategorien, Rollen, Rechte, Nachrichten, Einstellungen und Reihenfolge auf dem Server erstellen, loeschen oder aendern kann.',
              'Wenn ein Befehl das Loeschen bisheriger Kanaele oder Rollen anbietet, bedeutet Ja Zustimmung zu einer massenhaften Strukturaenderung. Vor Bestaetigung sollte Rollback oder Backup verfuegbar sein.',
              'Core kann die Ausfuehrung verweigern, wenn Rechte fehlen, der Befehl nur fuer Serverbesitzer ist, Bot-Rechte fehlen oder das Eingabe-JSON die Pruefung nicht besteht.'
            ]
          },
          {
            heading: '5. Rollback',
            body: [
              'Rollback dient begrenzter Wiederherstellung nach Core-Operationen, ist aber kein garantiert vollstaendiges Backup eines Discord-Servers.',
              'Rollback ist nur im festgelegten Zeitfenster verfuegbar. Nach Ablauf wird der Eintrag geloescht und Wiederherstellung ueber diesen Befehl unmoeglich.',
              'Auch im Zeitfenster haengt Rollback von Bot-Rechten, Rollenhierarchie, Discord-Grenzen, bereits geloeschten Objekten, Namenskonflikten, Rate Limits und aktuellem Serverzustand ab.',
              'Der Serverbesitzer muss das Ergebnis nach Rollback pruefen. Core garantiert nicht jede Einstellung exakt wiederherzustellen, wenn Discord API dies nicht erlaubt.'
            ]
          },
          {
            heading: '6. JSON, Import und Export',
            body: [
              'Privater Import und Export sollten kodierte oder verschluesselte Formate nutzen, wo der Bot dies vorsieht. Nutzer sollten geschuetzte Dateien nicht manuell aendern, wenn sie das Format nicht verstehen.',
              'JSON aus unbekannten Quellen darf nicht ohne Pruefung hochgeladen werden. Es kann unerwuenschte Kanaele, Rollen, Rechte, Nachrichten, Erwaehnungen oder Links erstellen.',
              'Oeffentliche Vorlagen unterscheiden sich von privaten Exporten: Sie sind fuer Verbreitung bestimmt und koennen auf Website, in Posts, Vorschauen und Core-Befehlen erscheinen.',
              'Core kann Import ablehnen, wenn die Datei defekt ist, nicht zu Core gehoert, nicht entschluesselt werden kann, ein unbekanntes Schema nutzt, Discord-Limits ueberschreitet oder Risiken fuer den Server erzeugt.'
            ]
          },
          {
            heading: '7. Oeffentliche Vorlagen und Vorschlaege',
            body: [
              'Nutzer duerfen Server-, Rollen- und Regelvorlagen nur vorschlagen, wenn sie berechtigt sind, diese Materialien zu uebermitteln, und keine fremden privaten Daten enthalten.',
              'Vorschlaege koennen vom Core-Entwickler geprueft, bearbeitet, uebersetzt, ueberarbeitet, mit anderen Materialien kombiniert, abgelehnt oder veroeffentlicht werden.',
              'Vorlagen mit schädlichen Links, Tokens, Phishing, Beleidigungen, illegalen Inhalten, personenbezogenen Daten Dritter, irrefuehrender Beschreibung oder Rechtsverletzungen sind verboten.',
              'Core kann eine veroeffentlichte Vorlage ohne gesonderte Zustimmung des Autors entfernen oder aendern, wenn dies fuer Sicherheit, Katalogqualitaet, Discord-Regeln oder Fehlerkorrektur noetig ist.'
            ]
          },
          {
            heading: '8. Bewertungen',
            body: [
              'Das Bewertungssystem dient der Einschaetzung der Nuetzlichkeit oeffentlicher Vorlagen. Manipulation, massenhafte Fake-Bewertungen, Umgehung von Limits und Ergebnisverfaelschung sind verboten.',
              'Core kann Bewertungen neu berechnen, ausblenden oder entfernen, wenn Missbrauch, technische Fehler oder Regelverstoesse erkennbar sind.',
              'Eine Bewertung ist keine Sicherheitsgarantie. Nutzer muessen Vorlagen vor Anwendung unabhaengig von der Sternenzahl pruefen.'
            ]
          },
          {
            heading: '9. AI-Funktionen',
            body: [
              'AI-Funktionen erzeugen Entwuerfe. Sie koennen falsch sein, Muster wiederholen, ungeeignete Rechte, seltsame Namen, strittige Texte oder manuell zu korrigierende Strukturen erzeugen.',
              'Nutzer duerfen keine Tokens, Passwoerter, privaten Schluessel, personenbezogenen Daten Dritter, privaten Servermaterialien oder Informationen in AI-Prompts eingeben, die nicht an externe Anbieter gehen duerfen.',
              'Vor Anwendung von AI-Ergebnissen muss der Nutzer jede Rolle, jeden Kanal, jedes Recht, jeden Text, jede Erwaehnung, jeden Link und die Community-Regeln pruefen.',
              'Core kann AI-Befehle nach Rolle, Serverbesitzer, Bot-Entwickler, Kontingenten, Anbieter-Verfuegbarkeit oder Sicherheitsanforderungen begrenzen.'
            ]
          },
          {
            heading: '10. Moderation, Level und Hinweise',
            body: [
              'Automoderation, Level, Begruessungen, Logs und Hinweise sollten mit Blick auf Regeln des Servers und Erwartungen der Mitglieder konfiguriert werden.',
              'Die Serveradministration ist verantwortlich, Mitglieder ueber Regeln, Moderation, Levelsysteme, moegliche Direktnachrichten und Feedback-Kanaele zu informieren, wenn Community-Regeln oder Recht dies erfordern.',
              'Core kann Nachrichten loeschen, Warnungen ausgeben, Logs senden oder andere Aktionen nur im Rahmen der Rechte und Einstellungen ausfuehren. Rechtefehler, Rollenkonflikte oder Discord-Grenzen koennen die Ausfuehrung verhindern.'
            ]
          },
          {
            heading: '11. Verbotene Bot-Nutzung',
            body: [
              'Core darf nicht fuer Spam, Raids, Phishing, schädliche Links, unerwuenschte Massennachrichten, Ban-Umgehung, Belaestigung, Drohungen, Doxxing oder Discord-Regelverstoesse genutzt werden.',
              'Core darf nicht genutzt werden, um Daten ohne Rechtsgrundlage zu sammeln, private Daten Dritter zu veroeffentlichen, taeuschende Server zu erstellen, offizielle Dienste zu imitieren oder Nutzer irrezufuehren.',
              'Es ist verboten, Zugriff auf Bot-Token, Datenbank, Verschluesselungsschluessel, Servicekanaele, Entwicklerbefehle oder private Vorlagen anderer zu versuchen.',
              'Core kann Zugriff beschraenken, Befehle verweigern, Vorlagen entfernen oder Missbrauch melden, wenn Nutzung Risiken fuer Projekt, Discord, Server oder Nutzer erzeugt.'
            ]
          },
          {
            heading: '12. Verantwortung des Serverbesitzers',
            body: [
              'Der Serverbesitzer ist fuer finale Serverstruktur, erteilte Rechte, veroeffentlichte Regeln, Moderationseinstellungen, Vorlagenauswahl und Admin-Handlungen verantwortlich.',
              'Wenn ein Serveradministrator einen riskanten Befehl ausfuehrt, ungeeignetes JSON anwendet oder Kanaele ueber Core loescht, gilt dies als Handlung innerhalb der auf dem Server erteilten Rechte.',
              'Der Serverbesitzer sollte regelmaessig Bot-Rechte, Rollenhierarchie, Zugriff auf Log-Kanaele, Befehlseinstellungen und Nutzer mit Zugriff auf Hochrisiko-Funktionen pruefen.'
            ]
          },
          {
            heading: '13. Haftungsbegrenzung',
            body: [
              'Core wird wie besehen und nach Verfuegbarkeit bereitgestellt. Discord API-Fehler, Rate Limits, Hosting-Ausfaelle, Datenbankfehler, unvollstaendiger Rollback, Discord-Client-Inkompatibilitaet und externe Anbieterprobleme koennen auftreten.',
              'Soweit gesetzlich zulaessig, haftet Core nicht fuer Datenverlust, geloeschte Kanaele oder Rollen, falsche Rechte, fehlerhafte Moderation, nicht zugestellte Direktnachrichten, AI-Fehler, Admin-Handlungen oder Discord-Massnahmen.',
              'Nichts in diesen Bedingungen begrenzt Haftung, wenn eine solche Begrenzung gesetzlich unzulaessig ist.'
            ]
          },
          {
            heading: '14. Aussetzung und Beendigung',
            body: [
              'Core kann Zugriff auf Funktionen, Vorlagen oder Befehle beschraenken oder beenden, wenn Missbrauch, technisches Risiko, Regelverstoss, Sicherheitsgefahr oder Anforderung externer Dienste erkannt wird.',
              'Ein Serverbesitzer kann Core nicht mehr nutzen, indem er den Bot entfernt und prueft, welche Daten oder Publikationen separat ueber den offiziellen Core-Server entfernt werden sollen.',
              'Einige Folgen vor Entfernung des Bots koennen in Discord bestehen bleiben, etwa erstellte Kanaele, Rollen, Nachrichten, Rechte oder veroeffentlichte Vorlagen.'
            ]
          },
          {
            heading: '15. Aenderungen',
            body: [
              'Core kann diese Bedingungen aktualisieren, wenn Funktionen, Befehle, Datenbank, oeffentlicher Katalog, AI-Anbieter, Discord-Regeln oder Sicherheitsanforderungen sich aendern.',
              'Das Aktualisierungsdatum zeigt die aktuelle Fassung. Weitere Bot-Nutzung nach einer Aktualisierung bedeutet Zustimmung zur neuen Fassung.',
              'Wenn Nutzer oder Serverbesitzer der neuen Fassung nicht zustimmen, muessen sie Core nicht mehr nutzen und den Bot vom Server entfernen.'
            ]
          },
          {
            heading: '16. Kontakt',
            body: [
              'Fragen zu Zugriff, Entfernung oeffentlicher Materialien, strittigen Vorlagen, Sicherheit, Feedback oder Fehlern sollten ueber den offiziellen Core-Server gestellt werden.',
              'Fuer schnellere Pruefung sind Server-ID, Nutzer-ID, Befehlsname, Ereigniszeit, Vorlagenname und Problembeschreibung hilfreich.',
              'Diese Bedingungen sind keine individuelle Rechtsberatung. Der Serverbesitzer ist fuer Regeln und Gesetze verantwortlich, die fuer seine konkrete Community gelten.'
            ]
          }
        ]
      }
    }
  };

  let language = FALLBACK_LANG;

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getSavedLanguage() {
    const saved = localStorage.getItem('core-site-language');
    if (ui[saved]) return saved;
    const browserLanguage = navigator.language?.toLowerCase() || '';
    if (browserLanguage.startsWith('uk')) return 'ua';
    if (browserLanguage.startsWith('de')) return 'de';
    if (browserLanguage.startsWith('en')) return 'en';
    return FALLBACK_LANG;
  }

  function render() {
    const root = document.querySelector('[data-legal-root]');
    if (!root) return;
    const key = document.body.dataset.legalDoc || 'sitePrivacy';
    const doc = docs[key]?.[language] || docs[key]?.[FALLBACK_LANG] || docs.sitePrivacy[FALLBACK_LANG];
    const labels = ui[language] || ui[FALLBACK_LANG];

    document.documentElement.lang = language === 'ua' ? 'uk' : language;
    document.title = `Core - ${doc.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', doc.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `Core - ${doc.title}`);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', doc.description);

    root.innerHTML = `
      <section class="section legal-hero">
        <p class="eyebrow">${escapeHtml(labels.updated)} ${UPDATED_AT}</p>
        <h1>${escapeHtml(doc.title)}</h1>
        <p>${escapeHtml(doc.description)}</p>
        <div class="legal-actions">
          <a class="button secondary" href="../">${escapeHtml(labels.back)}</a>
          <a class="button primary" data-official-server-url href="${OFFICIAL_SERVER_URL}">${escapeHtml(labels.officialServer)}</a>
        </div>
      </section>
      <section class="section legal-document">
        ${doc.sections.map((section) => `
          <article class="legal-card">
            <h2>${escapeHtml(section.heading)}</h2>
            ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          </article>
        `).join('')}
        <article class="legal-card legal-contact">
          <h2>${escapeHtml(labels.contact)}</h2>
          <p><a data-official-server-url href="${OFFICIAL_SERVER_URL}">${OFFICIAL_SERVER_URL}</a></p>
        </article>
      </section>
    `;
  }

  function applyLanguage(nextLanguage) {
    language = ui[nextLanguage] ? nextLanguage : FALLBACK_LANG;
    render();
  }

  window.addEventListener('core-language-change', (event) => {
    applyLanguage(event.detail?.language || getSavedLanguage());
  });

  applyLanguage(getSavedLanguage());
})();
