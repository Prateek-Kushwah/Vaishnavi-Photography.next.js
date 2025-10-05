import GallerySection from '@/components/GallerySection/GallerySection';
import styles from './page.module.css';
import Header from '@/components/Header/Header';

export const metadata = {
  title: "Gallery - Vaishnavi Photography",
  description: "Gallery Page of Vaishnavi Photography"
}

const Gallery = () => {
  const sections = [
    {
      id: 'wedding',
      title: 'Wedding Photography',
      images: [
        { src: '/assets/RiyaKratish/image1.webp', width: 800, height: 1200 },
        { src: '/assets/wedding/image2.jpg', width: 800, height: 1200 },
        { src: '/assets/wedding/image3.jpg', width: 1200, height: 800 },
        { src: '/assets/wedding/image4.jpg', width: 800, height: 1200 },
        { src: '/assets/wedding/image5.jpg', width: 1200, height: 800 },
        { src: '/assets/wedding/image6.jpg', width: 800, height: 1200 },
        { src: '/assets/wedding/image7.jpg', width: 1200, height: 800 },
        { src: '/assets/wedding/image8.jpg', width: 800, height: 1200 },
      ]
    },
    {
      id: 'event',
      title: 'Event Photography',
      images: [
        { src: '/assets/event/image1.jpg', width: 1200, height: 800 },
        { src: '/assets/event/image2.jpg', width: 800, height: 1200 },
        { src: '/assets/event/image3.jpg', width: 1200, height: 800 },
        { src: '/assets/event/image4.jpg', width: 800, height: 1200 },
        { src: '/assets/event/image5.jpg', width: 1200, height: 800 },
        { src: '/assets/event/image6.jpg', width: 800, height: 1200 },
      ]
    },
    {
      id: 'pre-wedding',
      title: 'Pre Wedding Photography',
      images: [
        { src: '/assets/pre-wedding/image1.jpg', width: 800, height: 1200 },
        { src: '/assets/pre-wedding/image2.jpg', width: 1200, height: 800 },
        { src: '/assets/pre-wedding/image3.jpg', width: 800, height: 1200 },
        { src: '/assets/pre-wedding/image4.jpg', width: 1200, height: 800 },
        { src: '/assets/pre-wedding/image5.jpg', width: 800, height: 1200 },
        { src: '/assets/pre-wedding/image6.jpg', width: 1200, height: 800 },
        { src: '/assets/pre-wedding/image7.jpg', width: 800, height: 1200 },
      ]
    },
    {
      id: 'portrait',
      title: 'Portrait Photography',
      images: [
        { src: '/assets/portrait/image1.jpg', width: 800, height: 1200 },
        { src: '/assets/portrait/image2.jpg', width: 1200, height: 800 },
        { src: '/assets/portrait/image3.jpg', width: 800, height: 1200 },
        { src: '/assets/portrait/image4.jpg', width: 1200, height: 800 },
        { src: '/assets/portrait/image5.jpg', width: 800, height: 1200 },
      ]
    }
  ];

  return (
    <div className={styles.container}>
    <Header/>
      {sections.map((section) => (
        <GallerySection
          key={section.id}
          id={section.id}
          title={section.title}
          images={section.images}
        />
      ))}
    </div>
  );
};

export default Gallery;