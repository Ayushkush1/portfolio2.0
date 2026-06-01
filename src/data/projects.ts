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

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  sliderItems: SliderItem[];
  videoUrl?: string; // Optional for future video implementation
  stats?: ProjectStats[];
  techStack?: string[];
  url?: string;
  isLarge?: boolean; // Determines if it takes up more space in the Bento Grid
}

export const showcaseProjects: Project[] = [
  {
    id: "saas-automation",
    title: "Complex Systems, Simplified.",
    description: "Building comprehensive SaaS platforms that automate manual workflows and streamline entire offline systems into powerful digital experiences.",
    category: "SaaS & Automation",
    sliderItems: [
      { image: "/lovable-uploads/catfy.png", url: "https://catfy-catalog.vercel.app", name: "Catfy Catalog SaaS" },
      { image: "/lovable-uploads/neatroots.png", url: "https://neatroot.vercel.app", name: "NeatRoots ERP" },
      { image: "/lovable-uploads/EricHost.png", url: "https://main.erichost.app", name: "Erichost Dashboard" }
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
      { image: "/lovable-uploads/neatroots.png", url: "https://neatroot.vercel.app", name: "NeatRoots ERP" },
      { image: "/lovable-uploads/catfy.png", url: "https://catfy-catalog.vercel.app", name: "Catfy Internal" },
      { image: "/lovable-uploads/coding-pandas.png", url: "https://coding-pandas.vercel.app", name: "EdTech CRM" }
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
      { image: "/lovable-uploads/EricHost.png", url: "https://main.erichost.app", name: "Erichost" },
      { image: "/lovable-uploads/catfy.png", url: "https://catfy-catalog.vercel.app", name: "Catfy Landing" },
      { image: "/lovable-uploads/coding-pandas.png", url: "https://coding-pandas.vercel.app", name: "Coding Pandas" }
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
      { image: "/lovable-uploads/coding-pandas.png", url: "https://coding-pandas.vercel.app", name: "Coding Pandas" },
      { image: "/lovable-uploads/neatroots.png", url: "https://neatroot.vercel.app", name: "NeatRoots Site" },
      { image: "/lovable-uploads/EricHost.png", url: "https://main.erichost.app", name: "EricHost" }
    ],
    stats: [
      { label: "Reach", value: "50k+" },
      { label: "Performance", value: "99/100" }
    ],
    techStack: ["Next.js", "Tailwind CSS", "GSAP"],
    url: "/portfolio?category=websites",
  }
];
