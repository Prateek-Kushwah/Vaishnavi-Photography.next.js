// app/privacy-policy/page.js
import Link from 'next/link'
import styles from './page.module.css'

export default function PrivacyPolicy() {
  return (
    <div className={styles.privacyPolicy}>
      {/* Header Section */}
      <header className={styles.policyHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>
            Privacy Policy
          </h1>
          <p className={styles.headerSubtitle}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
        
        {/* Background Shapes */}
        <div className={`${styles.shape} ${styles.shapePurple}`}></div>
        <div className={`${styles.shape} ${styles.shapeBlue}`}></div>
      </header>

      {/* Main Content */}
      <main className={styles.policyMain}>
        <div className={styles.policyCard}>
          {/* Last Updated */}
          <div className={styles.lastUpdated}>
            <p>
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Policy Sections */}
          <div className={styles.policySections}>
            {policySections.map((section, index) => (
              <section key={index} className={styles.policySection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionNumber}>
                    {index + 1}
                  </div>
                  <h2 className={styles.sectionTitle}>
                    {section.title}
                  </h2>
                </div>
                
                <div className={styles.sectionContent}>
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Information */}
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>
              Contact Us
            </h3>
            <p className={styles.contactText}>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <span className={styles.contactEmail}>privacy@yourcompany.com</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.policyFooter}>
        <div className={styles.footerContent}>
          <Link href="/" className={styles.backButton}>
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}

const policySections = [
  {
    title: "Information We Collect",
    content: (
      <>
        <p>
          We collect information you provide directly to us when you use our services, 
          including personal information such as your name, email address, and any other 
          information you choose to provide.
        </p>
        <p>
          We also automatically collect certain information about your device and how you 
          interact with our services, including usage data, IP address, browser type, 
          and cookies.
        </p>
      </>
    )
  },
  {
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className={styles.contentList}>
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send you technical notices and support messages</li>
          <li>Respond to your comments and questions</li>
          <li>Monitor and analyze trends and usage</li>
        </ul>
      </>
    )
  },
  {
    title: "Information Sharing",
    content: (
      <>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to 
          third parties without your consent, except in the following circumstances:
        </p>
        <ul className={styles.contentList}>
          <li>With your explicit consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect and defend our rights and property</li>
          <li>With service providers who assist our operations</li>
        </ul>
      </>
    )
  },
  {
    title: "Data Security",
    content: (
      <>
        <p>
          We implement appropriate technical and organizational security measures 
          designed to protect your personal information. However, no method of 
          transmission over the Internet is 100% secure, and we cannot guarantee 
          absolute security.
        </p>
      </>
    )
  },
  {
    title: "Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul className={styles.contentList}>
          <li>Access and receive a copy of your personal data</li>
          <li>Rectify or update your personal data</li>
          <li>Request deletion of your personal data</li>
          <li>Restrict or object to our processing of your data</li>
          <li>Data portability</li>
        </ul>
      </>
    )
  },
  {
    title: "Cookies and Tracking",
    content: (
      <>
        <p>
          We use cookies and similar tracking technologies to track activity on our 
          service and hold certain information. You can instruct your browser to 
          refuse all cookies or to indicate when a cookie is being sent.
        </p>
      </>
    )
  },
  {
    title: "Changes to This Policy",
    content: (
      <>
        <p>
          We may update our Privacy Policy from time to time. We will notify you 
          of any changes by posting the new Privacy Policy on this page and updating 
          the "Last Updated" date.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any changes. 
          Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
      </>
    )
  }
]