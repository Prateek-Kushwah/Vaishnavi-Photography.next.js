"use client"
// components/OurServices/OurServices.js
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Camera, 
  Heart, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Check
} from 'lucide-react';
import styles from './OurServices.module.css';

const OurServices = () => {
  const [activeService, setActiveService] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationDirection, setAnimationDirection] = useState('next');
  const intervalRef = useRef(null);

  const services = [
    {
      id: 1,
      icon: <Heart size={32} />,
      title: "Wedding Photography",
      description: "Capture your special day with our artistic wedding photography that tells your unique love story through timeless images.",
      price: "Starting at $1,499",
      duration: "Full day coverage",
      includes: ["Pre-wedding consultation", "8 hours of coverage", "Online gallery", "USB with edited photos"],
      image: "/services/wedding.jpg",
      video: "/services/wedding-teaser.mp4",
      category: "Premium"
    },
    {
      id: 2,
      icon: <Users size={32} />,
      title: "Portrait Sessions",
      description: "Professional portrait sessions that bring out your personality and create stunning images for any occasion.",
      price: "Starting at $299",
      duration: "1-2 hours",
      includes: ["Style consultation", "1-2 hour session", "2 outfit changes", "10 edited digital images"],
      image: "/services/portrait.jpg",
      video: "/services/portrait-teaser.mp4",
      category: "Standard"
    },
    {
      id: 3,
      icon: <Calendar size={32} />,
      title: "Event Coverage",
      description: "Comprehensive event photography that captures the essence and emotions of your special occasions.",
      price: "Starting at $599",
      duration: "3-6 hours",
      includes: ["Pre-event planning", "Professional editing", "Online gallery", "Quick turnaround"],
      image: "/services/event.jpg",
      video: "/services/event-teaser.mp4",
      category: "Premium"
    },
    {
      id: 4,
      icon: <MapPin size={32} />,
      title: "Destination Shoots",
      description: "Travel with us to breathtaking locations for unique photography sessions in stunning environments.",
      price: "Custom pricing",
      duration: "Full day",
      includes: ["Location scouting", "Travel arrangements", "Extended session", "Premium album"],
      image: "/services/destination.jpg",
      video: "/services/destination-teaser.mp4",
      category: "Luxury"
    },
    {
      id: 5,
      icon: <Award size={32} />,
      title: "Commercial Photography",
      description: "Professional commercial photography for businesses, brands, and products with a creative touch.",
      price: "Starting at $799",
      duration: "Half or full day",
      includes: ["Creative direction", "Professional lighting", "Image licensing", "Fast delivery"],
      image: "/services/commercial.jpg",
      video: "/services/commercial-teaser.mp4",
      category: "Professional"
    },
    {
      id: 6,
      icon: <Camera size={32} />,
      title: "Photo Editing Services",
      description: "Professional photo editing and retouching services to make your images stand out.",
      price: "Starting at $49",
      duration: "24-48 hours",
      includes: ["Color correction", "Retouching", "Background editing", "Multiple revisions"],
      image: "/services/editing.jpg",
      video: "/services/editing-teaser.mp4",
      category: "Standard"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setAnimationDirection('next');
        setActiveService((prev) => (prev + 1) % services.length);
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, services.length]);

  const nextService = () => {
    setAnimationDirection('next');
    setActiveService((prev) => (prev + 1) % services.length);
    resetAutoPlay();
  };

  const prevService = () => {
    setAnimationDirection('prev');
    setActiveService((prev) => (prev - 1 + services.length) % services.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Restart auto-play after a delay
    setTimeout(() => {
      setIsPlaying(true);
    }, 8000);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const goToService = (index) => {
    setAnimationDirection(index > activeService ? 'next' : 'prev');
    setActiveService(index);
    resetAutoPlay();
  };

  return (
    <section className={styles.ourServices} id="our-services">
      <div className={styles.backgroundElements}>
        <div className={styles.bgElement1}></div>
        <div className={styles.bgElement2}></div>
        <div className={styles.bgElement3}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Services</h2>
          <p className={styles.subtitle}>
            Discover our comprehensive photography services tailored to capture your special moments
          </p>
        </div>

        <div className={styles.servicesContainer}>
          <div className={styles.servicesNavigation}>
            <div className={styles.navDots}>
              {services.map((service, index) => (
                <button
                  key={service.id}
                  className={`${styles.dot} ${index === activeService ? styles.active : ''}`}
                  onClick={() => goToService(index)}
                  aria-label={`View ${service.title} service`}
                />
              ))}
            </div>

            <div className={styles.navControls}>
              <button 
                className={styles.navButton}
                onClick={prevService}
                aria-label="Previous service"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
                onClick={toggleAutoPlay}
                aria-label={isPlaying ? "Pause auto play" : "Start auto play"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              
              <button 
                className={styles.navButton}
                onClick={nextService}
                aria-label="Next service"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className={styles.servicesContent}>
            <div className={styles.serviceImage}>
              <div className={`${styles.imageContainer} ${styles[animationDirection]}`}>
                <Image
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  fill
                  className={styles.image}
                />
                <div className={styles.imageOverlay}></div>
                
                <div className={styles.categoryBadge}>
                  {services[activeService].category}
                </div>
                
                <div className={styles.serviceIndicator}>
                  <span className={styles.currentNumber}>0{activeService + 1}</span>
                  <span className={styles.totalNumber}>/0{services.length}</span>
                </div>
              </div>
            </div>

            <div className={`${styles.serviceDetails} ${styles[animationDirection]}`}>
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}>
                  {services[activeService].icon}
                </div>
                <h3 className={styles.serviceTitle}>
                  {services[activeService].title}
                </h3>
              </div>

              <p className={styles.serviceDescription}>
                {services[activeService].description}
              </p>

              <div className={styles.serviceMeta}>
                <div className={styles.metaItem}>
                  <Clock size={18} />
                  <span>{services[activeService].duration}</span>
                </div>
                <div className={styles.metaItem}>
                  <Award size={18} />
                  <span>{services[activeService].price}</span>
                </div>
              </div>

              <div className={styles.includes}>
                <h4 className={styles.includesTitle}>What's Included:</h4>
                <ul className={styles.includesList}>
                  {services[activeService].includes.map((item, index) => (
                    <li key={index} className={styles.includesItem}>
                      <Check size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.ctaButtons}>
                <button className={styles.primaryButton}>
                  Book This Service
                </button>
                <button className={styles.secondaryButton}>
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.allServicesGrid}>
          <h3 className={styles.gridTitle}>Explore All Services</h3>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`${styles.serviceCard} ${index === activeService ? styles.activeCard : ''}`}
                onClick={() => goToService(index)}
              >
                <div className={styles.cardIcon}>
                  {service.icon}
                </div>
                <h4 className={styles.cardTitle}>{service.title}</h4>
                <p className={styles.cardDescription}>{service.description.substring(0, 80)}...</p>
                <div className={styles.cardPrice}>{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;