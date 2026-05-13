import { useState } from 'react';
import type { Memory } from '../types/memory';
import { MemoryCard } from './MemoryCard';
import '../styles/MemoryGallery.css';

interface MemoryGalleryProps {
  memories: Memory[];
  onMemoryClick?: (memory: Memory) => void;
  onMemoryDelete?: (id: string) => void;
  variant?: 'thumbnail' | 'polaroid' | 'blurred';
}

export function MemoryGallery({
  memories,
  onMemoryClick,
  onMemoryDelete,
  variant = 'thumbnail',
}: MemoryGalleryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group memories by date
  const groupedByDate = memories.reduce<Record<string, Memory[]>>((acc, memory) => {
    const date = memory.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(memory);
    return acc;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedByDate).sort().reverse();

  if (memories.length === 0) {
    return (
      <div className="memory-gallery">
        <div className="gallery-empty">
          <p>No memories yet. Start by uploading your first photo! 📷</p>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-gallery">
      {sortedDates.map((date) => (
        <section key={date} className="gallery-section">
          <h3 className="gallery-date-header">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
          <div className="gallery-grid">
            {groupedByDate[date].map((memory) => (
              <div
                key={memory.id}
                className={`gallery-item ${expandedId === memory.id ? 'expanded' : ''}`}
              >
                <MemoryCard
                  memory={memory}
                  variant={variant}
                  onClick={() => {
                    setExpandedId(expandedId === memory.id ? null : memory.id);
                    onMemoryClick?.(memory);
                  }}
                  onDelete={onMemoryDelete}
                  showDetails={expandedId === memory.id}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
