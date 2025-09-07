"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Fullscreen,
} from "lucide-react";
import styles from "./VideoTeaser.module.css";

const VideoTeaser = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateTime);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowOverlay(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const enterFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  const handleTimeBarClick = (e) => {
    if (videoRef.current) {
      const timeBar = e.currentTarget;
      const clickPosition = e.clientX - timeBar.getBoundingClientRect().left;
      const percentage = clickPosition / timeBar.offsetWidth;
      videoRef.current.currentTime = percentage * duration;
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section className={styles.videoTeaser}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Behind the Lens</h2>
          <p className={styles.subtitle}>
            Experience the magic we create through our lens
          </p>
        </div>

        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video
              ref={videoRef}
              className={styles.video}
              poster="/teaser-poster.jpg"
              muted={isMuted}
              onEnded={handleVideoEnd}
              loop={false}
            >
              <source src="/teaser.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {showOverlay && (
              <div className={styles.videoOverlay} onClick={togglePlay}>
                <div className={styles.overlayContent}>
                  <button
                    className={styles.playButton}
                    onClick={togglePlay}
                    aria-label="Play video"
                  >
                    <Play size={48} />
                  </button>
                  <h3 className={styles.overlayTitle}>See Our Story Unfold</h3>
                  <p className={styles.overlayText}>
                    Watch our 60-second teaser to experience the passion behind
                    our photography
                  </p>
                </div>
              </div>
            )}

            <div className={styles.videoControls}>
              <button
                className={styles.controlButton}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                className={styles.controlButton}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <div className={styles.timeBar} onClick={handleTimeBarClick}>
                <div
                  className={styles.progress}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <button
                className={styles.controlButton}
                onClick={enterFullscreen}
                aria-label="Enter fullscreen"
              >
                <Fullscreen size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTeaser;