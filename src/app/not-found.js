// app/not-found.js
import Link from 'next/link';
import Header from '@/components/Header/Header';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className={styles.notFoundContainer}>
        <div className={styles.floatingShapes}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
          <div className={styles.shape3}></div>
          <div className={styles.shape4}></div>
          <div className={styles.shape5}></div>
        </div>
        
        <div className={styles.errorContent}>
          <div className={styles.errorNumber}>
            <span className={styles.digit}>4</span>
            <div className={styles.floatingOrbit}>
              <div className={styles.orbitingZero}>0</div>
            </div>
            <span className={styles.digit}>4</span>
          </div>
          
          <h1 className={styles.errorTitle}>Lost in Space</h1>
          <p className={styles.errorDescription}>
            The page you&apos;re looking for has drifted into the cosmic void. 
            Don&apos;t worry, even the best explorers get lost sometimes.
          </p>
          
          <div className={styles.errorActions}>
            <Link href="/" className={styles.homeButton}>
              <span className={styles.buttonText}>Return to Earth</span>
              <div className={styles.buttonGlow}></div>
            </Link>
            <Link href="/" className={styles.exploreButton}>
              Explore Galaxy
            </Link>
          </div>
        </div>
        
        <div className={styles.cosmicDust}></div>
      </div>
    </>
  );
}