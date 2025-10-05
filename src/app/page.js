import dynamic from 'next/dynamic'

const GalleryPreview = dynamic(() => import('../components/GalleryPreview/GalleryPreview'))
const Hero = dynamic(() => import('../components/Hero/Hero'))
const WhyChooseUs = dynamic(() => import('../components/WhyChooseUs/WhyChooseUs'))
const OurShoots = dynamic(() => import('../components/OurShoots/OurShoots'))
const Header = dynamic(() => import('../components/Header/Header'))
const VideoTeaser = dynamic(() => import('../components/VideoTeaser/VideoTeaser'))
const YouTubeGallery = dynamic(() => import('../components/YoutubeGallery/YoutubeGallery'))
const OurJourney = dynamic(() => import('../components/OurJourney/OurJourney'))
const OurServices = dynamic(() => import('../components/OurServices/OurServices'))
const BlackWhite = dynamic(() => import('../components/BlackWhite/BlackWhite'))
const Testimonials = dynamic(() => import('../components/Testimonials/Testimonials'))
const ContactSection = dynamic(() => import('../components/ContactSection/ContactSection'))
const Footer = dynamic(() => import('../components/Footer/Footer'))

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <div className="gallery-main-container">
        <GalleryPreview />
      </div>
      <WhyChooseUs />
      <OurShoots />
      <VideoTeaser />
      <YouTubeGallery />
      <OurJourney />
      <OurServices />
      <BlackWhite imageUrl="https://vaishnaviphotography.com/assets/Preview/gallery-preview/Image%201.webp" />
      <Testimonials />
      <ContactSection />
      <Footer/>
    </div>
  );
}
