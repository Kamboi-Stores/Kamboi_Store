import CategorySlideshow from '../../components/CategorySlideshow';

export default function MenuPage() {
  return (
    <div className="grid" style={{gap:16}}>
      <h1 style={{marginTop:0, color: 'var(--fg)'}}>Our Products</h1>
      
      {/* Category Slideshow */}
      <CategorySlideshow />
    </div>
  );
}
