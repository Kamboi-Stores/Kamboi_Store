import { NextResponse } from 'next/server';

type Req = { zip?: string, lat?: number, lng?: number };

export async function POST(req: Request) {
  const body = (await req.json()) as Req;
  let { zip, lat, lng } = body;

  // Use OpenCage as primary if available
  if (process.env.OPENCAGE_API_KEY) {
    try {
      return await openCageGeocode(zip, lat, lng);
    } catch (error) {
      console.log('OpenCage failed, trying Google fallback...', error);
    }
  }

  // Fallback to Google Geocoding
  if (process.env.GOOGLE_GEOCODING_API_KEY) {
    try {
      return await googleGeocode(zip, lat, lng);
    } catch (error) {
      console.log('Google Geocoding failed, trying simple fallback...');
    }
  }

  // Final fallback - simple ZIP code approximation
  return await simpleFallback(zip, lat, lng);
}

async function googleGeocode(zip?: string, lat?: number, lng?: number) {
  // Forward geocoding: ZIP to coordinates
  if (zip && (!lat || !lng)) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(zip)}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();
    if (data.status !== 'OK') {
      throw new Error(`Google API error: ${data.status}`);
    }
    const loc = data.results[0].geometry.location;
    lat = loc.lat; lng = loc.lng;
  }

  // Reverse geocoding: coordinates to ZIP
  if (lat && lng && !zip) {
    console.log('Performing reverse geocoding for:', { lat, lng });
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();
    
    console.log('Google Geocoding API response:', {
      status: data.status,
      resultsCount: data.results?.length || 0,
      firstResult: data.results?.[0] || null
    });
    
    if (data.status !== 'OK') {
      console.error('Geocoding API error:', data);
      throw new Error(`Reverse geocoding failed: ${data.status}. ${data.error_message || ''}`.trim());
    }
    
    if (!data.results || data.results.length === 0) {
      console.error('No results from geocoding API');
      throw new Error('No location data found for these coordinates');
    }
    
    // Extract ZIP code from address components
    const addressComponents = data.results[0].address_components;
    console.log('Address components:', addressComponents);
    
    const zipComponent = addressComponents.find((component: any) => 
      component.types.includes('postal_code')
    );
    
    console.log('ZIP component found:', zipComponent);
    
    if (zipComponent) {
      zip = zipComponent.long_name;
      console.log('Extracted ZIP code:', zip);
    } else {
      console.error('No postal_code component found in address_components');
      throw new Error('ZIP code not found for these coordinates');
    }
  }

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    throw new Error('No coordinates provided');
  }

  return NextResponse.json({ lat, lng, zip });
}

async function openCageGeocode(zip?: string, lat?: number, lng?: number) {
  // Forward geocoding: ZIP to coordinates
  if (zip && (!lat || !lng)) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(zip)}&key=${process.env.OPENCAGE_API_KEY}&countrycode=us&limit=1`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();
    if (data.results.length === 0) {
      throw new Error('ZIP not found');
    }
    const loc = data.results[0].geometry;
    lat = loc.lat; lng = loc.lng;
  }

  // Reverse geocoding: coordinates to ZIP
  if (lat && lng && !zip) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${process.env.OPENCAGE_API_KEY}&limit=1`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();
    
    if (data.results.length === 0) {
      throw new Error('Location not found');
    }
    
    const components = data.results[0].components;
    zip = components.postcode;
    
    if (!zip) {
      throw new Error('ZIP code not found for these coordinates');
    }
  }

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    throw new Error('No coordinates provided');
  }

  return NextResponse.json({ lat, lng, zip });
}

async function simpleFallback(zip?: string, lat?: number, lng?: number) {
  // Simple fallback - just return approximate coordinates for common ZIP codes
  // This is very basic but will work for development
  
  if (zip && (!lat || !lng)) {
    // Rough approximation for some common ZIP codes (you can expand this)
    const zipApproximations: { [key: string]: { lat: number, lng: number } } = {
      '27401': { lat: 36.0726, lng: -79.7920 }, // Greensboro, NC
      '10001': { lat: 40.7505, lng: -73.9934 }, // NYC
      '90210': { lat: 34.0901, lng: -118.4065 }, // Beverly Hills
      '30309': { lat: 33.7901, lng: -84.3733 }, // Atlanta
      // Add more as needed
    };
    
    if (zipApproximations[zip]) {
      lat = zipApproximations[zip].lat;
      lng = zipApproximations[zip].lng;
      return NextResponse.json({ lat, lng, zip });
    }
  }

  // For reverse geocoding without API, return an error
  if (lat && lng && !zip) {
    return NextResponse.json({ error: 'Reverse geocoding unavailable. Please enter ZIP code manually.' }, { status: 400 });
  }

  return NextResponse.json({ error: 'Geocoding service unavailable' }, { status: 500 });
}
