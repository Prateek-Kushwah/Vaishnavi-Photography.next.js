"use client"

import { useState, useEffect, useMemo } from 'react';
import styles from './Hero.module.css';
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const wordsToType = useMemo(() => ["Moment.", "Memory.", "Story."], []);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBeforeNextWord = 2000;

  useEffect(() => {
    let mounted = true;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentWord = wordsToType[wordIndex];
      const speed = isDeleting ? deletingSpeed : typingSpeed;

      // Handle typing or deleting
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      // If word is fully typed, pause then start deleting
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, delayBeforeNextWord);
        return;
      }
      
      // If word is fully deleted, move to the next word
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % wordsToType.length;
      }

      timeoutId = setTimeout(type, speed);
    };

    if (mounted) {
      type();
    }

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);


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
          Capturing Your <span className={styles.highlight}>{typedText}</span><span className={styles.cursor}></span>
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

