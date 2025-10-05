"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Eye, Calendar, MapPin, ArrowRight } from 'lucide-react';
import styles from './OurShoots.module.css';
import Link from "next/link"
import clients from '@/data/clients.json'

const OurShoots = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Shoots' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'event', name: 'Events' }
  ];

  const filteredShoots = activeCategory === 'all'
    ? clients
    : clients.filter(clients => clients.category === activeCategory);

  return (
    <section className={styles.ourShoots} id="our-clients">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Shoots</h2>
          <p className={styles.subtitle}>
            Explore our diverse portfolio of photography work
          </p>
        </div>

        <div className={styles.categoryFilter}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''
                }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.galleryGrid}>
          {filteredShoots.map(clients => (
            <div key={clients.id} className={styles.galleryItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={clients.image}
                  alt={clients.title}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <h3 className={styles.shootTitle}>{clients.title}</h3>
                    <div className={styles.shootMeta}>
                      <div className={styles.metaItem}>
                        <Calendar size={16} />
                        <span>{clients.date}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <MapPin size={16} />
                        <span>{clients.location}</span>
                      </div>
                    </div>
                    <Link href={clients.page}>
                      <button className={styles.viewButton}>
                        View Project
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <a href="/gallery" className={styles.ctaButton}>
            View full Gallery
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurShoots;