// ════════════════════════════════════════════════════════════════════════
//  🦊  مشاريعي  |  MY PROJECTS
// ════════════════════════════════════════════════════════════════════════
//
//  ▶ ازاي تضيف مشروع جديد؟ (سهلة جداً)
//    1. انسخ أي بلوك من البلوكات اللي تحت (من "{" لـ "},").
//    2. الصقه فوق أو تحت أي مشروع جوه القوسين [ ... ].
//    3. غيّر القيم بتاعتك وبس. خلاص المشروع هيظهر في الموقع.
//
//  ▶ الحقول (fields):
//    name        : اسم المشروع            (مطلوب)
//    description : وصف قصير                (مطلوب)
//    tags        : التقنيات المستخدمة      (مطلوب - Array)
//    url         : لينك المشروع (Live)     (مطلوب)
//    github      : لينك الكود (اختياري - سيبه فاضي "" لو مفيش)
//    image       : صورة المشروع (اختياري) - ممكن لينك كامل https://...
//    year        : السنة (اختياري) - بيظهر كـ badge
//    featured    : true = المشروع يظهر مميّز وبأول القائمة (اختياري)
//    country     : البلد على الجلوب: egypt | ksa | uae | usa (اختياري)
//
//  💡 نسخة فاضية جاهزة للنسخ (Template) في آخر الملف.
// ════════════════════════════════════════════════════════════════════════

export const projects = [
  {
    name: "Afnan Zaki — Creative Portfolio",
    country: "egypt",
    description:
      "An interactive, scroll-driven portfolio for a content creator built around a 'growing tree' metaphor — a seed sprouts in the intro, the trunk grows as you scroll, branches carry each project, and the roots cradle the contact section. Cinematic GSAP animation with a wooden lightbox and full mobile support.",
    tags: ["React", "Vite", "Tailwind CSS", "GSAP", "ScrollTrigger", "NestJS", "Creative Direction"],
    url: "",
    github: "",
    image: "/images/afnan-portfolio.png",
    year: "2026",
    featured: true,
  },
  {
    name: "Red Development",
    country: "egypt",
    description:
      "A sleek real estate landing page created using React, Vite, and Tailwind CSS. Features smooth animations, responsive layouts, and user engagement forms powered by Email.js, with direct Excel export functionality.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "ScrollTrigger.js", "Email.js", "Excel Export"],
    url: "https://www.redmindsdev.com/",
    github: "",
    image: "/images/RedDev.png",
    year: "2024",
    featured: true,
  },
  {
    name: "Mr Foxy",
    country: "egypt",
    description:
      "Mr Foxy is a modern and responsive developer portfolio built with cutting-edge technologies including Vite and Node.js. It showcases my skills, projects, and experience in a visually appealing manner.",
    tags: ["Vite", "Node.js", "Express", "JSON", "Framer Motion", "styled-components"],
    url: "https://foxy-dev-website.vercel.app/",
    github: "https://github.com/foxydev/fitness-tracker",
    image: "/images/Mr-foxy.png",
    year: "2025",
    featured: true,
  },
  {
    name: "5min Investment",
    country: "uae",
    description:
      "A company profile for 5min Investment — a collaborative task management and communication platform tailored for long-term investment planning.",
    tags: ["WordPress", "Animate.js", "ScrollTrigger.js", "SQL", "PHP", "Plugin Development"],
    url: "https://5minvestment.com/",
    github: "https://github.com/foxydev/task-manager",
    image: "/images/5mininv.png",
    year: "2024",
  },
  {
    name: "Real Estate Marketplace",
    country: "usa",
    description:
      "A platform connecting property buyers, sellers, and agents with property listings, virtual tours, and mortgage calculators.",
    tags: ["CMS", "WordPress", "JavaScript", "PHP", "Plugin Development"],
    url: "https://realestate.foxydev.com",
    github: "https://github.com/foxydev/real-estate",
    image: "/images/Elite-homes.png",
    year: "2023",
  },
  {
    name: "Mountain View",
    country: "egypt",
    description:
      "A modern, animated real estate landing page built with React, Vite, and Tailwind CSS. It collects user data via Email.js and exports to Excel without a backend.",
    tags: ["React", "Vite", "Tailwind CSS", "Animate.js", "ScrollTrigger.js", "Email.js", "Excel Integration"],
    url: "https://mountainview.sale/",
    github: "https://github.com/foxydev/task-manager",
    image: "/images/Mountine-view.png",
    year: "2024",
  },
  {
    name: "Acito",
    country: "ksa",
    description:
      "An elegant, high-converting landing page for a premium real estate brand. Built with React and Tailwind CSS, with interactive animations and lead collection via Email.js and Excel export, all without a backend.",
    tags: ["React", "Vite", "Tailwind CSS", "Animate.js", "GSAP", "Email.js", "No Backend Excel Export"],
    url: "https://redmindsdev.com/Actio/",
    github: "",
    image: "/images/Actio.png",
    year: "2024",
  },

  // ────────────────────────────────────────────────────────────────────
  //  👇 اضف مشاريعك الجديدة هنا. انسخ التمبلت ده وغيّر القيم:
  // ────────────────────────────────────────────────────────────────────
  // {
  //   name: "اسم المشروع",
  //   description: "وصف قصير للمشروع.",
  //   tags: ["React", "Node.js"],
  //   url: "https://...",
  //   github: "",              // سيبه "" لو مفيش كود
  //   image: "",              // لينك صورة أو سيبه فاضي
  //   year: "2026",
  //   featured: false,         // خليه true لو عايزه يظهر مميّز
  //   country: "egypt",        // egypt | ksa | uae | usa
  // },
];

export default projects;
