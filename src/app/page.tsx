"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FolderOpen, LayoutGrid } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const arrowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div
          className="flex flex-col items-center justify-center gap-8 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Heading */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl font-semibold text-center text-slate-900">
              Visualize Your Codebase Instantly
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-xl text-center text-slate-500">
              AI-powered code-to-architecture
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Button
              size="lg"
              onClick={() => router.push("/upload")}
              className="px-8 py-3 text-lg"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Animation Strip */}
          <motion.div
            variants={itemVariants}
            className="border border-slate-200 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-center gap-4">
              <FolderOpen className="h-8 w-8 text-slate-600" />

              <motion.span
                variants={arrowVariants}
                initial="hidden"
                animate="visible"
                className="text-slate-400"
              >
                →
              </motion.span>

              <span className="text-sm font-medium text-slate-600">
                AI Analysis
              </span>

              <motion.span
                variants={arrowVariants}
                initial="hidden"
                animate="visible"
                className="text-slate-400"
              >
                →
              </motion.span>

              <LayoutGrid className="h-8 w-8 text-slate-600" />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
