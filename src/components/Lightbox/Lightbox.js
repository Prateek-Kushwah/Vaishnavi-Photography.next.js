'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';

export default function Lightbox({ images, currentIndex, isOpen, onClose }) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, index]);

  if (!isOpen) return null;

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const selectImage = (idx) => {
    setIndex(idx);
  };

  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose}>
        ×
      </button>
      
      <button 
        className={styles.lightboxNavPrev} 
        onClick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
      >
        ‹
      </button>
      
      <button 
        className={styles.lightboxNavNext} 
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
      >
        ›
      </button>
      
      <div className={styles.lightboxCounter}>
        {index + 1} / {images.length}
      </div>
      
      <div 
        className={styles.lightboxContent} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.lightboxImageContainer}>
          <Image
            src={images[index].src}
            alt={`Image ${index + 1}`}
            fill
            style={{ objectFit: 'contain' }}
            sizes="100vw"
            quality={90}
            priority
          />
        </div>
      </div>
      
      <div className={styles.lightboxThumbnails}>
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`${styles.lightboxThumbnail} ${idx === index ? styles.lightboxThumbnailActive : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              selectImage(idx);
            }}
          >
            <Image
              src={image.src}
              alt={`Thumbnail ${idx + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="60px"
              quality={60}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 