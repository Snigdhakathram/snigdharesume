"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "@/data/social";
import {
    Check,
    Play,
    Mail,
    Loader2,
    AlertCircle,
    Code2,
    MessageSquare,
    Send,
    Files,
    Search,
    GitBranch,
    Settings,
    ChevronRight,
    ChevronDown,
    FileCode,
    Blocks
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState  = "idle" | "submitting" | "success" | "error";
type ViewMode   = "technical" | "non-technical";
type ActiveFile = "contact.tsx" | "config.ts";

// ─── Config ───────────────────────────────────────────────────────────────────
// Add NEXT_PUBLIC_CONTACT_EMAIL to your .env.local

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@yourname.dev";

// ─── Rotating headline ────────────────────────────────────────────────────────

const WORDS = ["New Projects", "Collaborations", "Ideas", "Growth"];

function RotatingWord() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    React.useEffect(() => {
        const id = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((i) => (i + 1) % WORDS.length);
                setVisible(true);
            }, 300);
        }, 2200);
        return () => clearInterval(id);
    }, []);

    return (
        <span
            className={cn(
                "inline-block transition-all duration-300",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
        >
            {WORDS[index]}
        </span>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Contact() {
    const [formState, setFormState]   = useState<FormState>("idle");
    const [view, setView]             = useState<ViewMode>("technical");
    const [activeFile, setActiveFile] = useState<ActiveFile>("contact.tsx");

    // Builds a Gmail compose URL pre-filled with the form data and opens it in a new tab.
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormState("submitting");

        const data    = new FormData(e.currentTarget);
        const name    = (data.get("name")    as string).trim();
        const message = (data.get("message") as string).trim();

        const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
        const body    = encodeURIComponent(message);

        window.open(
            `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${subject}&body=${body}`,
            "_blank",
            "noopener,noreferrer"
        );

        setFormState("success");
        (e.target as HTMLFormElement).reset();
    }

    return (
        <section
            id="contact"
            className="w-full py-10 md:py-20 px-4 md:px-8 relative overflow-hidden"
        >
            <div className="max-w-4xl mx-auto relative z-10">

                {/* ── Header ─────────────────────────────────────────────── */}
                <div className="text-center mb-3 md:mb-6 space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                            Let&apos;s work on
                        </h2>
                        <div className="h-14 md:h-16 flex items-center justify-center md:mt-2 overflow-hidden">
                            <span className="text-3xl md:text-5xl font-bold text-foreground">
                                <RotatingWord />
                            </span>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-md mx-auto"
                    >
                        Whether you have a question, a project idea, or just want to say hi —
                        I&apos;ll get back to you as soon as I can.
                    </motion.p>
                </div>

                {/* ── View Toggle ─────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-5"
                >
                    <div className="bg-card p-1.5 rounded-xl border border-neutral-200 inline-flex items-center gap-1 shadow-inner">
                        {[
                            { id: "non-technical" as const, icon: MessageSquare, label: "Standard"  },
                            { id: "technical"     as const, icon: Code2,         label: "Developer" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={cn(
                                    "px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
                                    view === item.id
                                        ? "text-background"
                                        : "text-neutral-600 hover:text-neutral-700"
                                )}
                            >
                                {view === item.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-neutral-800 rounded-lg shadow-sm border border-neutral-200"
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

                {/* ── Main Card ───────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-card border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="relative min-h-[450px]">
                            <AnimatePresence mode="wait">

                                {/* ══ Developer / IDE view ═══════════════════ */}
                                {view === "technical" ? (
                                    <motion.div
                                        key="technical"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="w-full h-full bg-card rounded-xl overflow-hidden font-mono text-sm flex flex-col"
                                    >
                                        {/* Title bar */}
                                        <div className="bg-neutral-100 px-4 py-3 flex items-center justify-between border-b border-neutral-200 select-none">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1.5 mr-4">
                                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                                </div>
                                                <div className="hidden md:flex items-center gap-2 text-neutral-500 text-xs">
                                                    <span>portfolio</span>
                                                    <ChevronRight className="w-3 h-3" />
                                                    <span>src</span>
                                                    <ChevronRight className="w-3 h-3" />
                                                    <span className="text-foreground">{activeFile}</span>
                                                </div>
                                            </div>
                                            <div className="hidden md:flex w-40 h-6 bg-neutral-200 border border-neutral-300 rounded items-center pl-2 text-xs text-neutral-500">
                                                <Search className="w-3 h-3 mr-2" />
                                                portfolio
                                            </div>
                                        </div>

                                        {/* IDE body */}
                                        <div className="flex flex-1 overflow-hidden">

                                            {/* Activity bar */}
                                            <div className="w-8 md:w-12 bg-neutral-100 flex flex-col items-center py-4 gap-6 text-neutral-500 border-r border-neutral-200 shrink-0">
                                                <div className="border-l-2 border-blue-400 pl-2 pr-2">
                                                    <Files className="w-4 h-4 md:w-6 md:h-6" />
                                                </div>
                                                <Search    className="w-4 h-4 md:w-6 md:h-6 cursor-pointer hover:text-foreground transition-colors" />
                                                <GitBranch className="w-4 h-4 md:w-6 md:h-6 cursor-pointer hover:text-foreground transition-colors" />
                                                <Blocks    className="w-4 h-4 md:w-6 md:h-6 cursor-pointer hover:text-foreground transition-colors" />
                                                <div className="mt-auto">
                                                    <Settings className="w-4 h-4 md:w-6 md:h-6 cursor-pointer hover:text-foreground transition-colors" />
                                                </div>
                                            </div>

                                            {/* Explorer pane */}
                                            <div className="w-48 bg-neutral-100 border-r border-neutral-200 hidden md:flex flex-col text-neutral-500 shrink-0">
                                                <div className="text-[11px] font-bold px-4 py-3 text-neutral-400 uppercase tracking-wider">
                                                    Explorer
                                                </div>
                                                <div className="px-2">
                                                    <div className="flex items-center gap-1 py-1 px-2 text-xs font-bold text-blue-400 cursor-pointer rounded-sm">
                                                        <ChevronDown className="w-3 h-3" />
                                                        PORTFOLIO
                                                    </div>
                                                    <div className="pl-3">
                                                        <div className="flex items-center gap-1 py-1 px-2 text-xs cursor-pointer rounded-sm select-none hover:bg-card">
                                                            <ChevronRight className="w-3 h-3" />
                                                            <span>.next</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 py-1 px-2 text-xs cursor-pointer rounded-sm select-none hover:bg-card">
                                                            <ChevronDown className="w-3 h-3" />
                                                            <span>src</span>
                                                        </div>
                                                        <div className="pl-4 space-y-0.5">
                                                            {(["contact.tsx", "config.ts"] as ActiveFile[]).map((file) => (
                                                                <div
                                                                    key={file}
                                                                    onClick={() => setActiveFile(file)}
                                                                    onMouseDown={(e) => e.preventDefault()}
                                                                    tabIndex={-1}
                                                                    className={cn(
                                                                        "flex items-center gap-1 py-1 px-2 text-xs cursor-pointer rounded-sm transition-colors select-none",
                                                                        activeFile === file
                                                                            ? "bg-card border border-neutral-200 text-foreground"
                                                                            : "text-neutral-500 hover:bg-card border border-transparent"
                                                                    )}
                                                                >
                                                                    <FileCode className={cn("w-3 h-3", file === "contact.tsx" ? "text-blue-400" : "text-yellow-400")} />
                                                                    {file}
                                                                </div>
                                                            ))}
                                                            <div className="flex items-center gap-1 py-1 px-2 text-xs cursor-pointer rounded-sm select-none hover:bg-card text-neutral-500">
                                                                <FileCode className="w-3 h-3 text-blue-300" />
                                                                globals.css
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Editor */}
                                            <div className="flex-1 flex flex-col bg-neutral-100 min-w-0">

                                                {/* Tab bar */}
                                                <div className="flex bg-neutral-100 overflow-x-auto border-b border-neutral-200">
                                                    {(["contact.tsx", "config.ts"] as ActiveFile[]).map((file) => (
                                                        <div
                                                            key={file}
                                                            onClick={() => setActiveFile(file)}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            tabIndex={-1}
                                                            className={cn(
                                                                "flex items-center gap-2 px-3 py-2 border-t-2 text-xs cursor-pointer min-w-fit transition-colors select-none",
                                                                activeFile === file
                                                                    ? cn("bg-card rounded-t-sm text-foreground", file === "contact.tsx" ? "border-t-blue-400" : "border-t-yellow-400")
                                                                    : "bg-neutral-100 border-t-transparent text-neutral-400 hover:bg-neutral-50"
                                                            )}
                                                        >
                                                            <FileCode className={cn("w-3 h-3", file === "contact.tsx" ? "text-blue-400" : "text-yellow-400")} />
                                                            {file}
                                                            <span className="ml-2 text-neutral-400">×</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Editor content */}
                                                <div className="p-4 md:p-6 min-h-[400px] bg-card overflow-auto flex-1">

                                                    {activeFile === "contact.tsx" ? (
                                                        /* ── contact.tsx: the form ── */
                                                        formState === "success" ? (
                                                            <div className="flex flex-col items-center justify-center h-full min-h-[360px] text-center space-y-4">
                                                                <motion.div
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center"
                                                                >
                                                                    <Check className="w-8 h-8 text-green-500" />
                                                                </motion.div>
                                                                <div>
                                                                    <p className="text-xs text-neutral-400 font-mono mb-1">
                                                                        {"// execution complete ✓"}
                                                                    </p>
                                                                    <h3 className="text-xl font-bold text-neutral-700">
                                                                        Gmail opened!
                                                                    </h3>
                                                                    <p className="text-neutral-400 mt-1 text-xs">
                                                                        Your message is pre-filled — just hit Send.
                                                                    </p>
                                                                </div>
                                                                <button
                                                                    onClick={() => setFormState("idle")}
                                                                    className="text-blue-400 hover:text-blue-300 text-xs underline decoration-dashed underline-offset-4"
                                                                >
                                                                    reset_form()
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <form
                                                                onSubmit={handleSubmit}
                                                                className="space-y-1.5 min-h-[380px] relative font-mono text-[13px] md:text-sm leading-relaxed"
                                                            >
                                                                {/* Line 1 */}
                                                                <div className="flex">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 md:mr-4 shrink-0 select-none">1</span>
                                                                    <span>
                                                                        <span className="text-[#c678dd]">const </span>
                                                                        <span className="text-[#61afef]">sendMessage </span>
                                                                        <span className="text-neutral-400">= </span>
                                                                        <span className="text-[#c678dd]">async </span>
                                                                        <span className="text-neutral-400">(</span>
                                                                        <span className="text-[#e06c75]">data</span>
                                                                        <span className="text-neutral-400">) =&gt; {"{"}</span>
                                                                    </span>
                                                                </div>

                                                                {/* Line 2 — name */}
                                                                <div className="flex items-baseline">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 md:mr-4 shrink-0 select-none">2</span>
                                                                    <div className="flex flex-1 flex-wrap items-center">
                                                                        <span className="text-[#e06c75] ml-4">name</span>
                                                                        <span className="text-neutral-400">:&nbsp;</span>
                                                                        <span className="text-[#98c379]">&quot;</span>
                                                                        <input
                                                                            type="text"
                                                                            name="name"
                                                                            required
                                                                            autoComplete="name"
                                                                            placeholder="Your name"
                                                                            className="bg-transparent outline-none text-[#98c379] placeholder-[#98c379]/50 min-w-[120px] flex-1 p-0 focus:ring-0 h-auto"
                                                                        />
                                                                        <span className="text-[#98c379]">&quot;</span>
                                                                        <span className="text-neutral-400">,</span>
                                                                    </div>
                                                                </div>

                                                                {/* Line 3 — email */}
                                                                <div className="flex items-baseline">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 md:mr-4 shrink-0 select-none">3</span>
                                                                    <div className="flex flex-1 flex-wrap items-center">
                                                                        <span className="text-[#e06c75] ml-4">email</span>
                                                                        <span className="text-neutral-400">:&nbsp;</span>
                                                                        <span className="text-[#98c379]">&quot;</span>
                                                                        <input
                                                                            type="email"
                                                                            name="email"
                                                                            required
                                                                            autoComplete="email"
                                                                            placeholder="you@example.com"
                                                                            className="bg-transparent outline-none text-[#98c379] placeholder-[#98c379]/50 min-w-[150px] flex-1 p-0 focus:ring-0 h-auto"
                                                                        />
                                                                        <span className="text-[#98c379]">&quot;</span>
                                                                        <span className="text-neutral-400">,</span>
                                                                    </div>
                                                                </div>

                                                                {/* Line 4 — message */}
                                                                <div className="flex items-start">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 md:mr-4 shrink-0 select-none pt-1">4</span>
                                                                    <div className="flex flex-1 flex-wrap">
                                                                        <span className="text-[#e06c75] ml-4 pt-1">message</span>
                                                                        <span className="text-neutral-400 pt-1">:&nbsp;</span>
                                                                        <span className="text-[#98c379] pt-1">&quot;</span>
                                                                        <textarea
                                                                            name="message"
                                                                            required
                                                                            rows={3}
                                                                            placeholder="Let's build something cool..."
                                                                            className="bg-transparent outline-none text-[#98c379] placeholder-[#98c379]/50 w-full p-0 focus:ring-0 resize-none leading-relaxed pt-1"
                                                                        />
                                                                        <span className="text-[#98c379] pt-1">&quot;</span>
                                                                    </div>
                                                                </div>

                                                                {/* Line 5 */}
                                                                <div className="flex">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 md:mr-4 shrink-0 select-none">5</span>
                                                                    <span className="text-neutral-400">{"}"}</span>
                                                                </div>

                                                                {/* Submit button */}
                                                                <div className="absolute bottom-4 right-4">
                                                                    <button
                                                                        type="submit"
                                                                        disabled={formState === "submitting"}
                                                                        className="group flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-950 cursor-pointer text-neutral-200 border border-neutral-700 text-xs font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        {formState === "submitting" ? (
                                                                            <>
                                                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                                Opening...
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Play className="w-3.5 h-3.5 fill-current text-green-400 group-hover:text-green-300" />
                                                                                Run script
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        )
                                                    ) : (
                                                        /* ── config.ts: env var display ── */
                                                        <div className="space-y-1.5 font-mono text-[13px] md:text-sm leading-relaxed">
                                                            <div className="flex">
                                                                <span className="text-[#495162] w-6 text-right mr-2 md:mr-4 shrink-0 select-none">1</span>
                                                                <span className="text-[#495162] italic">{"// .env.local"}</span>
                                                            </div>
                                                            <div className="flex">
                                                                <span className="text-[#495162] w-6 text-right mr-2 md:mr-4 shrink-0 select-none">2</span>
                                                                <span>
                                                                    <span className="text-[#e5c07b]">NEXT_PUBLIC_CONTACT_EMAIL</span>
                                                                    <span className="text-neutral-400"> = </span>
                                                                    <span className="text-[#98c379]">&quot;{CONTACT_EMAIL}&quot;</span>
                                                                </span>
                                                            </div>
                                                            <div className="flex mt-6">
                                                                <span className="text-[#495162] w-6 text-right mr-2 md:mr-4 shrink-0 select-none">3</span>
                                                                <span className="text-[#495162] italic">{"// Gmail compose URL is built at runtime"}</span>
                                                            </div>
                                                            <div className="flex">
                                                                <span className="text-[#495162] w-6 text-right mr-2 md:mr-4 shrink-0 select-none">4</span>
                                                                <span className="text-[#495162] italic">{"// No backend or API key required"}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                ) : (
                                    /* ══ Standard view ═════════════════════════ */
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
                                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                                    <Check className="w-10 h-10 text-green-600" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-neutral-800 mb-2">
                                                    Gmail opened!
                                                </h3>
                                                <p className="text-neutral-500 mb-8 max-w-xs mx-auto text-sm">
                                                    Your message is pre-filled. Just review it and hit Send.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setFormState("idle")}
                                                    className="rounded-full hover:bg-neutral-700 hover:text-background cursor-pointer text-background bg-foreground"
                                                >
                                                    Send another message
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="std-name" className="text-neutral-600 font-medium">
                                                            Name
                                                        </Label>
                                                        <Input
                                                            id="std-name"
                                                            name="name"
                                                            autoComplete="name"
                                                            placeholder="John Doe"
                                                            required
                                                            disabled={formState === "submitting"}
                                                            className="bg-neutral-50 border-neutral-200 focus:border-neutral-400 focus:ring-0 rounded-xl h-12 placeholder:text-neutral-400"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="std-email" className="text-neutral-600 font-medium">
                                                            Email
                                                        </Label>
                                                        <Input
                                                            id="std-email"
                                                            name="email"
                                                            type="email"
                                                            autoComplete="email"
                                                            placeholder="john@example.com"
                                                            required
                                                            disabled={formState === "submitting"}
                                                            className="bg-neutral-50 border-neutral-200 focus:border-neutral-400 focus:ring-0 rounded-xl h-12 placeholder:text-neutral-400"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="std-message" className="text-neutral-600 font-medium">
                                                        Message
                                                    </Label>
                                                    <Textarea
                                                        id="std-message"
                                                        name="message"
                                                        placeholder="Tell me about your project..."
                                                        className="bg-neutral-50 border-neutral-200 focus:border-neutral-400 focus:ring-0 rounded-xl min-h-[150px] resize-none p-4 placeholder:text-neutral-400"
                                                        required
                                                        disabled={formState === "submitting"}
                                                    />
                                                </div>

                                                <div className="pt-2">
                                                    <Button
                                                        type="submit"
                                                        className="w-full h-12 cursor-pointer rounded-xl bg-neutral-900 hover:bg-neutral-800 text-background font-medium transition-all hover:scale-[1.01]"
                                                        disabled={formState === "submitting"}
                                                    >
                                                        {formState === "submitting" ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                Opening Gmail...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Send Message
                                                                <Send className="w-4 h-4 ml-2" />
                                                            </>
                                                        )}
                                                    </Button>
                                                    <p className="text-center text-xs text-neutral-400 mt-3">
                                                        Opens Gmail with your message pre-filled.
                                                    </p>
                                                </div>

                                                {formState === "error" && (
                                                    <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                                        <span>Something went wrong. Please try again.</span>
                                                    </div>
                                                )}
                                            </form>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}