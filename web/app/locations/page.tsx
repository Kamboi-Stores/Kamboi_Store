import { getActiveLocations } from '@/lib/sanity.client';
import LocationCard from '@/components/LocationCard';
import { Location } from '@/lib/types';

export const revalidate = 60;

export default async function Page() {
  const locations = await getActiveLocations();
  return (
    <div className="grid" style={{gap:16}}>
      <h1 style={{marginTop:0, color: 'var(--fg)'}}>Locations</h1>
      <div className="grid cols-2">
        {locations.map((loc: Location) => <LocationCard key={loc.slug} location={loc} />)}
      </div>
    </div>
  );
}
