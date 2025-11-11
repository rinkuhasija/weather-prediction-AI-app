// /utils/api.ts

export async function geocode(query: string) {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=7`
    )
    const data = await res.json()
    return data.results || []
}

export async function fetchHourly(lat: number, lon: number, date: string) {
    const tz = "auto"
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,windspeed_10m,relativehumidity_2m,weathercode&start_date=${date}&end_date=${date}&timezone=${tz}`
    const res = await fetch(url)
    const data = await res.json()
    if (!data.hourly) return []

    return data.hourly.time.map((t: string, i: number) => ({
        time: t,
        temp: data.hourly.temperature_2m[i],
        precip: data.hourly.precipitation[i],
        wind: data.hourly.windspeed_10m ? data.hourly.windspeed_10m[i] : null,
        humidity: data.hourly.relativehumidity_2m ? data.hourly.relativehumidity_2m[i] : null,
        weathercode: data.hourly.weathercode[i],
    }))
}


export async function fetchDaily(lat: number, lon: number, date: string) {
    const tz = "auto"
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=${tz}`
    const res = await fetch(url)
    const data = await res.json()
    return data.daily || null
}
