"use client";

import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconBrandDiscord } from "@tabler/icons-react";
import { RiTwitterXLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface WakaTimeStats {
    humanReadableTotal: string;
    error?: string;
}

export default function Stats() {
    const [wakaTime, setWakaTime] = useState<WakaTimeStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWakaTimeStats = async () => {
            try {
                const response = await fetch('/api/wakatime');
                const data = await response.json();
                setWakaTime(data);
            } catch (error) {
                console.error('Failed to fetch WakaTime stats:', error);
                setWakaTime({ humanReadableTotal: '53h', error: 'Failed to load' });
            } finally {
                setLoading(false);
            }
        };

        fetchWakaTimeStats();
    }, []);

    return (
        <section className="py-10 relative z-20 px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">

                {/* GitHub Repo Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 h-48"
                >
                    <Link href="https://github.com/cyberboyayush/cappychat" target="_blank" className="h-full block">
                        <div className="h-full flex flex-col justify-between  border border-neutral-300/70 rounded-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dyetf2h9n/image/upload/v1759138327/AV_1_zztl3w.png')] bg-cover bg-center opacity-100 blur-[2px] transition-opacity duration-500 " />


                            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-md border border-neutral-300 flex items-center justify-center">
                                        <IconBrandGithub className="w-6 h-6 text-foreground" />
                                    </div>
                                    <span className="bg-background/50 backdrop-blur-md border border-neutral-200 text-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3" /> Stars
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                        cappychat
                                        <span className="text-slate-100 font-normal text-sm">/ cyberboyayush</span>
                                    </h3>
                                    <p className="text-slate-50 text-sm line-clamp-1">
                                        Next-generation AI chat platform engineered for performance and scalability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* GitHub Heatmap */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 h-48"
                >
                    <Link href="https://github.com/VrandaaGarg/" target="_blank" className="h-full block">
                        <div className="h-full bg-card border border-neutral-300/70 rounded-xl p-4 flex items-center justify-center shadow-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-card" />
                            <div className="relative -rotate-2 scale-105 blur-[1px] z-10 w-full h-full flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-2 px-2">
                                    <div className="w-3 h-3 rounded-sm bg-green-700" />
                                    <div className="w-3 h-3 rounded-sm bg-green-500" />
                                    <div className="w-3 h-3 rounded-sm bg-green-400" />
                                    <div className="w-3 h-3 rounded-sm bg-green-200" />
                                    <span className="text-xs text-neutral-500 ml-auto">Contribution Graph</span>
                                </div>
                                {/* Using an image for heatmap as per request visual style, referencing user's actual github if possible or placeholder */}
                                {/* Since I can't dynamically generate it easily without a library, I'll use a stylized placeholder or an image API */}
                                <div className="w-full h-full overflow-hidden rounded-xl opacity-100 transition-opacity">
                                    {/* Using ghchart as a placeholder representation */}
                                    <img
                                        src="https://ghchart.rshah.org/03C851/VrandaaGarg"
                                        alt="GitHub Contributions"
                                        className="w-full h-full object-cover object-right"
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Avatar Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="md:col-span-1 h-48 rounded-xl shadow-sm"
                >
                    <Link href="https://github.com/VrandaaGarg/" target="_blank" className="h-full block">
                        <div className="h-full bg-card border border-neutral-200 rounded-xl relative overflow-hidden p-0">
                            <Image
                                src="https://github.com/VrandaaGarg.png"
                                alt="Avatar"
                                fill
                                className="object-cover blur-[1px] transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute top-3 right-3 bg-neutral-900 backdrop-blur-sm p-2 rounded-full border border-white/10">
                                <ArrowUpRight className="w-4 h-4 text-background" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-neutral-200 to-transparent">
                                <p className="text-foreground font-bold  ">Vranda Garg</p>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Socials & WakaTime */}
                <div className="md:col-span-1 flex flex-col gap-4 h-48">
                    <div className="flex gap-4 h-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex-1 shadow-sm rounded-xl"
                        >
                            <Link href="https://www.linkedin.com/in/vrandagarg/" target="_blank" className="h-full block">
                                <div className="h-full bg-[#0077b5] border border-neutral-300 rounded-xl flex items-center justify-center hover:brightness-110 transition-all">
                                    <IconBrandLinkedin className="w-8 h-8 text-white" />
                                </div>
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex-1 shadow-sm rounded-xl"
                        >
                            <Link href="https://x.com/vrandaagarg" target="_blank" className="h-full block">
                                <div className="h-full bg-card border border-neutral-300/70 rounded-xl flex items-center justify-center hover:bg-neutral-100 transition-all">
                                    <RiTwitterXLine className="w-8 h-8 text-foreground" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="h-1/2"
                    >
                        <div className="h-full bg-card border border-neutral-200 hover:bg-neutral-100 transition-all shadow-sm rounded-xl flex items-center justify-center relative overflow-hidden">
                            <div className="text-center relative z-10 rotate-2">
                                <Code className="w-6 mx-auto h-6 text-neutral-400 mb-1" />
                                <h3 className="text-md font-mono font-bold text-foreground">
                                    {loading ? '...' : wakaTime?.humanReadableTotal || '0h'}
                                </h3>
                                <p className="text-[10px] text-neutral-600">
                                    coding stats (last 7 days) <br />

                                </p>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-20 h-20  blur-3xl rounded-full" />
                        </div>
                    </motion.div>
                </div>

                {/* Discord/Offchain Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 h-48"
                >
                    <div className="h-full bg-card border border-neutral-300/70 rounded-xl shadow flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <IconBrandDiscord className="w-40 h-40 text-foreground rotate-12" />
                        </div>

                        <div className="relative z-10 text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-neutral-400 font-medium tracking-widest uppercase text-sm">Discord</span>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-1">vrandagarg</h3>
                            <p className="text-neutral-500 text-sm">Let's chat about tech & anime</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
