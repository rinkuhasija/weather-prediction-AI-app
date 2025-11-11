"use client"

import React from "react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            className="btn border-slate-700 text-sm flex items-center gap-2 hover:bg-slate-800/50 transition"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? (
                <>
                    ☀️ <span>Light</span>
                </>
            ) : (
                <>
                    🌙 <span>Dark</span>
                </>
            )}
        </button>
    )
}
