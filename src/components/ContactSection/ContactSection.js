"use client"
import { useEffect, useState } from "react";
import styles from "./ContactSection.module.css";
import { dataService } from "@/lib/dataService";
import AppointmentSection from "@/components/AppointmentSection/AppointmentSection";


export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({ name: false, phone: false, message: false });

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    } else {
      console.error("EmailJS public key is not defined.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setIsFocused(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_name: formData.name,
          from_phone: formData.phone,
          from_email: formData.email,
          message: formData.message,
          subject: `New Contact Message from ${formData.name}`,
          to_email: 'gajendrakushwahvideo@gmail.com'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send message:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };


  if (isSubmitted) {
    return (
      <section id="contact" className={styles.contactSection}>
        <div className={styles.container}>
          <div className={`${styles.card} ${styles.thankYouMessage}`}>
            <div className={styles.successIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </div>
            <h2>Thank You!</h2>
            <p className={styles.subtitle}>Your message has been sent successfully. I will get back to you soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Let's Connect</h2>
          <p className={styles.subtitle}>
            Ready to bring your next project to life? Reach out and let's create something amazing together.
          </p>
          
          {/* Add Appointment Section Button */}
          <AppointmentSection />
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Send me a message</h3>
              <p>I typically respond within 24 hours.</p>
            </div>
            <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <div className={styles.inputContainer}>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      className={`${styles.input} ${errors.name ? styles.error : ''}`}
                      value={formData.name} 
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                    />
                    <label 
                      htmlFor="name" 
                      className={`${styles.label} ${isFocused.name || formData.name ? styles.focused : ''}`}
                    >
                      Your Name
                    </label>
                  </div>
                  {errors.name && <p className={styles.errorText}>{errors.name}</p>}
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.inputContainer}>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                      value={formData.phone} 
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={() => handleBlur('phone')}
                    />
                    <label 
                      htmlFor="phone" 
                      className={`${styles.label} ${isFocused.phone || formData.phone ? styles.focused : ''}`}
                    >
                      Contact Number
                    </label>
                  </div>
                  {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
                </div>
              </div>
              <div className={styles.formGroup}>
                <div className={styles.inputContainer}>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5"
                    className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                    value={formData.message} 
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className={`${styles.label} ${isFocused.message || formData.message ? styles.focused : ''}`}
                  >
                    Your Message
                  </label>
                </div>
                {errors.message && <p className={styles.errorText}>{errors.message}</p>}
              </div>
              {errors.submit && <p className={styles.submitError}>{errors.submit}</p>}
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? <span className={styles.spinner}></span> : 'Send Message'}
              </button>
            </form>
          </div>

          <div className={styles.card}>
            <div className={styles.contactMethods}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <div className={styles.contactInfo}>
                  <h4>Email</h4>
                  <p>gajendrakushwahvideo@gmail.com</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={styles.contactInfo}>
                  <h4>Phone</h4>
                  <p>+91 930 151 0434</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={styles.contactInfo}>
                  <h4>Location</h4>
                  <p>Gwalior, India</p>
                </div>
              </div>
            </div>
            <div className={styles.socialConnect}>
              <h4>Follow Me</h4>
              <div className={styles.socialLinks}>
                <a href="https://www.instagram.com/your-username" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.667-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}