"use client"
// components/Testimonials/Testimonials.js
import { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause, Send } from 'lucide-react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationDirection, setAnimationDirection] = useState('next');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    message: '',
    category: 'Wedding' // Set default category
  });
  const [submitted, setSubmitted] = useState(false);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah & Michael",
      role: "Wedding Clients",
      content: "Vaishnavi captured our wedding day perfectly! The photos are absolutely stunning and truly reflect the emotions of the day. We couldn't be happier with the results and will cherish these memories forever.",
      rating: 5,
      category: "Wedding"
    },
    {
      id: 2,
      name: "James Wilson",
      role: "Portrait Session",
      content: "The portrait session was amazing! Vaishnavi made me feel so comfortable and the final images exceeded all my expectations. Professional, creative, and delivered exactly what I wanted.",
      rating: 5,
      category: "Portrait"
    },
    {
      id: 3,
      name: "Jennifer Martinez",
      role: "Event Photography",
      content: "We hired Vaishnavi for our corporate event and were blown away by the quality of photos. She captured every important moment with such artistry. Highly recommended!",
      rating: 5,
      category: "Event"
    },
    {
      id: 4,
      name: "Robert Chen",
      role: "Commercial Client",
      content: "Working with Vaishnavi on our product photography was a game-changer. Her attention to detail and creative vision helped our brand stand out. Exceptional work!",
      rating: 5,
      category: "Commercial"
    },
    {
      id: 5,
      name: "Emily & David",
      role: "Destination Wedding",
      content: "Our destination wedding photos are absolutely magical! Vaishnavi traveled with us and captured the most beautiful moments against stunning backdrops. Worth every penny!",
      rating: 5,
      category: "Wedding"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setAnimationDirection('next');
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
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
  }, [isPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setAnimationDirection('next');
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    resetAutoPlay();
  };

  const prevTestimonial = () => {
    setAnimationDirection('prev');
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
    }, 10000);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const goToTestimonial = (index) => {
    setAnimationDirection(index > activeTestimonial ? 'next' : 'prev');
    setActiveTestimonial(index);
    resetAutoPlay();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        rating: 0,
        message: '',
        category: 'Wedding'
      });
      setSubmitted(false);
      setShowForm(false);
    }, 3000);
  };

  const renderStars = (rating, interactive = false, onClick = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < rating ? styles.filledStar : styles.emptyStar} ${interactive ? styles.interactiveStar : ''}`}
        onClick={interactive ? () => onClick(index + 1) : null}
      >
        <Star
          size={20}
          fill={index < rating ? 'currentColor' : 'none'}
        />
      </span>
    ));
  };

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.backgroundElements}>
        <div className={styles.bgElement1}></div>
        <div className={styles.bgElement2}></div>
        <div className={styles.bgElement3}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Client Testimonials</h2>
          <p className={styles.subtitle}>
            Hear what our clients have to say about their experience
          </p>
          <button 
            className={styles.addReviewButton}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Close Review Form' : 'Add Your Review'}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className={styles.reviewFormContainer}>
            <div className={styles.reviewForm}>
              <h3 className={styles.formTitle}>Share Your Experience</h3>
              
              {submitted ? (
                <div className={styles.successMessage}>
                  <p>Thank you for your review! It has been submitted successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="category">Service Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <optgroup label="Portrait Photography">
                        <option value="Portrait">Portrait Session</option>
                        <option value="Family">Family Photography</option>
                        <option value="Newborn">Newborn Photography</option>
                        <option value="Boudoir">Boudoir Photography</option>
                        <option value="Maternity">Maternity Photography</option>
                      </optgroup>
                      
                      <optgroup label="Event Photography">
                        <option value="Wedding">Wedding Photography</option>
                        <option value="Engagement">Engagement Session</option>
                        <option value="Corporate">Corporate Event</option>
                        <option value="Birthday">Birthday Party</option>
                        <option value="BabyShower">Baby Shower</option>
                      </optgroup>
                      
                      <optgroup label="Commercial Photography">
                        <option value="Commercial">Commercial Photography</option>
                        <option value="Product">Product Photography</option>
                        <option value="RealEstate">Real Estate Photography</option>
                        <option value="Food">Food Photography</option>
                        <option value="Fashion">Fashion Photography</option>
                        <option value="Architecture">Architecture Photography</option>
                      </optgroup>
                      
                      <optgroup label="Specialty Photography">
                        <option value="Travel">Travel Photography</option>
                        <option value="Nature">Nature & Wildlife</option>
                        <option value="Aerial">Aerial Photography</option>
                        <option value="Street">Street Photography</option>
                        <option value="BlackAndWhite">Black & White Photography</option>
                        <option value="Sports">Sports Photography</option>
                      </optgroup>
                      
                      <optgroup label="Services">
                        <option value="Videography">Videography Services</option>
                        <option value="PhotoEditing">Photo Editing</option>
                        <option value="Retouching">Photo Retouching</option>
                        <option value="AlbumDesign">Album Design</option>
                        <option value="Other">Other Services</option>
                      </optgroup>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Your Rating</label>
                    <div className={styles.ratingInput}>
                      {renderStars(formData.rating, true, handleRatingChange)}
                      <span className={styles.ratingText}>
                        {formData.rating > 0 ? `${formData.rating} out of 5` : 'Select rating'}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Your Review</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      required
                      placeholder="Share your experience with our photography services..."
                    ></textarea>
                  </div>
                  
                  <button type="submit" className={styles.submitButton}>
                    <Send size={18} />
                    <span>Submit Review</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        <div className={styles.testimonialContainer}>
          <div className={styles.testimonialContent}>
            <div className={`${styles.testimonialCard} ${styles[animationDirection]}`}>
              <div className={styles.quoteIcon}>
                <Quote size={32} />
              </div>

              <div className={styles.testimonialText}>
                <p className={styles.content}>
                  "{testimonials[activeTestimonial].content}"
                </p>
              </div>

              <div className={styles.clientInfo}>
                <div className={styles.clientDetails}>
                  <h3 className={styles.clientName}>
                    {testimonials[activeTestimonial].name}
                  </h3>
                  <p className={styles.clientRole}>
                    {testimonials[activeTestimonial].role}
                  </p>
                  <div className={styles.rating}>
                    {renderStars(testimonials[activeTestimonial].rating)}
                  </div>
                  <div className={styles.category}>
                    {testimonials[activeTestimonial].category}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.navButtons}>
              <button 
                className={styles.navButton}
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
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
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className={styles.dots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === activeTestimonial ? styles.active : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>4.9</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Recommendation Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;