"use client"
// components/WhyChooseUs/WhyChooseUs.js
import { useState, useEffect } from 'react';
import { 
  Camera, 
  Award, 
  Heart, 
  Clock,
  Users,
  Sparkles
} from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: <Camera size={32} />,
      title: "Professional Equipment",
      description: "We use state-of-the-art photography equipment to ensure the highest quality images with perfect lighting and composition."
    },
    {
      icon: <Award size={32} />,
      title: "Award-Winning Quality",
      description: "Our work has been recognized with multiple awards in portrait and wedding photography competitions."
    },
    {
      icon: <Heart size={32} />,
      title: "Passionate Artists",
      description: "We don't just take pictures - we create art. Our team is passionate about capturing your unique story."
    },
    {
      icon: <Clock size={32} />,
      title: "Quick Turnaround",
      description: "Receive your professionally edited photos within 2 weeks of your session, faster than industry standards."
    },
    {
      icon: <Users size={32} />,
      title: "Personalized Service",
      description: "We work closely with you to understand your vision and create photos that reflect your personality and style."
    },
    {
      icon: <Sparkles size={32} />,
      title: "Creative Editing",
      description: "Our post-processing enhances your photos while maintaining natural beauty, with attention to every detail."
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className={styles.whyChooseUs} id="why-choose-us">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose Us</h2>
          <p className={styles.subtitle}>
            Discover what sets Vaishnavi Photography apart from the rest
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${styles.featureCard} ${
                  index === activeFeature ? styles.active : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={styles.iconWrapper}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.visualSection}>
            <div className={styles.rotatingVisual}>
              <div className={styles.visualContent}>
                <div className={styles.circleBorder}>
                  <div className={styles.innerCircle}>
                    <div className={styles.iconHighlight}>
                      {features[activeFeature].icon}
                    </div>
                    <h4 className={styles.activeTitle}>
                      {features[activeFeature].title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>500+</h3>
            <p className={styles.statLabel}>Happy Clients</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>10+</h3>
            <p className={styles.statLabel}>Years Experience</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>92%</h3>
            <p className={styles.statLabel}>Satisfaction Rate</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>8.7</h3>
            <p className={styles.statLabel}>Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;