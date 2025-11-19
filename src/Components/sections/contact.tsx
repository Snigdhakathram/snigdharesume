"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "@/data/social";
import { Check, Play, Terminal, Mail, Loader2, AlertCircle, Code2, MessageSquare } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";

export default function Contact() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [view, setView] = useState<"technical" | "non-technical">("non-technical");
    const email = "gargvranda963@gmail.com";

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
        <section id="contact" className="py-24 px-8 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
            >
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-8">
                    Get in touch
                </h2>

                {/* View Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="bg-neutral-100 p-1 rounded-lg border border-neutral-200 inline-flex items-center gap-1">
                        <button
                            onClick={() => setView("non-technical")}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                view === "non-technical"
                                    ? "bg-white text-foreground border border-neutral-200 shadow-sm"
                                    : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Contact Form</span>
                        </button>
                        <button
                            onClick={() => setView("technical")}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                view === "technical"
                                    ? "bg-white text-foreground border border-neutral-200 shadow-sm"
                                    : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <Code2 className="w-4 h-4" />
                            <span>React.js</span>
                        </button>
                    </div>
                </div>

                {/* Card Container */}
                <div className="bg-card border rounded-2xl border-neutral-200 shadow-sm relative mb-12">
                    {view === "technical" ? (
                        <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-xl border border-neutral-300 font-mono text-sm relative z-10 w-full  mx-auto flex flex-col">
                            {/* Window Header */}
                            <div className="bg-[#252525] px-4 py-3 flex items-center justify-between border-b border-neutral-300">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-2 mr-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-[#1a1a1a] rounded-md text-neutral-500 text-xs">
                                        <Terminal className="w-3 h-3" />
                                        <span>contact.tsx</span>
                                    </div>
                                </div>
                            </div>

                            {/* Editor Body */}
                            <div className="p-6 bg-[#1a1a1a] text-neutral-400 overflow-x-auto flex-1">
                                {formState === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-12 text-center"
                                    >
                                        <div className="w-16 h-16 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                                            <Check className="w-8 h-8 text-green-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                                        <p className="text-neutral-400 mb-8">I'll get back to you shortly.</p>
                                        <button
                                            onClick={() => setFormState("idle")}
                                            className="text-neutral-300 hover:text-white transition-colors underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-1 relative">
                                        {/* Line Numbers & Content Wrapper */}
                                        <div className="space-y-2 font-mono leading-relaxed">
                                            {/* Line 1 */}
                                            <div className="flex">
                                                <span className="text-neutral-600 w-8 text-right mr-4 select-none">1</span>
                                                <div className="flex flex-wrap">
                                                    <span className="text-purple-400">const</span>&nbsp;
                                                    <span className="text-blue-300">message</span>&nbsp;
                                                    <span className="text-neutral-500">=</span>&nbsp;
                                                    <span className="text-neutral-500">{`{`}</span>
                                                </div>
                                            </div>

                                            {/* Line 2: Name */}
                                            <div className="flex items-baseline">
                                                <span className="text-neutral-600 w-8 text-right mr-4 select-none">2</span>
                                                <div className="flex-1 flex flex-wrap items-center">
                                                    <span className="text-blue-300 ml-4">name</span>
                                                    <span className="text-neutral-500">:</span>&nbsp;
                                                    <span className="text-orange-300">&quot;</span>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        placeholder="John Doe"
                                                        className="bg-transparent border-none outline-none text-orange-300 placeholder-orange-300/30 min-w-[100px] flex-1 p-0 focus:ring-0 h-6"
                                                    />
                                                    <span className="text-orange-300">&quot;</span>
                                                    <span className="text-neutral-500">,</span>
                                                </div>
                                            </div>

                                            {/* Line 3: Email */}
                                            <div className="flex items-baseline">
                                                <span className="text-neutral-600 w-8 text-right mr-4 select-none">3</span>
                                                <div className="flex-1 flex flex-wrap items-center">
                                                    <span className="text-blue-300 ml-4">email</span>
                                                    <span className="text-neutral-500">:</span>&nbsp;
                                                    <span className="text-orange-300">&quot;</span>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        placeholder="john@example.com"
                                                        className="bg-transparent border-none outline-none text-orange-300 placeholder-orange-300/30 min-w-[100px] flex-1 p-0 focus:ring-0 h-6"
                                                    />
                                                    <span className="text-orange-300">&quot;</span>
                                                    <span className="text-neutral-500">,</span>
                                                </div>
                                            </div>

                                            {/* Line 4: Message (Textarea) */}
                                            <div className="flex items-start">
                                                <span className="text-neutral-600 w-8 text-right mr-4 select-none pt-1">4</span>
                                                <div className="flex-1 flex flex-wrap">
                                                    <span className="text-blue-300 ml-4 pt-1">content</span>
                                                    <span className="text-neutral-500 pt-1">:</span>&nbsp;
                                                    <span className="text-orange-300 pt-1">&quot;</span>
                                                    <textarea
                                                        name="message"
                                                        required
                                                        rows={3}
                                                        placeholder="Hello, I'd like to discuss..."
                                                        className="bg-transparent border-none outline-none text-orange-300 placeholder-orange-300/30 w-full p-0 focus:ring-0 resize-none leading-relaxed pt-1"
                                                    />
                                                    <span className="text-orange-300 pt-1">&quot;</span>
                                                </div>
                                            </div>

                                            {/* Line 5 */}
                                            <div className="flex">
                                                <span className="text-neutral-600 w-8 text-right mr-4 select-none">5</span>
                                                <span className="text-neutral-500">{`}`}</span>
                                                <span className="text-neutral-500 ml-1">;</span>
                                            </div>

                                            {/* Line 6: Empty */}
                                            <div className="flex h-6">
                                                <span className="text-neutral-600 w-8 text-right mr-4 select-none">6</span>
                                            </div>

                                            {/* Line 7: Submit */}
                                            <div className="flex items-center">
                                                <span className="text-neutral-600 w-8 text-right mr-4 select-none">7</span>
                                                <div className="flex items-center gap-2 ml-4">
                                                    <span className="text-purple-400">await</span>
                                                    <span className="text-yellow-300">sendMessage</span>
                                                    <span className="text-neutral-500">(</span>
                                                    <span className="text-blue-300">message</span>
                                                    <span className="text-neutral-500">);</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button Overlay */}
                                        <div className="mt-8 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={formState === "submitting"}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground hover:bg-neutral-800 text-background border border-foreground text-xs font-sans transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {formState === "submitting" ? (
                                                    <>
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        <span>Executing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="w-3.5 h-3.5 fill-current" />
                                                        <span>Run Script</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {formState === "error" && (
                                            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>Error: Failed to send message. Please try again.</span>
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>

                            {/* Status Bar */}
                            <div className="bg-[#252525] px-3 py-1 text-neutral-500 text-[10px] flex items-center justify-between font-sans mt-auto border-t border-neutral-300">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-500">●</span>
                                        <span>Ready</span>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-70">
                                        <Check className="w-3 h-3" />
                                        <span>No errors</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 opacity-70">
                                    <span>TypeScript</span>
                                    <span>UTF-8</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full py-8 max-w-md mx-auto">
                            {formState === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center bg-neutral-50 rounded-lg border border-dashed border-neutral-200"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                                        <Check className="w-6 h-6 text-green-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-foreground">Message Sent!</h3>
                                    <p className="text-neutral-500 mb-6 text-sm">Thanks for reaching out. I'll be in touch shortly.</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setFormState("idle")}
                                    >
                                        Send another message
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-foreground">Name</Label>
                                        <Input id="name" name="name" placeholder="John Doe" required disabled={formState === "submitting"} className="bg-card border-neutral-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-foreground">Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={formState === "submitting"} className="bg-card border-neutral-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-foreground">Phone</Label>
                                        <Input id="phone" name="phone" type="tel" placeholder="+91 123 456 7890" disabled={formState === "submitting"} className="bg-card border-neutral-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-foreground">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Hello, I'd like to discuss..."
                                            className="min-h-[120px] bg-card border-neutral-200"
                                            required
                                            disabled={formState === "submitting"}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={formState === "submitting"}>
                                        {formState === "submitting" ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                    {formState === "error" && (
                                        <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm border border-red-500/30 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>Failed to send message. Please try again.</span>
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    )}
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 flex-wrap">
                    {socialLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <a
                                key={link.title}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 flex items-center justify-center rounded-lg bg-neutral-100 border border-neutral-200 hover:border-neutral-400 hover:-translate-y-1 transition-all duration-300 group"
                                aria-label={link.title}
                            >
                                <Icon className="w-5 h-5 text-neutral-500 group-hover:text-foreground transition-colors" />
                            </a>
                        );
                    })}
                    <a
                        href={`mailto:${email}`}
                        className="w-12 h-12 flex items-center justify-center rounded-lg bg-neutral-100 border border-neutral-200 hover:border-neutral-400 hover:-translate-y-1 transition-all duration-300 group"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5 text-neutral-500 group-hover:text-foreground transition-colors" />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
