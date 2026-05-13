import { useState, useEffect } from 'react';
import { UploadWidget } from './cloudinary/UploadWidget';
import type { CloudinaryUploadResult } from './cloudinary/UploadWidget';
import { MemoryGallery } from './components/MemoryGallery';
import { Slideshow } from './components/Slideshow';
import { MemoryViewer } from './components/MemoryViewer';
import { addMemory, getMemories, deleteMemory } from './utils/memoryStorage';
import type { Memory } from './types/memory';
import './MemoryWall.css';

type Tab = 'gallery' | 'slideshow';

export function MemoryWall() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('gallery');
  const [viewStyle, setViewStyle] = useState<'thumbnail' | 'polaroid' | 'blurred'>('thumbnail');
  const [isUploading, setIsUploading] = useState(false);

  // Load memories on mount
  useEffect(() => {
    setMemories(getMemories());
  }, []);

  const handleUploadSuccess = (result: CloudinaryUploadResult) => {
    setIsUploading(false);
    const newMemory = addMemory(
      result.public_id,
      result.secure_url,
      {
        format: result.format,
        width: result.width,
        height: result.height,
      },
      `Memory from ${new Date().toISOString().split('T')[0]}`
    );
    setMemories((prev) => [newMemory, ...prev]);
  };

  const handleUploadError = (error: Error) => {
    setIsUploading(false);
    console.error('Upload error:', error);
    alert(`Upload failed: ${error.message}`);
  };

  const handleDeleteMemory = (id: string) => {
    if (confirm('Delete this memory? This action cannot be undone.')) {
      deleteMemory(id);
      setMemories((prev) => prev.filter((m) => m.id !== id));
      if (selectedMemory?.id === id) {
        setSelectedMemory(null);
      }
    }
  };

  const handleNextMemory = () => {
    if (!selectedMemory) return;
    const index = memories.findIndex((m) => m.id === selectedMemory.id);
    if (index < memories.length - 1) {
      setSelectedMemory(memories[index + 1]);
    }
  };

  const handlePrevMemory = () => {
    if (!selectedMemory) return;
    const index = memories.findIndex((m) => m.id === selectedMemory.id);
    if (index > 0) {
      setSelectedMemory(memories[index - 1]);
    }
  };

  return (
    <div className="memorywall">
      <header className="memorywall-header">
        <div className="header-content">
          <h1 className="header-title">📸 MemoryWall</h1>
          <p className="header-subtitle">Transform everyday moments into curated memories</p>
        </div>
      </header>

      <main className="memorywall-main">
        <section className="upload-section">
          <div className="upload-container">
            <h2>Add a Photo to Your Journal</h2>
            <div className="upload-widget-wrapper">
              <UploadWidget
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                buttonText={isUploading ? 'Uploading...' : '📷 Upload Photo'}
                className="upload-btn"
              />
            </div>
            <p className="upload-hint">
              Photos are automatically organized by date and enhanced with multiple viewing styles
            </p>
          </div>
        </section>

        {memories.length > 0 && (
          <>
            <section className="controls-section">
              <div className="controls-container">
                <div className="tabs">
                  <button
                    className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('gallery')}
                  >
                    📷 Gallery
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'slideshow' ? 'active' : ''}`}
                    onClick={() => setActiveTab('slideshow')}
                  >
                    ▶ Slideshow
                  </button>
                </div>

                {activeTab === 'gallery' && (
                  <div className="view-styles">
                    <label>View Style:</label>
                    <select
                      value={viewStyle}
                      onChange={(e) => setViewStyle(e.target.value as typeof viewStyle)}
                      className="style-select"
                    >
                      <option value="thumbnail">Standard Thumbnails</option>
                      <option value="polaroid">Polaroid Style</option>
                      <option value="blurred">Blurred (Privacy)</option>
                    </select>
                  </div>
                )}
              </div>
            </section>

            <section className="content-section">
              {activeTab === 'gallery' ? (
                <MemoryGallery
                  memories={memories}
                  onMemoryClick={setSelectedMemory}
                  onMemoryDelete={handleDeleteMemory}
                  variant={viewStyle}
                />
              ) : (
                <Slideshow memories={memories} autoPlay={true} interval={4000} />
              )}
            </section>
          </>
        )}

        {memories.length === 0 && (
          <section className="empty-state">
            <div className="empty-content">
              <h2>Start Your Memory Journal</h2>
              <p>Upload your first photo to begin creating beautiful memories!</p>
              <div className="features-preview">
                <div className="feature">
                  <span className="feature-icon">🖼️</span>
                  <p>Auto-generated thumbnails</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎨</span>
                  <p>Polaroid transformations</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🔒</span>
                  <p>Blur sensitive content</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎬</span>
                  <p>Animated slideshows</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">📅</span>
                  <p>Date-based organization</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {selectedMemory && (
        <MemoryViewer
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          onNext={handleNextMemory}
          onPrev={handlePrevMemory}
        />
      )}
    </div>
  );
}

export default MemoryWall;
