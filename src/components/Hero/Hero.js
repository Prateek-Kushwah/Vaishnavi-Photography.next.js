import styles from './Hero.module.css';
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      {/* This is the animated background element */}
      <div className={styles.animatedShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
      </div>

      {/* This is the main content of the hero section */}
      <div className={styles.heroContent}>
        <h1 className={styles.headline}>
          Capturing Your <span className={styles.highlight}>Moments</span>
        </h1>
        <p className={styles.subheadline}>
          Professional photography service that tells your story through beautiful, timeless images.
        </p>
        <button className={styles.ctaButton}>
          <Link href = {"/#contact"} className={styles.link}>
          <span>Get Started</span>
          </Link>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Hero;