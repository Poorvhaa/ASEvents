import { NextRequest, NextResponse } from 'next/server'
import { getDisplayPackages } from '@/services/packageService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const packages = await getDisplayPackages(category)

    return NextResponse.json(
      { success: true, packages },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error('[Packages API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}
