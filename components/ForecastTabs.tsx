"use client"

import React from "react"

export default function ForecastTabs({ daily }: { daily: any }) {
    if (!daily) return null

    return (
        <div className="card">
            <h3 className="font-semibold mb-3">7-Day Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {daily.time.map((t: string, idx: number) => (
                    <div
                        key={t}
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-center transition"
                    >
                        <div className="text-sm text-slate-300">{t}</div>
                        <div className="font-bold text-lg mt-1">
                            {Math.round(daily.temperature_2m_max[idx])}° /{" "}
                            {Math.round(daily.temperature_2m_min[idx])}°
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                            {daily.precipitation_sum[idx]} mm
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
