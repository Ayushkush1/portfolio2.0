import { motion } from "framer-motion";

const ScrollingServices = () => {
    const services = [
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Frontend Development",
        "Backend Development",
        "Full-Stack Solutions",
        "React Development",
        "TypeScript Development",
        "Node.js Development",
        "Database Design",
        "API Development",
        "E-commerce Solutions",
        "Landing Pages",
        "Portfolio Websites",
        "Custom Web Applications",
        "Responsive Design",
        "Performance Optimization",
        "SEO Implementation",
        "Brand Identity Design",
        "Digital Marketing Solutions"
    ];

    // Create a continuous string with separators
    const servicesText = services.join(" • ") + " • ";

    return (
        <div className="relative overflow-hidden  py-4">
            {/* Background overlay for better text visibility */}
            <div className="absolute inset-0" />

            {/* Scrolling text container */}
            <div className="relative flex whitespace-nowrap">
                {/* First scrolling text */}
                <motion.div
                    className="flex items-center  font-bolder text-lg text-[2vw] sm:text-[3vw] md:text-[3vw] leading-none font-extrabold tracking-tight text-white/50"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        duration: 220, // Slower speed for better readability
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <span className="px-4">{servicesText}</span>
                    <span className="px-4">{servicesText}</span>
                </motion.div>

                {/* Second scrolling text (for seamless loop) */}
                <motion.div
                    className="flex items-center text-white font-bolder text-lg md:text-[3rem] tracking-wide"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        duration: 220,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <span className="px-4">{servicesText}</span>
                    <span className="px-4">{servicesText}</span>
                </motion.div>
            </div>

            {/* Gradient fade effects on sides */}
            <div className="absolute left-0 top-0 h-full w-60 bg-dr-to-r from-dark to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-60 bg-gradient-to-l from-dark to-transparent pointer-events-none" />
        </div>
    );
};

export default ScrollingServices;
