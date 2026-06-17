"use client"

import { Navbar } from "@/components/Navbar"
import { ArchitectureTree } from "@/components/ArchitectureTree"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-semibold text-slate-900 mb-8">
            Architecture Visualization
          </h2>
          <ArchitectureTree />
        </div>
      </main>
    </div>
  )
}
