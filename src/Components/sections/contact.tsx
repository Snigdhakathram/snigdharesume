"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "@/data/social";
import {
    Check,
    Play,
    Terminal,
    Mail,
    Loader2,
    AlertCircle,
    Code2,
    MessageSquare,
    Send
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";
import SpotlightCard from "@/Components/ui/SpotlightCard";
import Magnetic from "@/Components/ui/Magnetic";
import RotatingText from "@/Components/ui/RotatingText";

export default function Contact() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [view, setView] = useState<"technical" | "non-technical">("non-technical");
    const [copied, setCopied] = useState(false);
    const email = "gargvranda963@gmail.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormState("submitting");

        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch("https://formsubmit.co/ajax/gargvranda963@gmail.com", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setFormState("success");
            } else {
                setFormState("error");
            }
        } catch {
            setFormState("error");
        }
    }

    return (
        <section id="contact" className="w-full py-20 px-4 md:px-8 relative overflow-hidden :bg-transparent">
            <div className="max-w-4xl mx-auto relative z-10">

                {/* Header Section */}
                <div className="text-center mb-6 space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                            Let&apos;s work on
                        </h2>
                        <div className="h-14 md:h-16 flex items-center justify-center mt-2 overflow-hidden">
                            <RotatingText
                                texts={["New Projects", "Collaborations", "Ideas", "Growth"]}
                                rotationInterval={2000}
                                staggerDuration={0.02}
                                staggerFrom="last"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                mainClassName="text-4xl md:text-5xl font-bold text-foreground"
                                splitLevelClassName="overflow-hidden pb-2"
                            />
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-neutral-600 text-lg max-w-xl mx-auto"
                    >
                        Whether you have a question, a project proposal, or just want to say hi, I&apos;ll try my best to get back to you!
                    </motion.p>
                </div>

                {/* View Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-5"
                >
                    <div className="bg-neutral-100 backdrop-blur-xs p-1.5 rounded-xl border border-neutral-200  inline-flex items-center gap-1 shadow-inner">
                        {[
                            { id: "non-technical" as const, icon: MessageSquare, label: "Standard" },
                            { id: "technical" as const, icon: Code2, label: "Developer" }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
                                    view === item.id ? "text-foreground dark:text-card" : "text-neutral-600  hover:text-neutral-700 "
                                )}
                            >
                                {view === item.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Main Card Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <SpotlightCard
                        className="bg-card backdrop-blur-sm border border-neutral-300  rounded-2xl shadow-sm overflow-hidden"
                        spotlightColor="rgba(255, 255, 255, 0.15)"
                    >
                        <div className="relative p-1 min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {view === "technical" ? (
                                    <motion.div
                                        key="technical"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="w-full h-full bg-[#1a1a1a] rounded-xl overflow-hidden font-mono text-sm shadow-inner border border-neutral-800"
                                    >
                                        {/* VS Code Header */}
                                        <div className="bg-[#252525] px-4 py-3 flex items-center justify-between border-b border-neutral-800 select-none">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1.5 mr-4">
                                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] rounded-md text-neutral-400 text-xs border border-neutral-800">
                                                    <Terminal className="w-3 h-3 text-blue-400" />
                                                    <span>contact.tsx</span>
                                                </div>
                                            </div>
                                            <div className="text-xs text-neutral-600">bash</div>
                                        </div>

                                        {/* Code Content */}
                                        <div className="p-6 overflow-x-auto">
                                            {formState === "success" ? (
                                                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center"
                                                    >
                                                        <Check className="w-8 h-8 text-green-500" />
                                                    </motion.div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-neutral-200">Message Sent!</h3>
                                                        <p className="text-neutral-500 mt-1 text-xs">Function execution completed successfully.</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setFormState("idle")}
                                                        className="text-blue-400 hover:text-blue-300 text-xs underline decoration-dashed underline-offset-4"
                                                    >
                                                        reset_form()
                                                    </button>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSubmit} className="space-y-1.5 relative">
                                                    {/* Code Lines */}
                                                    <div className="space-y-3 font-mono text-[13px] md:text-sm leading-relaxed">
                                                        <div className="flex group">
                                                            <span className="text-neutral-700 w-8 text-right mr-4 select-none">1</span>
                                                            <div className="flex flex-wrap">
                                                                <span className="text-[#c678dd]">const</span>&nbsp;
                                                                <span className="text-[#61afef]">contact</span>&nbsp;
                                                                <span className="text-neutral-400">=</span>&nbsp;
                                                                <span className="text-neutral-400">{`{`}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex group items-baseline">
                                                            <span className="text-neutral-700 w-8 text-right mr-4 select-none">2</span>
                                                            <div className="flex-1 flex flex-wrap items-center">
                                                                <span className="text-[#e06c75] ml-4">name</span>
                                                                <span className="text-neutral-400">:</span>&nbsp;
                                                                <span className="text-[#98c379]">&quot;</span>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    required
                                                                    placeholder="Your Name"
                                                                    className="bg-transparent border-none outline-none text-[#98c379] placeholder-[#98c379]/30 min-w-[100px] flex-1 p-0 focus:ring-0 h-auto"
                                                                />
                                                                <span className="text-[#98c379]">&quot;</span>
                                                                <span className="text-neutral-400">,</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex group items-baseline">
                                                            <span className="text-neutral-700 w-8 text-right mr-4 select-none">3</span>
                                                            <div className="flex-1 flex flex-wrap items-center">
                                                                <span className="text-[#e06c75] ml-4">email</span>
                                                                <span className="text-neutral-400">:</span>&nbsp;
                                                                <span className="text-[#98c379]">&quot;</span>
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    required
                                                                    placeholder="you@email.com"
                                                                    className="bg-transparent border-none outline-none text-[#98c379] placeholder-[#98c379]/30 min-w-[100px] flex-1 p-0 focus:ring-0 h-auto"
                                                                />
                                                                <span className="text-[#98c379]">&quot;</span>
                                                                <span className="text-neutral-400">,</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex group items-start">
                                                            <span className="text-neutral-700 w-8 text-right mr-4 select-none pt-1">4</span>
                                                            <div className="flex-1 flex flex-wrap">
                                                                <span className="text-[#e06c75] ml-4 pt-1">message</span>
                                                                <span className="text-neutral-400 pt-1">:</span>&nbsp;
                                                                <span className="text-[#98c379] pt-1">&quot;</span>
                                                                <textarea
                                                                    name="message"
                                                                    required
                                                                    rows={2}
                                                                    placeholder="Let's build something cool..."
                                                                    className="bg-transparent border-none outline-none text-[#98c379] placeholder-[#98c379]/30 w-full p-0 focus:ring-0 resize-none leading-relaxed pt-1"
                                                                />
                                                                <span className="text-[#98c379] pt-1">&quot;</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex group">
                                                            <span className="text-neutral-700 w-8 text-right mr-4 select-none">5</span>
                                                            <span className="text-neutral-400">{`}`}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 flex justify-end">
                                                        <button
                                                            type="submit"
                                                            disabled={formState === "submitting"}
                                                            className="group flex items-center gap-2 px-4 py-2 rounded-md bg-[#2c313a] hover:bg-[#3e4451] text-neutral-200 border border-neutral-700 text-xs font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {formState === "submitting" ? (
                                                                <>
                                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                    <span>Processing...</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Play className="w-3.5 h-3.5 fill-current text-green-400 group-hover:text-green-300" />
                                                                    <span>Run Script</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="non-technical"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="p-6 md:p-8"
                                    >
                                        {formState === "success" ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center py-12 text-center"
                                            >
                                                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-pulse">
                                                    <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Message Received!</h3>
                                                <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-xs mx-auto">
                                                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setFormState("idle")}
                                                    className="rounded-full"
                                                >
                                                    Send another message
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name" className="text-neutral-600  font-medium">Name</Label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            placeholder="John Doe"
                                                            required
                                                            disabled={formState === "submitting"}
                                                            className="bg-neutral-300  border-neutral-400/50  focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-0 rounded-xl h-12 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email" className="text-neutral-600  font-medium">Email</Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            required
                                                            disabled={formState === "submitting"}
                                                            className="bg-neutral-300  border-neutral-400/50  focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-0 rounded-xl h-12 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="message" className="text-neutral-600  font-medium">Message</Label>
                                                    <Textarea
                                                        id="message"
                                                        name="message"
                                                        placeholder="Tell me about your project..."
                                                        className="bg-neutral-300  border-neutral-400/50  focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-0 rounded-xl min-h-[150px] resize-none p-4 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                                                        required
                                                        disabled={formState === "submitting"}
                                                    />
                                                </div>

                                                <div className="pt-2">
                                                    <Button
                                                        type="submit"
                                                        className="w-full h-12 rounded-xl bg-neutral-800 hover:bg-neutral-900  text-background font-medium transition-all cursor-pointer"
                                                        disabled={formState === "submitting"}
                                                    >
                                                        {formState === "submitting" ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Send Message
                                                                <Send className="w-4 h-4 ml-2" />
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>

                                                {formState === "error" && (
                                                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                                        <span>Something went wrong. Please try again later.</span>
                                                    </div>
                                                )}
                                            </form>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </SpotlightCard>
                </motion.div>

                {/* Footer / Socials */}
                <div className="flex flex-col items-center gap-8">
                    <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />

                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Magnetic key={link.title}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-card  border border-neutral-200  shadow-sm hover:shadow-md text-neutral-600  hover:text-neutral-900  transition-all group"
                                        aria-label={link.title}
                                    >
                                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    </a>
                                </Magnetic>
                            );
                        })}

                        <Magnetic>
                            <button
                                onClick={handleCopyEmail}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-card  border border-neutral-200  shadow-sm hover:shadow-md text-neutral-600  hover:text-neutral-900  transition-all group relative"
                                aria-label="Copy Email"
                            >
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div
                                            key="check"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            <Check className="w-5 h-5 text-green-500" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="copy"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {copied && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: -40 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute text-xs font-medium bg-neutral-900 dark:bg-white text-white dark:text-black px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
                                    >
                                        Copied!
                                    </motion.span>
                                )}
                            </button>
                        </Magnetic>
                    </div>


                </div>
            </div>
        </section>
    );
}
