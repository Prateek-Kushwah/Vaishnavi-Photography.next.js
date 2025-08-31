"use client"
// components/OurShoots/OurShoots.js
import { useState } from 'react';
import Image from 'next/image';
import { Eye, Calendar, MapPin, ArrowRight } from 'lucide-react';
import styles from './OurShoots.module.css';

const OurShoots = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Shoots' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'event', name: 'Events' },
    { id: 'nature', name: 'Nature' }
  ];

  const shoots = [
    {
      id: 1,
      title: "Sunset Wedding",
      category: "wedding",
      image: "/shoots/wedding-1.jpg",
      date: "June 12, 2023",
      location: "Mumbai",
      views: "1.2k"
    },
    {
      id: 2,
      title: "Urban Portrait",
      category: "portrait",
      image: "/shoots/portrait-1.jpg",
      date: "July 3, 2023",
      location: "Delhi",
      views: "2.1k"
    },
    {
      id: 3,
      title: "Corporate Event",
      category: "event",
      image: "/shoots/event-1.jpg",
      date: "August 15, 2023",
      location: "Bangalore",
      views: "0.8k"
    },
    {
      id: 4,
      title: "Mountain Landscape",
      category: "nature",
      image: "/shoots/nature-1.jpg",
      date: "September 5, 2023",
      location: "Himachal",
      views: "3.4k"
    },
    {
      id: 5,
      title: "Beach Wedding",
      category: "wedding",
      image: "/shoots/wedding-2.jpg",
      date: "October 18, 2023",
      location: "Goa",
      views: "1.7k"
    },
    {
      id: 6,
      title: "Studio Portrait",
      category: "portrait",
      image: "/shoots/portrait-2.jpg",
      date: "November 2, 2023",
      location: "Chennai",
      views: "1.5k"
    },
    {
      id: 7,
      title: "Birthday Celebration",
      category: "event",
      image: "/shoots/event-2.jpg",
      date: "December 10, 2023",
      location: "Hyderabad",
      views: "0.9k"
    },
    {
      id: 8,
      title: "Wildlife Photography",
      category: "nature",
      image: "/shoots/nature-2.jpg",
      date: "January 15, 2024",
      location: "Ranthambore",
      views: "2.8k"
    }
  ];

  const filteredShoots = activeCategory === 'all' 
    ? shoots 
    : shoots.filter(shoot => shoot.category === activeCategory);

  return (
    <section className={styles.ourShoots} id="our-shoots">
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
              className={`${styles.categoryButton} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.galleryGrid}>
          {filteredShoots.map(shoot => (
            <div key={shoot.id} className={styles.galleryItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={shoot.image}
                  alt={shoot.title}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <h3 className={styles.shootTitle}>{shoot.title}</h3>
                    <div className={styles.shootMeta}>
                      <div className={styles.metaItem}>
                        <Calendar size={16} />
                        <span>{shoot.date}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <MapPin size={16} />
                        <span>{shoot.location}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Eye size={16} />
                        <span>{shoot.views}</span>
                      </div>
                    </div>
                    <button className={styles.viewButton}>
                      View Project
                      <ArrowRight size={16} />
                    </button>
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