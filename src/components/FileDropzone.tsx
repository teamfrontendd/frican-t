"use client"

import React, { useRef, useState } from "react"
import { UploadCloud } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface FileDropzoneProps {
  onFileSelect?: (files: FileList) => void
}

export function FileDropzone({ onFileSelect }: FileDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [fileCount, setFileCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true)
    } else if (e.type === "dragleave") {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFiles = (files: FileList) => {
    setSelectedFolder(files[0]?.name || "Project Folder")
    setFileCount(files.length)
    onFileSelect?.(files)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  return (
    <motion.div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      animate={{
        borderColor: isDragActive ? "#4f46e5" : "#cbd5e1",
        backgroundColor: isDragActive ? "#eef2ff" : "#ffffff",
      }}
      transition={{ duration: 0.2 }}
      className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer"
    >
      <UploadCloud className="h-10 w-10 text-slate-400 mx-auto mb-4" />

      {selectedFolder ? (
        <div className="text-center">
          <p className="text-slate-900 font-medium">{selectedFolder}</p>
          <p className="text-slate-500 text-sm mt-1">{fileCount} files</p>
        </div>
      ) : (
        <div>
          <p className="text-slate-700 font-medium">Drag & Drop your project folder</p>
          <p className="text-slate-500 text-sm mt-2">or</p>
        </div>
      )}

      <div className="mt-4">
        <Button
          type="button"
          onClick={handleBrowseClick}
          variant="outline"
          size="sm"
        >
          Browse File
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        {...({ webkitdirectory: "", directory: "" } as any)}
      />
    </motion.div>
  )
}
