import { getLocationBySlug } from '@/lib/sanity.client';
import { Location, LocationHours } from '@/lib/types';

export const revalidate = 60;

export async function generateStaticParams() {
  // Optional: could fetch slugs to prebuild
  return [];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const loc = await getLocationBySlug(params.slug);
  if (!loc) return <div className="card">Location not found.</div>;
  return (
    <div className="grid" style={{gap:16}}>
      <h1 style={{marginTop:0}}>{loc.name}</h1>
      <div className="card">
        <p><strong>Address:</strong> {loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
        <p><strong>Phone:</strong> <a href={`tel:${loc.phone}`}>{loc.phone}</a></p>
        <p><strong>Hours:</strong></p>
        <ul>
          {loc.hours?.map((h: LocationHours, i: number) => (<li key={i}>{h.day}: {h.open}–{h.close}</li>))}
        </ul>
        <div style={{display:'flex',gap:12}}>
          <a className="btn" href={loc.orderUrl} target="_blank" rel="noreferrer">Order via Toast</a>
          <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ', ' + loc.city + ', ' + loc.state + ' ' + loc.zip)}`} target="_blank" rel="noreferrer">Directions</a>
        </div>
      </div>
    </div>
  );
}
