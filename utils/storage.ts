// /utils/storage.ts

/**
 * Load favorite locations from localStorage
 */
export function loadFavorites(): any[] {
    try {
        const data = localStorage.getItem("favorites")
        return data ? JSON.parse(data) : []
    } catch (error) {
        console.error("Error loading favorites:", error)
        return []
    }
}

/**
 * Save favorite locations to localStorage
 */
export function saveFavorites(list: any[]) {
    try {
        localStorage.setItem("favorites", JSON.stringify(list))
    } catch (error) {
        console.error("Error saving favorites:", error)
    }
}
