// components/Footer.js
import styles from './Footer.module.css';
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.logo}>Vaishnavi Photography</h3>
            <p className={styles.description}>
              Creating beautiful digital experiences with a focus on user-centered design and modern development practices.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10 10 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Dribbble">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-3.87 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.148-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4-.57.98-1.56 2.05-2.59 2.05h-.25c-.63 0-1.07-.39-1.07-1.02 0-.33.1-.75.25-1.27.08-.2.17-.38.26-.55.33-.62.67-1.19 1.02-1.69.23-.3.46-.57.68-.82.03-.03.05-.06.07-.08.2-.22.38-.41.55-.58 0 0 .02-.02.03-.03.2-.18.37-.33.53-.45.03-.02.05-.04.07-.05.2-.13.37-.23.53-.32.03-.02.05-.03.07-.04.17-.09.32-.16.47-.22.03-.01.05-.03.08-.04.15-.07.28-.12.41-.16.02 0 .04-.01.06-.02.14-.04.26-.07.37-.09.03 0 .05-.01.08-.01.1-.02.18-.03.25-.04.02 0 .04 0 .06-.01.08-.01.14-.01.2-.02.02 0 .04 0 .06-.01.07 0 .13-.01.19-.01h.03c.02 0 .05 0 .08.01.06 0 .12.01.19.01.02 0 .04 0 .06.01.06.01.12.01.19.02.02 0 .04.01.06.01.07.01.14.02.22.04.03 0 .05.01.08.01.11.02.22.05.34.09.02.01.04.01.06.02.13.04.26.09.39.15.03.01.05.02.08.04.15.07.3.15.44.24.03.02.05.03.07.05.16.1.32.21.48.34.03.02.05.04.07.06.16.13.31.27.45.43.02.02.04.04.06.06.14.16.27.33.39.51.02.03.04.05.06.08.12.17.22.35.32.54.1.19.19.39.27.6.08.21.14.42.2.64.06.22.1.44.13.67.03.23.05.46.05.7 0 .63-.4 1.02-1.02 1.02z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="/#" className={styles.footerLink}>Home</a>
                {/* <Link className={styles.footerLink} href={#contact}>Home</Link> */}
              </li>
              <li><a href="/#footer" className={styles.footerLink}>About</a></li>
              <li><a href="/#services" className={styles.footerLink}>Services</a></li>
              <li><a href="/gallery" className={styles.footerLink}>Gallery</a></li>
              <li><a href="/#contact" className={styles.footerLink}>Contact</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Services</h4>
            <ul className={styles.linkList}>
              <li><a href="/#contact" className={styles.footerLink}>Wedding Photography</a></li>
              <li><a href="/#contact" className={styles.footerLink}>Event Photography</a></li>
              <li><a href="/#contact" className={styles.footerLink}>Portrait Photography</a></li>
              <li><a href="/#contact" className={styles.footerLink}>Commercial Photography</a></li>
              <li><a href="/#contact" className={styles.footerLink}>Photo & Video Editing</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Contact Info</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                <span>gajendrakushwahvideo@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                <span>+91 930 151 0434</span>
              </div>
              <div className={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>Gwalior , India</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} Vaishnavi Photography . All rights reserved.</p>
          </div>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
            <a href="#" className={styles.legalLink}>Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className={styles.footerShape1}></div>
      <div className={styles.footerShape2}></div>
    </footer>
  );
}