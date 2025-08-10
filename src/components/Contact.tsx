import { motion, useScroll, useTransform } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Calendar,
    MessageCircle,
    ArrowRight,
    CheckCircle,
    Clock,
    Zap
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const Contact = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        project: '',
        budget: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "ayush@example.com",
            description: "Send me an email anytime",
            color: "#3b82f6"
        },
        {
            icon: Phone,
            label: "Phone",
            value: "+91 98765 43210",
            description: "Call me for urgent projects",
            color: "#10b981"
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Mumbai, India",
            description: "Available for remote work",
            color: "#f59e0b"
        }
    ];

    const projectTypes = [
        "Web Development",
        "Mobile App",
        "UI/UX Design",
        "Full-Stack Project",
        "Consultation",
        "Other"
    ];

    const budgetRanges = [
        "$1,000 - $2,500",
        "$2,500 - $5,000",
        "$5,000 - $10,000",
        "$10,000+",
        "Let's discuss"
    ];

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', formData);
        setIsSubmitting(false);

        // Reset form
        setFormData({
            name: '',
            email: '',
            project: '',
            budget: '',
            message: ''
        });
    };

    return (
        <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-[#ff5f26]/20 to-purple-500/20 blur-3xl"
                style={{ y: y1 }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gradient-to-l from-blue-500/20 to-cyan-500/20 blur-3xl"
                style={{ y: y2 }}
                animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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
                        <MessageCircle className="h-4 w-4 text-brand" />
                        <span className="text-sm text-muted-foreground">Get In Touch</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Let's Create Something
                        <span className="block text-gradient bg-gradient-to-r from-[#ff5f26] to-[#ff8c42] bg-clip-text text-transparent">
                            Amazing Together
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Ready to bring your vision to life? Let's discuss your project and
                        create something extraordinary together.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Information */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={index}
                                        className="group flex items-start gap-4 p-4 rounded-2xl border border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <motion.div
                                            className="p-3 rounded-xl"
                                            style={{ backgroundColor: `${info.color}20` }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <info.icon className="h-6 w-6" style={{ color: info.color }} />
                                        </motion.div>

                                        <div>
                                            <h4 className="font-semibold mb-1">{info.label}</h4>
                                            <p className="text-lg font-medium text-[#ff5f26] mb-1">{info.value}</p>
                                            <p className="text-sm text-muted-foreground">{info.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="text-center p-6 rounded-2xl bg-gradient-to-r from-[#ff5f26]/10 to-[#ff8c42]/10 border border-[#ff5f26]/20"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Clock className="h-8 w-8 text-[#ff5f26] mx-auto mb-3" />
                                <div className="text-2xl font-bold text-[#ff5f26] mb-1">24h</div>
                                <div className="text-sm text-muted-foreground">Response Time</div>
                            </motion.div>

                            <motion.div
                                className="text-center p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Zap className="h-8 w-8 text-green-500 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-green-500 mb-1">7 Days</div>
                                <div className="text-sm text-muted-foreground">Project Start</div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="p-8 rounded-3xl border border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative overflow-hidden"
                            whileHover={{ boxShadow: "0 25px 50px rgba(255, 95, 38, 0.15)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-2xl font-bold mb-6">Start Your Project</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-sm font-medium mb-2">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#ff5f26] focus:border-transparent transition-all duration-300"
                                            placeholder="Your name"
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-sm font-medium mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#ff5f26] focus:border-transparent transition-all duration-300"
                                            placeholder="your@email.com"
                                        />
                                    </motion.div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-sm font-medium mb-2">Project Type</label>
                                        <select
                                            value={formData.project}
                                            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#ff5f26] focus:border-transparent transition-all duration-300"
                                        >
                                            <option value="">Select project type</option>
                                            {projectTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-sm font-medium mb-2">Budget Range</label>
                                        <select
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#ff5f26] focus:border-transparent transition-all duration-300"
                                        >
                                            <option value="">Select budget range</option>
                                            {budgetRanges.map((range) => (
                                                <option key={range} value={range}>{range}</option>
                                            ))}
                                        </select>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-sm font-medium mb-2">Project Details *</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#ff5f26] focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="Tell me about your project, goals, and any specific requirements..."
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full group bg-gradient-to-r from-[#ff5f26] to-[#ff8c42] hover:from-[#ff4d1a] hover:to-[#ff7830] text-white border-0 py-4 text-lg"
                                        size="lg"
                                    >
                                        {isSubmitting ? (
                                            <motion.div
                                                className="flex items-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <motion.div
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Sending...
                                            </motion.div>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>

                            {/* Success state */}
                            <motion.div
                                className="absolute inset-0 bg-background/95 backdrop-blur flex items-center justify-center rounded-3xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-center">
                                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                    <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                                    <p className="text-muted-foreground">I'll get back to you within 24 hours.</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-[#ff5f26]/10 to-[#ff8c42]/10 border border-[#ff5f26]/20"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Calendar className="h-6 w-6 text-[#ff5f26]" />
                        <span className="text-lg font-medium">Available for new projects</span>
                        <motion.div
                            className="w-3 h-3 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Background decoration */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[12vw] sm:text-[10vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
            >
                Contact
            </motion.div>
        </section>
    );
};

export default Contact;
