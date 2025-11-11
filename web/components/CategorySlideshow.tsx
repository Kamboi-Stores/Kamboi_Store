'use client';

import React, { useState, useEffect } from 'react';

interface CategoryItem {
  name: string;
  image: string;
  description: string;
  icon: string;
  href: string;
  images?: string[];
}

interface CategorySlideshowProps {
  title?: string;
}

export default function CategorySlideshow({ title }: CategorySlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [categoryImageIndexes, setCategoryImageIndexes] = useState<{ [key: number]: number }>({});

  // Gas station categories with high-quality images
  const categories: CategoryItem[] = [
    {
      name: "Salty Items",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=1200&h=600&fit=crop&crop=center",
      description: "Chips, crackers, nuts and savory snacks",
      icon: "🥨",
      href: "/menu#salty"
    },
    {
      name: "Candy",
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200&h=600&fit=crop&crop=center",
      description: "Chocolate, gum, mints and sweet treats",
      icon: "🍬", 
      href: "/menu#candy"
    },
    {
      name: "Grab N Go",
      image: "/grabngo.jpg",
      description: "Fresh sandwiches, wraps and ready meals",
      icon: "🥪",
      href: "/menu#grabngo"
    },
    {
      name: "Burrito",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=1200&h=600&fit=crop&crop=center",
      description: "Hot breakfast and lunch burritos",
      icon: "🌯",
      href: "/menu#burrito"
    },
    {
      name: "Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=600&fit=crop&crop=center",
      description: "Hot pizza slices ready to eat",
      icon: "🍕",
      href: "/menu#pizza"
    },
    {
      name: "Energy Drinks",
      image: "/redbull.jpg",
      description: "Red Bull, Monster and energy beverages",
      icon: "⚡",
      href: "/menu#energy",
      images: [
        "/redbull.jpg",
        "/c4.jpg",
        "/monster.jpg"
      ]
    }
  ];

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % categories.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, categories.length]);

  // Auto-rotate images within the current active category every 3 seconds
  useEffect(() => {
    const currentCategory = categories[currentSlide];
    console.log(`Active slide: ${currentSlide}, Category: ${currentCategory.name}, Has images: ${!!currentCategory.images}, Image count: ${currentCategory.images?.length || 0}`);
    
    if (!currentCategory.images || currentCategory.images.length <= 1) return;

    // Initialize the index if it doesn't exist
    setCategoryImageIndexes(prev => {
      if (!(currentSlide in prev)) {
        console.log(`Initializing image index for slide ${currentSlide}`);
        return { ...prev, [currentSlide]: 0 };
      }
      return prev;
    });

    console.log(`Setting up image rotation interval for slide ${currentSlide}`);
    const interval = setInterval(() => {
      setCategoryImageIndexes(prev => {
        const newIndex = ((prev[currentSlide] || 0) + 1) % currentCategory.images!.length;
        console.log(`Rotating image for slide ${currentSlide}: ${prev[currentSlide] || 0} -> ${newIndex}`);
        return {
          ...prev,
          [currentSlide]: newIndex
        };
      });
    }, 3000);
    
    return () => {
      console.log(`Clearing interval for slide ${currentSlide}`);
      clearInterval(interval);
    };
  }, [currentSlide, categories]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % categories.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + categories.length) % categories.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="category-slideshow">
      <div className="slideshow-container">
        {/* Slides */}
        <div className="slides-wrapper">
        {categories.map((category, index) => {
          // Determine which image to show for this specific category
          let currentImage = category.image;
          
          // Only use rotating images for the currently active slide
          if (index === currentSlide && category.images && category.images.length > 0) {
            const imageIndex = categoryImageIndexes[index] || 0;
            currentImage = category.images[imageIndex];
          }

          return (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <a href={category.href} className="slide-link">
                <div className="slide-image-container">
                  <img
                    src={currentImage}
                    alt={category.name}
                    className="slide-image"
                    style={{ transition: 'opacity 0.8s ease-in-out' }}
                  />
                  <div className="slide-overlay" />
                </div>                <div className="slide-content">
                  <div className="slide-icon">{category.icon}</div>
                  <h3 className="slide-title">{category.name}</h3>
                  <p className="slide-description">{category.description}</p>
                  {/* Debug indicator for multi-image categories */}
                  {index === currentSlide && category.images && category.images.length > 1 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {((categoryImageIndexes[index] || 0) + 1)}/{category.images.length}
                    </div>
                  )}
                </div>
              </a>
            </div>
          );
        })}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="slideshow-btn slideshow-btn-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <span>‹</span>
        </button>
        
        <button 
          className="slideshow-btn slideshow-btn-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <span>›</span>
        </button>

        {/* Dots Indicator */}
        <div className="slideshow-dots">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`slideshow-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="autoplay-indicator">
          <div 
            className={`autoplay-progress ${isAutoPlaying ? 'active' : ''}`}
            style={{
              animationDuration: '4s',
              animationDelay: isAutoPlaying ? '0s' : '999s'
            }}
          />
        </div>
      </div>
    </div>
  );
}