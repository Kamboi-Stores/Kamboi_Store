import { getMenu } from '@/lib/sanity.client';
import { MenuCategory, MenuItem } from '@/lib/types';

export const revalidate = 60;

export default async function Page() {
  const categories = await getMenu();
  return (
    <div className="grid" style={{gap:16}}>
      <h1 style={{marginTop:0, color: 'var(--fg)'}}>Our Products</h1>
      <p style={{color: 'var(--muted)', fontSize: '18px', margin: '0 0 24px 0'}}>
        From fresh food and beverages to everyday essentials, we've got what you need.
      </p>
      {categories.map((cat: MenuCategory) => (
        <section className="card" key={cat.slug}>
          <h2 style={{marginTop:0, color: 'var(--fg)'}}>{cat.name}</h2>
          <div className="grid cols-2">
            {cat.items.map((it: MenuItem, idx: number) => (
              <div className="card" key={idx}>
                {it.img && (
                  <img 
                    src={it.img} 
                    alt={it.name}
                    className="menu-item-image"
                  />
                )}
                <div style={{display:'flex',justifyContent:'space-between',gap:8}}>
                  <strong style={{color: 'var(--fg)'}}>{it.name}</strong>
                  <span style={{color: 'var(--fg)'}}>${Number(it.price).toFixed(2)}</span>
                </div>
                <p style={{color:'var(--muted)'}}>{it.description}</p>
                {it.dietaryTags?.length ? <p style={{fontSize:12,color:'var(--muted)'}}>{it.dietaryTags.join(' • ')}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
