'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MenuItem } from '@/lib/types';

interface ProductCarouselProps {
  items: MenuItem[];
  title?: string;
}

export default function ProductCarousel({ items, title }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const itemWidth = 280; // Width of each product card + gap
  const visibleItems = Math.floor((carouselRef.current?.offsetWidth || 0) / itemWidth) || 1;

  // Check scroll position to enable/disable buttons
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      return () => carousel.removeEventListener('scroll', checkScrollPosition);
    }
  }, [items]);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const scrollPosition = index * itemWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - visibleItems);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const maxIndex = Math.max(0, items.length - visibleItems);
    const newIndex = Math.min(maxIndex, currentIndex + visibleItems);
    scrollToIndex(newIndex);
  };

  // Mouse drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollPosition(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollPosition - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollPosition(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollPosition - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="product-carousel">
      {title && <h2 className="carousel-title">{title}</h2>}
      
      <div className="carousel-container">
        {/* Left Arrow */}
        <button 
          className={`carousel-btn carousel-btn-left ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label="Previous products"
        >
          &#8249;
        </button>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="carousel-track"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => (
            <div key={index} className="product-card">
              {item.img && (
                <div className="product-image-container">
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="product-image"
                    draggable={false}
                  />
                  {item.isFeatured && (
                    <div className="featured-badge">Featured</div>
                  )}
                </div>
              )}
              
              <div className="product-info">
                <div className="product-header">
                  <h3 className="product-name">{item.name}</h3>
                  <span className="product-price">${Number(item.price).toFixed(2)}</span>
                </div>
                
                {item.description && (
                  <p className="product-description">{item.description}</p>
                )}
                
                {item.dietaryTags && item.dietaryTags.length > 0 && (
                  <div className="dietary-tags">
                    {item.dietaryTags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="dietary-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          className={`carousel-btn carousel-btn-right ${!canScrollRight ? 'disabled' : ''}`}
          onClick={scrollRight}
          disabled={!canScrollRight}
          aria-label="Next products"
        >
          &#8250;
        </button>
      </div>

      {/* Dots indicator */}
      <div className="carousel-dots">
        {Array.from({ length: Math.ceil(items.length / visibleItems) }, (_, index) => (
          <button
            key={index}
            className={`carousel-dot ${Math.floor(currentIndex / visibleItems) === index ? 'active' : ''}`}
            onClick={() => scrollToIndex(index * visibleItems)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}