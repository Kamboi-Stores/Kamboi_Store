import { NextResponse } from 'next/server';
import { getLocationsByZip } from '@/lib/sanity.client';
import { Location } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get('zip');
  
  if (!zip) {
    return NextResponse.json({ error: 'ZIP parameter is required' }, { status: 400 });
  }

  try {
    const locations = await getLocationsByZip(zip);
    return NextResponse.json({ 
      zip, 
      locations,
      count: locations.length,
      hasCoordinates: locations.filter((loc: Location) => loc.lat && loc.lng).length
    });
  } catch (error) {
    console.error('Error fetching locations by ZIP:', error);
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}
