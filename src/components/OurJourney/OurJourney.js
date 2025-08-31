"use client"
// components/OurJourney/OurJourney.js
import { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Award, Camera, Heart } from 'lucide-react';
import styles from './OurJourney.module.css';

const OurJourney = () => {
  const [activePeriod, setActivePeriod] = useState('all');

  const journeyData = useMemo(() => [
    {
      year: 2015,
      title: "The Beginning",
      description: "My photography journey began with a simple DSLR camera and an insatiable passion for capturing life's beautiful moments. Those early days were filled with experimentation, learning the fundamentals of composition and lighting, and discovering my unique artistic voice through the lens.",
      location: "Mumbai",
      milestone: "First Camera",
      category: "beginning"
    },
    {
      year: 2017,
      title: "First Studio",
      description: "After two years of honing my skills, I took the leap and opened a small studio space. This marked my transition from enthusiast to professional, offering portrait sessions that focused on capturing the authentic essence of each client in a controlled environment.",
      location: "Delhi",
      milestone: "Studio Launch",
      category: "growth"
    },
    {
      year: 2018,
      title: "Award Recognition",
      description: "Receiving the 'Emerging Photographer of the Year' award was a defining moment that validated my artistic vision and technical skills. This recognition opened doors to new opportunities and established my reputation in the professional photography community.",
      location: "Bangalore",
      milestone: "First Award",
      category: "achievement"
    },
    {
      year: 2019,
      title: "Destination Weddings",
      description: "Expanding into destination wedding photography allowed me to combine my love for travel with my passion for storytelling. I began capturing love stories against the breathtaking backdrops of India's most beautiful locations, from Goa's beaches to Rajasthan's palaces.",
      location: "Goa",
      milestone: "Destination Work",
      category: "expansion"
    },
    {
      year: 2020,
      title: "Online Gallery",
      description: "The pandemic accelerated our digital transformation with the launch of a comprehensive client portal system. This innovation streamlined the photo selection process and enabled seamless digital delivery, making our services more accessible to clients nationwide.",
      location: "Online",
      milestone: "Digital Transformation",
      category: "innovation"
    },
    {
      year: 2022,
      title: "Team Expansion",
      description: "To meet growing demand, I welcomed two talented associate photographers to our team. This expansion allowed us to maintain our signature quality while serving more clients and exploring new creative directions through collaborative projects.",
      location: "Chennai",
      milestone: "Team Growth",
      category: "growth"
    },
    {
      year: 2023,
      title: "500+ Clients",
      description: "Reaching the milestone of serving over 500 clients was a testament to our consistent quality and personalized approach. Each client's story has contributed to our growth and reinforced our commitment to capturing memories that last a lifetime.",
      location: "Pan-India",
      milestone: "Client Milestone",
      category: "achievement"
    },
    {
      year: 2024,
      title: "New Studio Launch",
      description: "Our new state-of-the-art studio represents the culmination of nine years of dedication to our craft. With advanced equipment and versatile shooting spaces, we're now better equipped than ever to bring our clients' visions to life with creativity and technical excellence.",
      location: "Hyderabad",
      milestone: "Studio Upgrade",
      category: "expansion"
    }
  ], []);

  const filteredJourney = useMemo(() => 
    activePeriod === 'all' 
      ? journeyData 
      : journeyData.filter(item => item.category === activePeriod)
  , [activePeriod, journeyData]);

  const categories = useMemo(() => [
    { id: 'all', name: 'All', icon: <Heart size={16} /> },
    { id: 'beginning', name: 'Beginnings', icon: <Camera size={16} /> },
    { id: 'growth', name: 'Growth', icon: <Users size={16} /> },
    { id: 'achievement', name: 'Achievements', icon: <Award size={16} /> },
    { id: 'expansion', name: 'Expansion', icon: <MapPin size={16} /> },
    { id: 'innovation', name: 'Innovation', icon: <Calendar size={16} /> }
  ], []);

  return (
    <section className={styles.ourJourney} id="our-journey">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Journey</h2>
          <p className={styles.subtitle}>
            A story of passion, growth, and beautiful moments captured through the years
          </p>
        </div>

        <div className={styles.categoryFilter}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                activePeriod === category.id ? styles.active : ''
              }`}
              onClick={() => setActivePeriod(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          
          {filteredJourney.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.timelineItem} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
            >
              <div className={styles.timelineContent}>
                <div className={styles.yearMarker}>{item.year}</div>
                
                <div className={styles.contentCard}>
                  <div className={styles.milestoneBadge}>
                    {item.milestone}
                  </div>
                  
                  <div className={styles.textContent}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                    
                    <div className={styles.itemMeta}>
                      <div className={styles.metaItem}>
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Calendar size={14} />
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>9+</h3>
            <p className={styles.statLabel}>Years Experience</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>500+</h3>
            <p className={styles.statLabel}>Happy Clients</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>1000+</h3>
            <p className={styles.statLabel}>Sessions Completed</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>12</h3>
            <p className={styles.statLabel}>Awards Won</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;