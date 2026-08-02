// ════════════════════════════════════════════════════════════════════════
//  ⚡ خدماتي | MY SERVICES  (BackinFront)
// ════════════════════════════════════════════════════════════════════════
//
//  ▶ ازاي تضيف/تعدّل خدمة؟
//    كل خدمة بلوك واحد. عدّل النصوص en/ar براحتك وبس.
//
//  ▶ الحقول:
//    id       : معرّف فريد (للـ anchors واللينكات)
//    icon     : svg path أو رمز (بيتحدد في الصفحة حسب الـ id)
//    accent   : 'cyan' | 'violet'  — لون توهّج الكارت
//    en / ar  : { title, tagline, description, points[] }
// ════════════════════════════════════════════════════════════════════════

export const services = [
  {
    id: 'website',
    accent: 'cyan',
    en: {
      title: 'Website Development',
      tagline: 'Your business, live on the web',
      description:
        'Corporate sites, landing pages and e-commerce built with modern stacks (React, WordPress, Node.js) — fast, responsive, SEO-ready and designed to convert visitors into clients.',
      points: [
        'Landing pages that convert',
        'Corporate & company profiles',
        'E-commerce & booking systems',
        'Speed, SEO & analytics built-in',
      ],
    },
    ar: {
      title: 'تطوير المواقع',
      tagline: 'شغلك لايف على الإنترنت',
      description:
        'مواقع شركات، صفحات هبوط ومتاجر إلكترونية بأحدث التقنيات (React, WordPress, Node.js) — سريعة، متجاوبة مع كل الشاشات، مهيّأة لمحركات البحث، ومصمَّمة تحوّل الزائر لعميل.',
      points: [
        'صفحات هبوط بتحوّل الزائر لعميل',
        'مواقع تعريفية للشركات',
        'متاجر إلكترونية وأنظمة حجز',
        'سرعة + SEO + تحليلات جاهزة',
      ],
    },
  },
  {
    id: 'deployment',
    accent: 'violet',
    en: {
      title: 'Deployment & DevOps',
      tagline: 'From your machine to the world',
      description:
        'I take your project from code to a live, stable product: domains, SSL, CI/CD pipelines, monitoring and zero-downtime releases on Vercel, Netlify or your own server.',
      points: [
        'Domain, SSL & DNS setup',
        'CI/CD automated releases',
        'Monitoring & uptime alerts',
        'Performance tuning',
      ],
    },
    ar: {
      title: 'النشر والتشغيل (Deployment)',
      tagline: 'من جهازك… للعالم كله',
      description:
        'بآخد مشروعك من الكود لمنتج شغّال ومستقر على الإنترنت: دومين، شهادات SSL، خطوط نشر تلقائية CI/CD، ومراقبة مستمرة — على Vercel أو Netlify أو سيرفرك الخاص.',
      points: [
        'إعداد الدومين والـ SSL والـ DNS',
        'نشر تلقائي CI/CD',
        'مراقبة وتنبيهات استمرارية',
        'تحسين الأداء والسرعة',
      ],
    },
  },
  {
    id: 'crm',
    accent: 'cyan',
    en: {
      title: 'CRM Development',
      tagline: 'Never lose a customer again',
      description:
        'A Customer Relationship Management system tracks every lead, call and deal in one place — so your sales team follows up on time and you see your whole pipeline in a single dashboard.',
      points: [
        'Lead capture & follow-up tracking',
        'Sales pipeline & deal stages',
        'Team tasks & reminders',
        'Reports & conversion analytics',
      ],
    },
    ar: {
      title: 'تطوير أنظمة CRM',
      tagline: 'مفيش عميل هيضيع منك تاني',
      description:
        'نظام إدارة علاقات العملاء بيجمع كل عميل ومكالمة وصفقة في مكان واحد — فريق المبيعات يتابع في معاده، وانت شايف الـ pipeline كله في داشبورد واحدة.',
      points: [
        'تسجيل الليدز ومتابعتها',
        'مراحل البيع والصفقات',
        'مهام الفريق والتذكيرات',
        'تقارير وتحليلات التحويل',
      ],
    },
  },
  {
    id: 'lms',
    accent: 'violet',
    en: {
      title: 'LMS Development',
      tagline: 'Your knowledge, packaged & sold',
      description:
        'A Learning Management System lets you host courses, enroll students, run quizzes and issue certificates — your own academy platform, fully branded and under your control.',
      points: [
        'Courses, lessons & video hosting',
        'Student accounts & progress',
        'Quizzes, grades & certificates',
        'Subscriptions & payments',
      ],
    },
    ar: {
      title: 'تطوير منصات تعليمية LMS',
      tagline: 'علمك يتحوّل لمنصة بتبيع',
      description:
        'نظام إدارة تعلُّم يخليك تنشر كورسات، تسجّل طلاب، تعمل اختبارات وتصدر شهادات — أكاديميتك الخاصة بهويتك وتحت سيطرتك بالكامل.',
      points: [
        'كورسات ودروس وفيديوهات',
        'حسابات الطلاب ومتابعة التقدّم',
        'اختبارات ودرجات وشهادات',
        'اشتراكات ومدفوعات',
      ],
    },
  },
  {
    id: 'erp',
    accent: 'cyan',
    en: {
      title: 'ERP Development',
      tagline: 'Run the whole company from one screen',
      description:
        'An Enterprise Resource Planning system connects inventory, accounting, purchasing, HR and sales in one platform — no more scattered Excel sheets, everything synced in real time.',
      points: [
        'Inventory & warehouse control',
        'Accounting & invoicing',
        'HR, payroll & attendance',
        'Real-time company dashboards',
      ],
    },
    ar: {
      title: 'تطوير أنظمة ERP',
      tagline: 'شركتك كلها من شاشة واحدة',
      description:
        'نظام تخطيط موارد المؤسسات بيربط المخزون والحسابات والمشتريات والموارد البشرية والمبيعات في منصة واحدة — وداعاً لملفات الإكسل المبعثرة، كل حاجة متزامنة لحظياً.',
      points: [
        'إدارة المخزون والمخازن',
        'الحسابات والفواتير',
        'الموارد البشرية والمرتبات',
        'داشبوردات لحظية للشركة',
      ],
    },
  },
  {
    id: 'automation',
    accent: 'violet',
    en: {
      title: 'Automation Development',
      tagline: 'Let the robots do the boring work',
      description:
        'I automate the repetitive work that eats your day: data entry, report generation, WhatsApp/Email notifications, API integrations and bots — your systems talk to each other while you sleep.',
      points: [
        'Workflow & task automation',
        'API integrations between tools',
        'Bots & auto-notifications',
        'Scheduled reports & backups',
      ],
    },
    ar: {
      title: 'تطوير الأتمتة (Automation)',
      tagline: 'سيب الشغل الممل للروبوتات',
      description:
        'بأتمتة الشغل المتكرر اللي بياكل يومك: إدخال بيانات، تقارير تلقائية، إشعارات واتساب وإيميل، وربط الأنظمة ببعض عن طريق APIs — أنظمتك بتكلم بعضها وانت نايم.',
      points: [
        'أتمتة المهام والـ workflows',
        'ربط الأنظمة عن طريق APIs',
        'بوتات وإشعارات تلقائية',
        'تقارير ونسخ احتياطي مجدولة',
      ],
    },
  },
  {
    id: 'vps',
    accent: 'cyan',
    en: {
      title: 'VPS Servers & Hosting',
      tagline: 'Your own private piece of the cloud',
      description:
        'Setup and management of private servers: hardened security, firewalls, backups, Docker environments and performance tuning — full control at a fraction of big-cloud costs.',
      points: [
        'Server setup & hardening',
        'Docker & environments',
        'Automated backups',
        'Security & firewall config',
      ],
    },
    ar: {
      title: 'سيرفرات VPS واستضافة',
      tagline: 'قطعتك الخاصة من السحابة',
      description:
        'إعداد وإدارة سيرفرات خاصة: تأمين وحماية، جدران نارية، نسخ احتياطي، بيئات Docker وضبط أداء — تحكّم كامل بتكلفة أقل بكتير من السحابات الكبيرة.',
      points: [
        'إعداد السيرفر وتأمينه',
        'بيئات Docker',
        'نسخ احتياطي تلقائي',
        'حماية وجدران نارية',
      ],
    },
  },
];

export default services;
