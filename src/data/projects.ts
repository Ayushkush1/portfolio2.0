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
  /** Tall image used to fill the homepage card */
  cover?: string;
  url?: string;
  isLarge?: boolean;
}

// Featured Products — shown on homepage Showcase
export const featuredProducts: FeaturedProduct[] = [
  {
    id: "catfy",
    cover: "/assets/covers/catfy.webp",
    name: "CATFY",
    tagline: "Digital Catalogue Builder",
    category: "SaaS Platform",
    problem: "Businesses were sharing static PDF catalogues that went stale the moment a price changed and told them nothing about what customers looked at.",
    solution: "A multi-tenant SaaS where businesses design catalogues in a visual editor, share them as live links, export print-ready PDFs, and upgrade through Stripe subscription plans.",
    role: "Solo Product Designer & Full-Stack Engineer",
    outcome: "Live product, designed and built end to end — 173 of 186 commits.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Stripe"],
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
    id: "agencyos",
    cover: "/assets/covers/agencyos.webp",
    name: "AgencyOS",
    tagline: "Operating System for Agencies",
    category: "Business Platform",
    problem: "A growing agency ran projects, clients, invoices and team chat across a dozen disconnected tools, with no clear view of what each project actually earned.",
    solution: "One platform for projects, boards, clients, invoicing, expenses, profitability, sales targets, calendar, files and real-time team chat, with role-based access per module.",
    role: "Solo Product Designer & Full-Stack Engineer",
    outcome: "Designed and built end to end by one engineer — every one of its 147 commits.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io", "Redis"],
    sliderItems: [
      { image: "/assets/AgencyOS_1.webp", url: "#", name: "AgencyOS Dashboard" },
      { image: "/assets/AgencyOS_2.webp", url: "#", name: "AgencyOS Boards" },
      { image: "/assets/AgencyOS_3.webp", url: "#", name: "AgencyOS Revenue" },
    ],
    url: "#",
    isLarge: true,
  },
  {
    id: "leadzenor",
    cover: "/assets/covers/leadzenor.webp",
    name: "Leadzenor",
    tagline: "QR Lead Capture for Expos & Events",
    category: "Lead Capture SaaS",
    problem: "Exhibitors at expos collected leads on paper and business cards, then lost days re-typing them and following up late.",
    solution: "A SaaS where teams create booths, generate QR-linked forms and digital business cards, capture leads on the spot, and send follow-up emails with attachments automatically.",
    role: "Product Designer & Full-Stack Engineer",
    outcome: "Live in production at leadzenor.com.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase"],
    sliderItems: [
      { image: "/assets/Leadzenor_LandingPage1.webp", url: "https://leadzenor.com", name: "Leadzenor Landing" },
      { image: "/assets/Leadzenor_LandingPage2.webp", url: "https://leadzenor.com", name: "Leadzenor Landing" },
      { image: "/assets/Leadzenor_LandingPage3.webp", url: "https://leadzenor.com", name: "Leadzenor Landing" },
      { image: "/assets/Leadzenor_LandingPage4.webp", url: "https://leadzenor.com", name: "Leadzenor Landing" },
      { image: "/assets/Leadzenor_Dashboard.webp", url: "https://leadzenor.com", name: "Leadzenor Dashboard" },
    ],
    url: "https://leadzenor.com",
  },
  {
    id: "karatrix",
    cover: "/assets/covers/karatrix.webp",
    name: "Karatrix",
    tagline: "Jewellery Inventory SaaS",
    category: "Inventory SaaS",
    problem: "Jewellery shops priced stock by hand — metal rate, purity, making charges, GST and hallmark fees — which made billing slow and profit figures unreliable.",
    solution: "A multi-shop SaaS where each shop runs isolated inventory with barcoded products, live metal rates, automatic purity-based pricing, sales with reversals, and reports.",
    role: "Product Designer & Full-Stack Engineer",
    outcome: "Live in production at karatrix.com.",
    techStack: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma", "Docker"],
    sliderItems: [
      { image: "/assets/Karatrix_LandingPage1.webp", url: "https://karatrix.com", name: "Karatrix Platform" },
      { image: "/assets/Karatrix_LandingPage2.webp", url: "https://karatrix.com", name: "Karatrix Platform" },
      { image: "/assets/Karatrix_Dashboard.webp", url: "https://karatrix.com", name: "Karatrix Dashboard" },
    ],
    url: "https://karatrix.com",
    isLarge: true,
  },
  {
    id: "ip-erp",
    cover: "/assets/covers/ip-erp.webp",
    name: "IP ERP",
    tagline: "ERP & CRM for an IP Law Firm",
    category: "Enterprise ERP",
    problem: "An intellectual-property firm ran contacts, sales follow-ups and trademark/patent cases across spreadsheets that duplicated and contradicted each other.",
    solution: "A multi-tenant ERP with a single master contact bank, bulk Excel import with duplicate reconciliation, a sales pipeline with quoting, IP case tracking, and Zoom-linked meetings.",
    role: "Tech Lead & Full-Stack Engineer",
    outcome: "One system for contacts, sales and IP cases, replacing the firm's scattered spreadsheets.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "IndexedDB"],
    sliderItems: [
      { image: "/assets/Erp_LandinPage1.webp", url: "#", name: "IP ERP Platform" },
      { image: "/assets/Erp_LandinPage2.webp", url: "#", name: "IP ERP Platform" },
      { image: "/assets/Erp_Dashboard.webp", url: "#", name: "IP ERP Dashboard" },
    ],
    url: "#",
    isLarge: true,
  },
  {
    id: "payment-manager",
    cover: "/assets/covers/payment-manager.webp",
    name: "Payment Manager",
    tagline: "Finance Hub for Freelancers",
    category: "Personal Product",
    problem: "Freelance income arrived in pieces across UPI, bank transfers and chat screenshots, making pending amounts and monthly earnings hard to track.",
    solution: "A finance workspace for clients, projects and payments with proofs, income analytics, exports and a Google Sheets-synced office task grid.",
    role: "Solo Product Designer & Full-Stack Engineer",
    outcome: "In daily use for my own freelance business.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Recharts", "Google Sheets API"],
    sliderItems: [
      { image: "/assets/PaymentManager_1.webp", url: "https://pay.ayushkushwaha.com", name: "Payment Manager Dashboard" },
    ],
    url: "https://pay.ayushkushwaha.com",
  },
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
  /** Tall image used to fill the /work card */
  cover?: string;
  liveUrl: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "agencyos",
    cover: "/assets/covers/agencyos.webp",
    name: "AgencyOS",
    tagline: "Operating System for Agencies",
    category: "Business Platform",
    year: "2026",
    status: "In Use",
    color: "#e8702a",
    overview: "AgencyOS is the internal operating system for a digital agency. It brings projects, task boards, clients, invoicing, expenses, profitability, sales targets, calendar, files and team chat into one product, so the agency runs from a single place instead of a dozen tools.",
    challenge: "The agency's work was spread across spreadsheets, chat apps, invoicing tools and shared drives. Nobody could see at a glance which projects were on track, which invoices were overdue, or whether a project was actually profitable once expenses were counted.",
    solution: "I designed and built the whole platform. A dashboard brings together monthly targets, revenue, expenses, pending payments and project status. Projects have teams, comments and Kanban boards with tasks and subtasks. The finance module handles invoices with line items and proforma numbering, PDF generation, partial payments, expenses, and per-project profitability. A unified calendar shows task deadlines, project dates, invoice due dates, meetings, reminders and leave, and syncs with Google Calendar. Real-time chat, in-app and web-push notifications, a folder-based file manager, sales targets and prospect follow-ups complete it, and a super-admin layer can run several organisations with role-based access down to each module.",
    designDecisions: [
      "Dashboard first: the numbers an agency owner checks every morning — target, revenue, profit, pending payments — sit above the fold.",
      "Profitability is calculated per project from real invoices and expenses, not typed in, so it can't drift from the books.",
      "One calendar for everything with a colour legend, instead of separate date views in each module.",
      "Installable as a PWA with push notifications, so the team gets updates without keeping a tab open.",
    ],
    architecture: "Next.js 16 App Router with React 19 and server actions, PostgreSQL via Prisma across 37 data models, NextAuth v5, Socket.io with a Redis adapter for real-time chat, BullMQ background jobs, Firebase and Web Push for notifications, Google Calendar API, React-PDF and jsPDF for invoices, and Supabase Storage for files.",
    role: "Solo Product Designer & Full-Stack Engineer — product design, UI, data model, backend, real-time infrastructure and deployment (all 147 commits).",
    outcome: "The agency's day-to-day system for projects, finance and team communication, designed and engineered end to end by one person.",
    techStack: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Socket.io", "Redis", "BullMQ", "NextAuth", "Tailwind CSS"],
    images: ["/assets/AgencyOS_1.webp", "/assets/AgencyOS_2.webp", "/assets/AgencyOS_3.webp", "/assets/AgencyOS_4.webp", "/assets/AgencyOS_5.webp"],
    liveUrl: "#"
  },
  {
    id: "catfy",
    cover: "/assets/covers/catfy.webp",
    name: "CATFY",
    tagline: "Digital Catalogue Builder",
    category: "SaaS Platform",
    year: "2025",
    status: "Live",
    color: "#ff5f26",
    overview: "CATFY is a multi-tenant SaaS for designing, publishing and sharing product catalogues. Businesses build catalogues in a visual editor, share them as live links, export them as PDFs, and pay through tiered subscriptions.",
    challenge: "Most small businesses still make catalogues in Canva or PowerPoint and send them as PDFs. The file is out of date as soon as a price or product changes, it is heavy to send over WhatsApp, and the business never learns which products customers actually looked at.",
    solution: "I designed and built the whole product: a drag-and-drop catalogue editor built on Craft.js, a theme system with a live style customiser for colours, fonts and spacing, and products that can be sorted by priority tags like bestseller or new. Catalogues can be public, private or restricted, and export to PDF through a headless browser so the PDF matches the web version exactly. Around that sit Stripe subscriptions across four tiers with coupons, team workspaces with email invites, view analytics, and an admin panel for running the platform.",
    designDecisions: [
      "Visual, block-based editor instead of forms, so non-designers can see the catalogue take shape as they build it.",
      "One theme system drives both the live web catalogue and the PDF export, so there is never a second version to maintain.",
      "Plan limits are enforced in the product itself, so the upgrade prompt appears exactly where the user hits a limit.",
    ],
    architecture: "Next.js 14 App Router with TypeScript, PostgreSQL via Prisma, Supabase for auth and storage, Stripe for billing, Playwright and Puppeteer for PDF rendering, Resend and Nodemailer for email, deployed on Vercel.",
    role: "Solo Product Designer & Full-Stack Engineer — product design, UI, database schema, APIs, billing and deployment (173 of 186 commits).",
    outcome: "Live product with public landing, pricing, editor, billing and admin areas, designed and engineered end to end by one person.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Stripe", "Craft.js", "Playwright", "Tailwind CSS"],
    images: ["/assets/Catfy_LandignPage1.webp", "/assets/Catfy_LandignPage2.webp", "/assets/Catfy_LandignPage3.webp", "/assets/Catfy_LandignPage4.webp"],
    liveUrl: "https://catfy-catalog.vercel.app"
  },
  {
    id: "leadzenor",
    cover: "/assets/covers/leadzenor.webp",
    name: "Leadzenor",
    tagline: "QR Lead Capture for Expos & Events",
    category: "Lead Capture SaaS",
    year: "2026",
    status: "Live",
    color: "#10b981",
    overview: "Leadzenor turns every booth scan into a lead. Companies set up booths for expos and events, visitors scan a QR code to fill a form or save a digital business card, and the team gets a clean lead list with automatic follow-up emails.",
    challenge: "At expos, exhibitors collect leads on paper forms and business cards. Those leads get re-typed days later, some are lost, and follow-ups go out long after the visitor has forgotten the booth. There was no simple way to capture, verify and follow up at the moment of contact.",
    solution: "I designed and built a multi-company SaaS around booths and events. Teams build lead forms with a drag-and-drop form builder, generate QR codes for each booth, and publish digital business cards with vCard download tracking. Every submission triggers a branded follow-up email with attachments through the company's own SMTP settings. For events there is attendee verification by QR scan with print support, and a super-admin layer controls which modules each company can access.",
    designDecisions: [
      "Mobile-first public forms — visitors fill them standing at a booth, so every field and tap target was designed for one-handed use.",
      "Drag-and-drop form builder so booth staff can change a form on the day without a developer.",
      "Module-level access per company, so the same product can be sold in different packages.",
    ],
    architecture: "Next.js 16 App Router with TypeScript, PostgreSQL via Prisma, Supabase Storage for uploads, NextAuth for authentication, Nodemailer with per-company SMTP, QR generation, and dnd-kit for the form builder.",
    role: "Product Designer & Full-Stack Engineer — UI/UX, form builder, digital cards, email automation, event verification and access control.",
    outcome: "Live in production at leadzenor.com, with booth forms, digital cards, automated follow-up email and event check-in all running in one product.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "NextAuth", "dnd-kit", "Tailwind CSS"],
    images: ["/assets/Leadzenor_LandingPage1.webp", "/assets/Leadzenor_LandingPage2.webp", "/assets/Leadzenor_LandingPage3.webp", "/assets/Leadzenor_Dashboard.webp"],
    liveUrl: "https://leadzenor.com"
  },
  {
    id: "karatrix",
    cover: "/assets/covers/karatrix.webp",
    name: "Karatrix",
    tagline: "Jewellery Inventory SaaS",
    category: "Inventory SaaS",
    year: "2025",
    status: "Live",
    color: "#a855f7",
    overview: "Karatrix is an inventory and sales SaaS built for jewellery shops. Each shop runs its own isolated workspace for stock, pricing, sales and reports, with its owner and managers on separate permission levels.",
    challenge: "Jewellery pricing is unusually complex: every piece depends on the day's gold or silver rate, its purity, weight, making charges, GST and hallmark fees. Shops were working this out by hand, which made billing slow, made errors common, and left owners unsure of their real profit on each sale.",
    solution: "I designed and built the pricing and inventory core. Products are organised by metal type, category and sub-category, get a generated barcode, and are priced automatically from live metal rates and purity — including pieces sold by weight or by piece. Sales can be reversed safely, profit is calculated consistently in both the product table and reports, and stock movements are logged with reasons and bill references. Shop owners create managers with custom permissions, and a super-admin runs shops, plans and support.",
    designDecisions: [
      "Pricing logic lives in one place, so a sale, the product table and the reports can never disagree about profit.",
      "Barcode labels are generated in the app and printable immediately, so stock is tagged the moment it is added.",
      "Separate views for owners and managers, so staff only see what they need to sell.",
    ],
    architecture: "React 19 and Vite frontend, Express API in TypeScript, PostgreSQL via Prisma, JWT authentication, JsBarcode for labels, Recharts for reporting, and a Docker Compose production setup.",
    role: "Product Designer & Full-Stack Engineer — built the original version solo, then led pricing, products, categories, sales and reporting in the production system.",
    outcome: "Live in production at karatrix.com as a multi-shop SaaS with subscription plans.",
    techStack: ["React", "TypeScript", "Vite", "Express", "PostgreSQL", "Prisma", "Docker", "Tailwind CSS"],
    images: ["/assets/Karatrix_LandingPage1.webp", "/assets/Karatrix_Dashboard.webp", "/assets/Karatrix_LandingPage2.webp"],
    liveUrl: "https://karatrix.com"
  },
  {
    id: "payment-manager",
    cover: "/assets/covers/payment-manager.webp",
    name: "Payment Manager",
    tagline: "Finance Hub for Freelancers",
    category: "Personal Product",
    year: "2025",
    status: "In Use",
    color: "#10b981",
    overview: "Payment Manager is my own product for running the business side of freelancing: clients, projects, every payment received, and office work, all in one calm dashboard. I use it every day to know exactly what has been earned, what is still pending, and which project each rupee came from.",
    challenge: "Freelance income arrives in pieces — advances, per-page fees, monthly retainers, partial payments over UPI and bank transfer. Tracking it across chat screenshots, bank statements and notes made it hard to answer simple questions: how much is still pending on this project, what did I earn this month, and what is my real monthly average?",
    solution: "I designed and built a focused finance workspace. The dashboard shows lifetime earnings, this month's revenue, active projects and a 12-month average, with an income trend chart, a project status breakdown and recent transactions. Projects track budget, paid and pending amounts with progress and status, including ongoing monthly retainers. Every payment records its method, reference and notes, with the payment screenshot stored as proof. Clients, projects and payments can be searched and exported, and an office-tasks grid stays in sync with Google Sheets for day-to-day work logs.",
    designDecisions: [
      "A light, airy interface with one strong green accent, so money reads as calm and clear rather than alarming.",
      "Pending amounts and progress bars on every project, so outstanding money is impossible to miss.",
      "Payment proof lives next to each payment, so any transaction can be verified in one click.",
      "Retainers modelled as ongoing projects, so monthly income and one-off projects share one timeline.",
    ],
    architecture: "Next.js 14 App Router with TypeScript and server actions, Supabase for auth, PostgreSQL and file storage with SSR middleware protecting routes, Radix UI and Tailwind CSS, Recharts for analytics, Google Sheets API for office tasks, xlsx and jsPDF for exports, and a scheduled GitHub Action that keeps the database active. Deployed on Vercel.",
    role: "Solo Product Designer & Full-Stack Engineer — designed, built and maintains it for my own business.",
    outcome: "In daily use as my personal system for tracking freelance clients, projects, payments and office work.",
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Recharts", "Google Sheets API", "Tailwind CSS", "Vercel"],
    images: ["/assets/PaymentManager_1.webp", "/assets/PaymentManager_2.webp", "/assets/PaymentManager_3.webp"],
    liveUrl: "https://pay.ayushkushwaha.com"
  },
  {
    id: "ip-erp",
    cover: "/assets/covers/ip-erp.webp",
    name: "IP ERP",
    tagline: "ERP & CRM for an IP Law Firm",
    category: "Enterprise ERP",
    year: "2026",
    status: "In Use",
    color: "#3b82f6",
    overview: "A custom ERP and CRM for an intellectual-property firm, covering its contact database, sales pipeline, and trademark, patent, copyright and design filings in one system.",
    challenge: "The firm's client and lead data lived in many large spreadsheets that overlapped and contradicted each other. Sales follow-ups, quotes and IP case progress were tracked separately, so nobody had a single, trustworthy view of a client — and the data was too large for a normal web table to handle.",
    solution: "I built a master data bank as the single source of truth. Bulk Excel and CSV imports map columns, check every row against the existing database, and let the team resolve duplicates, with each import tracked as a job. To keep very large contact lists fast, contacts are cached in IndexedDB and fetched in compressed chunks. On top of that sit a sales module with lead sheets, inbound enquiries and quotes that calculate base fee, government fee and tax, an operations hub for IP cases with stage tracking, and meetings with automatic Zoom links, notes and reminders.",
    designDecisions: [
      "Import is a review step, not a blind upload — the team sees matches and conflicts before anything is written.",
      "Client-side caching in IndexedDB so large contact lists search and filter instantly.",
      "Dense, spreadsheet-like tables for power users who came from Excel, with customisable columns.",
    ],
    architecture: "Next.js 16 App Router with TypeScript, PostgreSQL via Prisma with a multi-tenant schema, JWT-based roles for super admin, admin and user, IndexedDB caching with chunked, compressed APIs, Zoom API integration, and xlsx and jsPDF for import and documents.",
    role: "Tech Lead & Full-Stack Engineer — architecture, data model, import and reconciliation engine, and most of the product (132 of 168 commits).",
    outcome: "Replaced the firm's scattered spreadsheets with a single system for contacts, sales pipeline and IP case tracking.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "IndexedDB", "Zoom API", "Tailwind CSS"],
    images: ["/assets/Erp_LandinPage1.webp", "/assets/Erp_LandinPage2.webp", "/assets/Erp_Dashboard.webp"],
    liveUrl: "#"
  },
  {
    id: "seven-stars",
    cover: "/assets/covers/seven-stars.webp",
    name: "Seven Stars",
    tagline: "Pub & Restaurant Website with Custom CMS",
    category: "Hospitality",
    year: "2026",
    status: "Live",
    color: "#2d6a4f",
    overview: "The Seven Stars is a community pub and restaurant in Marsh Baldon, Oxfordshire. The project was a full digital rebuild: a new website with an atmospheric, motion-rich design, backed by a custom CMS the pub team runs themselves.",
    challenge: "The pub's old site was dated and could only be changed by a developer. Menus, events and photos went stale, SEO was minimal, and the site did not reflect the character of the venue.",
    solution: "I led the project and designed the experience: a dark, jewel-toned website with smooth scrolling and GSAP-driven motion, covering menu, dining, events, gallery, blog and contact. Alongside it we built a custom CMS where the team edits pages, sections and navigation, manages enquiries, and controls SEO for every page — meta title, description, canonical URL and Open Graph image.",
    designDecisions: [
      "A jewel-dark palette of deep greens, gold and cream, so the site feels like the pub rather than a generic restaurant template.",
      "Motion used to create atmosphere — smooth scrolling and staged reveals — while keeping menus and opening details instantly readable.",
      "SEO fields exposed in the CMS, so the team can own their search presence without a developer.",
    ],
    architecture: "Website in Next.js with GSAP, Lenis and Three.js; CMS in Next.js 16 with PostgreSQL via Prisma, Supabase and Nodemailer for enquiries; both deployed on Vercel.",
    role: "Project Lead & UI/UX Designer — led the project, designed the site, guided the development team, and handled deployment and launch.",
    outcome: "Live at sevenstarsatmarshbaldon.co.uk, with the pub team updating their own content through the CMS.",
    techStack: ["Next.js", "GSAP", "Lenis", "Three.js", "PostgreSQL", "Prisma", "Custom CMS", "Vercel"],
    images: ["/assets/TheSevenStar_LandingPage1.webp", "/assets/TheSevenStar_LandingPage2.webp", "/assets/TheSevenStar_LandingPage3.webp", "/assets/TheSevenStar_LandingPage4.webp"],
    liveUrl: "https://sevenstarsatmarshbaldon.co.uk"
  },
  {
    id: "onboarding-kyc",
    cover: "/assets/covers/onboarding-kyc.webp",
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
      "Created highly responsive screens optimized for mobile-first users in Nigeria.",
    ],
    architecture: "Next.js 14 App Router, PostgreSQL (Supabase) via Prisma ORM, Tailwind CSS, Framer Motion, a custom compliance rule engine, and Vercel hosting.",
    role: "Full-Stack Developer — owned dashboard engineering, created custom rule evaluation APIs, implemented security and fraud detection rules, and designed administrative controls.",
    outcome: "Successfully delivered. The client has onboarded their first batch of customers seamlessly, reducing verification cycles from days to minutes. Secured ongoing partnership to build multiple additional systems spanning reporting dashboards and alerting tools.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Tailwind CSS", "Vercel"],
    images: ["/assets/KYC-LandingPage1.webp", "/assets/KYC-LandingPage2.webp", "/assets/KYC-LandingPage3.webp"],
    liveUrl: "#"
  }
];

export interface ClientWebsite {
  id: string;
  name: string;
  industry: string;
  role: "Design & Development" | "Lead & Design";
  image: string;
  url: string;
}

// Client websites — shown in the Websites section on the homepage
export const clientWebsites: ClientWebsite[] = [
  { id: "seven-stars", name: "Seven Stars", industry: "Pub & Restaurant", role: "Lead & Design", image: "/assets/sites/seven-stars.webp", url: "https://sevenstarsatmarshbaldon.co.uk" },
  { id: "kokalachi", name: "Kokalachi", industry: "Travel & Group Trips", role: "Lead & Design", image: "/assets/sites/kokalachi.webp", url: "https://kokalachi.com" },
  { id: "little-flower-schools", name: "Little Flower Schools", industry: "Education", role: "Design & Development", image: "/assets/sites/little-flower-schools.webp", url: "https://lfcs-school.vercel.app" },
  { id: "cp-atlas", name: "CP Atlas", industry: "Startup SaaS", role: "Design & Development", image: "/assets/sites/cp-atlas.webp", url: "https://cp-crm-lyart.vercel.app" },
  { id: "coding-pandas-studio", name: "Coding Pandas Studio", industry: "Software Agency", role: "Design & Development", image: "/assets/sites/coding-pandas-studio.webp", url: "https://cp-portfolio-eight.vercel.app" },
  { id: "coding-pandas", name: "Coding Pandas", industry: "EdTech", role: "Design & Development", image: "/assets/sites/coding-pandas.webp", url: "https://coding-pandas.vercel.app" },
  { id: "neatroots", name: "NeatRoots", industry: "App Development Studio", role: "Design & Development", image: "/assets/sites/neatroots.webp", url: "https://neatroot.vercel.app" },
  { id: "officink", name: "Officink", industry: "HR & Billing SaaS", role: "Design & Development", image: "/assets/sites/officink.webp", url: "https://officink.com" },
];
