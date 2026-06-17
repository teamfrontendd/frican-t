"use client"

import { Navbar } from "@/components/Navbar"
import { AnalysisProgress } from "@/components/AnalysisProgress"

export default function LoadingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <AnalysisProgress />
      </main>
    </div>
  )
}
