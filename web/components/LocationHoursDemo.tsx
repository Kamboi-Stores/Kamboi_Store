'use client';

import React from 'react';
import LocationStatus from './LocationStatus';

// Example of different hours for different days to demonstrate the functionality
const LocationHoursDemo = () => {
  // Example 1: Regular gas station with weekend variations
  const regularStationHours = [
    { day: 'monday', open: '05:30', close: '23:30' },
    { day: 'tuesday', open: '05:30', close: '23:30' },
    { day: 'wednesday', open: '05:30', close: '23:30' },
    { day: 'thursday', open: '05:30', close: '23:30' },
    { day: 'friday', open: '05:00', close: '01:00' }, // Late Friday
    { day: 'saturday', open: '05:00', close: '01:00' }, // Late Saturday
    { day: 'sunday', open: '07:00', close: '22:00' }, // Shorter Sunday
  ];

  // Example 2: 24/7 station except Sundays
  const mostly24HourHours = [
    { day: 'monday', open: '00:00', close: '23:59' },
    { day: 'tuesday', open: '00:00', close: '23:59' },
    { day: 'wednesday', open: '00:00', close: '23:59' },
    { day: 'thursday', open: '00:00', close: '23:59' },
    { day: 'friday', open: '00:00', close: '23:59' },
    { day: 'saturday', open: '00:00', close: '23:59' },
    { day: 'sunday', open: '06:00', close: '22:00' }, // Reduced Sunday hours
  ];

  // Example 3: Highway station with early morning focus
  const highwayStationHours = [
    { day: 'monday', open: '04:00', close: '24:00' },
    { day: 'tuesday', open: '04:00', close: '24:00' },
    { day: 'wednesday', open: '04:00', close: '24:00' },
    { day: 'thursday', open: '04:00', close: '24:00' },
    { day: 'friday', open: '04:00', close: '02:00' }, // Very late Friday
    { day: 'saturday', open: '04:00', close: '02:00' }, // Very late Saturday  
    { day: 'sunday', open: '05:00', close: '23:00' },
  ];

  // Example 4: Station with maintenance day
  const stationWithMaintenanceHours = [
    { day: 'monday', open: '06:00', close: '22:00' },
    { day: 'tuesday', open: 'closed', close: 'closed' }, // Closed for maintenance
    { day: 'wednesday', open: '06:00', close: '22:00' },
    { day: 'thursday', open: '06:00', close: '22:00' },
    { day: 'friday', open: '06:00', close: '23:00' },
    { day: 'saturday', open: '06:00', close: '23:00' },
    { day: 'sunday', open: '08:00', close: '20:00' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2 style={{ color: 'var(--fg)', marginBottom: '24px' }}>Location Hours Examples</h2>
      
      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        
        {/* Example 1: Regular Station */}
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--fg)' }}>Downtown Kamboi Station</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--muted)' }}>Current Status:</span>
            <LocationStatus compact={true} hours={regularStationHours} />
          </div>
          <LocationStatus showHours={true} hours={regularStationHours} />
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>
            <strong>Schedule:</strong><br/>
            Mon-Thu: 5:30 AM - 11:30 PM<br/>
            Fri-Sat: 5:00 AM - 1:00 AM<br/>
            Sunday: 7:00 AM - 10:00 PM
          </div>
        </div>

        {/* Example 2: 24/7 Station */}
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--fg)' }}>Highway Kamboi 24/7</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--muted)' }}>Current Status:</span>
            <LocationStatus compact={true} hours={mostly24HourHours} />
          </div>
          <LocationStatus showHours={true} hours={mostly24HourHours} />
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>
            <strong>Schedule:</strong><br/>
            Mon-Sat: 24 Hours<br/>
            Sunday: 6:00 AM - 10:00 PM
          </div>
        </div>

        {/* Example 3: Highway Station */}
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--fg)' }}>Interstate Kamboi Express</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--muted)' }}>Current Status:</span>
            <LocationStatus compact={true} hours={highwayStationHours} />
          </div>
          <LocationStatus showHours={true} hours={highwayStationHours} />
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>
            <strong>Schedule:</strong><br/>
            Mon-Thu: 4:00 AM - 12:00 AM<br/>
            Fri-Sat: 4:00 AM - 2:00 AM<br/>
            Sunday: 5:00 AM - 11:00 PM
          </div>
        </div>

        {/* Example 4: Maintenance Station */}
        <div className="card">
          <h3 style={{ marginTop: 0, color: 'var(--fg)' }}>Suburban Kamboi Station</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--muted)' }}>Current Status:</span>
            <LocationStatus compact={true} hours={stationWithMaintenanceHours} />
          </div>
          <LocationStatus showHours={true} hours={stationWithMaintenanceHours} />
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>
            <strong>Schedule:</strong><br/>
            Mon, Wed-Thu: 6:00 AM - 10:00 PM<br/>
            Tuesday: Closed (Maintenance)<br/>
            Fri-Sat: 6:00 AM - 11:00 PM<br/>
            Sunday: 8:00 AM - 8:00 PM
          </div>
        </div>

      </div>

      <div style={{ marginTop: '32px', padding: '16px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <h4 style={{ marginTop: 0, color: 'var(--fg)' }}>How It Works:</h4>
        <ul style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
          <li><strong>Real-time Status:</strong> Each location shows if it's currently open or closed</li>
          <li><strong>Today's Hours:</strong> Displays operating hours for the current day</li>
          <li><strong>Next Change:</strong> Shows time until opening/closing (e.g., "Closes in 2h 30m")</li>
          <li><strong>Sanity CMS Integration:</strong> Hours are pulled from your Sanity backend</li>
          <li><strong>Fallback System:</strong> Default hours are used if Sanity data is unavailable</li>
          <li><strong>Flexible Scheduling:</strong> Supports different hours per day, overnight hours, and closed days</li>
        </ul>
      </div>
    </div>
  );
};

export default LocationHoursDemo;