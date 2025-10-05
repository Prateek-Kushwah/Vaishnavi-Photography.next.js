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

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <Image
            src={client.coverImage}
            alt={client.name}
            priority
            className={styles.coverImage}
            fill
          />
          <div className={styles.heroContent}>
            <h1>{client.name}</h1>
            <p>{client.bio}</p>
          </div>
        </div>

        <section className={styles.gallery}>
          <h2>Gallery</h2>
          {client.images.length > 0 ? (
            <MasonryGrid images={(client.images)} />
          ) : (
            <p className={styles.empty}>No images yet</p>
          )}
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
    }
  }

  return {
    title: client.name,
    description: client.bio,
  }
}
