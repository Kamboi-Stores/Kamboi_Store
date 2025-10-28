import { NextResponse } from 'next/server';
import { getActiveLocations } from '@/lib/sanity.client';

export async function GET() {
  const locs = await getActiveLocations();
  return NextResponse.json(locs);
}
