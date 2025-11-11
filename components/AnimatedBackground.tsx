"use client"

import React from "react"
import { motion } from "framer-motion"

export default function AnimatedBackground({ weather }: { weather?: number }) {
    // Simple weather-based background color logic
    let bgGradient = "from-sky-900 via-slate-900 to-black"

    if (typeof weather === "number") {
        if (weather >= 80) bgGradient = "from-slate-800 via-slate-900 to-black" // Rainy
        else if (weather >= 50) bgGradient = "from-slate-700 via-sky-900 to-black" // Cloudy
        else if (weather >= 0) bgGradient = "from-sky-600 via-sky-800 to-slate-900" // Clear/Sunny
    } else {
        // default when weather is undefined
        bgGradient = "from-sky-600 via-sky-800 to-slate-900"
    }

    return (
        <motion.div
            aria-hidden="true"
            className={`absolute inset-0 -z-10 bg-gradient-to-b ${bgGradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
        />
    )
}
