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
      { image: "/assets/catfy.png", url: "https://catfy-catalog.vercel.app", name: "CATFY Landing" },
      { image: "/assets/Catfy_LandignPage.png", url: "https://catfy-catalog.vercel.app", name: "CATFY Dashboard" },
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
      { image: "/assets/Leadzenor_LandingPage.png", url: "#", name: "Leadzenor Landing" },
      { image: "/assets/Leadzenor_Dashboard.png", url: "#", name: "Leadzenor Dashboard" },
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
      { image: "/assets/Karatrix_LandingPage.png", url: "#", name: "Karatrix Platform" },
      { image: "/assets/Karatrix_Dashboard.png", url: "#", name: "Karatrix Dashboard" },
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
      { image: "/assets/Erp_LandinPage.png", url: "#", name: "IP ERP Platform" },
      { image: "/assets/Erp_Dashboard.png", url: "#", name: "IP ERP Dashboard" },
    ],
    url: "#",
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
      { image: "/assets/catfy.png", url: "https://catfy-catalog.vercel.app", name: "Catfy Catalog SaaS" },
      { image: "/assets/neatroots.png", url: "https://neatroot.vercel.app", name: "NeatRoots ERP" },
      { image: "/assets/EricHost.png", url: "https://main.erichost.app", name: "Erichost Dashboard" }
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
      { image: "/assets/neatroots.png", url: "https://neatroot.vercel.app", name: "NeatRoots ERP" },
      { image: "/assets/catfy.png", url: "https://catfy-catalog.vercel.app", name: "Catfy Internal" },
      { image: "/assets/coding-pandas.png", url: "https://coding-pandas.vercel.app", name: "EdTech CRM" }
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
      { image: "/assets/EricHost.png", url: "https://main.erichost.app", name: "Erichost" },
      { image: "/assets/catfy.png", url: "https://catfy-catalog.vercel.app", name: "Catfy Landing" },
      { image: "/assets/coding-pandas.png", url: "https://coding-pandas.vercel.app", name: "Coding Pandas" }
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
      { image: "/assets/coding-pandas.png", url: "https://coding-pandas.vercel.app", name: "Coding Pandas" },
      { image: "/assets/neatroots.png", url: "https://neatroot.vercel.app", name: "NeatRoots Site" },
      { image: "/assets/EricHost.png", url: "https://main.erichost.app", name: "EricHost" }
    ],
    stats: [
      { label: "Reach", value: "50k+" },
      { label: "Performance", value: "99/100" }
    ],
    techStack: ["Next.js", "Tailwind CSS", "GSAP"],
    url: "/portfolio?category=websites",
  }
];
