"use client"
// components/YouTubeGallery/YouTubeGallery.js
import { useState } from 'react';
import { Play, X, ArrowRight, Youtube } from 'lucide-react';
import styles from './YouTubeGallery.module.css';
import Link from 'next/link';

const YouTubeGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample YouTube video data (replace with your actual video IDs)
  const youtubeVideos = [
    {
      id: 'video1',
      youtubeId: 'tv2iAOJ6hr4?si=Um1YkNQg9kISLYwx', // Replace with your YouTube video ID
      title: 'Wedding Photography Highlights',
      description: 'Beautiful moments from our recent wedding shoots',
      duration: '2:45',
      category: 'Wedding'
    },
    {
      id: 'video2',
      youtubeId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
      title: 'Portrait Session Behind the Scenes',
      description: 'See how we create stunning portrait photography',
      duration: '3:20',
      category: 'Portrait'
    },
    {
      id: 'video3',
      youtubeId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
      title: 'Nature Photography Techniques',
      description: 'Tips and tricks for capturing beautiful nature shots',
      duration: '4:15',
      category: 'Nature'
    },
    {
      id: 'video4',
      youtubeId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
      title: 'Event Photography Coverage',
      description: 'How we capture special events and celebrations',
      duration: '5:30',
      category: 'Events'
    },
    {
      id: 'video5',
      youtubeId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
      title: 'Studio Lighting Setup',
      description: 'Professional studio lighting techniques explained',
      duration: '6:10',
      category: 'Tutorial'
    },
    {
      id: 'video6',
      youtubeId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
      title: 'Client Testimonials',
      description: 'Hear what our clients say about their experience',
      duration: '4:45',
      category: 'Testimonials'
    }
  ];

  const openVideo = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeVideo = () => {
    setShowModal(false);
    setSelectedVideo(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <section className={styles.youtubeGallery} id="videos">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Youtube size={32} className={styles.youtubeIcon} />
            <h2 className={styles.title}>Video Gallery</h2>
          </div>
          <p className={styles.subtitle}>
            Watch our photography journey, behind the scenes, and client stories
          </p>
        </div>

        <div className={styles.videoGrid}>
          {youtubeVideos.map(video => (
            <div key={video.id} className={styles.videoCard}>
              <div 
                className={styles.videoThumbnail}
                onClick={() => openVideo(video)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className={styles.thumbnailImage}
                />
                <div className={styles.overlay}>
                  <div className={styles.playButton}>
                    <Play size={24} fill="currentColor" />
                  </div>
                  <div className={styles.videoDuration}>
                    {video.duration}
                  </div>
                </div>
                <div className={styles.categoryBadge}>
                  {video.category}
                </div>
              </div>
              
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoDescription}>{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <a 
            href="https://www.youtube.com/@vaishnaviphotography71" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <span>Visit Our YouTube Channel</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className={styles.modal} onClick={closeVideo}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeVideo}>
              <X size={24} />
            </button>
            
            <div className={styles.videoContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.videoIframe}
              ></iframe>
            </div>
            
            <div className={styles.modalVideoInfo}>
              <h3 className={styles.modalVideoTitle}>{selectedVideo.title}</h3>
              <p className={styles.modalVideoDescription}>{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default YouTubeGallery;