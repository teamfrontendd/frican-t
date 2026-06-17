"use client"

import { LayoutGrid, FolderOpen } from "lucide-react"

export function ArchitectureTree() {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-8">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex gap-4 items-center justify-center mb-4">
          <FolderOpen className="h-8 w-8 text-slate-400" />
          <span className="text-slate-400">→</span>
          <LayoutGrid className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-700 mb-2">
          Architecture Visualization
        </h3>
        <p className="text-slate-500">
          Upload a repository to generate and visualize its architecture
        </p>
      </div>
    </div>
  )
}
