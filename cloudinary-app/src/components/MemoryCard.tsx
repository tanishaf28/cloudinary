import { AdvancedImage, lazyload } from '@cloudinary/react';
import { cld } from '../cloudinary/config';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { blur } from '@cloudinary/url-gen/actions/effect';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import type { Memory } from '../types/memory';
import '../styles/MemoryCard.css';

interface MemoryCardProps {
  memory: Memory;
  variant?: 'thumbnail' | 'polaroid' | 'blurred';
  onClick?: () => void;
  onDelete?: (id: string) => void;
  showDetails?: boolean;
}

export function MemoryCard({
  memory,
  variant = 'thumbnail',
  onClick,
  onDelete,
  showDetails = false,
}: MemoryCardProps) {
  // Create different transformations based on variant
  let displayImage;

  if (variant === 'blurred') {
    displayImage = cld
      .image(memory.publicId)
      .effect(blur(800))
      .delivery(format(auto()))
      .delivery(quality(autoQuality()));
  } else if (variant === 'polaroid') {
    displayImage = cld
      .image(memory.publicId)
      .resize(fill().width(400).height(300))
      .delivery(format(auto()))
      .delivery(quality(autoQuality()));
  } else {
    displayImage = cld
      .image(memory.publicId)
      .resize(fill().width(200).height(200))
      .delivery(format(auto()))
      .delivery(quality(autoQuality()));
  }

  return (
    <div className="memory-card" onClick={onClick}>
      <div className="memory-card-image">
        <AdvancedImage
          cldImg={displayImage}
          plugins={[lazyload()]}
          alt={memory.title || `Memory from ${memory.date}`}
        />
        <div className="memory-card-overlay">
          <span className="memory-date">{memory.date}</span>
          {onDelete && (
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(memory.id);
              }}
              title="Delete this memory"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      {showDetails && (
        <div className="memory-card-details">
          {memory.title && <h3>{memory.title}</h3>}
          {memory.description && <p>{memory.description}</p>}
        </div>
      )}
    </div>
  );
}
