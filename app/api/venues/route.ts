import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/api-security'
import { venuesQuerySchema } from '@/lib/validations/schemas'
import { getDisplayVenues, getFeaturedDisplayVenues } from '@/services/venueService'

export const revalidate = 300

export async function GET(request: NextRequest) {
  const rateLimited = checkRateLimit(request, 'venues', 60)
  if (rateLimited) return rateLimited

  try {
    const { searchParams } = new URL(request.url)
    const parsed = venuesQuerySchema.safeParse({
      city: searchParams.get('city') || undefined,
      category: searchParams.get('category') || undefined,
      capacity: searchParams.get('capacity') || undefined,
    })

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 })
    }

    const featured = searchParams.get('featured') === 'true'
    const venues = featured
      ? await getFeaturedDisplayVenues()
      : await getDisplayVenues(parsed.data)

    return NextResponse.json(
      { success: true, venues },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error('[Venues API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 })
  }
}
