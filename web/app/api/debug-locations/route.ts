import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity.client';

export async function GET() {
  try {
    // Direct Sanity query to debug hours data
    const q = `*[_type=="location" && isActive==true]{
      name,
      "slug": slug.current,
      hours[]{
        day,
        open,
        close
      },
      orderUrl,
      doordashUrl
    }`;
    
    const locations = await client.fetch(q);
    
    return NextResponse.json({
      message: 'Debug locations data',
      count: locations.length,
      locations: locations,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({ error: 'Failed to fetch debug data' }, { status: 500 });
  }
}