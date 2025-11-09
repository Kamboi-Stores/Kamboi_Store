import { Location } from '@/lib/types';
import LocationStatus from './LocationStatus';

type Props = { location: Location };
export default function LocationCard({ location }: Props) {
  const loc = location;
  
  // Debug: Log the location data to see what hours we're getting
  //console.log('LocationCard received location:', loc.name, 'hours:', loc.hours);
  
  return (
    <div className="card">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
        <h3 style={{marginTop:0, marginBottom: '4px', color: 'var(--fg)'}}>{loc.name}</h3>
        <LocationStatus compact={true} hours={loc.hours} />
      </div>
      <LocationStatus showHours={true} hours={loc.hours} />
      <p style={{color: 'var(--fg)', marginTop: '12px'}}>{loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
      {loc.phone && (
        <p style={{color: 'var(--muted)', marginBottom: '12px'}}>📞 {loc.phone}</p>
      )}
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        {loc.phone && (
          <a className="btn" href={`tel:${loc.phone}`}>
            Call
          </a>
        )}
        <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ', ' + loc.city + ', ' + loc.state + ' ' + loc.zip)}`} target="_blank" rel="noreferrer">Directions</a>
        {loc.orderUrl && (
          <a className="btn order-btn" href={loc.orderUrl} target="_blank" rel="noreferrer">
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
  );
}
