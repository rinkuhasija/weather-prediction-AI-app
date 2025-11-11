"use client"

import React, { useState, useEffect } from "react"
import WeatherSearch from "@/components/WeatherSearch"
import WeatherSummary from "@/components/WeatherSummary"
import WeatherChart from "@/components/WeatherChart"
import ForecastTabs from "@/components/ForecastTabs"
import MapView from "@/components/MapView"
import Favorites from "@/components/Favorites"
import AnimatedBackground from "@/components/AnimatedBackground"
import WeatherAI from "@/components/WeatherAI"
import { fetchHourly, fetchDaily } from "@/utils/api"

export default function Page() {
  const [location, setLocation] = useState<any | null>(null)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5))
  const [hourly, setHourly] = useState<any[]>([])
  const [daily, setDaily] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!location) return
      ; (async () => {
        setLoading(true)
        try {
          const h = await fetchHourly(location.latitude, location.longitude, date)
          setHourly(h)
          const d = await fetchDaily(location.latitude, location.longitude, date)
          setDaily(d)
        } catch (e) {
          console.error(e)
        } finally {
          setLoading(false)
        }
      })()
  }, [location, date])

  return (
    <div className="relative">
      <AnimatedBackground weather={hourly[0]?.weathercode} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card">
            <WeatherSearch onSelect={setLocation} />
            <Favorites onSelect={setLocation} />
          </div>
          <MapView location={location} />
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          <WeatherSummary hourly={hourly} date={date} time={time} loading={loading} />
          <WeatherChart hourly={hourly} />
          <ForecastTabs daily={daily} />
          <WeatherAI hourly={hourly} daily={daily} location={location} />
        </div>
      </div>
    </div>
  )
}
