"use client"

import Link from "next/link"
import { UserCircle2 } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center border border-slate-900 rounded font-mono text-xs font-semibold text-slate-900">
            L
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="flex items-center gap-12">
          <a
            href="#about"
            className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors"
          >
            About
          </a>
          <a
            href="#docs"
            className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors"
          >
            Docs
          </a>
          <a
            href="#login"
            className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors"
          >
            Login
          </a>
        </div>

        {/* Right Side Avatar */}
        <div className="flex items-center">
          <UserCircle2 className="h-7 w-7 text-slate-600" />
        </div>
      </div>
    </nav>
  )
}
