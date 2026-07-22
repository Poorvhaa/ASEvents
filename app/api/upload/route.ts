import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg']
const ALLOWED_MIMES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
]
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // 1. File Extension Validation
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (!ext || !ALLOWED_EXTENSIONS.includes(`.${ext}`)) {
      return NextResponse.json(
        { error: 'Invalid file extension. Allowed types: PDF, DOC, DOCX, PNG, JPG, JPEG' },
        { status: 400 }
      )
    }

    // 2. MIME Type Validation
    if (!ALLOWED_MIMES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid MIME type. Allowed types: PDF, DOC, DOCX, PNG, JPG, JPEG' },
        { status: 400 }
      )
    }

    // 3. File Size Validation
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File size exceeds 10 MB limit' },
        { status: 400 }
      )
    }

    // 4. Executable / Threat File Pattern Validation
    if (/\.(exe|bat|cmd|sh|bash|js|ts|py|pl|rb|php|bin|msi|dmg|elf|wasm|jar)$/i.test(file.name)) {
      return NextResponse.json(
        { error: 'Executable files are not allowed' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`
    const filepath = join(uploadsDir, filename)

    // Save file
    await writeFile(filepath, buffer)

    // Return URL
    const url = `/uploads/${filename}`
    return NextResponse.json({ url, filename }, { status: 201 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
