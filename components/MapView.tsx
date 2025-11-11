"use client"

import React from "react"
import dynamic from "next/dynamic"
import "../app/globals.css"


const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), {
    ssr: false,
})
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), {
    ssr: false,
})
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
    ssr: false,
})

export default function MapView({ location }: { location: any }) {
    if (!location)
        return (
            <div className="card text-center text-slate-400">
                No map data — select a location.
            </div>
        )

    return (
        <div className="card overflow-hidden">
            <MapContainer
                center={[location.latitude, location.longitude]}
                zoom={10}
                style={{ height: "220px", width: "100%" }}
                scrollWheelZoom={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[location.latitude, location.longitude]} />
            </MapContainer>
            <div className="text-xs text-slate-400 mt-1 text-center">
                {location.name || "Selected Location"} ({location.latitude.toFixed(2)},{" "}
                {location.longitude.toFixed(2)})
            </div>
        </div>
    )
}
