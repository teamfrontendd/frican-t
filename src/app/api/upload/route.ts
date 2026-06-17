import { NextResponse } from "next/server"
import { dirname, join } from "path"
import { promises as fs } from "fs"

export async function POST(req: Request) {
  const formData = await req.formData()
  const entries = formData.getAll("files")
  const files = entries.filter((entry) => entry instanceof File) as File[]

  if (files.length === 0) {
    return NextResponse.json({ error: "No files uploaded." }, { status: 400 })
  }

  const uploadId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const uploadDir = join(process.cwd(), "public", "uploads", uploadId)
  await fs.mkdir(uploadDir, { recursive: true })

  const uploadedFiles: string[] = []

  for (const file of files) {
    const relativePath = (file as any).webkitRelativePath || file.name
    const normalizedPath = relativePath.replace(/\\/g, "/")
    const outputPath = join(uploadDir, normalizedPath)
    const outputDir = dirname(outputPath)

    await fs.mkdir(outputDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(outputPath, buffer)

    uploadedFiles.push(`/uploads/${uploadId}/${normalizedPath}`)
  }

  return NextResponse.json({
    publicUrl: `/uploads/${uploadId}/`,
    files: uploadedFiles,
  })
}
