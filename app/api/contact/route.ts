import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  console.log('[v0] Contact API: Received POST request')

  try {
    const body = await request.json()
    console.log('[v0] Contact API: Request body received')

    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('[v0] Contact API: Validation failed - Missing required fields', {
        name: !!name,
        email: !!email,
        subject: !!subject,
        message: !!message,
      })
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          required: ['name', 'email', 'subject', 'message']
        },
        { status: 400 }
      )
    }

    console.log('[v0] Contact API: Inserting into database...')

    // Insert into database
    const result = await db
      .insert(contactSubmissions)
      .values({
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'new',
      })
      .returning()

    console.log('[v0] Contact API: Database insert successful', {
      id: result[0]?.id,
      email: result[0]?.email,
      status: result[0]?.status,
    })

    console.log(`[v0] Contact API: Request completed in ${Date.now() - startTime}ms`)

    return NextResponse.json(
      { 
        success: true,
        message: 'Contact form submitted successfully',
        id: result[0]?.id 
      }, 
      { status: 201 }
    )
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[v0] Contact API: Error -', {
      message: errorMsg,
      stack: error instanceof Error ? error.stack : undefined,
      duration: Date.now() - startTime,
    })

    return NextResponse.json(
      { 
        error: 'Failed to submit contact form',
        message: process.env.NODE_ENV === 'development' ? errorMsg : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
