import LocationFinder from '@/components/LocationFinder';
import { getHomepage } from '@/lib/sanity.client';

export const revalidate = 60;

export default async function Page() {
  const homepage = await getHomepage();
  
  // Fallback content if no homepage data exists
  const content = {
    title: homepage?.title || 'Quality • Service • Community',
    subtitle: homepage?.subtitle || '',
    description: homepage?.description || 'Your neighborhood gas station serving fresh food, quality fuel, and everyday essentials.',
    ctaText: homepage?.ctaText || 'FIND YOUR LOCATION',
    ctaLink: homepage?.ctaLink || '/#find-location',
    heroImage: homepage?.heroImage || null,
    locationTitle: homepage?.locationTitle || 'FIND A KAMBOI LOCATION'
  };

  return (
    <>
      <div className="hero-overlay-container">
        {/* Animated Background */}
        <div className="hero-animated-bg"></div>
        <div className="hero-image-overlay" />
        <section className="card hero-card hero-card-overlay">
          <h1 className="hero-title">{content.title}</h1>
          {content.subtitle && (
            <div className="hero-subtitle">{content.subtitle}</div>
          )}
          <p className="hero-tagline">{content.description}</p>
          <div className="hero-cta">
            <a className="btn" href={content.ctaLink}>{content.ctaText}</a>
          </div>
        </section>
      </div>
      <div style={{marginTop:'32px'}}>
        <section className="card" id="find-location">
          <h2 style={{marginTop:0, color: 'var(--fg)'}}>{content.locationTitle}</h2>
          <LocationFinder />
        </section>
      </div>
    </>
  );
}
