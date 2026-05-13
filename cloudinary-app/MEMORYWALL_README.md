# MemoryWall – Smart Photo Journal

A personal photo journal application that transforms everyday moments into curated memories using Cloudinary's powerful image transformation and management capabilities.

## 🎯 Pitch

*"A personal photo journal that transforms everyday moments into curated memories."*

## ✨ Features

### 📸 Photo Upload
- Easy-to-use upload widget powered by Cloudinary
- Support for multiple upload sources (local files, camera, URL)
- Automatic metadata extraction (format, dimensions, etc.)
- Real-time upload feedback

### 🖼️ Auto-Generated Thumbnails
- Automatic creation of thumbnail versions
- Optimized image sizes for faster loading
- Responsive image delivery with quality optimization

### 🔒 Blur Sensitive Backgrounds
- Privacy-focused image transformation
- Blur effect for sensitive content
- One-click privacy toggle in the viewer

### 🎨 Polaroid Style Transformations
- Vintage-inspired polaroid formatting
- Fixed-size frames with styling
- Perfect for creating a scrapbook aesthetic

### 🎬 Animated Slideshows
- Auto-play slideshow mode
- Manual navigation controls
- Visual indicators for current position
- Customizable transition speed

### 📅 Date-Based Organization
- Automatic organization by upload date
- Chronological grouping in gallery view
- Easy date filtering and search
- Month-based memory browsing

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MemoryCard.tsx       # Individual memory display card
│   ├── MemoryGallery.tsx    # Gallery grid with date grouping
│   ├── MemoryViewer.tsx     # Full-screen memory viewer
│   └── Slideshow.tsx        # Animated slideshow player
├── cloudinary/
│   ├── config.ts            # Cloudinary setup and configuration
│   └── UploadWidget.tsx      # Upload widget component
├── types/
│   └── memory.ts            # TypeScript type definitions
├── utils/
│   ├── memoryStorage.ts     # LocalStorage management for memories
│   └── imageTransformations.ts  # Cloudinary image transformation utilities
├── styles/
│   ├── MemoryCard.css
│   ├── MemoryGallery.css
│   ├── MemoryViewer.css
│   └── Slideshow.css
├── App.tsx                  # Main app component
├── MemoryWall.tsx           # MemoryWall feature component
└── main.tsx                 # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19.0 or >=22.12.0
- Cloudinary account

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cloudinary-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Cloudinary**
   Create a `.env` file in the root directory:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Key Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Cloudinary React SDK** - Image management and transformations
- **CSS3** - Responsive styling with gradients and animations

## 🎨 UI Features

### Responsive Design
- Mobile-first design approach
- Fully responsive grid layouts
- Touch-friendly controls
- Adaptive typography

### Visual Themes
- Modern gradient backgrounds
- Smooth animations and transitions
- Intuitive icon-based navigation
- Accessibility-focused color contrasts

### User Experience
- Empty state guidance
- Loading indicators
- Delete confirmation dialogs
- Keyboard navigation (Escape to close, arrows to navigate)

## 💾 Data Storage

- Memories stored in browser's localStorage
- Persists across sessions
- Includes metadata (date, title, description)
- Each memory maintains reference to Cloudinary public_id

## 🔄 Image Transformation Pipeline

1. **Upload**: User selects and uploads image via Cloudinary widget
2. **Storage**: Metadata stored locally, image hosted on Cloudinary
3. **Optimization**: Multiple transform URLs created on-demand:
   - Thumbnail (200x200)
   - Blurred version (800px blur)
   - Polaroid style (400x300 with border)
   - Full-size optimized

## 🎯 Usage Tips

- **Gallery View**: Browse memories by date with multiple viewing styles
- **Slideshow Mode**: Auto-play memories with manual controls
- **Full Viewer**: Click any memory for detailed view with transformation options
- **Privacy**: Use blurred view for sensitive background content
- **Keyboard Shortcuts**:
  - ESC: Close viewer
  - Arrow Keys: Navigate between memories in viewer

## 🛠️ Development

### ESLint Configuration
The project uses ESLint with React hooks and refresh plugins for code quality.

### TypeScript
Strict type checking enabled for maximum type safety.

### Build Output
- Optimized bundle with automatic code splitting
- Lazy loading for component rendering
- Image optimization through Cloudinary URLs

## 📄 License

This project is part of the Cloudinary integration examples.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📞 Support

For issues or questions:
1. Check Cloudinary documentation: https://cloudinary.com/documentation
2. Review React documentation: https://react.dev
3. Check TypeScript documentation: https://www.typescriptlang.org

---

**Built with ❤️ using Cloudinary and React**
