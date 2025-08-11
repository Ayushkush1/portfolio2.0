import { motion } from "framer-motion";

const Process = () => {
    const processSteps = [
        {
            id: 1,
            number: "01",
            title: "Discovery",
            description: "Understanding your goals, target audience, and project requirements"
        },
        {
            id: 2,
            number: "02",
            title: "Strategy",
            description: "Creating a comprehensive plan and timeline for your project"
        },
        {
            id: 3,
            number: "03",
            title: "Design",
            description: "Crafting beautiful, user-centered designs with your feedback"
        },
        {
            id: 4,
            number: "04",
            title: "Development",
            description: "Building your project with clean, efficient, and scalable code"
        },
        {
            id: 5,
            number: "05",
            title: "Launch",
            description: "Testing, optimization, and successful deployment of your project"
        }
    ];

    return (
        <section id="process" className="relative py-24 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            <div className="container relative z-10 max-w-7xl mx-auto px-4 pb-28">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        className="text-gray-400 text-lg mb-4 italic"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Our Process, Explained
                    </motion.p>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Here's how it works
                    </motion.h2>
                </motion.div>

                {/* Process Cards in Two Rows */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {/* Top Row - First 3 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 relative">
                        {processSteps.slice(0, 3).map((step, index) => (
                            <motion.div
                                key={step.id}
                                className={`relative ${index === 1 ? 'md:mt-8' : ''}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Curved Arrow from card 1 to 2 */}
                                {index === 0 && (
                                    <motion.svg
                                        className="hidden md:block absolute top-16 -right-14 rotate-[10deg] w-20 h-12 text-brand z-50"
                                        viewBox="0 0 80 50"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 1 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.path
                                            d="M5 25 Q40 5 75 25"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                        <motion.circle
                                            cx="5"
                                            cy="25"
                                            r="3"
                                            fill="currentColor"
                                        />
                                        <motion.circle
                                            cx="75"
                                            cy="25"
                                            r="3"
                                            fill="currentColor"
                                        />
                                    </motion.svg>
                                )}

                                {/* Curved Arrow from card 2 to 3 */}
                                {index === 1 && (
                                    <motion.svg
                                        className="hidden md:block absolute top-48 -right-14 -rotate-[15deg] w-20 h-12 text-brand z-50"
                                        viewBox="0 0 80 50"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 1.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.path
                                            d="M5 25 Q40 45 75 25"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                        <motion.circle
                                            cx="5"
                                            cy="25"
                                            r="3"
                                            fill="currentColor"
                                        />
                                        <motion.circle
                                            cx="75"
                                            cy="25"
                                            r="3"
                                            fill="currentColor"
                                        />
                                    </motion.svg>
                                )}

                                {/* Arrow from card 3 to card 4 (down to next row) */}
                                {index === 2 && (
                                    <motion.svg
                                        className="hidden md:block absolute -bottom-14 left-36 transform -translate-x-1/2 translate-y-8 w-24 h-34 rotate-[10deg] text-brand z-50"
                                        viewBox="0 0 80 120"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 1.4 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.path
                                            d="M40 5 Q60 60 20 115"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                        <motion.circle
                                            cx="40"
                                            cy="5"
                                            r="3"
                                            fill="currentColor"
                                        />
                                        <motion.circle
                                            cx="20"
                                            cy="115"
                                            r="3"
                                            fill="currentColor"
                                        />
                                    </motion.svg>
                                )}

                                {/* Step Card */}
                                <motion.div
                                    className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-brand/30 transition-all duration-300 relative z-10 h-80"
                                    initial={{ opacity: 0, y: 50, rotate: 0 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        rotate: index === 0 ? 3 : index === 1 ? -4 : 2
                                    }}
                                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Step Number - Large at top */}
                                    <div className="text-6xl font-bold text-brand mb-8">
                                        {step.number}
                                    </div>

                                    {/* Content at bottom */}
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Row - Last 2 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto relative">
                        {processSteps.slice(3).map((step, index) => (
                            <motion.div
                                key={step.id}
                                className="relative"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Curved Arrow from card 4 to 5 */}
                                {index === 0 && (
                                    <motion.svg
                                        className="hidden md:block absolute top-52 -right-14 w-20 h-16 text-brand z-50"
                                        viewBox="0 0 60 50"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 1.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.path
                                            d="M5 25 Q30 5 55 25"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                        <motion.circle
                                            cx="5"
                                            cy="25"
                                            r="3"
                                            fill="currentColor"
                                        />
                                        <motion.circle
                                            cx="55"
                                            cy="25"
                                            r="3"
                                            fill="currentColor"
                                        />
                                    </motion.svg>
                                )}

                                {/* Step Card */}
                                <motion.div
                                    className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-brand/30 transition-all duration-300 relative z-10 h-80"
                                    initial={{ opacity: 0, y: 50, rotate: 0 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        rotate: index === 0 ? -3 : 2
                                    }}
                                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Step Number - Large at top */}
                                    <div className="text-6xl font-bold text-brand mb-8">
                                        {step.number}
                                    </div>

                                    {/* Content at bottom */}
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Background decoration */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[5vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
            >
                Process
            </motion.div>
        </section>
    );
};

export default Process;
