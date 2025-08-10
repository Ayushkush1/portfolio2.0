import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote, Users } from "lucide-react";
import { useRef } from "react";

const Testimonials = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "CEO, TechStartup",
            company: "InnovateTech",
            image: "/lovable-uploads/placeholder.svg",
            rating: 5,
            text: "Ayush transformed our entire digital presence. His attention to detail and understanding of user experience is exceptional. Our conversion rates increased by 150% after the redesign.",
            project: "E-commerce Platform Redesign"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Product Manager",
            company: "HealthCorp",
            image: "/lovable-uploads/placeholder.svg",
            rating: 5,
            text: "Working with Ayush was a game-changer. He delivered a mobile app that our users absolutely love. The design is intuitive and the development quality is top-notch.",
            project: "Mobile Health App"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Marketing Director",
            company: "DataFlow",
            image: "/lovable-uploads/placeholder.svg",
            rating: 5,
            text: "Ayush doesn't just design - he solves problems. Our dashboard now provides insights that drive real business decisions. Highly recommended for any serious project.",
            project: "Analytics Dashboard"
        }
    ];

    const floatingY1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const floatingY2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
    const floatingY3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            {/* Floating geometric shapes */}
            <motion.div
                className="absolute top-32 left-16 w-24 h-24 border-2 border-[#ff5f26]/30 rounded-full"
                style={{ y: floatingY1 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-48 right-20 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
                style={{ y: floatingY2 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-32 left-32 w-20 h-20 border border-[#ff5f26]/40"
                style={{ y: floatingY3 }}
                animate={{ rotate: 180, scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
                        <Users className="h-4 w-4 text-brand" />
                        <span className="text-sm text-muted-foreground">Client Stories</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold leading-tight mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        What Clients Say About
                        <span className="block text-gradient bg-gradient-to-r from-[#ff5f26] to-[#ff8c42] bg-clip-text text-transparent">
                            My Work
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="group relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="h-full p-8 rounded-3xl border border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative overflow-hidden"
                                whileHover={{
                                    y: -10,
                                    boxShadow: "0 25px 50px rgba(255, 95, 38, 0.15)"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Quote icon */}
                                <motion.div
                                    className="absolute top-6 right-6 p-2 rounded-full bg-[#ff5f26]/10"
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Quote className="h-5 w-5 text-[#ff5f26]" />
                                </motion.div>

                                {/* Star Rating */}
                                <motion.div
                                    className="flex gap-1 mb-4"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, rotate: -180 }}
                                            whileInView={{ scale: 1, rotate: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.5 + index * 0.1 + i * 0.05,
                                                type: "spring",
                                                stiffness: 200
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            <Star className="h-5 w-5 fill-[#ff5f26] text-[#ff5f26]" />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Testimonial Text */}
                                <motion.p
                                    className="text-muted-foreground mb-6 leading-relaxed italic"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    "{testimonial.text}"
                                </motion.p>

                                {/* Client Info */}
                                <motion.div
                                    className="flex items-center gap-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff5f26] to-[#ff8c42] p-0.5"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full rounded-full object-cover bg-white"
                                        />
                                    </motion.div>
                                    <div>
                                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                        <p className="text-xs text-[#ff5f26] font-medium">{testimonial.company}</p>
                                    </div>
                                </motion.div>

                                {/* Project Tag */}
                                <motion.div
                                    className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#ff5f26]/10 border border-[#ff5f26]/20"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-xs text-[#ff5f26] font-medium">{testimonial.project}</span>
                                </motion.div>

                                {/* Hover glow effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 95, 38, 0.1), transparent 40%)"
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        className="text-lg text-muted-foreground mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        viewport={{ once: true }}
                    >
                        Ready to join these satisfied clients?
                    </motion.p>

                    <motion.button
                        className="px-8 py-4 bg-gradient-to-r from-[#ff5f26] to-[#ff8c42] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        viewport={{ once: true }}
                    >
                        Start Your Project
                    </motion.button>
                </motion.div>
            </div>

            {/* Background decoration */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[12vw] sm:text-[10vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                viewport={{ once: true }}
            >
                Reviews
            </motion.div>
        </section>
    );
};

export default Testimonials;
