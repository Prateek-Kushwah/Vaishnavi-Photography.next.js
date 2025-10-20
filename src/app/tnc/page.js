// app/terms-and-conditions/page.js
import Link from 'next/link'
import styles from './page.module.css'

export default function TermsAndConditions() {
  return (
    <div className={styles.termsAndConditions}>
      {/* Header Section */}
      <header className={styles.termsHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>
            Terms & Conditions
          </h1>
          <p className={styles.headerSubtitle}>
            Please read these terms and conditions carefully before using our service.
          </p>
        </div>
        
        {/* Background Shapes */}
        <div className={`${styles.shape} ${styles.shapePurple}`}></div>
        <div className={`${styles.shape} ${styles.shapeBlue}`}></div>
        <div className={`${styles.shape} ${styles.shapePink}`}></div>
      </header>

      {/* Main Content */}
      <main className={styles.termsMain}>
        <div className={styles.termsCard}>
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

          {/* Introduction */}
          <div className={styles.introduction}>
            <p>
              Welcome to our website. By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          {/* Terms Sections */}
          <div className={styles.termsSections}>
            {termsSections.map((section, index) => (
              <section key={index} className={styles.termsSection}>
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

          {/* Acceptance Section */}
          <div className={styles.acceptanceSection}>
            <h3 className={styles.acceptanceTitle}>
              Acceptance of Terms
            </h3>
            <p className={styles.acceptanceText}>
              By using our services, you signify your acceptance of these terms and conditions. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          {/* Contact Information */}
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>
              Contact Us
            </h3>
            <p className={styles.contactText}>
              If you have any questions about these Terms and Conditions, please contact us at{' '}
              <span className={styles.contactEmail}>legal@yourcompany.com</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.termsFooter}>
        <div className={styles.footerContent}>
          <Link href="/" className={styles.backButton}>
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}

const termsSections = [
  {
    title: "Use License",
    content: (
      <>
        <p>
          Permission is granted to temporarily use our services for personal, non-commercial 
          transitory viewing only. This is the grant of a license, not a transfer of title.
        </p>
        <p>Under this license you may not:</p>
        <ul className={styles.contentList}>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Attempt to reverse engineer any software contained</li>
          <li>Remove any copyright or other proprietary notations</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>
      </>
    )
  },
  {
    title: "Account Terms",
    content: (
      <>
        <p>
          When you create an account with us, you must provide accurate, complete, and current 
          information. You are responsible for safeguarding your account and for all activities 
          that occur under your account.
        </p>
        <ul className={styles.contentList}>
          <li>You must be at least 18 years old to use our services</li>
          <li>You are responsible for maintaining the security of your account</li>
          <li>You must notify us immediately of any breach of security or unauthorized use</li>
          <li>You may not use our services for any illegal or unauthorized purpose</li>
        </ul>
      </>
    )
  },
  {
    title: "Payments and Billing",
    content: (
      <>
        <p>
          For paid services, you agree to pay all fees or charges to your account in accordance 
          with the fees, charges, and billing terms in effect at the time a fee or charge is due 
          and payable.
        </p>
        <ul className={styles.contentList}>
          <li>All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities</li>
          <li>You are responsible for payment of all such taxes</li>
          <li>We reserve the right to change our pricing with 30 days notice</li>
          <li>Services can be canceled at any time through your account settings</li>
        </ul>
      </>
    )
  },
  {
    title: "User Content",
    content: (
      <>
        <p>
          Our service allows you to post, link, store, share and otherwise make available certain 
          information, text, graphics, videos, or other material. You are responsible for the content 
          that you post on or through the service.
        </p>
        <p>By posting content, you represent and warrant that:</p>
        <ul className={styles.contentList}>
          <li>The content is yours or you have the right to use it</li>
          <li>The content does not violate the privacy rights, publicity rights, copyrights, or other rights of any person</li>
          <li>The posting of your content does not violate these terms and conditions</li>
        </ul>
      </>
    )
  },
  {
    title: "Intellectual Property",
    content: (
      <>
        <p>
          The service and its original content, features, and functionality are and will remain 
          the exclusive property of our company and its licensors. Our service is protected by 
          copyright, trademark, and other laws of both domestic and foreign countries.
        </p>
        <p>
          Our trademarks and trade dress may not be used in connection with any product or service 
          without the prior written consent of our company.
        </p>
      </>
    )
  },
  {
    title: "Termination",
    content: (
      <>
        <p>
          We may terminate or suspend your account and bar access to the service immediately, 
          without prior notice or liability, under our sole discretion, for any reason whatsoever 
          and without limitation, including but not limited to a breach of the Terms.
        </p>
        <p>
          If you wish to terminate your account, you may simply discontinue using the service or 
          delete your account through your account settings.
        </p>
      </>
    )
  },
  {
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          In no event shall our company, nor its directors, employees, partners, agents, suppliers, 
          or affiliates, be liable for any indirect, incidental, special, consequential or punitive 
          damages, including without limitation, loss of profits, data, use, goodwill, or other 
          intangible losses, resulting from:
        </p>
        <ul className={styles.contentList}>
          <li>Your access to or use of or inability to access or use the service</li>
          <li>Any conduct or content of any third party on the service</li>
          <li>Any content obtained from the service</li>
          <li>Unauthorized access, use or alteration of your transmissions or content</li>
        </ul>
      </>
    )
  },
  {
    title: "Governing Law",
    content: (
      <>
        <p>
          These Terms shall be governed and construed in accordance with the laws of your country, 
          without regard to its conflict of law provisions.
        </p>
        <p>
          Our failure to enforce any right or provision of these Terms will not be considered a waiver 
          of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, 
          the remaining provisions of these Terms will remain in effect.
        </p>
      </>
    )
  },
  {
    title: "Changes to Terms",
    content: (
      <>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
          If a revision is material we will provide at least 30 days notice prior to any new terms taking effect.
        </p>
        <p>
          What constitutes a material change will be determined at our sole discretion. By continuing to 
          access or use our service after those revisions become effective, you agree to be bound by the 
          revised terms.
        </p>
      </>
    )
  }
]