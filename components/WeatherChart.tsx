"use client"

import React from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
import { parseISO, format } from "date-fns"

export default function WeatherChart({ hourly }: { hourly: any[] }) {
    const data = (hourly || []).map((h) => ({
        time: format(parseISO(h.time), "HH:mm"),
        temp: Number(h.temp),
        precip: Number(h.precip),
    }))

    if (!data.length)
        return <div className="card text-center text-slate-400">No chart data</div>

    return (
        <div className="card">
            <h3 className="font-semibold mb-3">Hourly Temperature</h3>
            <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="time" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(30,41,59,0.9)",
                                border: "none",
                                borderRadius: "0.5rem",
                                color: "#fff",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="temp"
                            stroke="#60A5FA"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
