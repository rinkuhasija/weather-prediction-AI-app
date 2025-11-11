"use client"

import React from "react"
import { format, parseISO } from "date-fns"
import { pickNearestHour, calculateFeelsLike } from "@/utils/formatter"
import { Card, CardContent } from "@/components/ui/card"

export default function WeatherSummary({ hourly, date, time, loading }: any) {
    const selected = pickNearestHour(hourly, date, time)

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center text-slate-400 py-8">
                    Loading weather data...
                </CardContent>
            </Card>
        )
    }

    if (!selected)
        return (
            <Card>
                <CardContent className="text-center text-slate-400 py-8">
                    No data available
                </CardContent>
            </Card>
        )

    const feelsLike = calculateFeelsLike(
        selected.temp,
        selected.humidity,
        selected.wind
    )

    return (
        <Card className="bg-white/5 backdrop-blur border border-white/10">
            <CardContent className="flex justify-between items-center py-5">
                <div>
                    <div className="text-sm text-slate-400">Temperature</div>
                    <div className="text-3xl font-bold">{Math.round(selected.temp)}°C</div>
                    <div className="text-sm text-slate-300">
                        Feels like <span className="font-semibold">{feelsLike}°C</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                        Humidity {selected.humidity}% • Wind {selected.wind ?? "--"} km/h
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                        {format(parseISO(selected.time), "eee, MMM d • HH:mm")}
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="text-center">
                        <div className="text-sm text-slate-400">Precip</div>
                        <div className="text-xl font-semibold">{selected.precip} mm</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-slate-400">Wind</div>
                        <div className="text-xl font-semibold">
                            {selected.wind !== null ? Math.round(selected.wind) + " km/h" : "--"}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
