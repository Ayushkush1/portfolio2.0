import { motion } from "framer-motion";
import { useState } from "react";

const ServicesSection = () => {
    const [activeId, setActiveId] = useState(1);

    const services = [
        {
            id: 1,
            title: "SaaS Development",
            description: "Building production-ready MVPs and scalable SaaS platforms designed to help startups launch and grow at speed.",
            features: ["Product Strategy", "System Architecture", "Cloud Infrastructure", "Rapid Prototyping"],
        },
        {
            id: 2,
            title: "UI/UX Design",
            description: "Crafting intuitive digital experiences that balance aesthetics with functional excellence.",
            features: ["User Research", "Wireframing", "Interactive Prototyping", "Design Systems"],
        },
        {
            id: 3,
            title: "Web Development",
            description: "Building scalable, high-performance web applications with modern, robust architectures.",
            features: ["Frontend Engineering", "Backend Systems", "API Development", "Database Design"],
        },
        {
            id: 4,
            title: "Website Revamp",
            description: "Transforming aging websites into modern, high-converting digital assets.",
            features: ["UI Refresh", "Code Modernization", "Performance Tuning", "SEO Strategy"],
        },
    ];

    return (
        <section id="services" className="relative pb-16 md:pb-32 bg-gradient-to-br from-background via-background to-primary/5">
            {/* Sticky Scroll Services Section */}
            <div className="container relative z-10 max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row relative">
                    
                    {/* Left Sticky Number */}
                    <div className="hidden lg:flex w-1/2 sticky top-0 h-screen items-center justify-start lg:pl-2 xl:pl-4">
                        <motion.div
                            key={activeId}
                            initial={{ opacity: 0, scale: 0.9, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="text-[18rem] xl:text-[22rem] leading-none font-bold text-transparent select-none"
                            style={{ 
                                WebkitTextStroke: "2px rgba(255,255,255,0.15)",
                                fontFamily: "'Fraunces', serif" 
                            }}
                        >
                            0{activeId}
                        </motion.div>
                    </div>

                    {/* Right Scrolling Content */}
                    <div className="w-full lg:w-1/2 flex flex-col pt-10 md:pt-20 pb-[10vh]">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                className="min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center items-center md:items-start text-center md:text-left py-12 md:py-24 border-b border-white/5 last:border-0"
                                onViewportEnter={() => setActiveId(service.id)}
                                viewport={{ margin: "-45% 0px -45% 0px" }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {/* Mobile Number */}
                                <motion.div 
                                    className="lg:hidden text-6xl font-bold text-transparent mb-4" 
                                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", fontFamily: "'Fraunces', serif" }}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    0{service.id}<span className="text-brand">.</span>
                                </motion.div>
                                
                                <motion.h3 
                                    className="text-4xl md:text-5xl font-medium mb-6 tracking-tight text-white" 
                                    style={{ fontFamily: "'Fraunces', serif" }}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    {service.title}<span className="text-brand ml-1">.</span>
                                </motion.h3>

                                <motion.p 
                                    className="text-gray-500 text-base md:text-xl mb-10 max-w-lg leading-relaxed"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    {service.description}
                                </motion.p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                    {service.features.map((feature, idx) => (
                                        <motion.div 
                                            key={idx} 
                                            className="flex items-center text-gray-400 group cursor-default transition-all duration-300 hover:translate-x-2"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                                        >
                                            <span className="text-xs mr-4 font-mono text-brand/60 group-hover:text-brand transition-all duration-300">
                                                / 0{idx + 1}
                                            </span>
                                            <span className="text-base group-hover:text-white transition-colors duration-300 border-b border-transparent group-hover:border-white/10 pb-1">
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Background decoration */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5 hidden md:block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
            >
                Services
            </motion.div>
        </section>
    );
};

export default ServicesSection;
