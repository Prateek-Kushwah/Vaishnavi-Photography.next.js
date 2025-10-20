import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header/Header'
import MasonryGrid from '@/components/MasonryGrid/MasonryGrid'
import clients from '@/data/clients.json'
import styles from './page.module.css'
import Footer from '@/components/Footer/Footer'

export default async function ClientPage({ params }) {
  const { slug } = await params
  console.log('Slug received:', slug)

  const client = clients.find((c) => c.page === slug)

  if (!client) {
    console.log(`Client not found for slug: ${slug}`)
    console.log('Available clients:', clients.map((c) => c.page))
    notFound()
  }

  // Generate structured data for rich snippets
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': client.name,
    'description': client.bio,
    'image': client.coverImage,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://vaishnaviphotography.com/${client.page}`
    }
  }

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Header />
      <main className={styles.main}>
        {/* Enhanced hero section with semantic HTML */}
        <header className={styles.hero} role="banner">
          <Image
            src={client.coverImage}
            alt={`Cover image for ${client.name} - ${client.bio}`}
            priority
            className={styles.coverImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            quality={85}
          />
          <div className={styles.heroContent}>
            <h1 itemProp="name">{client.name}</h1>
            <p itemProp="description">{client.bio}</p>
          </div>
        </header>

        {/* Gallery section with semantic markup */}
        <section 
          className={styles.gallery} 
          aria-labelledby="gallery-heading"
          itemScope
          itemType="https://schema.org/ImageGallery"
        >
          <h2 id="gallery-heading">Gallery</h2>
          {client.images.length > 0 ? (
            <MasonryGrid 
              images={client.images}
              aria-label={`Image gallery for ${client.name}`}
            />
          ) : (
            <p className={styles.empty}>No images yet</p>
          )}
        </section>

        {/* Additional client information section for better content depth */}
        <section className={styles.clientInfo}>
          <h2>About {client.name}</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h3>Project Details</h3>
              <p>Explore our collaborative work and creative journey with {client.name}.</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Portfolio</h3>
              <p>View our complete collection of work and creative solutions.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export async function generateStaticParams() {
  return clients.map((client) => ({
    slug: client.page,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const client = clients.find((c) => c.page === slug)

  if (!client) {
    return {
      title: 'Client Not Found',
      description: 'The requested client portfolio could not be found.',
    }
  }

  // Enhanced metadata with additional SEO fields
  return {
    title: `${client.name} - Galery | Riya & Kratish | Vaishnavi Photography`,
    description: client.bio,
    keywords: `${client.name}, portfolio, photography, creative work, gallery`,
    authors: [{ name: 'Your Company Name' }],
    creator: 'Your Company Name',
    publisher: 'Your Company Name',
    
    // Open Graph metadata
    openGraph: {
      title: `${client.name} - Portfolio | Your Company Name`,
      description: client.bio,
      url: `https://yourdomain.com/clients/${client.page}`,
      siteName: 'Your Company Name',
      images: [
        {
          url: client.coverImage,
          width: 1200,
          height: 630,
          alt: `Cover image for ${client.name}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },

    // Twitter Card metadata
    twitter: {
      card: 'summary_large_image',
      title: `${client.name} - Portfolio | Your Company Name`,
      description: client.bio,
      creator: '@yourtwitterhandle',
      images: [client.coverImage],
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: `https://yourdomain.com/clients/${client.page}`,
    },

    // Verification for search consoles (optional)
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
  }
}

// Generate sitemap configuration (optional but recommended)
export async function generateSitemap() {
  return clients.map((client) => ({
    url: `https://vaishnaviphotography.com/${client.page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
}