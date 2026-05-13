export interface Memory {
  id: string;
  publicId: string;
  url: string;
  thumbnailUrl: string;
  date: string; // ISO date string (YYYY-MM-DD)
  title?: string;
  description?: string;
  createdAt: string; // ISO timestamp
  format: string;
  width: number;
  height: number;
}

export interface TransformedImage {
  thumbnail: string;
  blurred: string;
  polaroid: string;
  original: string;
}

export interface SlideshowState {
  isPlaying: boolean;
  currentIndex: number;
  interval: number; // milliseconds
}
