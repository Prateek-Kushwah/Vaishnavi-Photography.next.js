"use client"
// components/GalleryPreview/GalleryPreview.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './GalleryPreview.module.css';

const GalleryPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sample gallery images (replace with your actual images)
  const galleryImages = [
    {
      id: 1,
      src: "/assets/Preview/Preview 1.jpg",
      alt: "Wedding Photography",
      title: "Wedding Photography",
      description: "Capturing your special day with elegance and emotion"
    },
    {
      id: 2,
      src: "/assets/Preview/Preview 2.jpg",
      alt: "Portrait Photography",
      title: "Portrait Sessions",
      description: "Beautiful portraits that tell your unique story"
    },
    {
      id: 3,
      src: "/assets/Preview/Preview 3.jpg",
      alt: "Nature Photography",
      title: "Nature & Landscape",
      description: "Stunning landscapes and natural beauty"
    },
    {
      id: 4,
      src: "/assets/Preview/Preview 4.jpg",
      alt: "Event Photography",
      title: "Event Coverage",
      description: "Professional coverage for all your special events"
    }
  ];

  // Auto-advance the gallery every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <section className={styles.galleryPreview}>
      <div className={styles.container}>
        <h2 className={styles.title}>Our Gallery</h2>
        <p className={styles.subtitle}>Explore our diverse photography portfolio</p>
        
        <div className={styles.galleryContainer}>
          <div className={styles.imageSlider}>
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`${styles.slide} ${
                  index === currentIndex ? styles.active : ''
                }`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={styles.image}
                  />
                  <div className={styles.overlay}></div>
                </div>
                
                <div className={styles.caption}>
                  <h3 className={styles.imageTitle}>{image.title}</h3>
                  <p className={styles.imageDescription}>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.indicators}>
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === currentIndex ? styles.active : ''
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className={styles.ctaContainer}>
          <a href="/gallery" className={styles.ctaButton}>
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;