import ProductCarousel from '@/components/ProductCarousel';
import { MenuItem } from '@/lib/types';

export default function DemoPage() {
  // Demo data for gas station convenience store items
  const saltyItems: MenuItem[] = [
    {
      name: "Lay's Classic Potato Chips",
      description: "Crispy golden potato chips with the perfect amount of salt",
      price: 2.49,
      isFeatured: true,
      img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Cheetos Flamin' Hot",
      description: "Spicy cheese puffs with a fiery kick",
      price: 2.29,
      img: "https://images.unsplash.com/photo-1613919113640-25732ec5e61e?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Pringles Original",
      description: "Perfectly stacked potato crisps in a convenient can",
      price: 2.99,
      img: "https://images.unsplash.com/photo-1621447504812-3f277eed5bf5?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Doritos Nacho Cheese",
      description: "Bold nacho cheese flavored tortilla chips",
      price: 2.79,
      isFeatured: true,
      img: "https://images.unsplash.com/photo-1613919113640-25732ec5e61e?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Mixed Nuts",
      description: "Premium blend of peanuts, cashews, and almonds",
      price: 4.99,
      dietaryTags: ["Protein", "Gluten-Free"],
      img: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const candyItems: MenuItem[] = [
    {
      name: "Snickers Bar",
      description: "Peanuts, caramel and nougat covered in milk chocolate",
      price: 1.89,
      isFeatured: true,
      img: "https://images.unsplash.com/photo-1549501021-df8563197a6c?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Reese's Peanut Butter Cups",
      description: "Perfect combination of chocolate and peanut butter",
      price: 1.99,
      img: "https://images.unsplash.com/photo-1571197110717-4eb0fa503098?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Skittles Original",
      description: "Taste the rainbow with these fruity chewy candies",
      price: 1.69,
      img: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Kit Kat",
      description: "Crispy wafer bars covered in smooth milk chocolate",
      price: 1.79,
      img: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Sour Patch Kids",
      description: "Sour then sweet gummy candy kids love",
      price: 1.89,
      img: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const grabNGoItems: MenuItem[] = [
    {
      name: "Turkey & Swiss Sandwich",
      description: "Fresh sliced turkey with Swiss cheese on whole wheat",
      price: 5.99,
      isFeatured: true,
      dietaryTags: ["Fresh", "Protein"],
      img: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Chicken Caesar Wrap",
      description: "Grilled chicken, romaine lettuce, parmesan, caesar dressing",
      price: 6.49,
      dietaryTags: ["Fresh", "Protein"],
      img: "https://images.unsplash.com/photo-1565299585323-38174c6ca62c?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Italian Sub",
      description: "Ham, salami, pepperoni with provolone and Italian dressing",
      price: 7.99,
      img: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Greek Salad Bowl",
      description: "Fresh greens, feta cheese, olives, tomatoes, cucumber",
      price: 5.49,
      dietaryTags: ["Fresh", "Vegetarian"],
      img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const burritoItems: MenuItem[] = [
    {
      name: "Breakfast Burrito",
      description: "Scrambled eggs, cheese, potatoes, and sausage in a flour tortilla",
      price: 4.99,
      isFeatured: true,
      dietaryTags: ["Hot", "Breakfast"],
      img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Bean & Rice Burrito",
      description: "Seasoned black beans, Spanish rice, cheese, and salsa",
      price: 4.49,
      dietaryTags: ["Vegetarian", "Hot"],
      img: "https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Chicken & Cheese Burrito",
      description: "Grilled chicken, melted cheese, rice, and peppers",
      price: 6.99,
      dietaryTags: ["Protein", "Hot"],
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const pizzaItems: MenuItem[] = [
    {
      name: "Pepperoni Pizza Slice",
      description: "Classic pepperoni pizza slice, hot and ready",
      price: 3.99,
      isFeatured: true,
      dietaryTags: ["Hot", "Ready Now"],
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Cheese Pizza Slice",
      description: "Fresh mozzarella cheese on our signature sauce",
      price: 3.49,
      dietaryTags: ["Hot", "Vegetarian"],
      img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Supreme Pizza Slice",
      description: "Pepperoni, sausage, peppers, onions, and mushrooms",
      price: 4.99,
      dietaryTags: ["Hot", "Supreme"],
      img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const energyDrinkItems: MenuItem[] = [
    {
      name: "Red Bull Original",
      description: "Wings when you need them most - original energy drink",
      price: 2.99,
      isFeatured: true,
      dietaryTags: ["Energy", "Caffeine"],
      img: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Monster Energy",
      description: "Unleash the beast with this powerful energy drink",
      price: 2.79,
      dietaryTags: ["Energy", "Caffeine"],
      img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "5-Hour Energy",
      description: "Quick energy shot for hours of alertness",
      price: 3.49,
      dietaryTags: ["Energy Shot", "No Sugar"],
      img: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Rockstar Energy",
      description: "Party like a rockstar with this bold energy drink",
      price: 2.89,
      dietaryTags: ["Energy", "Bold Flavor"],
      img: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Bang Energy",
      description: "300mg caffeine and zero calories for ultimate performance",
      price: 2.99,
      dietaryTags: ["Zero Cal", "High Caffeine"],
      img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop&crop=center"
    }
  ];

  return (
    <div className="grid" style={{gap:32, padding: '20px'}}>
      <div>
        <h1 style={{marginTop:0, color: 'var(--fg)'}}>Kamboi Gas Station - Product Demo</h1>
        <p style={{color: 'var(--muted)', fontSize: '18px', margin: '0 0 16px 0'}}>
          See how your product carousels will look with real gas station convenience store items.
        </p>
      </div>

      {/* Salty Items Carousel */}
      <section>
        <ProductCarousel 
          items={saltyItems} 
          title="🥨 Salty Items" 
        />
      </section>

      {/* Candy Carousel */}
      <section>
        <ProductCarousel 
          items={candyItems} 
          title="🍬 Candy" 
        />
      </section>

      {/* Grab N Go Carousel */}
      <section>
        <ProductCarousel 
          items={grabNGoItems} 
          title="🥪 Grab N Go" 
        />
      </section>

      {/* Burrito Carousel */}
      <section>
        <ProductCarousel 
          items={burritoItems} 
          title="🌯 Burrito" 
        />
      </section>

      {/* Pizza Carousel */}
      <section>
        <ProductCarousel 
          items={pizzaItems} 
          title="🍕 Pizza" 
        />
      </section>

      {/* Energy Drinks Carousel */}
      <section>
        <ProductCarousel 
          items={energyDrinkItems} 
          title="⚡ Energy Drinks" 
        />
      </section>

      <div style={{marginTop: '40px', padding: '20px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)'}}>
        <h2 style={{marginTop: 0, color: 'var(--fg)'}}>Demo Features</h2>
        <ul style={{color: 'var(--muted)', lineHeight: '1.6'}}>
          <li><strong>Interactive Carousels:</strong> Swipe or drag to browse products</li>
          <li><strong>Product Cards:</strong> Show images, names, prices, and descriptions</li>
          <li><strong>Featured Items:</strong> Highlighted with special badges</li>
          <li><strong>Dietary Tags:</strong> Quick info like "Protein", "Hot", "Vegetarian"</li>
          <li><strong>Navigation:</strong> Arrow buttons and dot indicators</li>
          <li><strong>Responsive:</strong> Works perfectly on mobile and desktop</li>
          <li><strong>Gas Station Categories:</strong> Organized by convenience store sections</li>
        </ul>
      </div>
    </div>
  );
}