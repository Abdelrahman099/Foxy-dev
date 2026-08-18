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
    url: "https://afnan-portfolio-one.vercel.app/",
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
    image: "/images/5mininv.png",
    year: "2024",
  },
  {
    name: "Real Estate Marketplace",
    country: "usa",
    description:
      "A platform connecting property buyers, sellers, and agents with property listings, virtual tours, and mortgage calculators.",
    tags: ["CMS", "WordPress", "JavaScript", "PHP", "Plugin Development"],
    url: "https://elite-homes.net",
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

  // ════════════════════════════════════════════════════════════════════
  //  منصات وداشبوردات — ديمو حي على Vercel
  //  كل واحد شغّال ببيانات عرض محلية (من غير باك-إند)، فاللينك هيفضل
  //  شغّال دايماً. الصور مأخوذة من الديمو المرفوع نفسه.
  // ════════════════════════════════════════════════════════════════════
  {
    name: "Meridian Health — Hospital Command Center",
    country: "ksa",
    description:
      "A real-time command centre for a multi-hospital network: live emergency-department load, ICU and ward bed occupancy across eleven facilities, triage-level breakdowns, admissions and mortuary tracking, plus surge-season capacity planning. Twenty screens with role-based access, full dark mode, and Arabic/English support.",
    tags: ["React", "TypeScript", "Material UI", "ApexCharts", "React Query", "Vite", "Dashboard Design"],
    url: "https://pulse-health-command.vercel.app",
    github: "",
    image: "/images/meridian-health.png",
    year: "2026",
    featured: true,
  },
  {
    name: "Sentinel General — Bed & Emergency Management",
    country: "ksa",
    description:
      "Operations platform for a general hospital covering bed management, emergency intake, OPD flow and facility master data. Built around a mocked service layer so every screen stays interactive without a backend — appointments, occupancy and patient movement all respond live.",
    tags: ["React", "TypeScript", "Material UI", "Axios", "Recharts", "Vite"],
    url: "https://medbridge-ops.vercel.app",
    github: "",
    image: "/images/sentinel-beds.png",
    year: "2026",
    featured: true,
  },
  {
    name: "NutriPlan — Clinical Nutrition Platform",
    country: "egypt",
    description:
      "End-to-end platform for dietitians: client files with lab results and medication history, meal-plan builder with macro targets, a recipe and ingredient library, appointment calendar, and a reporting suite. Includes an insights assistant that answers questions about the clinic's own data — caseload, retention, BMI spread — computing every figure from the dataset rather than calling out to a model.",
    tags: ["React", "TypeScript", "Material UI", "FullCalendar", "React Query", "Vite", "Data Visualisation"],
    url: "https://nutriplan-clinical.vercel.app",
    github: "",
    image: "/images/nutriplan.png",
    year: "2026",
    featured: true,
  },
  {
    name: "Basirah360 — Enterprise BI Suite",
    country: "ksa",
    description:
      "A suite of executive dashboards spanning finance, HR, procurement, contracts, manufacturing and clinical operations — each with its own KPI set, drill-downs and comparison views. Dark-first design with a light theme, built to read clearly on wall-mounted screens as well as laptops.",
    tags: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts", "Vite"],
    url: "https://insightgrid-chi.vercel.app",
    github: "",
    image: "/images/basirah360.png",
    year: "2026",
  },
  {
    name: "ContractLens — Contracts Dashboard",
    country: "ksa",
    description:
      "Contract portfolio dashboard: total value, active and expiring agreements, distribution by region, type and status, and a value-over-time trend. Fully right-to-left Arabic interface with a matching dark theme.",
    tags: ["React", "TypeScript", "Material UI", "ApexCharts", "RTL / Arabic", "Vite"],
    url: "https://contractlens-orcin.vercel.app",
    github: "",
    image: "/images/contractlens.png",
    year: "2026",
  },
  {
    name: "NexaBoard — Project Management Suite",
    country: "egypt",
    description:
      "Team project management with role-based access for admins, team leads and developers: project and task boards, client records, analytics and built-in chat. Sign-in resolves locally so the demo is fully explorable.",
    tags: ["React", "TypeScript", "Material UI", "Context API", "Role-Based Access", "CRA"],
    url: "https://nexaboard-indol.vercel.app",
    github: "",
    image: "/images/nexaboard.png",
    year: "2026",
  },
  {
    name: "Axiom — Compliance & Quality Consultancy",
    country: "uae",
    description:
      "Corporate site for a regulatory consultancy covering service lines in testing, validation, compliance and advisory, plus a news section. Built on a Vite + Express starter with scroll-reveal motion throughout and a fully responsive layout.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Express", "Framer Motion", "Vite"],
    url: "https://axiom-compliance.vercel.app",
    github: "",
    image: "/images/axiom-compliance.png",
    year: "2026",
  },
  {
    name: "Mr. Gray — Digital Architect",
    country: "egypt",
    description:
      "A stark monochrome personal portfolio built around oversized typography and a single continuous scroll. Every section is one uninterrupted black canvas, with the name set at display scale as the anchor.",
    tags: ["React", "TypeScript", "Vite", "CSS Animation", "Typography"],
    url: "https://monochrome-studio-one.vercel.app",
    github: "",
    image: "/images/monochrome-studio.png",
    year: "2026",
  },
  {
    name: "NACRE — Dental Atelier",
    country: "egypt",
    description:
      "Website for a cosmetic and restorative dental practice: treatment pages, clinician profiles, a consented before/after case gallery, journal and booking flow. Built on Next.js with a token-driven design system and a strict no-PII boundary throughout.",
    tags: ["Next.js", "TypeScript", "Design Tokens", "Motion", "SEO", "Accessibility"],
    url: "https://pearl-dental-mu.vercel.app",
    github: "",
    image: "/images/nacre-dental.png",
    year: "2026",
    featured: true,
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
