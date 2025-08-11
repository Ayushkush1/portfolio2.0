import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Experience = () => {
    const experiences = [
        {
            id: 1,
            role: "Frontend Lead",
            company: "NinzaHost",
            period: "2024 → Now"
        },
        {
            id: 2,
            role: "Freelance Practice",
            company: "Freelance Agency",
            period: "2023 → Now"
        },
        {
            id: 3,
            role: "Full Stack Developer",
            company: "Tigsaw & RemoveQ",
            period: "2022 → Now"
        },

    ];

    return (
        <section id="experience" className="relative py-24 pt-40 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
           

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
                                        href="https://www.linkedin.com/in/ayush-kushwaha-b3b76915b/"
                                        target="_blank"
                                        className="w-6 h-6 text-gray-400 transition-colors duration-300"
                                        whileHover={{
                                            scale: 1.15,
                                            color: "rgb(var(--brand-rgb, 251, 146, 60))"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        }}
                                    >
                                        <Linkedin className="w-full h-full" />
                                    </motion.a>
                                    <motion.a
                                        href="https://github.com/Ayushkush1"
                                        target="_blank"
                                        className="w-6 h-6 text-gray-400 transition-colors duration-300"
                                        whileHover={{
                                            scale: 1.15,
                                            color: "rgb(var(--brand-rgb, 251, 146, 60))"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        }}
                                    >
                                        <Github className="w-full h-full" />
                                    </motion.a>
                                    <motion.a
                                        href="https://www.instagram.com/awsm_ayush_/"
                                        target="_blank"
                                        className="w-6 h-6 text-gray-400 transition-colors duration-300"
                                        whileHover={{
                                            scale: 1.15,
                                            color: "rgb(var(--brand-rgb, 251, 146, 60))"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        }}
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
                                className="text-gray-600 text-[17px] leading-relaxed mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                Ayush is a product‑focused developer crafting clean, expressive interfaces and strong brand systems for startups. Based in India, he blends function with emotion and explores new design trends through side projects.
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
                                    className="flex justify-between items-center py-4 border-b border-gray-100/10 last:border-b-0  transition-colors duration-200  px-4 -mx-4"
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
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[5vw] sm:text-[6vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-foreground/5"
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
