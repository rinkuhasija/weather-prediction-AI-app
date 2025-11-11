"use client"

import React, { useState, useMemo, useEffect } from "react"
import debounce from "lodash.debounce"
import { geocode } from "@/utils/api"

export default function WeatherSearch({ onSelect }: { onSelect: (loc: any) => void }) {
    const [query, setQuery] = useState("New York")
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const doSearch = useMemo(
        () =>
            debounce(async (q: string) => {
                if (!q) return setSuggestions([])
                setLoading(true)
                try {
                    const res = await geocode(q)
                    setSuggestions(res)
                } finally {
                    setLoading(false)
                }
            }, 350),
        []
    )

    useEffect(() => {
        doSearch(query)
    }, [query, doSearch])

    return (
        <div>
            <label className="block text-sm">Location</label>
            <div className="flex gap-2 mt-2">
                <input
                    className="flex-1 p-2 rounded bg-white/5"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="City or place"
                />
            </div>

            <div className="mt-2 max-h-48 overflow-auto">
                {suggestions.map((s) => (
                    <button
                        key={`${s.latitude}-${s.longitude}`}
                        className="w-full text-left p-2 hover:bg-white/5 rounded"
                        onClick={() => {
                            onSelect(s)
                            setSuggestions([])
                        }}
                    >
                        <div className="font-medium">
                            {s.name}
                            {s.admin1 ? `, ${s.admin1}` : ""} {s.country ? `, ${s.country}` : ""}
                        </div>
                        <div className="text-xs text-slate-400">
                            lat {s.latitude.toFixed(2)}, lon {s.longitude.toFixed(2)}
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-2">
                <button
                    className="btn btn-primary"
                    onClick={async () => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(async (pos) => {
                                const loc = {
                                    latitude: pos.coords.latitude,
                                    longitude: pos.coords.longitude,
                                    name: "Current location",
                                }
                                onSelect(loc)
                            })
                        }
                    }}
                >
                    Use my location
                </button>
            </div>
        </div>
    )
}
