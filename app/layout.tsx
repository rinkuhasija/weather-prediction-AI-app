"use client"

import "./globals.css"
import { ThemeProvider } from "next-themes"
import ThemeToggle from "@/components/ThemeToggle"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="min-h-screen bg-gradient-to-b from-sky-900 via-slate-900 to-black text-slate-100">
            <header className="p-4 max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Weather Predictor</h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </header>
            <main className="max-w-7xl mx-auto p-4">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
