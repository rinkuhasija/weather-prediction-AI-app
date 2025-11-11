"use client"

import React, { useState, useEffect } from "react"
import { loadFavorites, saveFavorites } from "../utils/storage"
import { Button } from "./ui/button"

export default function Favorites({ onSelect }: { onSelect: (loc: any) => void }) {
    const [favorites, setFavorites] = useState<any[]>([])

    // Load favorites from localStorage when component mounts
    useEffect(() => {
        setFavorites(loadFavorites())
    }, [])

    // Add a new favorite manually (optional)
    function addSampleFavorite() {
        const sample = { name: "New Delhi", latitude: 28.6139, longitude: 77.209 }
        const updated = [...favorites, sample]
        saveFavorites(updated)
        setFavorites(updated)
    }

    // Remove a favorite
    function removeFavorite(name: string) {
        const updated = favorites.filter((f) => f.name !== name)
        saveFavorites(updated)
        setFavorites(updated)
    }

    if (!favorites.length) {
        return (
            <div className="mt-4 text-slate-400 text-sm">
                No favorites yet. Search a city and click “Add to Favorites” (coming soon).
                <Button
                    variant="secondary"
                    className="text-xs text-sky-400 underline ml-2"
                    onClick={addSampleFavorite}
                >
                    Add sample
                </Button>
            </div>
        )
    }

    return (
        <div className="mt-4">
            <div className="text-sm text-slate-400 mb-2">Favorites</div>
            <div className="space-y-2">
                {favorites.map((fav) => (
                    <div
                        key={`${fav.latitude}-${fav.longitude}`}
                        className="flex justify-between items-center bg-white/5 rounded p-2 hover:bg-white/10 transition"
                    >
                        <Button
                            variant="ghost"
                            onClick={() => onSelect(fav)}
                            className="text-left text-slate-200 text-sm flex-1"
                        >
                            {fav.name}
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => removeFavorite(fav.name)}
                            className="text-slate-400 hover:text-red-400 ml-2 text-xs"
                        >
                            ✕
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
