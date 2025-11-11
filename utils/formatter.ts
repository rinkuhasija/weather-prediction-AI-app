// /utils/formatter.ts
import { parseISO } from "date-fns"

/**
 * Helpers for unit conversions
 */
export function celsiusToF(c: number) {
    return (c * 9) / 5 + 32
}
export function fToC(f: number) {
    return ((f - 32) * 5) / 9
}
export function kmhToMph(kmh: number) {
    return kmh / 1.609344
}

/**
 * Heat index (NOAA) - input: T (°F), RH (%)
 * Returns heat index in °F
 *
 * Formula (valid for typical ranges, see NOAA):
 * HI = -42.379 + 2.04901523*T + 10.14333127*RH - 0.22475541*T*RH
 *      - 6.83783e-3*T^2 - 5.481717e-2*RH^2
 *      + 1.22874e-3*T^2*RH + 8.5282e-4*T*RH^2 - 1.99e-6*T^2*RH^2
 */
export function heatIndexF(T_f: number, RH: number) {
    const T = T_f
    const R = RH
    const hi =
        -42.379 +
        2.04901523 * T +
        10.14333127 * R -
        0.22475541 * T * R -
        6.83783e-3 * T * T -
        5.481717e-2 * R * R +
        1.22874e-3 * T * T * R +
        8.5282e-4 * T * R * R -
        1.99e-6 * T * T * R * R

    // NOAA recommends small adjustments for certain RH/T ranges:
    // If RH < 13% and 80F < T < 112F, subtract an adjustment
    if (R < 13 && T >= 80 && T <= 112) {
        const adj = ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17)
        return hi - adj
    }

    // If RH > 85% and 80F < T < 87F, add an adjustment
    if (R > 85 && T >= 80 && T <= 87) {
        const adj = ((R - 85) / 10) * ((87 - T) / 5)
        return hi + adj
    }

    return hi
}

/**
 * Wind chill (US formula) - input: T (°F), V (mph)
 * Returns wind chill in °F
 *
 * Formula valid for T <= 50°F and wind speed > 3 mph:
 * WC = 35.74 + 0.6215*T - 35.75*V^0.16 + 0.4275*T*V^0.16
 */
export function windChillF(T_f: number, V_mph: number) {
    return 35.74 + 0.6215 * T_f - 35.75 * Math.pow(V_mph, 0.16) + 0.4275 * T_f * Math.pow(V_mph, 0.16)
}

/**
 * Public function: calculateFeelsLike
 * - temp: °C
 * - humidity: % (0-100) OR null/undefined
 * - wind: km/h OR null/undefined
 *
 * Returns: feels-like temperature in °C (number, rounded to 1 decimal)
 *
 * Behavior:
 * - If temp >= 26.7°C (80°F) AND humidity present => use Heat Index
 * - Else if temp <= 10°C (50°F) AND wind present => use Wind Chill
 * - Else => return actual temp
 */
export function calculateFeelsLike(tempC: number | null | undefined, humidity: number | null | undefined, windKmh: number | null | undefined): number | null {
    if (tempC === null || tempC === undefined) return null

    const tempF = celsiusToF(tempC)

    // Heat index branch
    if (tempC >= 26.7 && humidity !== null && humidity !== undefined) {
        // Ensure humidity is in 0-100 range
        const RH = Math.max(0, Math.min(100, Number(humidity)))
        const hiF = heatIndexF(tempF, RH)
        const hiC = fToC(hiF)
        return Math.round(hiC * 10) / 10
    }

    // Wind chill branch
    if (tempC <= 10 && windKmh !== null && windKmh !== undefined) {
        const mph = kmhToMph(Number(windKmh))
        if (mph > 3) {
            const wcF = windChillF(tempF, mph)
            const wcC = fToC(wcF)
            return Math.round(wcC * 10) / 10
        }
    }

    // Default: actual temp
    return Math.round(Number(tempC) * 10) / 10
}

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
