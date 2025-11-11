"use client"

import React from "react"
import { format, parseISO } from "date-fns"
import { pickNearestHour } from "../utils/formatter"

export default function WeatherSummary({
    hourly,
    date,
    time,
    loading,
}: {
    hourly: any[]
    date: string
    time: string
    loading: boolean
}) {
    const selected = pickNearestHour(hourly, date, time)

    if (loading) {
        return (
            <div className="card flex items-center justify-center text-slate-400">
                Loading weather data...
            </div>
        )
    }

    return (
        <div className="card">
            {selected ? (
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-sm text-slate-400">Temperature at chosen time</div>
                        <div className="text-3xl font-bold mt-1">
                            {Math.round(selected.temp)}°C
                        </div>
                        <div className="text-sm text-slate-300">
                            {format(parseISO(selected.time), "eee, MMM d • HH:mm")}
                        </div>
                    </div>

                    <div className="flex gap-4">
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
                </div>
            ) : (
                <div className="text-slate-400 text-center py-4">No data available</div>
            )}
        </div>
    )
}
