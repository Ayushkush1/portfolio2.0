import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Quote, Star, Users } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const Testimonials = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const testimonials = [
        {
            id: 1,
            name: "Founder",
            role: "Erichost",
            text: "I'm thoroughly impressed with Ayush's designing creativity! He brought fresh ideas to our hosting platform and delivered beyond expectations. His creative approach to web design is exactly what Erichost needed.",
            rating: 5,
            avatar: "/avatar/erichost.jpg"
        },
        {
            id: 2,
            name: "Founder",
            role: "NinzaHost",
            text: "Ayush transformed our vision into a stunning web hosting platform. His technical expertise and attention to detail made NinzaHost stand out in the competitive hosting market. The user experience he created is simply outstanding!",
            rating: 5,
            avatar: "/avatar/ninzahost.png"
        },
        {
            id: 3,
            name: "Anshul Singh",
            role: "Senior Software Engineer",
            text: "I’ve worked with Ayush on multiple projects, and he’s been a solid frontend developer throughout. He’s quick to pick things up, writes clean code, and always brings a positive attitude to the team. He’ll definitely be a great addition to any team.",
            rating: 5,
            avatar: "/avatar/anshul.jpg"
        },
        {
            id: 4,
            name: "Vishal Vishwakarma",
            role: "CRO at Thomson Reuters",
            text: "I had the pleasure of working with Ayush during his internship, and I was impressed by his strong coding skills and sharp problem-solving ability. He consistently delivered quality work and showed great initiative. Highly recommended for any tech role.",
            rating: 5,
            avatar: "/avatar/vishal.jpg"
        }
    ];

    // Automatic slider
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length, isHovered]);

    return (
        <section ref={sectionRef} id="testimonials" className="relative pt-12 md:pt-32 md:pb-10 bg-background overflow-hidden">
            {/* Moving Background Text (Desktop) */}
            <motion.div 
                style={{ x }}
                className="absolute top-20 left-0 whitespace-nowrap text-[14rem] font-bold text-white/[0.02] select-none pointer-events-none hidden md:block"
            >
                CLIENT FEEDBACK • REAL RESULTS • CLIENT FEEDBACK • REAL RESULTS
            </motion.div>

            <div className="container relative z-10 max-w-7xl mx-auto px-4 pb-16">
                {/* Header */}
                <div className="text-center mb-8 md:mb-32 px-4">
                    <motion.p
                        className="text-brand text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Success Stories
                    </motion.p>
                    <h2 className="text-[2.2rem] md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
                        Loved by <span className="text-gray-500 italic font-light">visionaries<span className="text-brand">.</span></span>
                    </h2>
                </div>

                {/* --- MOBILE AUTO-SLIDING UI --- */}
                <div className="md:hidden relative h-[350px] px-2 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeIndex}
                            className="relative flex flex-col w-full text-center items-center"
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            {/* Huge Quote Mark Background */}
                            <Quote className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-24 h-24 text-brand/5 -rotate-6 pointer-events-none" />
                            
                            {/* Floating Index */}
                            <div className="text-brand/40 font-mono text-sm mb-6 tracking-tighter">
                                / 0{activeIndex + 1}
                            </div>

                            {/* Large Typography Text (No Box) */}
                            <p className="text-lg font-extralight text-gray-400 leading-relaxed mb-8 tracking-wider italic max-w-[90vw]">
                                "{testimonials[activeIndex].text}"
                            </p>

                            {/* Minimal Author Info */}
                            <div className="flex flex-col items-center">
                                {testimonials[activeIndex].avatar && (
                                    <img src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} className="w-12 h-12 rounded-full mb-3 object-cover border border-white/10" />
                                )}
                                <h4 className="text-white font-semibold text-base leading-none mb-2">{testimonials[activeIndex].name}</h4>
                                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">{testimonials[activeIndex].role}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Bar Indicators */}
                    <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex gap-3">
                        {testimonials.map((_, i) => (
                            <div 
                                key={i}
                                className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-brand' : 'w-2 bg-white/10'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* --- DESKTOP ORIGINAL UI (Preserved) --- */}
                <motion.div
                    className="hidden md:grid lg:grid-cols-2 gap-16 md:gap-0 relative min-h-[600px]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2 hidden lg:block"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: "top" }}
                    >
                        {/* Unique subtle progress indicator on the central line */}
                        <motion.div 
                            className="absolute top-0 left-0 w-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.1)] rounded-full"
                            initial={false}
                            animate={{
                                height: `${100 / testimonials.length}%`,
                                top: `${(activeIndex / testimonials.length) * 100}%`
                            }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        />
                    </motion.div>

                    {/* Left Testimonial */}
                    <motion.div
                        className="md:p-16 lg:pr-24 flex items-start"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeIndex}
                                className="relative w-full"
                                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
                                exit={{ opacity: 0, filter: "blur(8px)", scale: 1.05, y: -15 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonials[activeIndex].rating || 5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-brand text-brand" />
                                    ))}
                                </div>
                                <div className="flex items-start gap-4 mb-10">
                                    <p className="text-gray-300 text-xl leading-relaxed italic">
                                        "{testimonials[activeIndex].text}"
                                    </p>
                                    <Quote className="h-8 w-8 text-brand flex-shrink-0 mt-1 opacity-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 overflow-hidden">
                                        {testimonials[activeIndex].avatar ? (
                                            <img src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Users className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-base">{testimonials[activeIndex].name}</h4>
                                        <p className="text-gray-400 text-sm">{testimonials[activeIndex].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Right Testimonial */}
                    <motion.div
                        className="md:p-16 lg:pl-24 flex items-end"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={(activeIndex + 1) % testimonials.length}
                                className="relative w-full"
                                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
                                exit={{ opacity: 0, filter: "blur(8px)", scale: 1.05, y: -15 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonials[(activeIndex + 1) % testimonials.length].rating || 5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-brand text-brand" />
                                    ))}
                                </div>
                                <div className="flex items-start gap-4 mb-10">
                                    <p className="text-gray-300 text-xl leading-relaxed italic">
                                        "{testimonials[(activeIndex + 1) % testimonials.length].text}"
                                    </p>
                                    <Quote className="h-8 w-8 text-brand flex-shrink-0 mt-1 opacity-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 overflow-hidden">
                                        {testimonials[(activeIndex + 1) % testimonials.length].avatar ? (
                                            <img src={testimonials[(activeIndex + 1) % testimonials.length].avatar} alt={testimonials[(activeIndex + 1) % testimonials.length].name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Users className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-base">{testimonials[(activeIndex + 1) % testimonials.length].name}</h4>
                                        <p className="text-gray-400 text-sm">{testimonials[(activeIndex + 1) % testimonials.length].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
