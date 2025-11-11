"use client"

import React from "react"

export default function WeatherAI({
    hourly,
    daily,
    location,
}: {
    hourly: any[]
    daily: any
    location: any
}) {
    if (!hourly || !hourly.length) return null

    const avgTemp =
        hourly.reduce((sum: number, h: any) => sum + Number(h.temp || 0), 0) / hourly.length
    const totalPrecip = hourly.reduce(
        (sum: number, h: any) => sum + Number(h.precip || 0),
        0
    )

    const cityName = location?.name || "this location"
    const mood =
        avgTemp > 30
            ? "hot and sunny ☀️"
            : avgTemp > 20
                ? "pleasant 🌤️"
                : avgTemp > 10
                    ? "cool 🍃"
                    : "chilly ❄️"

    const outfit =
        avgTemp > 30
            ? "Light cotton clothes and sunglasses recommended."
            : avgTemp > 20
                ? "Perfect for casual wear or outdoor activities."
                : avgTemp > 10
                    ? "Wear a light jacket."
                    : "Bundle up with warm clothing."

    const rainAdvice =
        totalPrecip > 5
            ? "There's a good chance of rain — keep an umbrella handy! ☔"
            : "Rain chances are low — enjoy your day! 🌈"

    return (
        <div className="card">
            <h3 className="font-semibold mb-2">AI Weather Insight</h3>
            <p className="text-slate-200">
                In <span className="font-bold">{cityName}</span>, today feels {mood} with an
                average temperature of {avgTemp.toFixed(1)}°C.
            </p>
            <p className="text-slate-300 mt-1 text-sm">
                Precipitation for the day is around {totalPrecip.toFixed(1)} mm.
            </p>
            <p className="mt-3 text-slate-200">{outfit}</p>
            <p className="mt-1 text-sky-400 text-sm">{rainAdvice}</p>
        </div>
    )
}
