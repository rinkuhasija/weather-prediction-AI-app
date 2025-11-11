"use client"

import React, { useState, useMemo, useEffect } from "react"
import debounce from "lodash.debounce"
import { geocode } from "@/utils/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

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
        return () => {
            // cancel any pending debounced calls on unmount / before next effect
            ;(doSearch as unknown as { cancel?: () => void }).cancel?.()
        }
    }, [query, doSearch])

    return (
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
            <CardContent className="space-y-3 pt-4">
                <Label>Location</Label>
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="City or place"
                />

                <div className="max-h-48 overflow-auto rounded-md border border-white/5">
                    {suggestions.map((s) => (
                        <Button
                            key={`${s.latitude}-${s.longitude}`}
                            variant="ghost"
                            className="w-full justify-start text-left hover:bg-white/10"
                            onClick={() => {
                                onSelect(s)
                                setSuggestions([])
                            }}
                        >
                            <div>
                                <div className="font-medium">
                                    {s.name}
                                    {s.admin1 ? `, ${s.admin1}` : ""} {s.country ? `, ${s.country}` : ""}
                                </div>
                                <div className="text-xs text-slate-400">
                                    lat {s.latitude.toFixed(2)}, lon {s.longitude.toFixed(2)}
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>

                <Button
                    variant="secondary"
                    onClick={() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((pos) => {
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
                    Use My Location
                </Button>
            </CardContent>
        </Card>
    )
}
