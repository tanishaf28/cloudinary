import { useEffect, useRef, useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { cld } from '../cloudinary/config';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { blur } from '@cloudinary/url-gen/actions/effect';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import type { Memory } from '../types/memory';
import '../styles/Slideshow.css';

interface SlideshowProps {
  memories: Memory[];
  autoPlay?: boolean;
  interval?: number;
}

export function Slideshow({ memories, autoPlay = false, interval = 3000 }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  if (!memories || memories.length === 0) {
    return (
      <div className="slideshow">
        <div className="slideshow-empty">No memories to display</div>
      </div>
    );
  }

  const current = memories[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(goToNext, interval);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, interval]);

  const slideImage = cld
    .image(current.publicId)
    .resize(fill().width(800).height(600))
    .delivery(format(auto()))
    .delivery(quality(autoQuality()));

  return (
    <div className="slideshow">
      <div className="slideshow-container">
        <div className="slideshow-image">
          <AdvancedImage cldImg={slideImage} alt={current.title || `Memory from ${current.date}`} />
        </div>
        <div className="slideshow-info">
          <h3>{current.title || current.date}</h3>
          {current.description && <p>{current.description}</p>}
        </div>
      </div>

      <div className="slideshow-controls">
        <button onClick={goToPrev} className="control-btn" title="Previous">
          ◀
        </button>
        <button
          onClick={togglePlayPause}
          className="control-btn play-btn"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={goToNext} className="control-btn" title="Next">
          ▶
        </button>
      </div>

      <div className="slideshow-indicators">
        {memories.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            title={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="slideshow-counter">
        {currentIndex + 1} / {memories.length}
      </div>
    </div>
  );
}
