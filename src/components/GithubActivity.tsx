import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Github, GitBranch, Star, Users, BookOpen, Activity, ArrowRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = "Ayushkush1";

interface GithubData {
    followers: number;
    following: number;
    public_repos: number;
    repos: any[];
}

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number | undefined }) => (
    <div className="stat-card-gsap opacity-0 p-5 rounded-xl bg-[#0d1117] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="text-foreground/60 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:text-foreground group-hover:bg-white/10 transition-all">
                {icon}
            </div>
            <div className="text-[10px] font-semibold text-foreground/50 uppercase tracking-widest">{label}</div>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-foreground/90 tracking-tight relative z-10">{value || 0}</div>
    </div>
);

const GithubActivity = () => {
    const [data, setData] = useState<GithubData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<'last' | number>('last');

    const currentYear = new Date().getFullYear();
    const years: ('last' | number)[] = ['last', currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                const userData = await userRes.json();
                const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=3`);
                const reposData = await reposRes.json();

                setData({
                    followers: userData.followers || 0,
                    following: userData.following || 0,
                    public_repos: userData.public_repos || 0,
                    repos: Array.isArray(reposData) ? reposData : [],
                });
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGithubData();
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%", 
                }
            });

            tl.fromTo(headerRef.current, 
                { opacity: 0, y: 30, filter: "blur(10px)" }, 
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
            )
            .fromTo(calendarRef.current, 
                { opacity: 0, y: 40, scale: 0.98, filter: "blur(10px)" }, 
                { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
                "-=0.6"
            );

            // Reveal background text
            gsap.fromTo(bgTextRef.current, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.5, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Subtle parallax for calendar card
            gsap.to(calendarRef.current, {
                y: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="github" className="relative py-32 pb-48 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                
                {/* Minimal Header */}
                <div ref={headerRef} className="text-center mb-24 opacity-0">
                    <h2 className="text-6xl md:text-7xl tracking-tight leading-[0.9] mb-8" style={{ fontFamily: "'Fraunces', serif" }}>
                        <span className="text-gray-500 font-light italic block text-3xl md:text-4xl mb-2">Building consistently,</span>
                        <span className="text-white font-bold">shipping daily<span className="text-[#ff5f26]">.</span></span>
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                         <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Live Sync</span>
                         </div>
                         <div className="w-[1px] h-4 bg-white/10" />
                         <p className="text-gray-500 font-medium tracking-[0.2em] uppercase text-[10px]">
                             GitHub Activity History
                         </p>
                    </div>
                </div>

                {/* Massive Calendar Block */}
                <div ref={calendarRef} className="w-full max-w-7xl opacity-0">
                    <div className="w-full border border-white/[0.08] rounded-3xl p-6 md:p-10 bg-[#0d1117]/50 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
                        <div className="transform scale-[0.75] sm:scale-90 md:scale-100 lg:scale-[1.1] origin-center flex justify-center w-full py-4">
                            <GitHubCalendar
                                username={GITHUB_USERNAME}
                                year={selectedYear === 'last' ? undefined : selectedYear}
                                colorScheme="dark"
                                showWeekdayLabels={true}
                                theme={{
                                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                }}
                                fontSize={11}
                                blockSize={14}
                                blockMargin={6}
                                blockRadius={3}
                                renderBlock={(block, activity) => {
                                    const date = new Date(activity.date);
                                    const month = date.toLocaleString('default', { month: 'long' });
                                    const day = date.getDate();
                                    const getOrdinal = (n: number) => {
                                        const s = ["th", "st", "nd", "rd"];
                                        const v = n % 100;
                                        return n + (s[(v - 20) % 10] || s[v] || s[0]);
                                    };
                                    return React.cloneElement(block as React.ReactElement, {
                                        'data-tooltip-id': 'react-tooltip',
                                        'data-tooltip-content': `${activity.count} contribution${activity.count !== 1 ? 's' : ''} on ${month} ${getOrdinal(day)}.`,
                                    });
                                }}
                            />
                            <Tooltip 
                                id="react-tooltip" 
                                style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '8px', zIndex: 50, fontWeight: 500, backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(4px)' }}
                            />
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-8 px-4">
                        <div className="flex flex-wrap gap-2 justify-center order-2 md:order-1">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`text-[10px] md:text-xs py-1.5 px-4 rounded-full transition-all whitespace-nowrap border ${
                                        selectedYear === year 
                                        ? 'bg-white text-black border-white font-bold shadow-lg shadow-white/10' 
                                        : 'bg-white/5 text-foreground/50 border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {year === 'last' ? 'Last year' : year}
                                </button>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 95, 38, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank')}
                            className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[#ff5f26] border border-[#ff5f26]/20 bg-[#ff5f26]/5 py-2.5 px-6 rounded-full hover:bg-[#ff5f26] hover:text-white transition-all duration-300 order-1 md:order-2"
                        >
                            View Full Profile <ExternalLink className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div
                ref={bgTextRef}
                className="pointer-events-none absolute bottom-0 left-0 w-full select-none text-[15vw] sm:text-[6vw] md:text-[8vw] pb-3 leading-none font-extrabold tracking-tight text-foreground/5 z-0 opacity-0"
            >
                Activity
            </div>
        </section>
    );
};

export default GithubActivity;
