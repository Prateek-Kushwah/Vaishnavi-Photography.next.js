"use client"
// components/ContactSection.js
import { useEffect, useState } from "react";
import styles from "./ContactSection.module.css";
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // FIXED: Was 'email'
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    emailjs.init("M4Hdskoi150KnHtJw");

    const handleAnimationStart = (e) => {
      if (e.animationName === "onAutoFillStart") {
        e.target.classList.add(styles.autofilled);
      } else if (e.animationName === "onAutoFillCancel") {
        e.target.classList.remove(styles.autofilled);
      }
    };

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("animationstart", handleAnimationStart);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("animationstart", handleAnimationStart);
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) { // FIXED: Was validating for email
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await emailjs.send(
        'service_tw6g4tq',
        'template_eaz3g9m',
        {
          from_name: formData.name,
          from_phone: formData.phone,
          message: formData.message,
          to_email: 'gajendrakushwahvideo@gmail.com'
        }
      );

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.thankYouMessage}>
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully. I will get back to you soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Have a project in mind or just want to say hello? I'd love to hear
            from you!
          </p>
        </div>

        <div className={styles.content}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`${styles.input} ${formData.name ? styles.filled : ''} ${errors.name ? styles.error : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                <label htmlFor="name" className={styles.label}>
                  Your Name
                </label>
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <input
                  type="tel" // Changed to 'tel' for better semantics
                  id="phone"
                  name="phone"
                  className={`${styles.input} ${formData.phone ? styles.filled : ''} ${errors.phone ? styles.error : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label htmlFor="phone" className={styles.label}>
                  Contact Number
                </label> {/* FIXED: Label text */}
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className={`${styles.textarea} ${formData.message ? styles.filled : ''} ${errors.message ? styles.error : ''}`}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="message" className={styles.label}>
                  Your Message
                </label>
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>
            </div>

            {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>

          <div className={styles.contactInfo}>
            <h3 className={styles.infoTitle}>Contact Information</h3>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h4>Email</h4>
                <p>gajendrakushwahvideo@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h4>Phone</h4>
                <p>+91 930 151 0434</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h4>Location</h4>
                <p>Gwalior, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.shape1}></div>
      <div className={styles.shape2}></div>
      <div className={styles.shape3}></div>
    </section>
  );
}