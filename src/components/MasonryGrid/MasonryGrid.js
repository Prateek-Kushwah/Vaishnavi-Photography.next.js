'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from '../Lightbox/Lightbox';
import styles from './MasonryGrid.module.css';

export default function MasonryGrid({ images }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [columns, setColumns] = useState(4);
  const [columnContents, setColumnContents] = useState([]);

  // Function to calculate the best column count based on viewport width
  const calculateColumns = () => {
    if (typeof window === 'undefined') return 4;
    
    const width = window.innerWidth;
    if (width < 640) return 2;
    if (width < 1024) return 3;
    if (width < 1280) return 4;
    return 5;
  };

  // Distribute images across columns for Pinterest-style layout
  const organizeImagesIntoColumns = () => {
    const newColumns = calculateColumns();
    setColumns(newColumns);
    
    // Initialize empty columns
    const newColumnContents = Array.from({ length: newColumns }, () => []);
    const columnHeights = new Array(newColumns).fill(0);
    
    // Distribute images to the shortest column
    images.forEach((src, index) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      // Add image to shortest column
      newColumnContents[shortestColumnIndex].push({
        src,
        index
      });
      
      // Simulate adding to height (we don't know actual height until loaded)
      // Using a random aspect ratio between 0.8 and 1.5 for estimation
      const aspectRatio = 0.8 + Math.random() * 0.7;
      columnHeights[shortestColumnIndex] += aspectRatio;
    });
    
    setColumnContents(newColumnContents);
  };

  useEffect(() => {
    organizeImagesIntoColumns();
    
    const handleResize = () => {
      organizeImagesIntoColumns();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <div className={styles.masonryGrid} style={{ '--columns': columns }}>
        {columnContents.map((column, columnIndex) => (
          <div key={columnIndex} className={styles.masonryColumn}>
            {column.map(({ src, index }) => (
              <div
                key={index}
                className={styles.masonryItem}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  width={500}
                  height={0} // Let height be determined by aspect ratio
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, (max-width: 1280px) 22vw, 18vw"
                  className={styles.masonryImage}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}