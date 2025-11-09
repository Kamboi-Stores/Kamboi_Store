  'use client';
import React, { useState } from 'react';
import { haversine } from '@/lib/haversine';
import { Location } from '@/lib/types';
import LocationStatus from './LocationStatus';

export default function LocationFinder() {
  const [zip, setZip] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Location[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  async function getLocations(): Promise<Location[]> {
    const res = await fetch('/api/locations');
    if (!res.ok) throw new Error('Failed to fetch locations');
    return res.json();
  }

  async function locateByZip() {
    if (!zip.trim()) {
      setError('Please enter a ZIP code');
      return;
    }
    
    setError(null); 
    setResults(null);
    setLoading(true);
    try {
      console.log('Searching for ZIP:', zip);
      const geoRes = await fetch('/api/geocode', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ zip }) });
      const geo = await geoRes.json();
      console.log('Geocode response:', geo);
      if (!geoRes.ok) throw new Error(geo.error || 'ZIP not found');
      const locs = await getLocations();
      console.log('Available locations:', locs);
      
      if (locs.length === 0) {
        setError('No restaurant locations are currently available. Please check back later or contact us for store information.');
        return;
      }
      
      const locationsWithCoords = locs.filter(loc => loc.lat && loc.lng);
      console.log('Locations with coordinates:', locationsWithCoords);
      
      // Check if there are any locations for this ZIP code
      const locationsForZip = locs.filter(loc => loc.zip === zip);
      console.log('Locations for ZIP', zip, ':', locationsForZip);
      
      if (locationsWithCoords.length === 0) {
        if (locationsForZip.length > 0) {
          // Show locations for this ZIP even without coordinates
          console.log('Showing locations for ZIP without coordinates:', locationsForZip);
          setResults(locationsForZip);
        } else {
          setError('No locations found for this ZIP code');
        }
        return;
      }
      
      // Calculate distances and filter by 30-mile radius
      const locationsWithDistance = locationsWithCoords.map(loc => {
        const distance = haversine(geo.lat, geo.lng, loc.lat!, loc.lng!);
        console.log(`Distance from ${zip} to ${loc.name}: ${distance.toFixed(2)} miles`);
        return {
          ...loc,
          distance
        };
      });
      
      // Filter locations within 30 miles and sort by distance (closest first)
      const nearbyLocations = locationsWithDistance
        .filter(loc => loc.distance <= 20)
        .sort((a, b) => {
          console.log(`Comparing ${a.name} (${a.distance.toFixed(2)} miles) vs ${b.name} (${b.distance.toFixed(2)} miles)`);
          return a.distance - b.distance;
        });

      // Find locations without coordinates that match the ZIP
      const locationsWithoutCoords = locs.filter(loc => !loc.lat || !loc.lng).filter(loc => loc.zip === zip);

      // Combine both results
      const combinedResults = [...nearbyLocations, ...locationsWithoutCoords];

      console.log('Combined results:', combinedResults);

      if (combinedResults.length > 0) {
        setResults(combinedResults);
      } else {
        setError(`No restaurants found within 20 miles of ZIP code ${zip}. Try a different ZIP code or contact us for the nearest location.`);
      }
    } catch (e: unknown) {
      console.error('LocationFinder error:', e);
      setError(e instanceof Error ? e.message : 'An error occurred');
    } finally { setLoading(false); }
  }

  async function locateByGPS() {
    setError(null); 
    setResults(null);
    setGpsLoading(true);
    
    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser. Please enter a ZIP code instead.');
      }

      console.log('Requesting location permission...');
      
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          timeout: 10000, // 10 seconds
          maximumAge: 60000 // 1 minute
        };
        
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
      
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log('GPS coordinates obtained:', { lat, lng });
      
      // Get ZIP code from coordinates using reverse geocoding
      console.log('Getting ZIP code from coordinates...');
      const reverseGeoRes = await fetch('/api/geocode', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ lat, lng }) 
      });
      
      console.log('Reverse geocoding response status:', reverseGeoRes.status);
      
      if (!reverseGeoRes.ok) {
        const errorData = await reverseGeoRes.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Reverse geocoding failed:', errorData);
        throw new Error(`Unable to determine ZIP code: ${errorData.error || 'Unknown error'}`);
      }
      
      const reverseGeo = await reverseGeoRes.json();
      console.log('Reverse geocoding response:', reverseGeo);
      
      if (!reverseGeo.zip) {
        console.error('No ZIP code in reverse geocoding response');
        throw new Error('Unable to determine your ZIP code from location. Please enter a ZIP code instead.');
      }
      
      const userZip = reverseGeo.zip;
      console.log('User ZIP code from GPS:', userZip);
      
      // Auto-fill the ZIP code input
      setZip(userZip);
      
      const locs = await getLocations();
      console.log('Available locations:', locs);
      
      if (locs.length === 0) {
        setError('No restaurant locations are currently available. Please check back later or contact us for store information.');
        return;
      }
      
      // First, try to find locations with coordinates and calculate distances
      const locationsWithCoords = locs.filter(loc => loc.lat && loc.lng);
      console.log('Locations with coordinates:', locationsWithCoords);
      
      if (locationsWithCoords.length > 0) {
        // Calculate distances and filter by 20-mile radius
        const locationsWithDistance = locationsWithCoords.map(loc => {
          const distance = haversine(lat, lng, loc.lat!, loc.lng!);
          console.log(`Distance from GPS to ${loc.name}: ${distance.toFixed(2)} miles`);
          return {
            ...loc,
            distance
          };
        });

        // Filter locations within 20 miles and sort by distance (closest first)
        const nearbyLocations = locationsWithDistance
          .filter(loc => loc.distance <= 20)
          .sort((a, b) => {
            console.log(`Comparing ${a.name} (${a.distance.toFixed(2)} miles) vs ${b.name} (${b.distance.toFixed(2)} miles)`);
            return a.distance - b.distance;
          });

        console.log('Locations within 20 miles, sorted by distance:', nearbyLocations.map(loc => `${loc.name}: ${loc.distance.toFixed(2)} miles`));

        if (nearbyLocations.length > 0) {
          setResults(nearbyLocations);
        } else {
          // Fallback to locations in the same ZIP code
          const locationsForZip = locs.filter(loc => loc.zip === userZip);
          if (locationsForZip.length > 0) {
            console.log('No locations within 20 miles, showing locations for ZIP:', locationsForZip);
            setResults(locationsForZip);
          } else {
            setError('No restaurants found within 20 miles of your location. Please try entering a ZIP code instead.');
          }
        }
      } else {
        // If no locations have coordinates, show locations in the same ZIP code
        const locationsForZip = locs.filter(loc => loc.zip === userZip);
        console.log('No locations with coordinates found, showing locations for ZIP:', locationsForZip);
        
        if (locationsForZip.length > 0) {
          setResults(locationsForZip);
        } else {
          setError(`No restaurants found in your ZIP code (${userZip}). Please try entering a different ZIP code.`);
        }
      }
      
    } catch (e: unknown) {
      console.error('GPS location error:', e);
      
      if (e instanceof GeolocationPositionError) {
        switch (e.code) {
          case e.PERMISSION_DENIED:
            setError('Location access denied. Please allow location access in your browser settings or enter a ZIP code instead.');
            break;
          case e.POSITION_UNAVAILABLE:
            setError('Location information is unavailable. Please try entering a ZIP code instead.');
            break;
          case e.TIMEOUT:
            setError('Location request timed out. Please try again or enter a ZIP code instead.');
            break;
          default:
            setError('Unable to get your location. Please enter a ZIP code instead.');
        }
      } else {
        setError(e instanceof Error ? e.message : 'An error occurred while getting your location. Please try entering a ZIP code instead.');
      }
    } finally { 
      setGpsLoading(false); 
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && zip.length === 5) {
      locateByZip();
    }
  };

  return (
    <div className="location-finder">
      {/* Search Section */}
      <div className="search-section">
        <div className="search-input-group">
          <div className="input-wrapper">
            <input 
              placeholder="Enter ZIP code (e.g., 27401)"
              value={zip}
              onChange={e => setZip(e.target.value.replace(/[^0-9]/g,''))}
              onKeyDown={handleKeyDown}
              maxLength={5}
              aria-label="ZIP code"
              className="zip-input"
            />
            <button 
              className="search-btn" 
              onClick={locateByZip} 
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
        
        <div className="location-options">
          <button 
            className="location-btn primary" 
            onClick={locateByGPS} 
            disabled={gpsLoading}
          >
            {gpsLoading ? 'Getting Location...' : '📍 Use My Location'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <div className="results-section">
          <h3>Nearby Locations</h3>
          <div className="results-grid">
            {results.map((loc: Location & { distance?: number }) => (
              <div className="location-card" key={loc.slug}>
                <div className="location-info">
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
                    <h4 style={{margin: '0'}}>{loc.name}</h4>
                    <LocationStatus compact={true} hours={loc.hours} />
                  </div>
                  <p className="address" style={{marginTop: '12px'}}>{loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
                  {loc.phone && (
                    <p className="phone">📞 {loc.phone}</p>
                  )}
                  {loc.distance !== undefined && (
                    <p className="distance">{loc.distance.toFixed(1)} miles away</p>
                  )}
                </div>
                <div className="location-actions">
                  {loc.phone && (
                    <a className="btn call-btn" href={`tel:${loc.phone}`}>
                      Call
                    </a>
                  )}
                  <a 
                    className="btn directions-btn" 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ', ' + loc.city + ', ' + loc.state + ' ' + loc.zip)}`} 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Directions
                  </a>
                  {loc.orderUrl && (
                    <a 
                      className="btn order-btn" 
                      href={loc.orderUrl} 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      Order Online
                    </a>
                  )}
                  {loc.doordashUrl && (
                    <a 
                      className="btn doordash-btn" 
                      href={loc.doordashUrl} 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      🚗 DoorDash
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
