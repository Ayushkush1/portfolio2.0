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
    const leftContentRef = useRef<HTMLDivElement>(null);
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

            tl.fromTo(leftContentRef.current, 
                { opacity: 0, x: -40, filter: "blur(8px)" }, 
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
            )
            .fromTo(".stat-card-gsap", 
                { opacity: 0, y: 30, scale: 0.95 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
                "-=0.6"
            )
            .fromTo(calendarRef.current, 
                { opacity: 0, x: 40, filter: "blur(8px)" }, 
                { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
                "-=0.6"
            )
            .fromTo(bgTextRef.current,
                { opacity: 0, scale: 0.9, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" },
                "-=1"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="github" className="relative py-24 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden h-screen">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="lg:w-5/12 flex flex-col justify-center relative">
                        <div ref={leftContentRef} className="opacity-0">
                            <div className="inline-flex items-center gap-2 mb-8 shadow-lg backdrop-blur-sm relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <Github className="w-4 h-4 text-gray-400 italic" />
                                <span className="text-gray-400 text-sm font-medium tracking-wider uppercase italic">GitHub Activity</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-[3rem] tracking-tight mb-8 leading-[1.1]" style={{ fontFamily: "'Fraunces', serif" }}>
                                <span className="text-gray-400 block font-normal mb-1">Building</span>
                                <span className="text-gray-400 block font-normal mb-2">consistently,</span>
                                <span className="text-white font-bold italic">shipping daily<span className="text-[#ff5f26]">.</span></span>
                            </h2>

                            <p className="text-foreground/50 text-lg md:text-lg mb-10 leading-relaxed font-light max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                My GitHub reflects my passion for building products, experimenting with ideas, and staying consistent through daily commits.
                            </p>

                            <motion.button
                                whileHover={{ boxShadow: "0 15px 40px rgba(255, 95, 38, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank')}
                                className="self-start group flex items-center gap-4 p-1.5 pr-8 rounded-full bg-[#ff5f26] text-white shadow-[0_10px_30px_rgba(255,95,38,0.2)] transition-all duration-300"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#ff5f26] group-hover:rotate-0 -rotate-45 transition-transform duration-500">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <div className="relative overflow-hidden h-5">
                                    <motion.div
                                        className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-5"
                                    >
                                        <span className="h-5 flex items-center text-[14px] font-semibold tracking-wide">View GitHub Profile</span>
                                        <span className="h-5 flex items-center text-[14px] font-semibold tracking-wide">View GitHub Profile</span>
                                    </motion.div>
                                </div>
                            </motion.button>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:w-7/12 flex flex-col justify-center gap-6">

                        {/* Stats Cards Row */}
                        <div className="w-full flex justify-center lg:justify-end">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[800px]">
                                <StatCard
                                    icon={<BookOpen className="w-4 h-4" />}
                                    label="Public Repos"
                                    value={loading ? "..." : data?.public_repos}
                                />
                                <StatCard
                                    icon={<Users className="w-4 h-4" />}
                                    label="Followers"
                                    value={loading ? "..." : data?.followers}
                                />
                                <StatCard
                                    icon={<Activity className="w-4 h-4" />}
                                    label="Daily Commits"
                                    value="Active"
                                />
                                <StatCard
                                    icon={<GitBranch className="w-4 h-4" />}
                                    label="Open Source"
                                    value="Yes"
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-center lg:justify-end">
                            <div ref={calendarRef} className="w-full max-w-[800px] flex flex-col gap-6 opacity-0">
                                <div className="w-full border border-white/10 rounded-md p-4 md:p-5 bg-[#0d1117] overflow-hidden text-foreground/80 flex justify-center shadow-2xl relative">
                                    <div className="transform scale-[0.8] sm:scale-95 md:scale-100 origin-center flex justify-center w-full">
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
                                            blockSize={10}
                                            blockMargin={3}
                                            blockRadius={2}
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
                                            style={{ fontSize: '11px', padding: '1px 1px', borderRadius: '5px', zIndex: 50, fontWeight: 500 }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 w-full justify-center lg:justify-end">
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => setSelectedYear(year)}
                                            className={`text-xs py-1 px-3 rounded-full transition-all whitespace-nowrap ${
                                                selectedYear === year 
                                                ? 'bg-white/80 backdrop-blur-sm text-black font-semibold shadow-sm' 
                                                : 'bg-white/5 text-foreground/60 hover:bg-white/10 hover:text-foreground border border-white/5'
                                            }`}
                                        >
                                            {year === 'last' ? 'Last year' : year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

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
