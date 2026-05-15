(() => {
  const FALLBACK_LANG = 'ru';
  const UPDATED_AT = '15.05.2026';

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
        description: 'Как сайт Core обрабатывает данные при просмотре страниц, использовании каталога, символов, emoji и редактора вебхуков.',
        sections: [
          {
            heading: 'Какие данные обрабатывает сайт',
            body: [
              'Сайт Core является статическим интерфейсом. Он не требует регистрации, не создает учетную запись и не просит пароль от Discord.',
              'Для работы интерфейса сайт может хранить выбранный язык в localStorage браузера. Это нужно только для того, чтобы страницы открывались на выбранном языке.',
              'При открытии каталога шаблонов сайт делает запрос к публичному API Core или к указанному Google Apps Script proxy. В запрос не добавляются Discord-токены пользователя.'
            ]
          },
          {
            heading: 'Редактор вебхуков',
            body: [
              'Webhook URL и содержимое сообщения остаются в браузере до момента отправки. Когда пользователь нажимает кнопку отправки, браузер отправляет запрос напрямую в Discord webhook URL, который пользователь указал сам.',
              'Core не сохраняет webhook URL на сайте и не передает его в базу данных сайта. Если пользователь копирует JSON, это выполняется через системный буфер обмена браузера.'
            ]
          },
          {
            heading: 'Файлы cookie и аналитика',
            body: [
              'Сайт не использует собственные рекламные cookie и не продает данные.',
              'Если сайт опубликован через GitHub Pages или другой хостинг, такой хостинг может обрабатывать технические журналы доступа по своим правилам.'
            ]
          },
          {
            heading: 'Безопасность',
            body: [
              'Не вставляйте чужие webhook URL и не публикуйте приватные токены в редакторе.',
              'Публичные шаблоны показываются как справочный материал. Перед применением любых JSON-файлов проверяйте их содержимое.'
            ]
          }
        ]
      },
      en: {
        title: 'Core Website Privacy Policy',
        description: 'How the Core website handles data while you browse pages, use the template catalog, copy tools and webhook editor.',
        sections: [
          {
            heading: 'Data handled by the website',
            body: [
              'The Core website is a static interface. It does not require registration, does not create a user account and does not ask for a Discord password.',
              'The site may store the selected language in browser localStorage so pages can reopen in the chosen language.',
              'When the template catalog is opened, the site requests the public Core API or the configured Google Apps Script proxy. Discord user tokens are not added to those requests.'
            ]
          },
          {
            heading: 'Webhook editor',
            body: [
              'The webhook URL and message content stay in the browser until the user sends the message. When sending, the browser posts directly to the Discord webhook URL supplied by the user.',
              'Core does not store webhook URLs on the website. Copying JSON uses the browser clipboard.'
            ]
          },
          {
            heading: 'Cookies and analytics',
            body: [
              'The website does not use its own advertising cookies and does not sell data.',
              'If the site is hosted on GitHub Pages or another provider, that provider may process technical access logs under its own terms.'
            ]
          },
          {
            heading: 'Security',
            body: [
              'Do not paste webhook URLs that are not yours and do not publish private tokens in the editor.',
              'Public templates are reference material. Review JSON files before applying them.'
            ]
          }
        ]
      },
      ua: {
        title: 'Політика конфіденційності сайту Core',
        description: 'Як сайт Core обробляє дані під час перегляду сторінок, каталогу, інструментів копіювання та редактора вебхуків.',
        sections: [
          {
            heading: 'Які дані обробляє сайт',
            body: [
              'Сайт Core є статичним інтерфейсом. Він не вимагає реєстрації, не створює обліковий запис і не просить пароль від Discord.',
              'Сайт може зберігати вибрану мову в localStorage браузера, щоб сторінки відкривалися вибраною мовою.',
              'Під час відкриття каталогу шаблонів сайт робить запит до публічного API Core або до налаштованого Google Apps Script proxy. Discord-токени користувача не додаються до цих запитів.'
            ]
          },
          {
            heading: 'Редактор вебхуків',
            body: [
              'Webhook URL і вміст повідомлення залишаються у браузері до моменту відправлення. Після натискання кнопки відправлення браузер надсилає запит напряму до Discord webhook URL, який вказав користувач.',
              'Core не зберігає webhook URL на сайті. Копіювання JSON виконується через буфер обміну браузера.'
            ]
          },
          {
            heading: 'Cookie та аналітика',
            body: [
              'Сайт не використовує власні рекламні cookie і не продає дані.',
              'Якщо сайт розміщено на GitHub Pages або іншому хостингу, цей хостинг може обробляти технічні журнали доступу за власними правилами.'
            ]
          },
          {
            heading: 'Безпека',
            body: [
              'Не вставляйте чужі webhook URL і не публікуйте приватні токени в редакторі.',
              'Публічні шаблони є довідковим матеріалом. Перевіряйте JSON-файли перед застосуванням.'
            ]
          }
        ]
      },
      de: {
        title: 'Core Website-Datenschutz',
        description: 'Wie die Core-Website Daten beim Besuch der Seiten, im Vorlagenkatalog, in Kopierwerkzeugen und im Webhook-Editor verarbeitet.',
        sections: [
          {
            heading: 'Verarbeitete Daten',
            body: [
              'Die Core-Website ist eine statische Oberfläche. Sie verlangt keine Registrierung, erstellt kein Nutzerkonto und fragt nicht nach einem Discord-Passwort.',
              'Die Website kann die gewählte Sprache im localStorage des Browsers speichern, damit Seiten in dieser Sprache geöffnet werden.',
              'Beim Öffnen des Vorlagenkatalogs ruft die Website die öffentliche Core-API oder den konfigurierten Google Apps Script Proxy ab. Discord-Nutzertoken werden dabei nicht hinzugefügt.'
            ]
          },
          {
            heading: 'Webhook-Editor',
            body: [
              'Webhook-URL und Nachricht bleiben im Browser, bis der Nutzer sie sendet. Beim Senden postet der Browser direkt an die vom Nutzer angegebene Discord-Webhook-URL.',
              'Core speichert Webhook-URLs nicht auf der Website. Das Kopieren von JSON nutzt die Zwischenablage des Browsers.'
            ]
          },
          {
            heading: 'Cookies und Analyse',
            body: [
              'Die Website nutzt keine eigenen Werbe-Cookies und verkauft keine Daten.',
              'Wenn die Website über GitHub Pages oder einen anderen Anbieter gehostet wird, kann dieser Anbieter technische Zugriffsprotokolle nach eigenen Regeln verarbeiten.'
            ]
          },
          {
            heading: 'Sicherheit',
            body: [
              'Fügen Sie keine fremden Webhook-URLs ein und veröffentlichen Sie keine privaten Token im Editor.',
              'Öffentliche Vorlagen sind Referenzmaterial. Prüfen Sie JSON-Dateien vor der Anwendung.'
            ]
          }
        ]
      }
    },
    siteTerms: {
      ru: {
        title: 'Условия пользования сайтом Core',
        description: 'Правила использования сайта Core, публичного каталога, инструментов копирования и редактора вебхуков.',
        sections: [
          {
            heading: 'Назначение сайта',
            body: [
              'Сайт Core предназначен для просмотра возможностей бота, публичных шаблонов, справки по командам и вспомогательных инструментов для Discord.',
              'Инструменты сайта предоставляются как есть. Пользователь отвечает за то, какие данные он вставляет, копирует или отправляет через webhook.'
            ]
          },
          {
            heading: 'Редактор вебхуков',
            body: [
              'Пользователь должен иметь право использовать указанный webhook URL.',
              'Запрещено использовать редактор для спама, фишинга, вредоносных ссылок, нарушения правил Discord или прав других людей.'
            ]
          },
          {
            heading: 'Шаблоны и материалы',
            body: [
              'Публичные шаблоны можно использовать как основу для Discord-сервера, но перед применением их нужно проверить под свой проект.',
              'Core не гарантирует, что любой шаблон подойдет каждому серверу без ручной настройки.'
            ]
          },
          {
            heading: 'Ограничение ответственности',
            body: [
              'Сайт может временно работать с ошибками, если недоступны GitHub Pages, Discord, API бота или внешний proxy.',
              'Использование сайта означает согласие с тем, что пользователь сам проверяет результат перед отправкой или применением.'
            ]
          }
        ]
      },
      en: {
        title: 'Core Website Terms of Use',
        description: 'Rules for using the Core website, public catalog, copy tools and webhook editor.',
        sections: [
          {
            heading: 'Purpose',
            body: [
              'The Core website is provided for viewing bot features, public templates, command help and Discord-related tools.',
              'The tools are provided as is. The user is responsible for the data they paste, copy or send through a webhook.'
            ]
          },
          {
            heading: 'Webhook editor',
            body: [
              'The user must have permission to use the supplied webhook URL.',
              'The editor must not be used for spam, phishing, malicious links, Discord rule violations or violations of other people rights.'
            ]
          },
          {
            heading: 'Templates and materials',
            body: [
              'Public templates may be used as a base for a Discord server, but they should be reviewed before applying them to a project.',
              'Core does not guarantee that every template will fit every server without manual adjustment.'
            ]
          },
          {
            heading: 'Liability',
            body: [
              'The website may temporarily fail if GitHub Pages, Discord, the bot API or an external proxy is unavailable.',
              'By using the website, the user agrees to review results before sending or applying them.'
            ]
          }
        ]
      },
      ua: {
        title: 'Умови користування сайтом Core',
        description: 'Правила використання сайту Core, публічного каталогу, інструментів копіювання та редактора вебхуків.',
        sections: [
          {
            heading: 'Призначення',
            body: [
              'Сайт Core призначений для перегляду можливостей бота, публічних шаблонів, довідки команд і допоміжних інструментів для Discord.',
              'Інструменти надаються як є. Користувач відповідає за дані, які вставляє, копіює або надсилає через webhook.'
            ]
          },
          {
            heading: 'Редактор вебхуків',
            body: [
              'Користувач повинен мати право використовувати вказаний webhook URL.',
              'Заборонено використовувати редактор для спаму, фішингу, шкідливих посилань, порушення правил Discord або прав інших людей.'
            ]
          },
          {
            heading: 'Шаблони та матеріали',
            body: [
              'Публічні шаблони можна використовувати як основу для Discord-сервера, але перед застосуванням їх потрібно перевірити під свій проєкт.',
              'Core не гарантує, що кожен шаблон підійде кожному серверу без ручного налаштування.'
            ]
          },
          {
            heading: 'Відповідальність',
            body: [
              'Сайт може тимчасово працювати з помилками, якщо недоступні GitHub Pages, Discord, API бота або зовнішній proxy.',
              'Використання сайту означає згоду з тим, що користувач сам перевіряє результат перед відправленням або застосуванням.'
            ]
          }
        ]
      },
      de: {
        title: 'Core Website-Nutzungsbedingungen',
        description: 'Regeln für die Nutzung der Core-Website, des öffentlichen Katalogs, der Kopierwerkzeuge und des Webhook-Editors.',
        sections: [
          {
            heading: 'Zweck',
            body: [
              'Die Core-Website dient zum Anzeigen von Bot-Funktionen, öffentlichen Vorlagen, Befehlshilfe und Discord-Werkzeugen.',
              'Die Werkzeuge werden wie besehen bereitgestellt. Nutzer sind für Daten verantwortlich, die sie einfügen, kopieren oder per Webhook senden.'
            ]
          },
          {
            heading: 'Webhook-Editor',
            body: [
              'Der Nutzer muss berechtigt sein, die angegebene Webhook-URL zu verwenden.',
              'Der Editor darf nicht für Spam, Phishing, schädliche Links, Verstöße gegen Discord-Regeln oder Rechte anderer Personen genutzt werden.'
            ]
          },
          {
            heading: 'Vorlagen und Inhalte',
            body: [
              'Öffentliche Vorlagen können als Grundlage für einen Discord-Server genutzt werden, sollten aber vor der Anwendung geprüft werden.',
              'Core garantiert nicht, dass jede Vorlage ohne manuelle Anpassung zu jedem Server passt.'
            ]
          },
          {
            heading: 'Haftung',
            body: [
              'Die Website kann vorübergehend fehlschlagen, wenn GitHub Pages, Discord, die Bot-API oder ein externer Proxy nicht verfügbar ist.',
              'Mit der Nutzung der Website stimmt der Nutzer zu, Ergebnisse vor dem Senden oder Anwenden selbst zu prüfen.'
            ]
          }
        ]
      }
    },
    botPrivacy: {
      ru: {
        title: 'Политика конфиденциальности бота Core',
        description: 'Какие данные Discord-бот Core обрабатывает для команд, шаблонов, отката, фидбека и модерации.',
        sections: [
          {
            heading: 'Какие данные может обрабатывать бот',
            body: [
              'Core обрабатывает Discord ID пользователя, сервера, канала, роли и сообщения, когда это нужно для выполнения команды или события Discord.',
              'Для шаблонов серверов, ролей и правил бот может читать структуру сервера: названия каналов и ролей, порядок, права, темы каналов и похожие настройки.',
              'Для фидбека и предложений шаблонов бот обрабатывает текст, файл или краткое описание, которое отправил пользователь.'
            ]
          },
          {
            heading: 'Хранение',
            body: [
              'Часть данных хранится в MongoDB для работы функций: публичные шаблоны, рейтинги, настройки, временные снимки отката, уровни и служебные записи.',
              'Снимок отката хранится ограниченное время и удаляется после истечения срока. JSON для импорта, экспорта и отката шифруется там, где эта защита включена в боте.',
              'Публичные шаблоны после публикации становятся доступными другим пользователям через команды и сайт.'
            ]
          },
          {
            heading: 'Передача данных',
            body: [
              'Core не продает пользовательские данные.',
              'Данные могут передаваться Discord через API Discord, MongoDB как базе данных проекта и техническому хостингу, на котором запущен бот.',
              'Сообщения фидбека и предложений отправляются владельцу или в служебный канал Core для проверки.'
            ]
          },
          {
            heading: 'Права пользователя',
            body: [
              'Владелец сервера может удалить бота с сервера, чтобы прекратить дальнейшую обработку событий этого сервера.',
              'По вопросам удаления публичного шаблона, фидбека или спорной записи обращайтесь через официальный сервер Core.'
            ]
          }
        ]
      },
      en: {
        title: 'Core Bot Privacy Policy',
        description: 'What data the Core Discord bot handles for commands, templates, rollback, feedback and moderation.',
        sections: [
          {
            heading: 'Data handled by the bot',
            body: [
              'Core processes Discord user, server, channel, role and message IDs when required to execute a command or handle a Discord event.',
              'For server, role and rule templates, the bot may read server structure: channel and role names, order, permissions, channel topics and similar settings.',
              'For feedback and template suggestions, the bot processes the text, file or short description submitted by the user.'
            ]
          },
          {
            heading: 'Storage',
            body: [
              'Some data is stored in MongoDB for bot features: public templates, ratings, settings, temporary rollback snapshots, levels and service records.',
              'Rollback snapshots are stored for a limited time and deleted after expiration. JSON used for import, export and rollback is encrypted where that protection is enabled in the bot.',
              'Published public templates become available to other users through commands and the website.'
            ]
          },
          {
            heading: 'Sharing',
            body: [
              'Core does not sell user data.',
              'Data may be transmitted to Discord through the Discord API, to MongoDB as the project database and to the technical hosting provider that runs the bot.',
              'Feedback and suggestion messages are sent to the owner or to a Core service channel for review.'
            ]
          },
          {
            heading: 'User choices',
            body: [
              'A server owner may remove the bot from a server to stop further event processing for that server.',
              'For removing a public template, feedback item or disputed record, contact Core through the official server.'
            ]
          }
        ]
      },
      ua: {
        title: 'Політика конфіденційності бота Core',
        description: 'Які дані Discord-бот Core обробляє для команд, шаблонів, відкоту, фідбеку та модерації.',
        sections: [
          {
            heading: 'Які дані обробляє бот',
            body: [
              'Core обробляє Discord ID користувача, сервера, каналу, ролі та повідомлення, коли це потрібно для виконання команди або події Discord.',
              'Для шаблонів серверів, ролей і правил бот може читати структуру сервера: назви каналів і ролей, порядок, права, теми каналів та схожі налаштування.',
              'Для фідбеку та пропозицій шаблонів бот обробляє текст, файл або короткий опис, який надіслав користувач.'
            ]
          },
          {
            heading: 'Зберігання',
            body: [
              'Частина даних зберігається в MongoDB для роботи функцій: публічні шаблони, рейтинги, налаштування, тимчасові знімки відкоту, рівні та службові записи.',
              'Знімок відкоту зберігається обмежений час і видаляється після завершення строку. JSON для імпорту, експорту та відкоту шифрується там, де цей захист увімкнено в боті.',
              'Опубліковані публічні шаблони стають доступними іншим користувачам через команди та сайт.'
            ]
          },
          {
            heading: 'Передача даних',
            body: [
              'Core не продає дані користувачів.',
              'Дані можуть передаватися Discord через Discord API, MongoDB як базі даних проєкту та технічному хостингу, на якому запущено бота.',
              'Фідбек і пропозиції надсилаються власнику або в службовий канал Core для перевірки.'
            ]
          },
          {
            heading: 'Права користувача',
            body: [
              'Власник сервера може видалити бота з сервера, щоб припинити подальшу обробку подій цього сервера.',
              'Щодо видалення публічного шаблону, фідбеку або спірного запису звертайтеся через офіційний сервер Core.'
            ]
          }
        ]
      },
      de: {
        title: 'Core Bot-Datenschutz',
        description: 'Welche Daten der Core Discord-Bot für Befehle, Vorlagen, Rollback, Feedback und Moderation verarbeitet.',
        sections: [
          {
            heading: 'Verarbeitete Bot-Daten',
            body: [
              'Core verarbeitet Discord-IDs von Nutzern, Servern, Kanälen, Rollen und Nachrichten, wenn dies für Befehle oder Discord-Ereignisse nötig ist.',
              'Für Server-, Rollen- und Regelvorlagen kann der Bot Serverstrukturen lesen: Kanal- und Rollennamen, Reihenfolge, Rechte, Kanalthemen und ähnliche Einstellungen.',
              'Für Feedback und Vorlagenvorschläge verarbeitet der Bot den vom Nutzer gesendeten Text, die Datei oder Kurzbeschreibung.'
            ]
          },
          {
            heading: 'Speicherung',
            body: [
              'Einige Daten werden in MongoDB gespeichert: öffentliche Vorlagen, Bewertungen, Einstellungen, temporäre Rollback-Snapshots, Level und technische Einträge.',
              'Rollback-Snapshots werden zeitlich begrenzt gespeichert und danach gelöscht. JSON für Import, Export und Rollback wird verschlüsselt, wo diese Schutzfunktion im Bot aktiviert ist.',
              'Veröffentlichte öffentliche Vorlagen sind anschließend über Befehle und Website für andere Nutzer verfügbar.'
            ]
          },
          {
            heading: 'Weitergabe',
            body: [
              'Core verkauft keine Nutzerdaten.',
              'Daten können über die Discord API an Discord, an MongoDB als Projektdatenbank und an den technischen Hosting-Anbieter des Bots übertragen werden.',
              'Feedback und Vorschläge werden an den Besitzer oder an einen Core-Servicekanal zur Prüfung gesendet.'
            ]
          },
          {
            heading: 'Nutzerrechte',
            body: [
              'Ein Serverbesitzer kann den Bot vom Server entfernen, um die weitere Ereignisverarbeitung für diesen Server zu beenden.',
              'Für die Entfernung öffentlicher Vorlagen, Feedbacks oder strittiger Einträge kontaktieren Sie Core über den offiziellen Server.'
            ]
          }
        ]
      }
    },
    botTerms: {
      ru: {
        title: 'Условия пользования ботом Core',
        description: 'Правила использования Discord-бота Core на серверах, в шаблонах, командах импорта и публичных предложениях.',
        sections: [
          {
            heading: 'Использование бота',
            body: [
              'Добавлять Core на сервер можно только если у пользователя есть право управлять этим сервером или разрешение владельца сервера.',
              'Для работы функций боту нужны права Discord. Если прав недостаточно, часть команд может работать неполно или возвращать ошибку.'
            ]
          },
          {
            heading: 'Команды импорта, экспорта и отката',
            body: [
              'Команды, которые меняют структуру сервера, должны использоваться осторожно. Перед подтверждением нужно проверить превью и выбранные параметры.',
              'Откат доступен только в пределах установленного времени и зависит от того, разрешил ли Discord восстановить или удалить конкретные объекты.'
            ]
          },
          {
            heading: 'Публичные шаблоны и предложения',
            body: [
              'Пользователь не должен отправлять шаблоны с вредоносными ссылками, чужими приватными данными, оскорбительным содержимым или нарушением правил Discord.',
              'Core может отклонить, удалить или изменить публичный шаблон, если он небезопасен, вводит в заблуждение или нарушает правила проекта.'
            ]
          },
          {
            heading: 'Ответственность',
            body: [
              'Бот предоставляется как есть. Возможны ошибки Discord API, ограничения прав, лимиты скорости и временная недоступность хостинга.',
              'Используя бота, владелец сервера соглашается проверять изменения перед применением и отвечает за итоговые настройки своего сервера.'
            ]
          }
        ]
      },
      en: {
        title: 'Core Bot Terms of Use',
        description: 'Rules for using the Core Discord bot on servers, in templates, import commands and public suggestions.',
        sections: [
          {
            heading: 'Using the bot',
            body: [
              'Core may be added to a server only by someone who has permission to manage that server or approval from the server owner.',
              'Bot features require Discord permissions. If permissions are missing, some commands may be incomplete or return an error.'
            ]
          },
          {
            heading: 'Import, export and rollback commands',
            body: [
              'Commands that change server structure must be used carefully. Review the preview and selected options before confirming.',
              'Rollback is available only within the configured time window and depends on whether Discord allows restoring or deleting specific objects.'
            ]
          },
          {
            heading: 'Public templates and suggestions',
            body: [
              'Users must not submit templates containing malicious links, private data that is not theirs, abusive content or Discord rule violations.',
              'Core may reject, remove or edit a public template if it is unsafe, misleading or violates project rules.'
            ]
          },
          {
            heading: 'Responsibility',
            body: [
              'The bot is provided as is. Discord API errors, permission limits, rate limits and hosting outages may happen.',
              'By using the bot, the server owner agrees to review changes before applying them and remains responsible for the final server configuration.'
            ]
          }
        ]
      },
      ua: {
        title: 'Умови користування ботом Core',
        description: 'Правила використання Discord-бота Core на серверах, у шаблонах, командах імпорту та публічних пропозиціях.',
        sections: [
          {
            heading: 'Використання бота',
            body: [
              'Додавати Core на сервер можна лише якщо користувач має право керувати цим сервером або дозвіл власника сервера.',
              'Для роботи функцій боту потрібні права Discord. Якщо прав недостатньо, частина команд може працювати неповно або повертати помилку.'
            ]
          },
          {
            heading: 'Імпорт, експорт і відкат',
            body: [
              'Команди, які змінюють структуру сервера, потрібно використовувати обережно. Перед підтвердженням перевіряйте превью та вибрані параметри.',
              'Відкат доступний лише в межах встановленого часу і залежить від того, чи дозволить Discord відновити або видалити конкретні об’єкти.'
            ]
          },
          {
            heading: 'Публічні шаблони та пропозиції',
            body: [
              'Користувач не повинен надсилати шаблони зі шкідливими посиланнями, чужими приватними даними, образливим вмістом або порушенням правил Discord.',
              'Core може відхилити, видалити або змінити публічний шаблон, якщо він небезпечний, вводить в оману або порушує правила проєкту.'
            ]
          },
          {
            heading: 'Відповідальність',
            body: [
              'Бот надається як є. Можливі помилки Discord API, обмеження прав, rate limit і тимчасова недоступність хостингу.',
              'Використовуючи бота, власник сервера погоджується перевіряти зміни перед застосуванням і відповідає за фінальні налаштування свого сервера.'
            ]
          }
        ]
      },
      de: {
        title: 'Core Bot-Nutzungsbedingungen',
        description: 'Regeln für die Nutzung des Core Discord-Bots auf Servern, in Vorlagen, Importbefehlen und öffentlichen Vorschlägen.',
        sections: [
          {
            heading: 'Bot-Nutzung',
            body: [
              'Core darf nur von Personen zu einem Server hinzugefügt werden, die diesen Server verwalten dürfen oder die Zustimmung des Serverbesitzers haben.',
              'Bot-Funktionen benötigen Discord-Rechte. Fehlen Rechte, können Befehle unvollständig sein oder Fehler zurückgeben.'
            ]
          },
          {
            heading: 'Import, Export und Rollback',
            body: [
              'Befehle, die Serverstrukturen ändern, müssen sorgfältig genutzt werden. Vorschau und Optionen sind vor der Bestätigung zu prüfen.',
              'Rollback ist nur innerhalb des festgelegten Zeitfensters verfügbar und hängt davon ab, ob Discord das Wiederherstellen oder Löschen bestimmter Objekte erlaubt.'
            ]
          },
          {
            heading: 'Öffentliche Vorlagen und Vorschläge',
            body: [
              'Nutzer dürfen keine Vorlagen mit schädlichen Links, fremden privaten Daten, beleidigenden Inhalten oder Verstößen gegen Discord-Regeln einreichen.',
              'Core kann öffentliche Vorlagen ablehnen, entfernen oder bearbeiten, wenn sie unsicher, irreführend oder regelwidrig sind.'
            ]
          },
          {
            heading: 'Verantwortung',
            body: [
              'Der Bot wird wie besehen bereitgestellt. Discord-API-Fehler, Berechtigungslimits, Rate Limits und Hosting-Ausfälle können auftreten.',
              'Mit der Nutzung des Bots stimmt der Serverbesitzer zu, Änderungen vor der Anwendung zu prüfen und für die finale Serverkonfiguration verantwortlich zu bleiben.'
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
          <a class="button primary" data-official-server-url href="https://discord.gg/FjfZkHEuyv">${escapeHtml(labels.officialServer)}</a>
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
          <p><a data-official-server-url href="https://discord.gg/FjfZkHEuyv">https://discord.gg/FjfZkHEuyv</a></p>
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
