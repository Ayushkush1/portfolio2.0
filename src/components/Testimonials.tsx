import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sophie Lemaire",
            role: "Product Lead at Loomi",
            image: "/lovable-uploads/placeholder.svg",
            text: "Working with Joris was a game-changer. He instantly understood our vision and translated it into a sleek, intuitive product. The process felt effortless, and the results exceeded our expectations."
        },
        {
            id: 2,
            name: "Milan Bakker",
            role: "Founder of Drifted Studio",
            image: "/lovable-uploads/placeholder.svg",
            text: "Joris brings clarity to chaos. His design work is not only beautiful but deeply strategic. He helped us rebrand from the ground up, and our audience response has been incredible."
        }
    ];

    return (
        <section className="relative py-24 bg-gradient-to-br from-background via-background to-primary/5">
            <div className="container relative z-10 max-w-7xl mx-auto px-4 pb-16">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative min-h-[600px]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {/* Vertical Line Between Cards */}
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-700 transform -translate-x-1/2 hidden lg:block"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: "top" }}
                    />

                    {/* Left Testimonial - Top Position */}
                    <motion.div
                        className="p-16 lg:pr-24 flex items-start"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            {/* Testimonial Text */}
                            <motion.div
                                className="flex items-start gap-4 mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                viewport={{ once: true }}
                            >
                                <p className="text-gray-300 text-xl leading-relaxed">
                                    {testimonials[0].text}
                                </p>
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <Quote className="h-8 w-8 text-brand flex-shrink-0 mt-1" />
                                </motion.div>
                            </motion.div>

                            {/* Client Info */}
                            <motion.div
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={testimonials[0].image}
                                        alt={testimonials[0].name}
                                        className="w-full h-full object-cover bg-gray-700"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-base">
                                        {testimonials[0].name}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {testimonials[0].role}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Testimonial - Bottom Position */}
                    <motion.div
                        className="p-16 lg:pl-24 flex items-end"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            {/* Testimonial Text */}
                            <motion.div
                                className="flex items-start gap-4 mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <p className="text-gray-300 text-xl leading-relaxed">
                                    {testimonials[1].text}
                                </p>
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                    viewport={{ once: true }}
                                >
                                    <Quote className="h-8 w-8 text-brand flex-shrink-0 mt-1" />
                                </motion.div>
                            </motion.div>

                            {/* Client Info */}
                            <motion.div
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={testimonials[1].image}
                                        alt={testimonials[1].name}
                                        className="w-full h-full object-cover bg-gray-700"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white text-base">
                                        {testimonials[1].name}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {testimonials[1].role}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
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
                Reviews
            </motion.div>
        </section>
    );
};

export default Testimonials;
