// /utils/formatter.ts
import { parseISO } from "date-fns"

/**
 * Finds the weather data entry that’s closest to a given date + time.
 */
export function pickNearestHour(hourly: any[], date: string, time: string) {
    if (!hourly || !hourly.length) return null

    const target = new Date(`${date}T${time}:00`)
    let best = hourly[0]
    let bestDiff = Math.abs(new Date(best.time).getTime() - target.getTime())

    for (const h of hourly) {
        const diff = Math.abs(new Date(h.time).getTime() - target.getTime())
        if (diff < bestDiff) {
            best = h
            bestDiff = diff
        }
    }

    return best
}
