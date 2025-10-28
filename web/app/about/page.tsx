import { getPage } from '@/lib/sanity.client';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

export default async function Page() {
  const page = await getPage('about');
  
  if (!page) {
    return (
      <div className="card">
        <h1 style={{marginTop:0, color: 'var(--fg)'}}>About Us</h1>
        <p style={{color: 'var(--fg)'}}>This page hasn't been created in Sanity yet. Please create a page with slug "about" in your Sanity Studio.</p>
      </div>
    );
  }

  return (
    <div className="grid" style={{gap:16}}>
      {page.heroImage && (
        <img 
          src={page.heroImage} 
          alt={page.title}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '16px'
          }}
        />
      )}
      <div className="card">
        <h1 style={{marginTop:0, color: 'var(--fg)'}}>{page.title}</h1>
        {page.body && (
          <div style={{lineHeight: 1.6, color: 'var(--fg)'}}>
            <PortableText value={page.body} />
          </div>
        )}
      </div>
    </div>
  );
}
