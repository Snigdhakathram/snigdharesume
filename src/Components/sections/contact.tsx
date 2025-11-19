"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "@/data/social";
import { Copy, Check, Play, Terminal, Mail, MapPin, Loader2, AlertCircle, Code2, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";

export default function Contact() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [copied, setCopied] = useState(false);
    const [view, setView] = useState<"technical" | "non-technical">("non-technical");


    const email = "gargvranda963@gmail.com";

    const handleCopy = () => {
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
        <section id="contact" className="py-24 px-8 relative overflow-hidden">


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
            >
                <div className="bg-background border rounded-2xl border-neutral-200 shadow-sm relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

                    {/* Left Column: Info */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                                    Get in touch
                                </h2>
                                <p className="text-neutral-500 leading-relaxed text-lg">
                                    If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-neutral-600 group transition-colors hover:text-foreground">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-neutral-300 bg-neutral-100 group-hover:bg-neutral-200 transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Location</p>
                                        <p className="font-medium">Jaipur, Rajasthan</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-neutral-600 group cursor-pointer" onClick={handleCopy}>
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-neutral-300 bg-neutral-100 group-hover:bg-neutral-200 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium group-hover:text-foreground transition-colors font-mono text-sm md:text-base">
                                                {email}
                                            </p>
                                            {copied ? (
                                                <Check className="w-3.5 h-3.5 text-green-500" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-neutral-100">
                            <div className="flex gap-4 flex-wrap">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={link.title}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-50 border border-neutral-200 hover:border-neutral-400 hover:-translate-y-1 transition-all duration-300 group"
                                            aria-label={link.title}
                                        >
                                            <Icon className="w-4 h-4 text-neutral-500 group-hover:text-foreground transition-colors" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Section */}
                    <div className="bg-neutral-50/50 lg:border-l border-neutral-200 p-8 lg:p-12 relative">
                        {/* View Switcher - Absolute positioned */}
                        <div className="absolute top-6 left-6 z-20">
                            <div className="bg-neutral-100 p-1 rounded-lg border border-neutral-200 inline-flex items-center gap-1">
                                <button
                                    onClick={() => setView("non-technical")}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 flex items-center gap-2",
                                        view === "non-technical"
                                            ? "bg-white text-background border border-neutral-200"
                                            : "text-neutral-500 hover:text-neutral-700"
                                    )}
                                >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span>Contact</span>
                                </button>
                                <button
                                    onClick={() => setView("technical")}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 flex items-center gap-2",
                                        view === "technical"
                                            ? "bg-white text-background border border-neutral-200"
                                            : "text-neutral-500 hover:text-neutral-700"
                                    )}
                                >
                                    <Code2 className="w-3.5 h-3.5" />
                                    <span>Code</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 h-full">
                            {view === "technical" ? (
                                /* Editor Window */
                                <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg border border-[#333] font-mono text-sm relative z-10 h-full flex flex-col">
                                    {/* Window Header */}
                                    <div className="bg-[#252526] px-4 py-3 flex items-center justify-between border-b border-[#1e1e1e]">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-2 mr-4">
                                                <div className="w-3 h-3 bg-[#ff5f56] border border-[#e0443e]" />
                                                <div className="w-3 h-3 bg-[#ffbd2e] border border-[#dea123]" />
                                                <div className="w-3 h-3 bg-[#27c93f] border border-[#1aab29]" />
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] text-[#cccccc] text-xs border-t border-l border-r border-transparent">
                                                <Terminal className="w-3 h-3 text-[#569cd6]" />
                                                <span>contact.tsx</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Editor Body */}
                                    <div className="p-6 bg-[#1e1e1e] text-[#d4d4d4] overflow-x-auto flex-1">
                                        {formState === "success" ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-col items-center justify-center h-full text-center"
                                            >
                                                <div className="w-16 h-16 rounded-lg bg-[#27c93f]/20 border border-[#27c93f]/40 flex items-center justify-center mb-6">
                                                    <Check className="w-8 h-8 text-[#27c93f]" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                                                <p className="text-[#858585] mb-8">I'll get back to you shortly.</p>
                                                <button
                                                    onClick={() => setFormState("idle")}
                                                    className="text-[#569cd6] hover:underline"
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
                                                        <span className="text-[#858585] w-8 text-right mr-4 select-none">1</span>
                                                        <div className="flex flex-wrap">
                                                            <span className="text-[#c586c0]">const</span>&nbsp;
                                                            <span className="text-[#9cdcfe]">message</span>&nbsp;
                                                            <span className="text-[#d4d4d4]">=</span>&nbsp;
                                                            <span className="text-[#d4d4d4]">{`{`}</span>
                                                        </div>
                                                    </div>

                                                    {/* Line 2: Name */}
                                                    <div className="flex items-baseline">
                                                        <span className="text-[#858585] w-8 text-right mr-4 select-none">2</span>
                                                        <div className="flex-1 flex flex-wrap items-center">
                                                            <span className="text-[#9cdcfe] ml-4">name</span>
                                                            <span className="text-[#d4d4d4]">:</span>&nbsp;
                                                            <span className="text-[#ce9178]">&quot;</span>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                required
                                                                placeholder="John Doe"
                                                                className="bg-transparent border-none outline-none text-[#ce9178] placeholder-[#ce9178]/30 min-w-[100px] flex-1 p-0 focus:ring-0 h-6"
                                                            />
                                                            <span className="text-[#ce9178]">&quot;</span>
                                                            <span className="text-[#d4d4d4]">,</span>
                                                        </div>
                                                    </div>

                                                    {/* Line 3: Email */}
                                                    <div className="flex items-baseline">
                                                        <span className="text-[#858585] w-8 text-right mr-4 select-none">3</span>
                                                        <div className="flex-1 flex flex-wrap items-center">
                                                            <span className="text-[#9cdcfe] ml-4">email</span>
                                                            <span className="text-[#d4d4d4]">:</span>&nbsp;
                                                            <span className="text-[#ce9178]">&quot;</span>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                required
                                                                placeholder="john@example.com"
                                                                className="bg-transparent border-none outline-none text-[#ce9178] placeholder-[#ce9178]/30 min-w-[100px] flex-1 p-0 focus:ring-0 h-6"
                                                            />
                                                            <span className="text-[#ce9178]">&quot;</span>
                                                            <span className="text-[#d4d4d4]">,</span>
                                                        </div>
                                                    </div>

                                                    {/* Line 4: Message (Textarea) */}
                                                    <div className="flex items-start">
                                                        <span className="text-[#858585] w-8 text-right mr-4 select-none pt-1">4</span>
                                                        <div className="flex-1 flex flex-wrap">
                                                            <span className="text-[#9cdcfe] ml-4 pt-1">content</span>
                                                            <span className="text-[#d4d4d4] pt-1">:</span>&nbsp;
                                                            <span className="text-[#ce9178] pt-1">&quot;</span>
                                                            <textarea
                                                                name="message"
                                                                required
                                                                rows={3}
                                                                placeholder="Hello, I'd like to discuss..."
                                                                className="bg-transparent border-none outline-none text-[#ce9178] placeholder-[#ce9178]/30 w-full p-0 focus:ring-0 resize-none leading-relaxed pt-1"
                                                            />
                                                            <span className="text-[#ce9178] pt-1">&quot;</span>
                                                        </div>
                                                    </div>

                                                    {/* Line 5 */}
                                                    <div className="flex">
                                                        <span className="text-[#858585] w-8 text-right mr-4 select-none">5</span>
                                                        <span className="text-[#d4d4d4]">{`}`}</span>
                                                        <span className="text-[#d4d4d4] ml-1">;</span>
                                                    </div>

                                                    {/* Line 6: Empty */}
                                                    <div className="flex h-6">
                                                        <span className="text-[#858585] w-8 text-right mr-4 select-none">6</span>
                                                    </div>

                                                    {/* Line 7: Submit */}
                                                    <div className="flex items-center">
                                                        <span className="text-[#858585] w-8 text-right mr-4 select-none">7</span>
                                                        <div className="flex items-center gap-2 ml-4">
                                                            <span className="text-[#c586c0]">await</span>
                                                            <span className="text-[#dcdcaa]">sendMessage</span>
                                                            <span className="text-[#d4d4d4]">(</span>
                                                            <span className="text-[#9cdcfe]">message</span>
                                                            <span className="text-[#d4d4d4]">);</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Submit Button Overlay */}
                                                <div className="mt-8 flex justify-end">
                                                    <button
                                                        type="submit"
                                                        disabled={formState === "submitting"}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0e639c] hover:bg-[#1177bb] text-white border border-[#0e639c] text-xs font-sans transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                                                    <div className="mt-4 p-3 rounded-lg bg-[#f14c4c]/20 border border-[#f14c4c]/50 text-[#f14c4c] text-xs flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4" />
                                                        <span>Runtime Error: Failed to send message. Please try again.</span>
                                                    </div>
                                                )}
                                            </form>
                                        )}
                                    </div>

                                    {/* Status Bar */}
                                    <div className="bg-[#007acc] px-3 py-1 text-white text-[10px] flex items-center justify-between font-sans mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <span className="rotate-45">⑂</span>
                                                <span>main</span>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-80">
                                                <AlertCircle className="w-3 h-3" />
                                                <span>0 errors</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span>Ln 7, Col 24</span>
                                            <span>UTF-8</span>
                                            <span>TypeScript React</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Standard Form */
                                <div className="h-full flex flex-col justify-center">
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
                                                <Input id="name" name="name" placeholder="John Doe" required disabled={formState === "submitting"} className="bg-background border-neutral-200" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-foreground">Email</Label>
                                                <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={formState === "submitting"} className="bg-background border-neutral-200" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-foreground">Phone</Label>
                                                <Input id="phone" name="phone" type="tel" placeholder="+91 123 456 7890" disabled={formState === "submitting"} className="bg-background border-neutral-200" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="message" className="text-foreground">Message</Label>
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    placeholder="Hello, I'd like to discuss..."
                                                    className="min-h-[120px] bg-background border-neutral-200"
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
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
