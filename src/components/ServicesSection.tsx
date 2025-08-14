import { motion } from "framer-motion";
import { Palette, Code, Smartphone, Zap, Globe, Users } from "lucide-react";
import CardSwap, { Card } from "./Services";

const ServicesSection = () => {
    const services = [
        {
            id: 1,
            title: "UI/UX Design",
            description: "Beautiful, intuitive interfaces that users love to interact with.",
            icon: <Palette className="w-8 h-8" />,
            features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 2,
            title: "Web Development",
            description: "Fast, responsive websites built with modern technologies.",
            icon: <Code className="w-8 h-8" />,
            features: ["React/Next.js", "TypeScript", "Node.js", "Database Design"],
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 3,
            title: "Website Revamp",
            description: "Modernizing existing sites with improved UI, UX, performance, and SEO.",
            icon: <Globe className="w-8 h-8" />,
            features: ["UI Refresh", "Code Refactor", "Performance Boost", "SEO Improvements"],
            color: "from-green-500 to-emerald-500"
        },
        {
            id: 4,
            title: "Performance Optimization",
            description: "Lightning-fast websites optimized for speed and SEO.",
            icon: <Zap className="w-8 h-8" />,
            features: ["Core Web Vitals", "SEO Optimization", "Load Speed", "Accessibility"],
            color: "from-yellow-500 to-orange-500"
        },
    ];

    return (
        <section id="services" className="relative pb-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">


            <div className="container relative z-10 max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
                    {/* Left Side - Content */}
                    <motion.div
                        className="order-1 flex flex-col justify-center h-auto lg:h-[700px] space-y-8 py-8 lg:py-16"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Header */}
                        <div>
                            <motion.p
                                className="text-gray-400 text-lg mb-4 italic"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                What I Offer
                            </motion.p>
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                Services that{" "} <br />
                                <span className="text-brand font-normal italic">transform</span>
                                <span className="text-foreground font-normal">{" "}
                                    ideas into reality</span>
                            </motion.h2>
                            <motion.p
                                className="text-gray-600 text-[17px] leading-relaxed pt-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                I deliver tailored digital solutions to help your business grow. My focus is on quality, performance, and ongoing support transforming ideas into engaging experiences that drive results.<br /> From rapid prototyping to scalable deployment, I collaborate closely to ensure every detail aligns with your goals.
                            </motion.p>
                        </div>
                        {/* Elegant Features Grid */}
                        <motion.div
                            className="grid grid-cols-2 gap-8 pt-6"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="group rounded-xl "
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-brand rounded-full group-hover:scale-125 transition-transform duration-300" />
                                    <span className="text-foreground font-medium text-sm">Expert Craftsmanship</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="group  "
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-brand rounded-full group-hover:scale-125 transition-transform duration-300" />
                                    <span className="text-foreground font-medium text-sm">Client-Focused</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="group  "
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-brand rounded-full group-hover:scale-125 transition-transform duration-300" />
                                    <span className="text-foreground font-medium text-sm">Premium Quality</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="group "
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-brand rounded-full group-hover:scale-125 transition-transform duration-300" />
                                    <span className="text-foreground font-medium text-sm">Ongoing Support</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Interactive Card Stack */}
                    <motion.div
                        className="order-2 relative z-10 h-[400px] lg:h-auto"
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-[-240px] md:top-[-30px] lg:top-[-170px] scale-[1.6] md:scale-[1]  lg:scale-[1] left-[-100px] md:left-[15%] lg:left-[30%] transform -translate-x-1/2 w-full h-full pointer-events-none">
                            <CardSwap
                                width={300}
                                height={380}
                                cardDistance={40}
                                verticalDistance={15}
                                delay={4000}
                                pauseOnHover={true}
                                easing="elastic"
                            >
                                {services.map((service, index) => (
                                    <Card key={service.id} customClass="!bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl !border-gray-700 border shadow-2xl">
                                        <div className="py-10 px-6 h-full flex flex-col justify-between">
                                            <div className="text-center">
                                                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white  mb-6 shadow-2xl mx-auto`}>
                                                    {service.icon}
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-300 text-base leading-relaxed mb-6 px-2">
                                                    {service.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto">
                                                <div className="w-full h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent mb-4" />
                                                <div className="grid grid-cols-2 gap-2">
                                                    {service.features.map((feature, idx) => (
                                                        <div key={idx} className="flex items-center text-gray-400 text-sm">
                                                            <div className="w-2 h-2 bg-brand rounded-full mr-2 flex-shrink-0" />
                                                            <span className="truncate">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </CardSwap>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background decoration */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
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
