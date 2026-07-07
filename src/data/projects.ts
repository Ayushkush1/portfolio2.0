export type ProjectCategory = "All" | "SaaS & Automation" | "CRM / ERP" | "UI/UX" | "Websites";

export interface ProjectStats {
  label: string;
  value: string;
}

export interface SliderItem {
  image: string;
  url: string;
  name: string;
}

export interface FeaturedProduct {
  id: string;
  name: string;
  tagline: string;
  category: string;
  problem: string;
  solution: string;
  role: string;
  outcome: string;
  techStack: string[];
  sliderItems: SliderItem[];
  url?: string;
  isLarge?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  sliderItems: SliderItem[];
  videoUrl?: string;
  stats?: ProjectStats[];
  techStack?: string[];
  url?: string;
  isLarge?: boolean;
}

// Featured Products — shown on homepage Showcase
export const featuredProducts: FeaturedProduct[] = [
  {
    id: "catfy",
    name: "CATFY",
    tagline: "AI-Powered Catalogue Platform",
    category: "SaaS Platform",
    problem: "Businesses struggled to create and share digital product catalogues without expensive design tools or technical expertise.",
    solution: "Built a full SaaS platform where businesses create, manage, and share beautiful digital catalogues with AI-assisted content generation.",
    role: "Solo Full-Stack Engineer & Product Designer",
    outcome: "Live platform with 10k+ catalogue views, cutting product listing time by 70%.",
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS", "AI APIs"],
    sliderItems: [
      { image: "/assets/Catfy_LandignPage1.webp", url: "https://catfy-catalog.vercel.app", name: "CATFY Landing" },
      { image: "/assets/Catfy_LandignPage2.webp", url: "https://catfy-catalog.vercel.app", name: "CATFY Landing" },
      { image: "/assets/Catfy_LandignPage3.webp", url: "https://catfy-catalog.vercel.app", name: "CATFY Landing" },
      { image: "/assets/Catfy_LandignPage4.webp", url: "https://catfy-catalog.vercel.app", name: "CATFY Landing" },
      
    ],
    url: "https://catfy-catalog.vercel.app",
    isLarge: true,
  },
  {
    id: "leadzenor",
    name: "Leadzenor",
    tagline: "Lead Management Platform",
    category: "CRM / SaaS",
    problem: "Sales teams were managing leads in spreadsheets, losing prospects and lacking visibility into their pipeline.",
    solution: "Designed and built a CRM platform with lead tracking, pipeline management, follow-up automation, and analytics dashboard.",
    role: "Full-Stack Engineer & UI/UX Designer",
    outcome: "Reduced lead response time by 60% and improved pipeline visibility for 3+ sales teams.",
    techStack: ["React", "Node.js", "PostgreSQL", "Prisma", "Supabase"],
    sliderItems: [
      { image: "/assets/Leadzenor_LandingPage1.webp", url: "#", name: "Leadzenor Landing" },
      { image: "/assets/Leadzenor_LandingPage2.webp", url: "#", name: "Leadzenor Landing" },
      { image: "/assets/Leadzenor_LandingPage3.webp", url: "#", name: "Leadzenor Landing" },
      { image: "/assets/Leadzenor_LandingPage4.webp", url: "#", name: "Leadzenor Landing" },
      { image: "/assets/Leadzenor_Dashboard.webp", url: "#", name: "Leadzenor Dashboard" },
    ],
    url: "#",
  },
  {
    id: "karatrix",
    name: "Karatrix",
    tagline: "Jewellery ERP Platform",
    category: "ERP System",
    problem: "A jewellery business was tracking inventory, billing, and orders across physical ledgers and disconnected spreadsheets.",
    solution: "Built a complete ERP system covering inventory management, billing, customer profiles, and sales reporting fully cloud-based.",
    role: "Full-Stack Engineer - Architecture, Backend & Frontend",
    outcome: "Eliminated manual ledger errors, saving 15+ hours/week and enabling real-time inventory tracking.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    sliderItems: [
      { image: "/assets/Karatrix_LandingPage1.webp", url: "#", name: "Karatrix Platform" },
      { image: "/assets/Karatrix_LandingPage2.webp", url: "#", name: "Karatrix Platform" },
      { image: "/assets/Karatrix_Dashboard.webp", url: "#", name: "Karatrix Dashboard" },
    ],
    url: "#",
    isLarge: true,
  },
  {
    id: "ip-erp",
    name: "IP ERP",
    tagline: "Enterprise Workflow Platform",
    category: "Enterprise ERP",
    problem: "A growing enterprise lacked a unified system to manage operations, approvals, task assignments, and reporting across departments.",
    solution: "Engineered a modular ERP platform with role-based access, workflow automation, real-time notifications, and cross-department reporting.",
    role: "Tech Lead & Full-Stack Engineer",
    outcome: "Streamlined operations across 5+ departments, reducing approval cycles by 45%.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "GitHub Actions"],
    sliderItems: [
      { image: "/assets/Erp_LandinPage1.webp", url: "#", name: "IP ERP Platform" },
      { image: "/assets/Erp_LandinPage2.webp", url: "#", name: "IP ERP Platform" },
      { image: "/assets/Erp_Dashboard.webp", url: "#", name: "IP ERP Dashboard" },
    ],
    url: "#",
    isLarge: true,
  },
];
// Legacy showcase projects (kept for portfolio page compatibility)
export const showcaseProjects: Project[] = [
  {
    id: "saas-automation",
    title: "Complex Systems, Simplified.",
    description: "Building comprehensive SaaS platforms that automate manual workflows and streamline entire offline systems into powerful digital experiences.",
    category: "SaaS & Automation",
    sliderItems: [
      { image: "/assets/Catfy_LandignPage1.webp", url: "https://catfy-catalog.vercel.app", name: "Catfy Catalog SaaS" },
      { image: "/assets/neatroots.webp", url: "https://neatroot.vercel.app", name: "NeatRoots ERP" },
      { image: "/assets/EricHost1.webp", url: "https://main.erichost.app", name: "Erichost Dashboard" }
    ],
    stats: [
      { label: "Active Users", value: "10k+" },
      { label: "Uptime", value: "99.9%" }
    ],
    techStack: ["React", "Node.js", "MongoDB", "PostgreSQL"],
    url: "/portfolio?category=saas",
    isLarge: true,
  },
  {
    id: "crm-erp",
    title: "Enterprise Grade CRM & ERP.",
    description: "Transforming offline billing, inventory spreadsheets, and disjointed systems into unified, highly scalable cloud ERPs.",
    category: "CRM / ERP",
    sliderItems: [
      { image: "/assets/neatroots.webp", url: "https://neatroot.vercel.app", name: "NeatRoots ERP" },
      { image: "/assets/Catfy_LandignPage1.webp", url: "https://catfy-catalog.vercel.app", name: "Catfy Internal" },
      { image: "/assets/coding-pandas.webp", url: "https://coding-pandas.vercel.app", name: "EdTech CRM" }
    ],
    stats: [
      { label: "Efficiency", value: "+45%" },
      { label: "Hours Saved", value: "120/mo" }
    ],
    techStack: ["Next.js", "PostgreSQL", "Prisma"],
    url: "/portfolio?category=crm",
  },
  {
    id: "ui-ux",
    title: "Immersive UI/UX Design.",
    description: "Designing sleek, modern, and highly convertible user interfaces with premium aesthetics, micro-interactions, and flawless UX.",
    category: "UI/UX",
    sliderItems: [
      { image: "/assets/EricHost1.webp", url: "https://main.erichost.app", name: "Erichost" },
      { image: "/assets/Catfy_LandignPage1.webp", url: "https://catfy-catalog.vercel.app", name: "Catfy Landing" },
      { image: "/assets/coding-pandas.webp", url: "https://coding-pandas.vercel.app", name: "Coding Pandas" }
    ],
    stats: [
      { label: "Conversion", value: "+22%" },
      { label: "Bounce Rate", value: "-15%" }
    ],
    techStack: ["Figma", "Framer Motion", "React"],
    url: "/portfolio?category=ui-ux",
    isLarge: true,
  },
  {
    id: "websites",
    title: "High-Performance Websites.",
    description: "Developing blazing fast landing pages, corporate websites, and interactive EdTech platforms designed for scalable global reach.",
    category: "Websites",
    sliderItems: [
      { image: "/assets/coding-pandas.webp", url: "https://coding-pandas.vercel.app", name: "Coding Pandas" },
      { image: "/assets/neatroots.webp", url: "https://neatroot.vercel.app", name: "NeatRoots Site" },
      { image: "/assets/EricHost1.webp", url: "https://main.erichost.app", name: "EricHost" }
    ],
    stats: [
      { label: "Reach", value: "50k+" },
      { label: "Performance", value: "99/100" }
    ],
    techStack: ["Next.js", "Tailwind CSS", "GSAP"],
    url: "/portfolio?category=websites",
  }
];

export interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  status: string;
  color: string;
  overview: string;
  challenge: string;
  solution: string;
  designDecisions: string[];
  architecture: string;
  role: string;
  outcome: string;
  techStack: string[];
  images: string[];
  liveUrl: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "catfy",
    name: "CATFY",
    tagline: "AI-Powered Catalogue Platform",
    category: "SaaS Platform",
    year: "2024",
    status: "Live",
    color: "#ff5f26",
    overview: "CATFY is a full-stack SaaS platform that empowers businesses to create, manage, and share professional digital catalogues — without any design expertise. Businesses can add products, generate AI-assisted descriptions, and share branded catalogues with clients via link.",
    challenge: "Small and medium-sized businesses were losing significant sales opportunities due to slow, manual catalogue creation workflows. Typically, cataloguing involved designing static PDF files in Canva or PowerPoint, exporting them, and manually emailing or sending them to clients. This workflow was plagued by key challenges: static files could not be updated in real time when prices or stock levels changed, large PDFs were difficult to send over mobile messaging apps, and businesses had absolutely no visibility or analytics to track which products clients spent time looking at or clicked on.",
    solution: "Developed a comprehensive, multi-tenant SaaS architecture offering a fluid, drag-and-drop catalogue builder interfaces alongside in-context generative AI assistance. The system enables business owners to instantly create responsive digital catalogues that adapt beautifully to all screens. Integrated features include automatic AI-powered product description writing, lightning-fast real-time database updates for dynamic pricing, integrated messaging links for direct client inquiries, and a robust client-side analytics tracking system that monitors user interaction, catalogue views, and popular products.",
    designDecisions: [
      "Chose a card-based builder UX to minimize the learning curve for non-technical users.",
      "Implemented AI description generation directly in-context to reduce friction.",
      "Dark dashboard theme with brand-color accents for a premium SaaS feel."
    ],
    architecture: "Next.js frontend with React server components, PostgreSQL via Prisma ORM, Supabase for auth and file storage, Vercel deployment with edge functions for fast global performance.",
    role: "Solo Full-Stack Engineer & Product Designer — architecture, UI/UX design, backend APIs, database schema, and deployment.",
    outcome: "Live platform with 10k+ catalogue views. Businesses report 70% reduction in time spent creating product listings.",
    techStack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Tailwind CSS", "Vercel"],
    images: ["/assets/Catfy_LandignPage1.webp", "/assets/Catfy_LandignPage2.webp", "/assets/Catfy_LandignPage3.webp"],
    liveUrl: "https://catfy-catalog.vercel.app"
  },
  {
    id: "leadzenor",
    name: "Leadzenor",
    tagline: "Lead Management Platform",
    category: "CRM / SaaS",
    year: "2025",
    status: "Live",
    color: "#10b981",
    overview: "Leadzenor is a CRM-style lead management platform built for small sales teams. It provides a centralized pipeline view, lead status tracking, follow-up reminders, and team-level analytics — all in a clean, fast interface.",
    challenge: "Sales teams and small business agencies were severely struggling to track prospects, relying on fragmented systems like Excel spreadsheets, paper notes, and WhatsApp conversations. This manual tracking was highly error-prone, resulting in crucial follow-ups being missed, slow client response times, and zero transparency for management. Sales managers had no real-time dashboard or data to view individual rep pipeline statuses, leading to lost revenue and inefficient lead-to-deal conversion cycles.",
    solution: "Designed and engineered an intuitive, real-time Kanban-style pipeline platform with smooth drag-and-drop capabilities to visually move leads through custom pipeline stages. Created a centralized notifications and reminders service to automate lead follow-up prompts. Implemented a robust manager dashboard displaying team-level conversion metrics, average response times, and sales rep performance graphs. Built with a highly secure multi-user role permission model allowing fine-grained access control between admins, managers, and sales reps.",
    designDecisions: [
      "Kanban board as the primary view for intuitive pipeline visualization.",
      "Color-coded lead statuses for fast at-a-glance pipeline health.",
      "Minimal sidebar navigation to keep focus on the pipeline."
    ],
    architecture: "React frontend with custom hooks for real-time state, Node.js/Express REST API, PostgreSQL with Prisma, Supabase for auth, and Docker for containerized deployment.",
    role: "Full-Stack Engineer & UI/UX Designer — designed the full product flow in Figma, built frontend and backend, and handled deployment.",
    outcome: "Reduced lead response time by 60% for active users. Currently used by 3+ sales teams with positive feedback on UX simplicity.",
    techStack: ["React", "Node.js", "PostgreSQL", "Prisma", "Supabase", "Docker", "Tailwind CSS"],
    images: ["/assets/Leadzenor_LandingPage1.webp", "/assets/Leadzenor_LandingPage2.webp", "/assets/Leadzenor_LandingPage3.webp"],
    liveUrl: "#"
  },
  {
    id: "karatrix",
    name: "Karatrix",
    tagline: "Jewellery ERP Platform",
    category: "ERP System",
    year: "2025",
    status: "In Use",
    color: "#a855f7",
    overview: "Karatrix is a purpose-built ERP system for jewellery businesses. It digitizes inventory management, billing, customer accounts, and sales reporting — replacing a fully manual physical ledger system.",
    challenge: "A traditional luxury jewellery retail store was operating entirely on physical handwritten ledgers, calculators, and scattered spreadsheets. This created critical vulnerabilities: calculating metal weight, gold/silver purity rate conversions, and making billing calculations manually led to frequent invoice errors. Finding customer transaction histories took hours, stock auditing was extremely slow, and there was no way to track precise real-time inventory levels across various categories (karatage, weight, stone types, making charges).",
    solution: "Engineered a highly customizable and secure cloud-based ERP system tailored for jewellery dynamics. Built a weight-based inventory module that tracks products by metal type, weight, stone details, making charge percentages, and gold rates updated daily via API. Developed a fast, automated billing engine that generates GST-compliant invoices and print-ready receipts. Added customer profile accounts that track history, outstanding balances, and reward points, with comprehensive business analytics showcasing top categories and revenue lines.",
    designDecisions: [
      "Module-first architecture so the business can use only the features they need.",
      "Weight-based inventory tracking with custom fields for karatage and purity.",
      "Print-ready invoice templates for in-store billing."
    ],
    architecture: "Next.js with full-stack API routes, PostgreSQL for relational inventory data, Prisma ORM with custom migrations, Docker for local deployment, and PDF generation for invoices.",
    role: "Sole architect and engineer — designed the database schema, built all modules, and deployed the system on-premise for the business.",
    outcome: "Eliminated manual ledger errors entirely. Business saves 15+ hours/week on billing and reporting. Real-time inventory tracking across all product categories.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Tailwind CSS"],
    images: ["/assets/Karatrix_LandingPage1.webp", "/assets/Karatrix_Dashboard.webp", "/assets/Karatrix_LandingPage2.webp"],
    liveUrl: "#"
  },
  {
    id: "ip-erp",
    name: "IP ERP",
    tagline: "Enterprise Workflow Platform",
    category: "Enterprise ERP",
    year: "2025",
    status: "Live",
    color: "#3b82f6",
    overview: "IP ERP is a modular enterprise resource planning system built for a growing company. It centralizes task management, approval workflows, department-level reporting, and role-based access control across the organization.",
    challenge: "A rapidly scaling enterprise faced massive operational friction and communication gaps between its key departments. Standard procedures, purchase approvals, task assignments, and expense claims were managed through disorganized email threads and messaging groups. This lack of centralized structure created delay loops, audit trail issues, and left managers in the dark about team bandwidth, workflow blockages, and operational department metrics.",
    solution: "Engineered a robust, role-based workflow automation and task engine that acts as the company's operational backbone. Built a custom workflow state machine that routes purchase requests and expense approvals to appropriate hierarchical managers based on department permissions. Developed data-dense Kanban task managers, department-wise real-time performance analytics, an instant notification system, and an automated audit logger that logs all user approvals, updates, and actions.",
    designDecisions: [
      "Role-based access system designed first — determining what each user type can see and do.",
      "Workflow engine built as a reusable state machine to support any multi-step process.",
      "Compact, data-dense tables for managers vs. simplified views for employees."
    ],
    architecture: "Next.js with TypeScript, REST API with role middleware, PostgreSQL with Prisma, GitHub Actions for CI/CD, and Vercel for staging and production deployments.",
    role: "Tech Lead — led architecture design, built the core workflow engine, and coordinated frontend component development.",
    outcome: "Streamlined operations across 5+ departments. Approval cycle time reduced by 45%. Full audit trail for all actions and decisions.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "GitHub Actions", "Vercel", "Tailwind CSS"],
    images: ["/assets/Erp_LandinPage1.webp", "/assets/Erp_LandinPage2.webp", "/assets/Erp_Dashboard.webp"],
    liveUrl: "#"
  },
  {
    id: "seven-stars",
    name: "Seven Stars",
    tagline: "Modern Pub & Restaurant Revamp",
    category: "Hospitality",
    year: "2025",
    status: "Live",
    color: "#2d6a4f",
    overview: "Seven Stars at Marsh Baldon is a classic British pub and restaurant in Oxford — and our first UK hospitality client. We delivered a complete digital revamp: a modern, jewel-dark Next.js website paired with a bespoke custom CMS that gives the team full control over their menus, events, gallery, and SEO — all without touching a line of code.",
    challenge: "The pub's previous site was outdated, slow, and impossible for the team to update independently. Content changes required developer involvement. SEO was minimal, and the design didn't reflect the quality or atmosphere of the venue. For a pub competing in Oxford's vibrant dining scene, an unmaintainable, low-converting site was a direct revenue problem.",
    solution: "Rebuilt the entire site in Next.js with Tailwind CSS, delivering a rich, dark jewel aesthetic that captures the premium atmosphere of the venue. Designed and built a fully custom CMS backed by PostgreSQL and Prisma — giving the client a powerful admin dashboard to manage menus (food & drinks), events, gallery images, page content, and SEO metadata (title, description, Open Graph, canonical URLs) independently. Integrated table booking, venue hire pages, a loyalty programme section, and automated sitemap and structured data generation for full technical SEO.",
    designDecisions: [
      "Jewel-dark palette (deep greens, golds, cream) chosen to feel premium and atmospheric rather than generic hospitality.",
      "Custom CMS built first — so every design decision had a content management answer behind it.",
      "SEO fields exposed in the CMS so the client can write their own meta titles and descriptions per page."
    ],
    architecture: "Next.js 14 App Router with TypeScript, Tailwind CSS for styling, PostgreSQL database via Prisma ORM, custom-built CMS admin panel with role-based access, automated sitemap.xml and robots.txt generation, Open Graph metadata, and Vercel deployment with edge caching.",
    role: "Full-Stack Engineer & UI/UX Designer — end-to-end product ownership: Figma design, Next.js frontend, custom CMS backend, PostgreSQL schema, SEO architecture, and Vercel deployment.",
    outcome: "Fully live first UK hospitality client with a modern, high-performance site. The client team manages all content independently through the CMS. Local SEO optimised for Oxford dining searches. Fast, accessible, and mobile-first — delivering a digital experience that matches the quality of the venue.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Custom CMS", "Vercel", "SEO"],
    images: ["/assets/TheSevenStar_LandingPage1.webp", "/assets/TheSevenStar_LandingPage2.webp", "/assets/TheSevenStar_LandingPage3.webp", "/assets/TheSevenStar_LandingPage4.webp"],
    liveUrl: "#"
  },
  {
    id: "coding-pandas",
    name: "Coding Pandas",
    tagline: "Interactive EdTech Platform",
    category: "EdTech Platform",
    year: "2024",
    status: "Live",
    color: "#ff3e3e",
    overview: "Coding Pandas is an interactive learning platform that teaches Web Development and Data Structures & Algorithms. It features a complete code sandbox workspace, progress tracking, interactive quizzes, video modules, and a community support system.",
    challenge: "Traditional online learning systems are passive and lead to low completion rates. Students get stuck installing dependencies locally, setting up editors, and managing configurations. The client wanted a fully browser-based coding setup that gets students coding immediately with zero setup, combined with deep performance analytics.",
    solution: "Engineered an in-browser code editor and runner environment with sandboxed evaluation. Created custom learning paths where lessons are parsed interactively. Implemented live progress dashboards, student performance statistics, and dynamic code checking that runs automated unit tests on student submissions.",
    designDecisions: [
      "Dark workspace layout resembling VS Code to prepare students for real-world software tools.",
      "Instant reward design highlighting successful test passing to motivate continuing lessons.",
      "Responsive layout for studying lessons and concepts on mobile screens."
    ],
    architecture: "React, Node.js with isolated code runner environment, PostgreSQL with Prisma ORM, Tailwind CSS, Monaco Editor integration, and Vercel for hosting.",
    role: "Full-Stack Engineer & Lead Designer — built the editor integrations, visual progression layout, and set up database schemas.",
    outcome: "Helped 2000+ active students learn coding concepts with zero environment setup friction. Average completion rates increased by 50% compared to traditional video-only portals.",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Monaco Editor", "Tailwind CSS"],
    images: ["/assets/CodignPanda_LandignPage1.webp", "/assets/CodignPanda_LandignPage2.webp", "/assets/CodignPanda_LandignPage3.webp"],
    liveUrl: "https://coding-pandas.vercel.app/"
  },
  {
    id: "neatroots",
    name: "NeatRoots",
    tagline: "Course Management & IT Services",
    category: "App Dev Courses",
    year: "2024",
    status: "Live",
    color: "#4f46e5",
    overview: "NeatRoots is a unified education and professional IT services platform. It offers online application development training courses along with high-performance consulting and development services for growing enterprises.",
    challenge: "Managing separate systems for marketing agency services and educational academy courses led to brand confusion and high administrative overhead. The client needed a single, cohesive hub that highlights their professional projects while selling structured training courses.",
    solution: "Built a centralized marketing website integrated with an academy platform. Designed catalog pages for purchasing courses, secure student portals to stream videos, and an interactive lead generation pipeline for potential IT service clients.",
    designDecisions: [
      "Modern clean marketing section to appeal to enterprise service clients.",
      "Separate sleek layout for student learning portal to keep users focused on learning.",
      "Clear call-to-actions targeting both prospective students and businesses."
    ],
    architecture: "Next.js 14 App Router, PostgreSQL with Prisma ORM, Tailwind CSS, and optimized video player widgets with secure stream delivery.",
    role: "Lead Full-Stack Developer — designed branding structure, implemented course catalogs, and created secure API structures.",
    outcome: "Unified brand presence resulting in a 40% increase in inbound consulting leads and a 30% increase in student course enrollments.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Vercel"],
    images: ["/assets/Neatroots_LandignPage1.webp", "/assets/Neatroots_LandignPage2.webp", "/assets/Neatroots_LandignPage3.webp"],
    liveUrl: "https://neatroot.vercel.app/"
  },
  {
    id: "onboarding-kyc",
    name: "Onboarding KYC",
    tagline: "Fintech User Onboarding & Verification",
    category: "Fintech SaaS",
    year: "2025",
    status: "Live",
    color: "#059669",
    overview: "Onboarding KYC is a secure digital onboarding and user verification platform built for a Nigerian fintech client. It replaces manual compliance verifications with a modern, automated, and rule-based web onboarding flow.",
    challenge: "The client was processing user registrations manually, which created significant verification delays, higher drop-off rates, and security risks. They needed a secure, automated web application that could process identities quickly, calculate user compliance risk, block fraud, and provide administrative control panels.",
    solution: "Designed and engineered an end-to-end web onboarding flow. Created a custom rule-based scoring engine that evaluates user submissions, cross-references inputs, and flags risky accounts using built-in fraud detection logic. Developed secure user submission dashboards alongside a robust admin control panel to review and approve edge-case verifications manually.",
    designDecisions: [
      "Designed a clean progressive-step form structure to reduce cognitive load during detailed document collection.",
      "Engineered visual alert states in the admin panel to highlight failed rules or suspicious user profiles.",
      "Created highly responsive screens optimized for mobile-first users in Nigeria."
    ],
    architecture: "Next.js 14 App Router, Supabase Auth & Database, Prisma ORM, Tailwind CSS, custom compliance rule engine, and Vercel for scalable edge hosting.",
    role: "Full-Stack Developer — owned dashboard engineering, created custom rule evaluation APIs, implemented security and fraud detection rules, and designed administrative controls.",
    outcome: "Successfully delivered. The client has onboarded their first batch of customers seamlessly, reducing verification cycles from days to minutes. Secured ongoing partnership to build multiple additional systems spanning reporting dashboards and alerting tools.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Prisma", "Tailwind CSS", "Vercel"],
    images: ["/assets/KYC-LandingPage1.webp", "/assets/KYC-LandingPage2.webp", "/assets/KYC-LandingPage3.webp"],
    liveUrl: "#"
  }
];

export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Catfy",
    category: "Catalogue Builder",
    description: "A powerful catalogue builder tool that helps businesses create and manage digital catalogues efficiently.",
    image: "/assets/Catfy_LandignPage1.webp",
    url: "https://catfy-catalog.vercel.app",
  },
  {
    id: 2,
    title: "Coding Pandas",
    category: "EdTech Platform",
    description: "An interactive online classroom platform for mastering Web Development and Data Structures & Algorithms.",
    image: "/assets/coding-pandas.webp",
    url: "https://coding-pandas.vercel.app/",
  },
  {
    id: 3,
    title: "NeatRoots",
    category: "App Dev Courses",
    description: "A comprehensive platform offering online app development courses and professional IT services.",
    image: "/assets/neatroots.webp",
    url: "https://neatroot.vercel.app/",
  },
  {
    id: 4,
    title: "NinzaHost",
    category: "Web Hosting",
    description: "A modern web hosting platform featuring intuitive dashboard, server management, and seamless user experience.",
    image: "/assets/ninzahost.webp",
    url: "https://ninzahost.com",
  },
  {
    id: 5,
    title: "Erichost",
    category: "Hosting Platform",
    description: "A hosting service platform offering scalable deployments, domain management, and one-click Next.js app deployments.",
    image: "/assets/EricHost1.webp",
    url: "https://main.erichost.app/",
  },
  {
    id: 6,
    title: "Onboarding KYC",
    category: "API Integration",
    description: "Streamlined onboarding process for KYC verification with AI-driven document analysis.",
    image: "/assets/onboarding-kyc.webp",
    url: "https://onboarding-kyc.com",
  },
  {
    id: 7,
    title: "RemoveQ",
    category: "AI Web App",
    description: "Advanced AI-powered background removal tool with batch processing and high-quality image editing capabilities.",
    image: "/assets/removeq.webp",
    url: "https://removeq.com",
  },
  {
    id: 8,
    title: "Web Agency",
    category: "SaaS Platform",
    description: "Comprehensive project management platform with team collaboration, task tracking, and analytics dashboard.",
    image: "/assets/six-table.webp",
    url: "https://six-table.vercel.app/",
  },
  {
    id: 9,
    title: "Blooger",
    category: "CMS Platform",
    description: "Modern blogging platform with rich text editor, SEO optimization, and content management system.",
    image: "/assets/blooger.webp",
    url: "https://ayushkush1.github.io/Blooger/",
  },
  {
    id: 10,
    title: "Movix",
    category: "Streaming UI",
    description: "Entertainment streaming platform with movie discovery, watchlists, and personalized recommendations.",
    image: "/assets/movix.webp",
    url: "https://ayushmovix.vercel.app/",
  },
  {
    id: 11,
    title: "Proposal Pro",
    category: "Business SaaS",
    description: "Professional proposal creation tool with templates, e-signatures, and client management features.",
    image: "/assets/proposal-pro.webp",
    url: "https://proposal-pro-sable.vercel.app/",
  },
  {
    id: 12,
    title: "Mobius",
    category: "Data Analytics",
    description: "Advanced analytics engine with real-time data visualization, custom reports, and business intelligence.",
    image: "/assets/MobuisEngine.webp",
    url: "https://mobuis-engine-kappa.vercel.app/",
  },
  {
    id: 13,
    title: "Portfolio",
    category: "Creative Design",
    description: "First iteration of personal portfolio showcasing creative design approach and interactive elements.",
    image: "/assets/portfolio.webp",
    url: "https://ayushkushwaha.vercel.app/",
  },
];

