'use client';

import React, { useState, useEffect } from 'react';

interface LocationHours {
  day: string;
  open: string;
  close: string;
}

interface LocationStatusProps {
  locationId?: string;
  compact?: boolean;
  showHours?: boolean;
  hours?: LocationHours[];
}

interface DefaultStoreHours {
  [key: number]: { open: string; close: string; closed?: boolean };
}

const LocationStatus: React.FC<LocationStatusProps> = ({ 
  locationId, 
  compact = false, 
  showHours = false,
  hours 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [todaysHours, setTodaysHours] = useState<string>('');
  const [nextChange, setNextChange] = useState<string>('');

  // Default store hours (fallback) - different hours per day
  const defaultStoreHours: DefaultStoreHours = {
    0: { open: '07:00', close: '22:00' }, // Sunday - shorter hours
    1: { open: '05:30', close: '23:30' }, // Monday
    2: { open: '05:30', close: '23:30' }, // Tuesday  
    3: { open: '05:30', close: '23:30' }, // Wednesday
    4: { open: '05:30', close: '23:30' }, // Thursday
    5: { open: '05:00', close: '01:00' }, // Friday - late night
    6: { open: '05:00', close: '01:00' }, // Saturday - late night
  };

  // Day name mapping
  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'
  ];

  const formatTime = (time: string): string => {
    // Handle different time formats
    if (!time || time === 'closed') return 'Closed';
    
    try {
      console.log('formatTime input:', time);
      
      // Check if time already includes AM/PM (12-hour format)
      if (time.includes('AM') || time.includes('PM') || time.includes('am') || time.includes('pm')) {
        console.log('Time already in 12-hour format:', time);
        return time; // Return as-is if already formatted
      }
      
      // Parse 24-hour format
      const [hoursStr, minutesStr] = time.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr || '0', 10);
      
      console.log('Parsed hours:', hours, 'minutes:', minutes);
      
      // Validate numbers
      if (isNaN(hours) || isNaN(minutes)) {
        console.error('Invalid time format:', time);
        return time; // Return original if can't parse
      }
      
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const result = `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      
      console.log('formatTime result:', result);
      return result;
    } catch (error) {
      console.error('Error parsing time:', time, error);
      return time; // Return original if parsing fails
    }
  };

  const parseTime = (timeStr: string): Date => {
    try {
      console.log('parseTime input:', timeStr);
      
      // Handle 12-hour format (with AM/PM)
      if (timeStr.includes('AM') || timeStr.includes('PM') || timeStr.includes('am') || timeStr.includes('pm')) {
        // Parse 12-hour format
        const [timePart, period] = timeStr.split(/\s+/);
        const [hoursStr, minutesStr] = timePart.split(':');
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr || '0', 10);
        
        if (isNaN(hours) || isNaN(minutes)) {
          console.error('Invalid time format in parseTime:', timeStr);
          return new Date();
        }
        
        // Convert to 24-hour format
        if (period.toLowerCase().includes('pm') && hours !== 12) {
          hours += 12;
        } else if (period.toLowerCase().includes('am') && hours === 12) {
          hours = 0;
        }
        
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        console.log('parseTime 12-hour result:', date);
        return date;
      }
      
      // Handle 24-hour format
      const [hoursStr, minutesStr] = timeStr.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr || '0', 10);
      
      // Validate numbers
      if (isNaN(hours) || isNaN(minutes)) {
        console.error('Invalid time format in parseTime:', timeStr);
        return new Date(); // Return current time as fallback
      }
      
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      console.log('parseTime 24-hour result:', date);
      return date;
    } catch (error) {
      console.error('Error parsing time in parseTime:', timeStr, error);
      return new Date(); // Return current time as fallback
    }
  };

  const getHoursForDay = (dayIndex: number): { open: string; close: string; closed?: boolean } => {
    if (hours && hours.length > 0) {
      // Debug: Log the hours data
      console.log('LocationStatus received hours:', hours);
      
      // Use Sanity hours if available
      const dayName = dayNames[dayIndex].toLowerCase();
      const dayHours = hours.find(h => h.day.toLowerCase() === dayName);
      console.log(`Looking for ${dayName}, found:`, dayHours);
      
      if (dayHours) {
        console.log(`Using Sanity hours for ${dayName}: open=${dayHours.open}, close=${dayHours.close}`);
        return {
          open: dayHours.open,
          close: dayHours.close,
          closed: dayHours.open === 'closed' || dayHours.close === 'closed'
        };
      }
    }
    
    console.log(`Using default hours for day ${dayIndex} (${dayNames[dayIndex]})`);
    // Fall back to default hours
    return defaultStoreHours[dayIndex];
  };

  const checkStoreStatus = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentHours = getHoursForDay(dayOfWeek);
    
    if (currentHours.closed || currentHours.open === 'closed') {
      setIsOpen(false);
      setCurrentStatus('Closed');
      setTodaysHours('Closed Today');
      setNextChange('');
      return;
    }

    const openTime = parseTime(currentHours.open);
    let closeTime = parseTime(currentHours.close);
    
    // Handle overnight hours (e.g., closes at 1:00 AM next day)
    if (currentHours.close === '01:00' || currentHours.close === '02:00' || currentHours.close === '00:30') {
      closeTime.setDate(closeTime.getDate() + 1);
    }

    const currentTimeMs = now.getTime();
    const openTimeMs = openTime.getTime();
    const closeTimeMs = closeTime.getTime();

    // Check if currently open
    let storeIsOpen = false;
    if (closeTime.getDate() > openTime.getDate()) {
      // Overnight hours
      storeIsOpen = currentTimeMs >= openTimeMs || currentTimeMs <= closeTimeMs;
    } else {
      // Same day hours
      storeIsOpen = currentTimeMs >= openTimeMs && currentTimeMs <= closeTimeMs;
    }

    setIsOpen(storeIsOpen);
    setCurrentStatus(storeIsOpen ? 'Open' : 'Closed');
    setTodaysHours(`${formatTime(currentHours.open)} - ${formatTime(currentHours.close)}`);

    // Calculate next status change
    if (storeIsOpen) {
      const timeUntilClose = closeTimeMs - currentTimeMs;
      if (timeUntilClose > 0) {
        const hoursUntilClose = Math.floor(timeUntilClose / (1000 * 60 * 60));
        const minutesUntilClose = Math.floor((timeUntilClose % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hoursUntilClose > 0) {
          setNextChange(`Closes in ${hoursUntilClose}h ${minutesUntilClose}m`);
        } else if (minutesUntilClose > 0) {
          setNextChange(`Closes in ${minutesUntilClose}m`);
        } else {
          setNextChange('Closing soon');
        }
      }
    } else {
      const timeUntilOpen = openTimeMs - currentTimeMs;
      if (timeUntilOpen > 0) {
        const hoursUntilOpen = Math.floor(timeUntilOpen / (1000 * 60 * 60));
        const minutesUntilOpen = Math.floor((timeUntilOpen % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hoursUntilOpen > 0) {
          setNextChange(`Opens in ${hoursUntilOpen}h ${minutesUntilOpen}m`);
        } else if (minutesUntilOpen > 0) {
          setNextChange(`Opens in ${minutesUntilOpen}m`);
        } else {
          setNextChange('Opening soon');
        }
      } else {
        // Check next day
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDay = tomorrow.getDay();
        const tomorrowHours = getHoursForDay(tomorrowDay);
        if (!tomorrowHours.closed) {
          setNextChange(`Opens tomorrow at ${formatTime(tomorrowHours.open)}`);
        } else {
          setNextChange('Check hours');
        }
      }
    }
  };

  useEffect(() => {
    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [hours]);

  if (compact) {
    return (
      <span className={`location-status-compact ${isOpen ? 'open' : 'closed'}`}>
        <span className="status-dot"></span>
        {currentStatus}
      </span>
    );
  }

  return (
    <div className={`location-status ${isOpen ? 'open' : 'closed'}`}>
      <div className="status-main">
        <span className="status-dot"></span>
        <span className="status-text">{currentStatus}</span>
      </div>
      {showHours && (
        <div className="status-details">
          <div className="status-hours">{todaysHours}</div>
          {nextChange && <div className="status-next">{nextChange}</div>}
        </div>
      )}
    </div>
  );
};

export default LocationStatus;