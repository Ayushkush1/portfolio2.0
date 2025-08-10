import { motion, useScroll, useTransform } from "framer-motion";
import {
    Monitor,
    Smartphone,
    Code,
    Palette,
    Zap,
    ArrowRight,
    CheckCircle,
    Clock,
    DollarSign
} from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const Services = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const services = [
        {
            icon: Monitor,
            title: "Web Development",
            description: "Custom websites and web applications built with modern technologies",
            features: ["Responsive Design", "SEO Optimization", "Performance Tuned", "CMS Integration"],
            price: "From $2,500",
            duration: "2-4 weeks",
            popular: false,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: Smartphone,
            title: "Mobile App Design",
            description: "Native and cross-platform mobile applications with exceptional UX",
            features: ["iOS & Android", "User Research", "Prototyping", "App Store Ready"],
            price: "From $3,500",
            duration: "3-6 weeks",
            popular: true,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: Palette,
            title: "UI/UX Design",
            description: "Beautiful, user-centered designs that convert visitors into customers",
            features: ["User Research", "Wireframing", "Design Systems", "Usability Testing"],
            price: "From $1,800",
            duration: "1-3 weeks",
            popular: false,
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: Code,
            title: "Full-Stack Development",
            description: "End-to-end development solutions from frontend to backend",
            features: ["API Development", "Database Design", "Cloud Deployment", "Maintenance"],
            price: "From $4,000",
            duration: "4-8 weeks",
            popular: false,
            gradient: "from-green-500 to-emerald-500"
        }
    ];

    const process = [
        {
            step: "01",
            title: "Discovery",
            description: "Understanding your goals, target audience, and project requirements"
        },
        {
            step: "02",
            title: "Strategy",
            description: "Creating a comprehensive plan and timeline for your project"
        },
        {
            step: "03",
            title: "Design",
            description: "Crafting beautiful, user-centered designs with your feedback"
        },
        {
            step: "04",
            title: "Development",
            description: "Building your project with clean, efficient, and scalable code"
        },
        {
            step: "05",
            title: "Launch",
            description: "Testing, optimization, and successful deployment of your project"
        }
    ];

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <section ref={ref} className="relative py-32 overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-[#ff5f26]/10 to-transparent blur-3xl"
                style={{ y: y1 }}
            />
            <motion.div
                className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-gradient-to-l from-purple-500/10 to-transparent blur-3xl"
                style={{ y: y2 }}
            />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Zap className="h-4 w-4 text-brand" />
                        <span className="text-sm text-muted-foreground">Services</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        How I Can Help
                        <span className="block text-gradient bg-gradient-to-r from-[#ff5f26] to-[#ff8c42] bg-clip-text text-transparent">
                            Your Business Grow
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        From concept to launch, I provide comprehensive digital solutions
                        that drive results and exceed expectations.
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="h-full p-8 rounded-3xl border border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative overflow-hidden"
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {/* Popular badge */}
                                {service.popular && (
                                    <motion.div
                                        className="absolute top-6 right-6 px-3 py-1 bg-gradient-to-r from-[#ff5f26] to-[#ff8c42] text-white text-xs font-semibold rounded-full"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        Most Popular
                                    </motion.div>
                                )}

                                {/* Service Icon */}
                                <motion.div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-0.5 mb-6`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                                        <service.icon className="h-8 w-8 text-white" style={{
                                            filter: `drop-shadow(0 0 8px ${service.gradient.includes('blue') ? '#3b82f6' :
                                                service.gradient.includes('purple') ? '#8b5cf6' :
                                                    service.gradient.includes('orange') ? '#f97316' : '#10b981'}50)`
                                        }} />
                                    </div>
                                </motion.div>

                                {/* Service Content */}
                                <motion.h3
                                    className="text-2xl font-bold mb-3 group-hover:text-[#ff5f26] transition-colors duration-300"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    {service.title}
                                </motion.h3>

                                <motion.p
                                    className="text-muted-foreground mb-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    {service.description}
                                </motion.p>

                                {/* Features */}
                                <motion.div
                                    className="space-y-3 mb-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    {service.features.map((feature, featureIndex) => (
                                        <motion.div
                                            key={featureIndex}
                                            className="flex items-center gap-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.6 + featureIndex * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <CheckCircle className="h-5 w-5 text-[#ff5f26] flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Price and Duration */}
                                <motion.div
                                    className="flex items-center justify-between mb-6 pt-4 border-t border-border/40"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-[#ff5f26]" />
                                        <span className="font-semibold text-[#ff5f26]">{service.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{service.duration}</span>
                                    </div>
                                </motion.div>

                                {/* CTA Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <Button
                                        className="w-full group/btn bg-gradient-to-r from-[#ff5f26] to-[#ff8c42] hover:from-[#ff4d1a] hover:to-[#ff7830] text-white border-0"
                                        size="lg"
                                    >
                                        <span>Get Started</span>
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>

                                {/* Hover glow effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(600px circle at 50% 50%, ${service.gradient.includes('blue') ? '#3b82f620' :
                                            service.gradient.includes('purple') ? '#8b5cf620' :
                                                service.gradient.includes('orange') ? '#f9731620' : '#10b98120'}, transparent 40%)`
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Process Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className="text-3xl md:text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        My Design & Development Process
                    </motion.h3>
                    <motion.p
                        className="text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        A proven methodology that ensures successful project delivery every time
                    </motion.p>
                </motion.div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {process.map((step, index) => (
                        <motion.div
                            key={index}
                            className="text-center relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Step Number */}
                            <motion.div
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#ff5f26] to-[#ff8c42] flex items-center justify-center relative"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="text-white font-bold text-lg">{step.step}</span>

                                {/* Connecting line */}
                                {index < process.length - 1 && (
                                    <motion.div
                                        className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#ff5f26] to-transparent hidden md:block"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    />
                                )}
                            </motion.div>

                            <motion.h4
                                className="font-semibold mb-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {step.title}
                            </motion.h4>

                            <motion.p
                                className="text-sm text-muted-foreground"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {step.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <motion.div
                className="pointer-events-none absolute bottom-0 right-0 w-full select-none text-[12vw] sm:text-[10vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
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

export default Services;
