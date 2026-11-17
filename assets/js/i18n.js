/* ==========================================================================
   Baye Aly Elhadj — i18n (fr / en / ar)
   ========================================================================== */
(function () {
  "use strict";

  const STORAGE_KEY = "ba-lang";
  const SUPPORTED = ["fr", "en", "ar"];
  const CODE = { fr: "FR", en: "EN", ar: "AR" };

  const TRANSLATIONS = {
    fr: {
      "meta.title": "Baye Aly Elhadj — Développeur Web & Mobile",
      "meta.description":
        "Portfolio de Baye Aly Elhadj, développeur web et mobile, étudiant en 3ᵉ année en Développement des Systèmes d'Information à SupNum, Nouakchott.",
      "meta.ogTitle": "Baye Aly Elhadj — Développeur Web & Mobile",
      "meta.ogDescription":
        "Étudiant en Systèmes d'Information à SupNum (Nouakchott). Python, Django, React, Flutter.",

      "name": "Baye Aly Elhadj",
      "role.short": "Développeur Web & Mobile",
      "action.cv": "CV",
      "action.downloadCv": "Télécharger le CV (PDF)",

      "nav.profil": "Profil",
      "nav.skills": "Compétences",
      "nav.projects": "Projets",
      "nav.education": "Formation",
      "nav.contact": "Contact",

      "hero.status": "Disponible · Nouakchott",
      "hero.first": "Baye Aly",
      "hero.last": "Elhadj",
      "hero.role": "Développeur",
      "hero.word1": "web",
      "hero.word2": "mobile",
      "hero.word3": "full-stack",
      "hero.roleSr": "web et mobile, full-stack",
      "hero.lead":
        "Étudiant en 3ᵉ année en Développement des Systèmes d'Information à <strong>SupNum</strong>, Nouakchott. Je conçois des applications web et mobiles avec Python, JavaScript, PHP et Dart.",
      "hero.cta": "Discutons d'un projet",

      "stats.year": "Année",
      "stats.yearValue": '<span class="count" data-count="3">3</span><sup>e</sup> <small>à SupNum</small>',
      "stats.languages": "Langages",
      "stats.languagesValue": '<span class="count" data-count="6">6</span> <small>maîtrisés</small>',
      "stats.frameworks": "Frameworks",
      "stats.frameworksValue": '<span class="count" data-count="6">6</span> <small>utilisés</small>',
      "stats.projects": "Projets",
      "stats.projectsValue": '<span class="count" data-count="3">3</span> <small>réalisés</small>',

      "photo.alt": "Portrait de Baye Aly Elhadj sur la plage à Nouakchott",
      "photo.caption": "Nouakchott, Mauritanie",
      "float.school": "Systèmes d'Information",
      "float.stack": "Web & Mobile",
      "float.stackSub": "Full-stack · Flutter",

      "sec.profil": "Profil",
      "profil.title": 'Curieux de nature,<br /><span class="gradient-text">rigoureux par méthode.</span>',
      "profil.p1":
        "Étudiant en 3ᵉ année à l'<strong>Institut Supérieur du Numérique (SupNum)</strong> de Nouakchott, spécialisé dans le développement des systèmes d'information. Passionné par le développement web et mobile, je maîtrise plusieurs langages et frameworks modernes.",
      "profil.p2":
        "Je cherche à mettre en pratique mes compétences dans des projets concrets : sites web, applications de gestion ou applications mobiles — avec une attention particulière portée à la clarté du code et à l'expérience utilisateur.",
      "profil.focus1": "Applications web full-stack",
      "profil.focus2": "Applications mobiles Flutter",
      "profil.focus3": "Systèmes d'information & gestion",
      "profil.link": "Travaillons ensemble",

      "info.title": "Informations",
      "info.badge": "Ouvert aux opportunités",
      "info.education": "Formation",
      "info.educationValue": "SupNum — Nouakchott",
      "info.specialty": "Spécialité",
      "info.specialtyValue": "Systèmes d'Information · 3ᵉ année",
      "info.email": "E-mail",
      "info.phone": "Téléphone / WhatsApp",
      "info.availability": "Disponibilité",
      "info.availabilityValue": "Stage / Projet académique",

      "sec.skills": "Compétences",
      "skills.title": 'Une stack pour<br /><span class="gradient-text">passer de l\'idée au produit.</span>',
      "skills.lead":
        "Des langages aux outils, l'ensemble des technologies que j'utilise au quotidien dans mes cours et mes projets personnels.",
      "skills.langs": "Langages",
      "skills.langsCount": "6 technologies",
      "skills.frameworks": "Frameworks",
      "skills.frameworksCount": "6 technologies",
      "skills.databases": "Bases de données",
      "skills.databasesCount": "4 systèmes",
      "skills.tools": "Outils & environnements",
      "skills.toolsCount": "4 outils",
      "skills.dbNote": "Modélisation, requêtes SQL et intégration aux applications web.",
      "skills.toolsNote": "Versioning, tests d'API et développement mobile Android.",

      "sec.projects": "Projets",
      "projects.title": 'Sélection de<br /><span class="gradient-text">projets académiques.</span>',
      "projects.lead":
        "Des applications pensées pour répondre à des besoins réels : gestion, services universitaires et productivité.",
      "projects.p1.top": "Web full-stack",
      "projects.p1.title": "Gestion des pharmacies",
      "projects.p1.desc":
        "Application de gestion des stocks, commandes et ventes pour pharmacies, avec une interface web full-stack.",
      "projects.p1.tag1": "Stocks",
      "projects.p1.tag2": "Commandes",
      "projects.p1.tag3": "Ventes",
      "projects.p2.top": "Semestre 3",
      "projects.p2.title": "Restaurants universitaires",
      "projects.p2.desc":
        "Système de gestion des tickets repas et des services du restaurant universitaire — projet intégrateur du Semestre 3.",
      "projects.p2.tag1": "Tickets repas",
      "projects.p2.tag2": "Services",
      "projects.p2.tag3": "Intégrateur",
      "projects.p3.top": "Flutter · Dart",
      "projects.p3.desc":
        "Application bloc-notes mobile développée avec Flutter et Dart : gestion des notes, CRUD complet et interface responsive.",
      "projects.p3.tag3": "UI responsive",
      "projects.view": "Voir sur GitHub",
      "projects.ctaText": "D'autres projets et expérimentations sont disponibles sur mon GitHub.",
      "projects.ctaButton": "Explorer le GitHub",

      "sec.education": "Formation",
      "education.title": 'Parcours<br /><span class="gradient-text">universitaire.</span>',
      "education.year": "2024 — En cours",
      "education.badge": "En cours",
      "education.school": "Institut Supérieur du Numérique",
      "education.program": "Développement des Systèmes d'Information",
      "education.place": "SupNum — Nouakchott",
      "education.note":
        "Formation orientée pratique : algorithmique, développement web et mobile, bases de données et conduite de projets.",

      "sec.languages": "Langues",
      "languages.title": 'Communiquer<br /><span class="gradient-text">sans frontière.</span>',
      "languages.ar": "Arabe",
      "languages.arLevel": "Langue maternelle",
      "languages.arAria": "Niveau : langue maternelle",
      "languages.fr": "Français",
      "languages.frLevel": "Courant · langue d'enseignement",
      "languages.frAria": "Niveau : courant",
      "languages.en": "Anglais",
      "languages.enLevel": "Bonne connaissance · lecture technique",
      "languages.enAria": "Niveau : bonne connaissance",

      "sec.contact": "Contact",
      "contact.title": "Une idée, <br />un projet à construire ?",
      "contact.lead":
        "Je suis disponible pour un projet académique ou professionnel. Écrivez-moi : je réponds rapidement, en français, en arabe ou en anglais.",
      "contact.emailBtn": "Envoyer un e-mail",
      "contact.email": "E-mail",
      "contact.phone": "Téléphone",
      "contact.location": "Localisation",
      "contact.locationValue": "Nouakchott, Mauritanie",

      "footer.email": "E-mail",
      "footer.cv": "CV (PDF)",
      "footer.copyrightStart": "©",
      "footer.copyrightEnd": "Baye Aly Elhadj · Nouakchott",

      "a11y.skip": "Aller au contenu",
      "a11y.mainNav": "Navigation principale",
      "a11y.mobileNav": "Navigation mobile",
      "a11y.footerNav": "Liens de pied de page",
      "a11y.lang": "Langue",
      "a11y.copy": "Copier l'adresse e-mail",
      "a11y.toTop": "Revenir en haut",
      "a11y.themeLight": "Passer au thème clair",
      "a11y.themeDark": "Passer au thème sombre",
      "a11y.menuOpen": "Ouvrir le menu",
      "a11y.menuClose": "Fermer le menu",

      "toast.copied": "Adresse e-mail copiée ✓",
      "toast.copyFail": "Copie impossible — ",

      "lang.label": "Langue",
    },

    en: {
      "meta.title": "Baye Aly Elhadj — Web & Mobile Developer",
      "meta.description":
        "Portfolio of Baye Aly Elhadj, web and mobile developer, third-year Information Systems Development student at SupNum, Nouakchott.",
      "meta.ogTitle": "Baye Aly Elhadj — Web & Mobile Developer",
      "meta.ogDescription":
        "Information Systems student at SupNum (Nouakchott). Python, Django, React, Flutter.",

      "name": "Baye Aly Elhadj",
      "role.short": "Web & Mobile Developer",
      "action.cv": "CV",
      "action.downloadCv": "Download CV (PDF)",

      "nav.profil": "Profile",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.education": "Education",
      "nav.contact": "Contact",

      "hero.status": "Available · Nouakchott",
      "hero.first": "Baye Aly",
      "hero.last": "Elhadj",
      "hero.role": "Developer",
      "hero.word1": "web",
      "hero.word2": "mobile",
      "hero.word3": "full-stack",
      "hero.roleSr": "web and mobile, full-stack",
      "hero.lead":
        "Third-year Information Systems Development student at <strong>SupNum</strong>, Nouakchott. I build web and mobile applications with Python, JavaScript, PHP and Dart.",
      "hero.cta": "Let's talk about a project",

      "stats.year": "Year",
      "stats.yearValue": '<span class="count" data-count="3">3</span><sup>rd</sup> <small>at SupNum</small>',
      "stats.languages": "Languages",
      "stats.languagesValue": '<span class="count" data-count="6">6</span> <small>mastered</small>',
      "stats.frameworks": "Frameworks",
      "stats.frameworksValue": '<span class="count" data-count="6">6</span> <small>in use</small>',
      "stats.projects": "Projects",
      "stats.projectsValue": '<span class="count" data-count="3">3</span> <small>completed</small>',

      "photo.alt": "Portrait of Baye Aly Elhadj on the beach in Nouakchott",
      "photo.caption": "Nouakchott, Mauritania",
      "float.school": "Information Systems",
      "float.stack": "Web & Mobile",
      "float.stackSub": "Full-stack · Flutter",

      "sec.profil": "Profile",
      "profil.title": 'Curious by nature,<br /><span class="gradient-text">rigorous by method.</span>',
      "profil.p1":
        "Third-year student at the <strong>Institut Supérieur du Numérique (SupNum)</strong> in Nouakchott, specializing in information systems development. Passionate about web and mobile development, I work with several modern languages and frameworks.",
      "profil.p2":
        "I want to put my skills into practice on concrete projects: websites, management applications or mobile apps — with particular attention to clean code and user experience.",
      "profil.focus1": "Full-stack web applications",
      "profil.focus2": "Flutter mobile applications",
      "profil.focus3": "Information systems & management",
      "profil.link": "Let's work together",

      "info.title": "Information",
      "info.badge": "Open to opportunities",
      "info.education": "Education",
      "info.educationValue": "SupNum — Nouakchott",
      "info.specialty": "Specialization",
      "info.specialtyValue": "Information Systems · 3rd year",
      "info.email": "Email",
      "info.phone": "Phone / WhatsApp",
      "info.availability": "Availability",
      "info.availabilityValue": "Internship / Academic project",

      "sec.skills": "Skills",
      "skills.title": 'A stack to<br /><span class="gradient-text">turn ideas into products.</span>',
      "skills.lead":
        "From languages to tools — everything I use daily in my coursework and personal projects.",
      "skills.langs": "Languages",
      "skills.langsCount": "6 technologies",
      "skills.frameworks": "Frameworks",
      "skills.frameworksCount": "6 technologies",
      "skills.databases": "Databases",
      "skills.databasesCount": "4 systems",
      "skills.tools": "Tools & environments",
      "skills.toolsCount": "4 tools",
      "skills.dbNote": "Data modeling, SQL queries and integration into web applications.",
      "skills.toolsNote": "Version control, API testing and Android mobile development.",

      "sec.projects": "Projects",
      "projects.title": 'A selection of<br /><span class="gradient-text">academic projects.</span>',
      "projects.lead":
        "Applications built around real needs: management, university services and productivity.",
      "projects.p1.top": "Web full-stack",
      "projects.p1.title": "Pharmacy management",
      "projects.p1.desc":
        "Stock, order and sales management application for pharmacies, with a full-stack web interface.",
      "projects.p1.tag1": "Inventory",
      "projects.p1.tag2": "Orders",
      "projects.p1.tag3": "Sales",
      "projects.p2.top": "Semester 3",
      "projects.p2.title": "University restaurants",
      "projects.p2.desc":
        "Meal-ticket and service management system for the university restaurant — Semester 3 capstone project.",
      "projects.p2.tag1": "Meal tickets",
      "projects.p2.tag2": "Services",
      "projects.p2.tag3": "Capstone",
      "projects.p3.top": "Flutter · Dart",
      "projects.p3.desc":
        "Mobile notes app built with Flutter and Dart — note management, full CRUD and a responsive UI.",
      "projects.p3.tag3": "Responsive UI",
      "projects.view": "View on GitHub",
      "projects.ctaText": "More projects and experiments are available on my GitHub.",
      "projects.ctaButton": "Explore GitHub",

      "sec.education": "Education",
      "education.title": 'Academic<br /><span class="gradient-text">background.</span>',
      "education.year": "2024 — Present",
      "education.badge": "Ongoing",
      "education.school": "Institut Supérieur du Numérique",
      "education.program": "Information Systems Development",
      "education.place": "SupNum — Nouakchott",
      "education.note":
        "Practice-oriented program: algorithms, web and mobile development, databases and project management.",

      "sec.languages": "Languages",
      "languages.title": 'Communicate<br /><span class="gradient-text">without borders.</span>',
      "languages.ar": "Arabic",
      "languages.arLevel": "Native language",
      "languages.arAria": "Level: native language",
      "languages.fr": "French",
      "languages.frLevel": "Fluent · language of instruction",
      "languages.frAria": "Level: fluent",
      "languages.en": "English",
      "languages.enLevel": "Good knowledge · technical reading",
      "languages.enAria": "Level: good knowledge",

      "sec.contact": "Contact",
      "contact.title": "An idea, <br />a project to build?",
      "contact.lead":
        "I'm available for an academic or professional project. Write to me — I reply quickly in French, Arabic or English.",
      "contact.emailBtn": "Send an email",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.location": "Location",
      "contact.locationValue": "Nouakchott, Mauritania",

      "footer.email": "Email",
      "footer.cv": "CV (PDF)",
      "footer.copyrightStart": "©",
      "footer.copyrightEnd": "Baye Aly Elhadj · Nouakchott",

      "a11y.skip": "Skip to content",
      "a11y.mainNav": "Main navigation",
      "a11y.mobileNav": "Mobile navigation",
      "a11y.footerNav": "Footer links",
      "a11y.lang": "Language",
      "a11y.copy": "Copy email address",
      "a11y.toTop": "Back to top",
      "a11y.themeLight": "Switch to light theme",
      "a11y.themeDark": "Switch to dark theme",
      "a11y.menuOpen": "Open menu",
      "a11y.menuClose": "Close menu",

      "toast.copied": "Email address copied ✓",
      "toast.copyFail": "Could not copy — ",

      "lang.label": "Language",
    },

    ar: {
      "meta.title": "باي علي الحاج — مطوّر ويب وموبايل",
      "meta.description":
        "ملف أعمال باي علي الحاج، مطوّر ويب وموبايل، طالب في السنة الثالثة لتطوير نظم المعلومات في المعهد العالي للرقمنة (SupNum)، نواكشوط.",
      "meta.ogTitle": "باي علي الحاج — مطوّر ويب وموبايل",
      "meta.ogDescription":
        "طالب في نظم المعلومات بالمعهد العالي للرقمنة (SupNum) بنواكشوط. Python، Django، React، Flutter.",

      "name": "باي علي الحاج",
      "role.short": "مطوّر ويب وموبايل",
      "action.cv": "السيرة الذاتية",
      "action.downloadCv": "تحميل السيرة الذاتية (PDF)",

      "nav.profil": "نبذة",
      "nav.skills": "المهارات",
      "nav.projects": "المشاريع",
      "nav.education": "التكوين",
      "nav.contact": "تواصل",

      "hero.status": "متاح · نواكشوط",
      "hero.first": "باي علي",
      "hero.last": "الحاج",
      "hero.role": "مطوّر",
      "hero.word1": "ويب",
      "hero.word2": "موبايل",
      "hero.word3": "متكامل",
      "hero.roleSr": "ويب وموبايل، تطوير متكامل",
      "hero.lead":
        "طالب في السنة الثالثة لتطوير نظم المعلومات في <strong>المعهد العالي للرقمنة (SupNum)</strong> بنواكشوط. أطوّر تطبيقات ويب وموبايل باستخدام Python وJavaScript وPHP وDart.",
      "hero.cta": "لنتحدث عن مشروعك",

      "stats.year": "السنة",
      "stats.yearValue": '<span class="count" data-count="3">3</span> <small>في SupNum</small>',
      "stats.languages": "اللغات",
      "stats.languagesValue": '<span class="count" data-count="6">6</span> <small>لغات برمجية</small>',
      "stats.frameworks": "الأطر",
      "stats.frameworksValue": '<span class="count" data-count="6">6</span> <small>أطر عمل</small>',
      "stats.projects": "المشاريع",
      "stats.projectsValue": '<span class="count" data-count="3">3</span> <small>مشاريع منجزة</small>',

      "photo.alt": "صورة باي علي الحاج على شاطئ نواكشوط",
      "photo.caption": "نواكشوط، موريتانيا",
      "float.school": "نظم المعلومات",
      "float.stack": "ويب وموبايل",
      "float.stackSub": "تطوير متكامل · Flutter",

      "sec.profil": "نبذة",
      "profil.title": 'فضولي بالفطرة،<br /><span class="gradient-text">دقيق في المنهج.</span>',
      "profil.p1":
        "طالب في السنة الثالثة في <strong>المعهد العالي للرقمنة (SupNum)</strong> بنواكشوط، متخصص في تطوير نظم المعلومات. شغوف بتطوير الويب والموبايل، وأتقن عدة لغات وأطر عمل حديثة.",
      "profil.p2":
        "أسعى إلى تطبيق مهاراتي في مشاريع ملموسة: مواقع ويب، تطبيقات إدارة أو تطبيقات موبايل — مع اهتمام خاص بوضوح الشيفرة وتجربة المستخدم.",
      "profil.focus1": "تطبيقات ويب متكاملة",
      "profil.focus2": "تطبيقات موبايل بـ Flutter",
      "profil.focus3": "نظم المعلومات والإدارة",
      "profil.link": "لنعمل معًا",

      "info.title": "معلومات",
      "info.badge": "متاح للفرص",
      "info.education": "التكوين",
      "info.educationValue": "SupNum — نواكشوط",
      "info.specialty": "التخصص",
      "info.specialtyValue": "نظم المعلومات · السنة الثالثة",
      "info.email": "البريد الإلكتروني",
      "info.phone": "الهاتف / واتساب",
      "info.availability": "التوفر",
      "info.availabilityValue": "تدريب / مشروع أكاديمي",

      "sec.skills": "المهارات",
      "skills.title": 'حزمة تقنيات<br /><span class="gradient-text">تحوّل الفكرة إلى منتج.</span>',
      "skills.lead":
        "من لغات البرمجة إلى الأدوات، هذه كل التقنيات التي أستخدمها يوميًا في دراستي ومشاريعي الشخصية.",
      "skills.langs": "لغات البرمجة",
      "skills.langsCount": "6 تقنيات",
      "skills.frameworks": "أطر العمل",
      "skills.frameworksCount": "6 تقنيات",
      "skills.databases": "قواعد البيانات",
      "skills.databasesCount": "4 أنظمة",
      "skills.tools": "الأدوات والبيئات",
      "skills.toolsCount": "4 أدوات",
      "skills.dbNote": "النمذجة، استعلامات SQL ودمجها في تطبيقات الويب.",
      "skills.toolsNote": "إدارة الإصدارات، اختبار واجهات API وتطوير تطبيقات Android.",

      "sec.projects": "المشاريع",
      "projects.title": 'مختارات من<br /><span class="gradient-text">المشاريع الأكاديمية.</span>',
      "projects.lead": "تطبيقات مصممة لتلبية احتياجات حقيقية: الإدارة، الخدمات الجامعية والإنتاجية.",
      "projects.p1.top": "ويب متكامل",
      "projects.p1.title": "إدارة الصيدليات",
      "projects.p1.desc":
        "تطبيق لإدارة المخزون والطلبات والمبيعات في الصيدليات، بواجهة ويب متكاملة.",
      "projects.p1.tag1": "المخزون",
      "projects.p1.tag2": "الطلبات",
      "projects.p1.tag3": "المبيعات",
      "projects.p2.top": "الفصل الثالث",
      "projects.p2.title": "مطاعم جامعية",
      "projects.p2.desc":
        "نظام لإدارة تذاكر الوجبات وخدمات المطعم الجامعي — مشروع شامل للفصل الثالث.",
      "projects.p2.tag1": "تذاكر الوجبات",
      "projects.p2.tag2": "الخدمات",
      "projects.p2.tag3": "مشروع شامل",
      "projects.p3.top": "Flutter · Dart",
      "projects.p3.desc":
        "تطبيق ملاحظات للموبايل مطوّر بـ Flutter وDart: إدارة الملاحظات، CRUD كامل وواجهة متجاوبة.",
      "projects.p3.tag3": "واجهة متجاوبة",
      "projects.view": "عرض على GitHub",
      "projects.ctaText": "المزيد من المشاريع والتجارب متاحة على حسابي في GitHub.",
      "projects.ctaButton": "استكشف GitHub",

      "sec.education": "التكوين",
      "education.title": 'المسار<br /><span class="gradient-text">الجامعي.</span>',
      "education.year": "2024 — حتى الآن",
      "education.badge": "جارٍ",
      "education.school": "المعهد العالي للرقمنة",
      "education.program": "تطوير نظم المعلومات",
      "education.place": "SupNum — نواكشوط",
      "education.note":
        "تكوين قائم على التطبيق العملي: الخوارزميات، تطوير الويب والموبايل، قواعد البيانات وإدارة المشاريع.",

      "sec.languages": "اللغات",
      "languages.title": 'التواصل<br /><span class="gradient-text">بلا حدود.</span>',
      "languages.ar": "العربية",
      "languages.arLevel": "اللغة الأم",
      "languages.arAria": "المستوى: اللغة الأم",
      "languages.fr": "الفرنسية",
      "languages.frLevel": "بطلاقة · لغة التدريس",
      "languages.frAria": "المستوى: بطلاقة",
      "languages.en": "الإنجليزية",
      "languages.enLevel": "معرفة جيدة · قراءة تقنية",
      "languages.enAria": "المستوى: معرفة جيدة",

      "sec.contact": "تواصل",
      "contact.title": "فكرة،<br />أم مشروع نبنيه معًا؟",
      "contact.lead":
        "متاح لمشروع أكاديمي أو مهني. راسلني: أرد بسرعة بالعربية أو الفرنسية أو الإنجليزية.",
      "contact.emailBtn": "أرسل بريدًا إلكترونيًا",
      "contact.email": "البريد الإلكتروني",
      "contact.phone": "الهاتف",
      "contact.location": "الموقع",
      "contact.locationValue": "نواكشوط، موريتانيا",

      "footer.email": "البريد",
      "footer.cv": "السيرة الذاتية (PDF)",
      "footer.copyrightStart": "©",
      "footer.copyrightEnd": "باي علي الحاج · نواكشوط",

      "a11y.skip": "الانتقال إلى المحتوى",
      "a11y.mainNav": "التنقل الرئيسي",
      "a11y.mobileNav": "تنقل الهاتف",
      "a11y.footerNav": "روابط التذييل",
      "a11y.lang": "اللغة",
      "a11y.copy": "نسخ البريد الإلكتروني",
      "a11y.toTop": "العودة إلى الأعلى",
      "a11y.themeLight": "التبديل إلى الوضع الفاتح",
      "a11y.themeDark": "التبديل إلى الوضع الداكن",
      "a11y.menuOpen": "افتح القائمة",
      "a11y.menuClose": "أغلق القائمة",

      "toast.copied": "تم نسخ البريد الإلكتروني ✓",
      "toast.copyFail": "تعذّر النسخ — ",

      "lang.label": "اللغة",
    },
  };

  let current = "fr";

  function normalize(lang) {
    return SUPPORTED.indexOf(lang) !== -1 ? lang : "fr";
  }

  function t(key) {
    const dict = TRANSLATIONS[current] || TRANSLATIONS.fr;
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    if (Object.prototype.hasOwnProperty.call(TRANSLATIONS.fr, key)) return TRANSLATIONS.fr[key];
    return key;
  }

  function setMeta(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function updateSwitchers(lang) {
    const code = CODE[lang] || "FR";
    const currentEl = document.getElementById("langCurrent");
    if (currentEl) currentEl.textContent = code;

    document.querySelectorAll("#langMenu [data-lang]").forEach(function (option) {
      option.setAttribute("aria-selected", String(option.getAttribute("data-lang") === lang));
    });

    document.querySelectorAll(".lang-seg [data-lang]").forEach(function (button) {
      const active = button.getAttribute("data-lang") === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-lang]").forEach(function (el) {
      if (el.matches("#langMenu [data-lang]")) return;
      if (el.closest(".lang-seg")) return;
    });
  }

  function applyLanguage(lang, options) {
    const opts = options || {};
    lang = normalize(lang);
    current = lang;

    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    root.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
    });

    document.title = t("meta.title");
    setMeta('meta[name="description"]', "content", t("meta.description"));
    setMeta('meta[property="og:title"]', "content", t("meta.ogTitle"));
    setMeta('meta[property="og:description"]', "content", t("meta.ogDescription"));
    setMeta('meta[property="og:locale"]', "content", lang === "ar" ? "ar_MR" : lang === "en" ? "en_US" : "fr_FR");

    updateSwitchers(lang);

    if (opts.persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (err) {
        /* storage unavailable */
      }
    }

    document.dispatchEvent(
      new CustomEvent("ba:languagechange", { detail: { lang: lang } })
    );
  }

  /* ---------- Language switchers ---------- */
  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");

  function closeLangMenu() {
    if (!langMenu || !langBtn) return;
    langMenu.hidden = true;
    langBtn.setAttribute("aria-expanded", "false");
  }

  function openLangMenu() {
    if (!langMenu || !langBtn) return;
    langMenu.hidden = false;
    langBtn.setAttribute("aria-expanded", "true");
    const selected = langMenu.querySelector('[aria-selected="true"]');
    if (selected) selected.focus({ preventScroll: true });
  }

  if (langBtn && langMenu) {
    langBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      if (langMenu.hidden) openLangMenu();
      else closeLangMenu();
    });

    langMenu.addEventListener("click", function (event) {
      const option = event.target.closest("[data-lang]");
      if (!option) return;
      applyLanguage(option.getAttribute("data-lang"));
      closeLangMenu();
      langBtn.focus({ preventScroll: true });
    });

    langMenu.addEventListener("keydown", function (event) {
      const options = Array.from(langMenu.querySelectorAll("[data-lang]"));
      const index = options.indexOf(document.activeElement);
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const next =
          event.key === "ArrowDown"
            ? options[(index + 1) % options.length]
            : options[(index - 1 + options.length) % options.length];
        if (next) next.focus();
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (index !== -1) {
          applyLanguage(options[index].getAttribute("data-lang"));
          closeLangMenu();
          langBtn.focus({ preventScroll: true });
        }
      }
      if (event.key === "Escape") {
        closeLangMenu();
        langBtn.focus({ preventScroll: true });
      }
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest("#langSwitch")) closeLangMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeLangMenu();
    });
  }

  document.querySelectorAll(".lang-seg [data-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.getAttribute("data-lang"));
    });
  });

  /* ---------- Public API ---------- */
  window.I18N = {
    t: t,
    apply: applyLanguage,
    get lang() {
      return current;
    },
    supported: SUPPORTED.slice(),
  };

  /* ---------- Initialise ---------- */
  let initial = "fr";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) {
      initial = stored;
    } else {
      const nav = (navigator.language || "fr").toLowerCase();
      initial = nav.indexOf("ar") === 0 ? "ar" : nav.indexOf("en") === 0 ? "en" : "fr";
    }
  } catch (err) {
    /* storage unavailable */
  }

  applyLanguage(initial, { persist: false });
})();
