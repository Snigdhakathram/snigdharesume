"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
    duration?: number;
}

export const AnimatedThemeToggler = ({
    className,
    duration = 400,
    ...props
}: AnimatedThemeTogglerProps) => {
    const [isDark, setIsDark] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const root = document.documentElement;
        const currentTheme = root.getAttribute("data-theme");
        setIsDark(currentTheme === "dark");
    }, []);

    const toggleTheme = useCallback(async () => {
        if (!buttonRef.current) return;

        const newTheme = isDark ? "light" : "dark";

        if (!document.startViewTransition) {
            flushSync(() => {
                setIsDark(!isDark);
                document.documentElement.setAttribute("data-theme", newTheme);
                localStorage.setItem("theme", newTheme);
            });
            return;
        }

        const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                setIsDark(!isDark);
                document.documentElement.setAttribute("data-theme", newTheme);
                localStorage.setItem("theme", newTheme);
            });
        });

        await transition.ready;

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    }, [isDark, duration]);

    return (
        <button
            ref={buttonRef}
            onClick={toggleTheme}
            className={cn(
                "relative inline-flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800",
                className
            )}
            aria-label="Toggle theme"
            {...props}
        >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
};
