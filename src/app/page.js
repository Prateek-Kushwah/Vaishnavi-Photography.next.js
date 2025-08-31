import GalleryPreview from "@/components/GalleryPreview/GalleryPreview";
import Hero from "@/components/Hero/Hero";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import OurShoots from "@/components/OurShoots/OurShoots";
import Header from "@/components/Header/Header";
import VideoTeaser from "@/components/VideoTeaser/VideoTeaser";
import YouTubeGallery from "@/components/YoutubeGallery/YoutubeGallery";
import OurJourney from "@/components/OurJourney/OurJourney";
import OurServices from "@/components/OurServices/OurServices";
import BlackWhite from "@/components/BlackWhite/BlackWhite";
import Testimonials from "@/components/Testimonials/Testimonials";
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";

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
      <BlackWhite />
      <Testimonials />
      <ContactSection />
      <Footer/>
    </div>
  );
}
