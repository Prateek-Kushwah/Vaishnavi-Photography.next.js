// app/gallery/page.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "./page.module.css"

// Sample image data
const galleryData = {
  wedding: [
    { id: 1, src: '/images/wedding-1.jpg', width: 800, height: 1200, alt: 'Elegant wedding ceremony' },
    { id: 2, src: '/images/wedding-2.jpg', width: 800, height: 533, alt: 'Bride and groom portrait' },
    { id: 3, src: '/images/wedding-3.jpg', width: 800, height: 1200, alt: 'Wedding ring closeup' },
    { id: 4, src: '/images/wedding-4.jpg', width: 800, height: 533, alt: 'Reception celebration' },
    { id: 5, src: '/images/wedding-5.jpg', width: 800, height: 1200, alt: 'First dance moment' },
    { id: 6, src: '/images/wedding-6.jpg', width: 800, height: 533, alt: 'Bridal party' },
  ],
  event: [
    { id: 1, src: '/images/event-1.jpg', width: 800, height: 533, alt: 'Corporate event' },
    { id: 2, src: '/images/event-2.jpg', width: 800, height: 1200, alt: 'Conference speaker' },
    { id: 3, src: '/images/event-3.jpg', width: 800, height: 533, alt: 'Birthday celebration' },
    { id: 4, src: '/images/event-4.jpg', width: 800, height: 1200, alt: 'Concert atmosphere' },
    { id: 5, src: '/images/event-5.jpg', width: 800, height: 533, alt: 'Festival moments' },
  ],
  portrait: [
    { id: 1, src: '/images/portrait-1.jpg', width: 800, height: 1200, alt: 'Couple portrait' },
    { id: 2, src: '/images/portrait-2.jpg', width: 800, height: 533, alt: 'Engagement session' },
    { id: 3, src: '/images/portrait-3.jpg', width: 800, height: 1200, alt: 'Romantic couple' },
    { id: 4, src: '/images/portrait-4.jpg', width: 800, height: 533, alt: 'Sunset portraits' },
  ],
  preWedding: [
    { id: 1, src: '/images/prewedding-1.jpg', width: 800, height: 1200, alt: 'Urban pre-wedding' },
    { id: 2, src: '/images/prewedding-2.jpg', width: 800, height: 533, alt: 'Natural light portrait' },
    { id: 3, src: '/images/prewedding-3.jpg', width: 800, height: 1200, alt: 'Beach pre-wedding' },
    { id: 4, src: '/images/prewedding-4.jpg', width: 800, height: 533, alt: 'Mountain pre-wedding' },
  ],
  commercial: [
    { id: 1, src: '/images/commercial-1.jpg', width: 800, height: 533, alt: 'Product photography' },
    { id: 2, src: '/images/commercial-2.jpg', width: 800, height: 1200, alt: 'Fashion shoot' },
    { id: 3, src: '/images/commercial-3.jpg', width: 800, height: 533, alt: 'Brand campaign' },
    { id: 4, src: '/images/commercial-4.jpg', width: 800, height: 1200, alt: 'Architecture photography' },
  ]
};

// Shimmer effect for image loading
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

// Floating shape components for decorative elements
const FloatingShape = ({ type, position }) => {
  const getColor = () => {
    const colors = ['var(--shape-purple)', 'var(--shape-blue)', 'var(--shape-pink)', 'var(--shape-green)'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div 
      className={styles.floatingShape}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
        width: type === 'triangle' ? 0 : `${Math.random() * 40 + 20}px`,
        height: type === 'triangle' ? 0 : `${Math.random() * 40 + 20}px`,
        backgroundColor: type !== 'triangle' ? getColor() : 'transparent',
        borderWidth: type === 'triangle' ? '0 20px 40px 20px' : 0,
        borderStyle: type === 'triangle' ? 'solid' : 'none',
        borderColor: type === 'triangle' ? `transparent transparent ${getColor()} transparent` : 'none',
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${Math.random() * 10 + 15}s`,
        borderRadius: type === 'circle' ? '50%' : type === 'square' ? '8px' : '0'
      }}
    />
  );
};

// Masonry Grid Component
const MasonryGrid = ({ images }) => {
  return (
    <div className={styles.masonryGrid}>
      {images.map((image) => (
        <div key={image.id} className={styles.masonryItem}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(image.width, image.height))}`}
            className={styles.galleryImage}
          />
          <div className={styles.imageOverlay}>
            <p className={styles.imageCaption}>{image.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Category Button Component
const CategoryButton = ({ active, onClick, children }) => {
  return (
    <button
      className={`${styles.categoryBtn} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <span className={styles.btnText}>{children}</span>
    </button>
  );
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('wedding');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}>
          <div className={styles.loaderCircle}></div>
          <p className={styles.loaderText}>Loading your visual journey...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className={styles.galleryPage}>
        {/* Decorative floating shapes */}
        <FloatingShape type="circle" position={{ top: '20%', left: '10%' }} />
        <FloatingShape type="square" position={{ top: '40%', right: '20%' }} />
        <FloatingShape type="triangle" position={{ bottom: '40%', left: '20%' }} />
        <FloatingShape type="circle" position={{ bottom: '20%', right: '10%' }} />
        
        {/* Hero Section */}
        <section className={styles.galleryHero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Capturing <span className={styles.textGradient}>Life&apos;s Moments</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Through the lens of creativity and passion, we transform moments into timeless memories
            </p>
            <div className={styles.heroScrollIndicator}>
              <div className={styles.scrollLine}></div>
              <span>Scroll to explore</span>
            </div>
          </div>
        </section>

        {/* Categories Navigation */}
        <section className={styles.galleryCategories}>
          <div className={styles.categoriesContainer}>
            <h2 className={styles.categoriesTitle}>Our Photography Services</h2>
            <div className={styles.categoryButtonsContainer}>
              <CategoryButton 
                active={activeCategory === 'wedding'} 
                onClick={() => setActiveCategory('wedding')}
              >
                Wedding Photography
              </CategoryButton>
              <CategoryButton 
                active={activeCategory === 'event'} 
                onClick={() => setActiveCategory('event')}
              >
                Event Photography
              </CategoryButton>
              <CategoryButton 
                active={activeCategory === 'portrait'} 
                onClick={() => setActiveCategory('portrait')}
              >
                Portrait Photography
              </CategoryButton>
              <CategoryButton 
                active={activeCategory === 'preWedding'} 
                onClick={() => setActiveCategory('preWedding')}
              >
                Pre-Wedding Photography
              </CategoryButton>
              <CategoryButton 
                active={activeCategory === 'commercial'} 
                onClick={() => setActiveCategory('commercial')}
              >
                Commercial Photography
              </CategoryButton>
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className={styles.galleryContent}>
          {activeCategory === 'wedding' && (
            <div className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>Wedding Photography</h2>
                <p className={styles.categoryDescription}>
                  Capturing the magic and emotion of your special day with timeless elegance. 
                  Every glance, smile, and tear preserved forever.
                </p>
              </div>
              <MasonryGrid images={galleryData.wedding} />
            </div>
          )}
          
          {activeCategory === 'event' && (
            <div className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>Event Photography</h2>
                <p className={styles.categoryDescription}>
                  Documenting your special events with creativity and precision. 
                  From corporate gatherings to intimate celebrations.
                </p>
              </div>
              <MasonryGrid images={galleryData.event} />
            </div>
          )}
          
          {activeCategory === 'portrait' && (
            <div className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>Portrait Photography</h2>
                <p className={styles.categoryDescription}>
                  Beautiful individual and group portraits that capture personality 
                  and emotion in every frame.
                </p>
              </div>
              <MasonryGrid images={galleryData.portrait} />
            </div>
          )}
          
          {activeCategory === 'preWedding' && (
            <div className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>Pre-Wedding Photography</h2>
                <p className={styles.categoryDescription}>
                  Romantic and artistic portraits that capture your love story. 
                  Create beautiful memories before the big day.
                </p>
              </div>
              <MasonryGrid images={galleryData.preWedding} />
            </div>
          )}
          
          {activeCategory === 'commercial' && (
            <div className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>Commercial Photography</h2>
                <p className={styles.categoryDescription}>
                  Professional photography for businesses and brands. 
                  Product shots, advertising imagery, and corporate branding.
                </p>
              </div>
              <MasonryGrid images={galleryData.commercial} />
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Ready to create beautiful memories together?</h2>
            <p className={styles.ctaText}>Let's discuss your photography needs and create something extraordinary</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={`${styles.ctaBtn} ${styles.primary}`}>
                Book a Session
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
              <Link href="/portfolio" className={`${styles.ctaBtn} ${styles.secondary}`}>
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}