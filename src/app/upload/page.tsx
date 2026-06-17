"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Code2, Loader2 } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileDropzone } from "@/components/FileDropzone"

export default function UploadPage() {
  const router = useRouter()
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [hasUrl, setHasUrl] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [uploadResult, setUploadResult] = useState<{ publicUrl: string; files: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (files: FileList) => {
    setSelectedFiles(files)
    setHasUrl(false)
    setError(null)
    setUploadResult(null)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setUrl(value)
    setHasUrl(value.length > 0)
    if (value.length > 0) {
      setSelectedFiles(null)
    }
  }

  const handleGenerateCodeMap = async () => {
    if (!selectedFiles && !hasUrl) return

    setIsLoading(true)
    setError(null)
    setUploadResult(null)

    if (selectedFiles) {
      const formData = new FormData()
      Array.from(selectedFiles).forEach((file) => formData.append("files", file))

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const json = await response.json().catch(() => null)
          throw new Error(json?.error || "Upload failed")
        }

        const data = await response.json()
        setUploadResult(data)
      } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : String(uploadError))
      } finally {
        setIsLoading(false)
      }

      return
    }

    setTimeout(() => {
      router.push("/loading")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Heading */}
          <h2 className="text-4xl font-semibold text-center text-slate-900 mb-8">
            Connect Your Repository
          </h2>

          {/* FileDropzone */}
          <FileDropzone onFileSelect={handleFileSelect} />

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-sm font-medium text-slate-500">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* GitHub URL Input */}
          <div className="relative mb-8">
            <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <Input
              type="url"
              placeholder="https://github.com/username/repo"
              value={url}
              onChange={handleUrlChange}
              className="pl-10"
            />
          </div>

          {error ? (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {uploadResult ? (
            <div className="mb-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <p className="font-medium">Upload successful!</p>
              <p className="mt-1">Public upload path: <code>{uploadResult.publicUrl}</code></p>
              <p className="mt-1">Files: {uploadResult.files.length}</p>
            </div>
          ) : null}

          {/* Submit Button */}
          <Button
            onClick={handleGenerateCodeMap}
            disabled={(!selectedFiles && !hasUrl) || isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating CodeMap
              </>
            ) : (
              "Generate CodeMap"
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
