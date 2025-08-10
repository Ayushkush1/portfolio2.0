import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Experience = () => {
    const experiences = [
        {
            id: 1,
            role: "Freelance Practice",
            company: "Ayush Studio",
            period: "2021 → Now"
        },
        {
            id: 2,
            role: "Design Lead",
            company: "TechCorp",
            period: "2024 → Now"
        },
        {
            id: 3,
            role: "Senior Designer",
            company: "StartupX",
            period: "2019 → 2024"
        },

    ];

    return (
        <section id="experience" className="relative py-24 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Small orange dot in top right */}
                <motion.div
                    className="absolute top-8 right-8 w-4 h-4 bg-brand rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container relative z-10 max-w-7xl mx-auto px-4 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    {/* Left Side - Profile Image & Info */}
                    <div className="-rotate-2">
                        <motion.div
                            className="order-1 lg:order-1 flex flex-col pt-12 "
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {/* Profile Image */}
                            <motion.div
                                className="relative mb-4"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-full  aspect-[4/3] bg-gradient-to-br from-amber-200/20 via-gray-800 to-gray-900 rounded-3xl shadow-2xl">
                                    {/* Placeholder for profile image */}
                                    <div className="max-w-[25rem]  ml-[5.5rem] flex items-center justify-center">
                                        <img src="lovable-uploads/Profile.png" className="object-cover h-full w-full" alt="" />
                                    </div>
                                </div>
                            </motion.div>

                            <div className="flex justify-between px-4">
                                {/* Name & Title */}
                                <motion.div
                                    className="mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-lg font-semibold text-foreground">Ayush Kushwaha</h3>
                                    <p className="text-gray-500 text-xs">Freelance Developer</p>
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    className="flex gap-4 justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                    viewport={{ once: true }}
                                >

                                    <motion.a
                                        href="#"
                                        className="w-6 h-6 text-gray-400 hover:text-brand transition-all duration-200"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Linkedin className="w-full h-full" />
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        className="w-6 h-6 text-gray-400 hover:text-brand transition-all duration-200"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Github className="w-full h-full" />
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        className="w-6 h-6 text-gray-400 hover:text-brand transition-all duration-200"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Instagram className="w-full h-full" />
                                    </motion.a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side - Content */}
                    <motion.div
                        className="order-2 lg:order-2 pt-12"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Header */}
                        <div className="mb-12">
                            <motion.p
                                className="text-gray-400 text-lg mb-4 italic"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                My Experiences
                            </motion.p>
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-8"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                Pushing boundaries{" "}
                                <span className="text-gray-400 font-normal">since 2023</span>
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                className="text-gray-600 text-[16px] leading-relaxed mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                Ayush is a passionate designer known for his innovative,
                                expressive digital work. He helps startups and studios
                                create clean interfaces and strong branding. Based in
                                India, he blends function with emotion and often
                                spends his free time exploring new design trends or
                                working on creative projects.
                            </motion.p>
                        </div>

                        {/* Experience Table */}
                        <motion.div
                            className="space-y-0 rounded-2xl px-4 shadow-sm"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={exp.id}
                                    className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0  transition-colors duration-200 rounded-lg px-4 -mx-4"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-200 text-sm">
                                            {exp.role}
                                        </p>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <p className="text-gray-500 text-sm">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="flex-1 text-right">
                                        <p className="text-gray-400 text-sm">
                                            {exp.period}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>


            </div>

            {/* Background decoration */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[12vw] sm:text-[10vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
            >
                Experience
            </motion.div>
        </section>
    );
};



export default Experience;
