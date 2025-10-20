"use client"
import { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause, Send, ChevronDown } from 'lucide-react';
import styles from './Testimonials.module.css';
import testimonials from '../../data/testimonial.json'
// const [isLoading, setIsLoading] = useState(false);
import { reviewService } from "@/lib/reviewService";

const Testimonials = () => {
  const [approvedTestimonials, setApprovedTestimonials] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationDirection, setAnimationDirection] = useState('next');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    content: '',
    category: 'Wedding'
  });
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const intervalRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter only approved testimonials
  useEffect(() => {
    const approved = testimonials.filter(testimonial => testimonial.status === 'approved');
    setApprovedTestimonials(approved);
    // Reset active testimonial if needed
    if (activeTestimonial >= approved.length) {
      setActiveTestimonial(0);
    }
  }, [testimonials, activeTestimonial]);

  const categoryOptions = [
    {
      group: "Portrait Photography",
      options: [
        { value: "Portrait", label: "Portrait Session" },
        { value: "Family", label: "Family Photography" },
        { value: "Newborn", label: "Newborn Photography" },
        { value: "Boudoir", label: "Boudoir Photography" },
        { value: "Maternity", label: "Maternity Photography" }
      ]
    },
    {
      group: "Event Photography",
      options: [
        { value: "Wedding", label: "Wedding Photography" },
        { value: "Engagement", label: "Engagement Session" },
        { value: "Corporate", label: "Corporate Event" },
        { value: "Birthday", label: "Birthday Party" },
        { value: "BabyShower", label: "Baby Shower" }
      ]
    },
    {
      group: "Commercial Photography",
      options: [
        { value: "Commercial", label: "Commercial Photography" },
        { value: "Product", label: "Product Photography" },
        { value: "RealEstate", label: "Real Estate Photography" },
        { value: "Food", label: "Food Photography" },
        { value: "Fashion", label: "Fashion Photography" },
        { value: "Architecture", label: "Architecture Photography" }
      ]
    },
    {
      group: "Specialty Photography",
      options: [
        { value: "Travel", label: "Travel Photography" },
        { value: "Nature", label: "Nature & Wildlife" },
        { value: "Aerial", label: "Aerial Photography" },
        { value: "Street", label: "Street Photography" },
        { value: "BlackAndWhite", label: "Black & White Photography" },
        { value: "Sports", label: "Sports Photography" }
      ]
    },
    {
      group: "Services",
      options: [
        { value: "Videography", label: "Videography Services" },
        { value: "PhotoEditing", label: "Photo Editing" },
        { value: "Retouching", label: "Photo Retouching" },
        { value: "AlbumDesign", label: "Album Design" },
        { value: "Other", label: "Other Services" }
      ]
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-play functionality - updated to use approvedTestimonials
  useEffect(() => {
    if (isPlaying && approvedTestimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setAnimationDirection('next');
        setActiveTestimonial((prev) => (prev + 1) % approvedTestimonials.length);
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
  }, [isPlaying, approvedTestimonials.length]);

  const nextTestimonial = () => {
    if (approvedTestimonials.length === 0) return;
    
    setAnimationDirection('next');
    setActiveTestimonial((prev) => (prev + 1) % approvedTestimonials.length);
    resetAutoPlay();
  };

  const prevTestimonial = () => {
    if (approvedTestimonials.length === 0) return;
    
    setAnimationDirection('prev');
    setActiveTestimonial((prev) => (prev - 1 + approvedTestimonials.length) % approvedTestimonials.length);
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
    if (approvedTestimonials.length === 0) return;
    
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

  const handleCategorySelect = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
    setDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const testimonialData = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        bookedAt: new Date().toISOString()
      };

      await reviewService.submitReview(testimonialData);

      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        rating: 0,
        content: '',
        category: 'Wedding'
      });
    } catch (error) {
      console.error('Failed to submit review:', error);
      // You might want to set an error state here to show to the user
    }
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

  // Find the selected category label
  const selectedCategoryLabel = () => {
    for (const group of categoryOptions) {
      for (const option of group.options) {
        if (option.value === formData.category) {
          return option.label;
        }
      }
    }
    return "Select category";
  };

  // Don't render the carousel if there are no approved testimonials
  const hasApprovedTestimonials = approvedTestimonials.length > 0;

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
                  <p>Thank you for your review! It has been submitted successfully. Your review will be displayed under 12 hours</p>
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
                        className={styles.inputField}
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
                        className={styles.inputField}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Service Category</label>
                    <div
                      className={styles.customDropdown}
                      ref={dropdownRef}
                    >
                      <button
                        type="button"
                        className={styles.dropdownToggle}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <span>{selectedCategoryLabel()}</span>
                        <ChevronDown size={16} />
                      </button>

                      {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                          {categoryOptions.map((group, groupIndex) => (
                            <div key={groupIndex} className={styles.optionGroup}>
                              <div className={styles.optionGroupLabel}>{group.group}</div>
                              {group.options.map((option, optionIndex) => (
                                <button
                                  key={optionIndex}
                                  type="button"
                                  className={`${styles.optionItem} ${formData.category === option.value ? styles.optionItemSelected : ''}`}
                                  onClick={() => handleCategorySelect(option.value)}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="4"
                      required
                      placeholder="Share your experience with our photography services..."
                      className={styles.inputField}
                    ></textarea>
                  </div>

                  <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
                    <Send size={18} />
                    <span>Submit Review</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Testimonial Carousel - Only show if there are approved testimonials */}
        {hasApprovedTestimonials ? (
          <div className={styles.testimonialContainer}>
            <div className={styles.testimonialContent}>
              <div className={`${styles.testimonialCard} ${styles[animationDirection]}`}>
                <div className={styles.quoteIcon}>
                  <Quote size={32} />
                </div>
                <div className={styles.testimonialText}>
                  <p className={styles.content}>
                    "{approvedTestimonials[activeTestimonial]?.content}"
                  </p>
                </div>

                <div className={styles.clientInfo}>
                  <div className={styles.clientDetails}>
                    <h3 className={styles.clientName}>
                      {approvedTestimonials[activeTestimonial]?.name}
                    </h3>
                    <p className={styles.clientRole}>
                      {approvedTestimonials[activeTestimonial]?.role}
                    </p>
                    <div className={styles.rating}>
                      {renderStars(approvedTestimonials[activeTestimonial]?.rating)}
                    </div>
                    <div className={styles.category}>
                      {approvedTestimonials[activeTestimonial]?.category}
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
                {approvedTestimonials.map((_, index) => (
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
        ) : (
          <div className={styles.noTestimonials}>
            <p>No approved testimonials available yet. Check back soon!</p>
          </div>
        )}

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