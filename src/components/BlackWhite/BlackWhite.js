// components/BlackWhite/BlackWhite.js
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import styles from './BlackWhite.module.css';

const BlackWhite = () => {
  return (
    <section className={styles.BlackWhite}>
      <div className={styles.blackWhitePhoto}>
        {/* Next.js optimized image with placeholder */}
        <Image
          src="/assets/Preview/Preview 1.jpg"
          alt="Black and white photography preview"
          fill
          className={styles.image}
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9dfKb1o//Z"
        />
        <div className={styles.imageOverlay}></div>
      </div>
      
      <div className={styles.centerContent}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Captured Moments</h2>
          <p className={styles.subtitle}>
            Explore the beauty of monochrome photography through our lens
          </p>
        </div>
        
        <div className={styles.centerButton}>
          <Link href="/gallery" className={styles.btn}>
            <span>View Full Gallery</span>
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>

      {/* Scroll indicator for better UX */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}></div>
      </div>
    </section>
  );
};

export default BlackWhite;