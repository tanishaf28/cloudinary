import { useEffect, useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { cld } from '../cloudinary/config';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { blur } from '@cloudinary/url-gen/actions/effect';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import type { Memory } from '../types/memory';
import '../styles/MemoryViewer.css';

interface MemoryViewerProps {
  memory: Memory;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

type ViewMode = 'original' | 'thumbnail' | 'blurred' | 'polaroid';

export function MemoryViewer({ memory, onClose, onNext, onPrev }: MemoryViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('original');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext?.();
      if (e.key === 'ArrowLeft') onPrev?.();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, onNext, onPrev]);

  const getImage = () => {
    switch (viewMode) {
      case 'thumbnail':
        return cld
          .image(memory.publicId)
          .resize(fill().width(200).height(200))
          .delivery(format(auto()))
          .delivery(quality(autoQuality()));
      case 'blurred':
        return cld
          .image(memory.publicId)
          .effect(blur(800))
          .delivery(format(auto()))
          .delivery(quality(autoQuality()));
      case 'polaroid':
        return cld
          .image(memory.publicId)
          .resize(fill().width(400).height(300))
          .delivery(format(auto()))
          .delivery(quality(autoQuality()));
      default:
        return cld
          .image(memory.publicId)
          .delivery(format(auto()))
          .delivery(quality(autoQuality()));
    }
  };

  return (
    <div className="memory-viewer-modal" onClick={onClose}>
      <div className="memory-viewer" onClick={(e) => e.stopPropagation()}>
        <button className="viewer-close" onClick={onClose}>
          ✕
        </button>

        <div className="viewer-content">
          <div className="viewer-image">
            <AdvancedImage cldImg={getImage()} alt={memory.title || `Memory from ${memory.date}`} />
          </div>

          <div className="viewer-sidebar">
            <div className="viewer-info">
              <h2>{memory.title || 'Untitled Memory'}</h2>
              <p className="viewer-date">
                {new Date(memory.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              {memory.description && <p className="viewer-description">{memory.description}</p>}
            </div>

            <div className="viewer-transforms">
              <h3>View Styles</h3>
              <div className="transform-buttons">
                {(
                  [
                    { mode: 'original', label: 'Original' },
                    { mode: 'thumbnail', label: 'Thumbnail' },
                    { mode: 'blurred', label: 'Blurred' },
                    { mode: 'polaroid', label: 'Polaroid' },
                  ] as const
                ).map(({ mode, label }) => (
                  <button
                    key={mode}
                    className={`transform-btn ${viewMode === mode ? 'active' : ''}`}
                    onClick={() => setViewMode(mode)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="viewer-actions">
              <a href={memory.url} target="_blank" rel="noopener noreferrer" className="action-link">
                View Original
              </a>
            </div>
          </div>
        </div>

        <div className="viewer-navigation">
          {onPrev && (
            <button className="nav-btn" onClick={onPrev}>
              ◀ Previous
            </button>
          )}
          {onNext && (
            <button className="nav-btn" onClick={onNext}>
              Next ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
