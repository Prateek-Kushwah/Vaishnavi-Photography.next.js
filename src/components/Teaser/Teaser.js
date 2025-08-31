"use client"
// components/Teaser/Teaser.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, Calendar, Star, ArrowRight, Sparkles } from 'lucide-react';
import styles from './Teaser.module.css';

const Teaser = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date for the teaser (7 days from now)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);
      
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Animation trigger
    const timer2 = setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      clearInterval(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className={styles.teaser}>
      <div className={styles.backgroundEffect}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <Sparkles size={16} />
              <span>Limited Time Offer</span>
            </div>
            
            <h2 className={styles.title}>
              Spring Photography
              <span className={styles.highlight}> Sessions</span>
              <br />Opening Soon
            </h2>
            
            <p className={styles.description}>
              Book your exclusive spring photoshoot package before April 30th and receive 
              a complimentary 16x12 premium print and digital album. Limited slots available 
              for our golden hour sessions.
            </p>

            <div className={styles.countdown}>
              <h3 className={styles.countdownTitle}>Offer ends in:</h3>
              <div className={styles.timer}>
                <div className={styles.timeUnit}>
                  <span className={styles.timeValue}>{timeLeft.days}</span>
                  <span className={styles.timeLabel}>Days</span>
                </div>
                <div className={styles.timeUnit}>
                  <span className={styles.timeValue}>{timeLeft.hours}</span>
                  <span className={styles.timeLabel}>Hours</span>
                </div>
                <div className={styles.timeUnit}>
                  <span className={styles.timeValue}>{timeLeft.minutes}</span>
                  <span className={styles.timeLabel}>Minutes</span>
                </div>
                <div className={styles.timeUnit}>
                  <span className={styles.timeValue}>{timeLeft.seconds}</span>
                  <span className={styles.timeLabel}>Seconds</span>
                </div>
              </div>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <Calendar size={20} />
                <span>Limited Spring Availability</span>
              </div>
              <div className={styles.feature}>
                <Star size={20} />
                <span>Complimentary Premium Print</span>
              </div>
              <div className={styles.feature}>
                <Clock size={20} />
                <span>Golden Hour Priority Booking</span>
              </div>
            </div>

            <div className={styles.ctaContainer}>
              <button className={styles.ctaButton}>
                <span>Get Early Access</span>
                <ArrowRight size={20} />
              </button>
              <p className={styles.ctaNote}>Only 15 spots available</p>
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <Image
                src="/teaser/spring-session.jpg"
                alt="Spring Photography Session"
                fill
                className={styles.image}
              />
              <div className={styles.imageOverlay}></div>
              
              <div className={styles.floatingElement1}></div>
              <div className={styles.floatingElement2}></div>
              <div className={styles.floatingElement3}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teaser;