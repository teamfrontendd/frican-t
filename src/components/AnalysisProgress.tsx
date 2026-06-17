"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

export function AnalysisProgress() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const radius = 64
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push("/dashboard")
          }, 500)
          return 100
        }
        return prev + (100 / 60) // 6 seconds total
      })
    }, 100)

    return () => clearInterval(interval)
  }, [router])

  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Circular Progress */}
      <motion.svg
        viewBox="0 0 160 160"
        width={160}
        height={160}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="10"
          fill="none"
        />
        {/* Progress arc */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#4f46e5"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "80px 80px",
            transition: "stroke-dashoffset 0.1s linear",
          }}
        />
        {/* Center text */}
        <text
          x="80"
          y="80"
          textAnchor="middle"
          dy="0.3em"
          fontSize="22"
          fontWeight="600"
          fill="#1a1a2e"
        >
          {Math.round(progress)}%
        </text>
      </motion.svg>

      {/* Linear Progress Bar */}
      <div className="w-full max-w-md">
        <Progress value={progress} />
      </div>

      {/* Status Label */}
      <div className="text-center">
        <p className="text-slate-700 font-medium mb-2">
          Analyzing Repository Structure...
        </p>
        <ul className="space-y-1 text-sm text-slate-600">
          <li>• Reading file tree</li>
          <li>• Parsing code dependencies</li>
          <li>• Mapping architecture nodes</li>
        </ul>
      </div>
    </div>
  )
}
