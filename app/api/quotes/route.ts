import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { quoteRequests } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  console.log('[v0] Quote API: Received POST request')

  try {
    const body = await request.json()
    console.log('[v0] Quote API: Request body:', {
      eventType: body.eventType,
      eventDate: body.eventDate,
      guestCount: body.guestCount,
      name: body.name,
      email: body.email,
      location: body.location,
    })

    const {
      eventType,
      eventDate,
      guestCount,
      budget,
      location,
      name,
      email,
      phone,
      requirements,
    } = body

    // Validate required fields
    if (!eventType || !eventDate || !guestCount || !location || !name || !email) {
      console.log('[v0] Quote API: Validation failed - Missing required fields')
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: { eventType, eventDate, guestCount, location, name, email }
        },
        { status: 400 }
      )
    }

    // Parse and validate guest count
    const guestCountNum = typeof guestCount === 'string' ? parseInt(guestCount) : guestCount
    if (isNaN(guestCountNum)) {
      console.log('[v0] Quote API: Invalid guest count:', guestCount)
      return NextResponse.json(
        { error: 'Invalid guest count' },
        { status: 400 }
      )
    }

    // Parse event date
    const parsedDate = new Date(eventDate)
    if (isNaN(parsedDate.getTime())) {
      console.log('[v0] Quote API: Invalid event date:', eventDate)
      return NextResponse.json(
        { error: 'Invalid event date' },
        { status: 400 }
      )
    }

    console.log('[v0] Quote API: Inserting into database...')
    
    // Insert into database
    const result = await db
      .insert(quoteRequests)
      .values({
        eventType,
        eventDate: parsedDate,
        guestCount: guestCountNum,
        budget,
        location,
        name,
        email,
        phone: phone || null,
        requirements: requirements || null,
        status: 'pending',
      })
      .returning()

    console.log('[v0] Quote API: Database insert successful', {
      id: result[0]?.id,
      email: result[0]?.email,
      status: result[0]?.status,
    })

    console.log(`[v0] Quote API: Request completed in ${Date.now() - startTime}ms`)
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Quote request submitted successfully',
        id: result[0]?.id 
      }, 
      { status: 201 }
    )
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[v0] Quote API: Error -', {
      message: errorMsg,
      stack: error instanceof Error ? error.stack : undefined,
      duration: Date.now() - startTime,
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to submit quote request',
        message: process.env.NODE_ENV === 'development' ? errorMsg : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  console.log('[v0] Quote API: Received GET request')
  
  try {
    const allQuotes = await db.select().from(quoteRequests).limit(50)
    console.log('[v0] Quote API: Retrieved', allQuotes.length, 'quotes')
    return NextResponse.json(allQuotes)
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[v0] Quote API: Error fetching quotes -', errorMsg)
    return NextResponse.json(
      { 
        error: 'Failed to fetch quotes',
        message: process.env.NODE_ENV === 'development' ? errorMsg : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
