# MemoryWall Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Environment Setup
```bash
# In cloudinary-app directory
npm install
```

### Step 2: Cloudinary Configuration
Create `.env` file in `cloudinary-app/`:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

Get these from your [Cloudinary Dashboard](https://cloudinary.com/console/):
1. **Cloud Name**: Settings > Account
2. **Upload Preset**: Settings > Upload > Unsigned

### Step 3: Start Development
```bash
npm run dev
```

Opens at `http://localhost:5173`

## 📁 File Organization

```
src/
├── App.tsx                      # Entry point (exports MemoryWall)
├── MemoryWall.tsx              # Main feature container
├── components/                 # Reusable UI components
│   ├── MemoryCard.tsx
│   ├── MemoryGallery.tsx
│   ├── MemoryViewer.tsx
│   └── Slideshow.tsx
├── utils/                      # Helper functions
│   ├── memoryStorage.ts        # LocalStorage CRUD
│   └── imageTransformations.ts # Cloudinary transforms
└── styles/                     # Component styles
    ├── MemoryCard.css
    ├── MemoryGallery.css
    ├── MemoryViewer.css
    └── Slideshow.css
```

## 🎯 Core Features

| Feature | File | Description |
|---------|------|-------------|
| Photo Upload | `UploadWidget.tsx` | Cloudinary upload widget |
| Thumbnails | `imageTransformations.ts` | Auto 200x200 sizing |
| Blur Effect | `imageTransformations.ts` | 800px strength blur |
| Polaroid View | `MemoryCard.tsx` | 400x300 framed style |
| Slideshow | `Slideshow.tsx` | Auto-play carousel |
| Gallery | `MemoryGallery.tsx` | Date-grouped grid |
| Viewer | `MemoryViewer.tsx` | Full-screen modal |

## 🔑 Key Imports

```typescript
// Cloudinary
import { cld } from './cloudinary/config';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { blur } from '@cloudinary/url-gen/actions/blur';

// React & Utils
import { useState, useEffect } from 'react';
import { getMemories, addMemory, deleteMemory } from './utils/memoryStorage';
```

## 💡 Common Tasks

### Add New Memory Style
1. Add style function to `utils/imageTransformations.ts`
2. Update `Memory` transform types in `types/memory.ts`
3. Add variant to `MemoryCard.tsx` component

### Modify Gallery Layout
- Edit `.gallery-grid` in `styles/MemoryGallery.css`
- Change `grid-template-columns` for responsive breakpoints

### Customize Colors
- Header gradient: `MemoryWall.css` line ~8
- Primary color: `#667eea`, Secondary: `#764ba2`
- Find/Replace throughout CSS for theme changes

### Add New Transformation
```typescript
export function getCustomUrl(publicId: string): string {
  return cld
    .image(publicId)
    .resize(fill().width(300).height(300))
    .delivery(format(auto()))
    .delivery(quality(autoQuality()))
    .toURL();
}
```

## 🐛 Debugging

### Check localStorage
```javascript
// In browser console
JSON.parse(localStorage.getItem('memorywall_memories'))
```

### Verify Cloudinary Connection
1. Check `.env` file has `VITE_CLOUDINARY_CLOUD_NAME`
2. Verify upload preset is unsigned (Settings > Upload)
3. Check browser console for upload errors

### Clear All Data
```javascript
localStorage.removeItem('memorywall_memories')
location.reload()
```

## 📦 Build & Deploy

```bash
# Build production bundle
npm run build

# Preview build locally
npm run preview

# Lint code
npm run lint
```

## 🎨 Styling Tips

### Responsive Breakpoints
- Desktop: Full width layout
- Tablet (≤768px): Adjusted grid, simplified controls
- Mobile (≤480px): 2-column grid, stacked modals

### Color Palette
- **Primary Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Text**: `#333` (dark), `#666` (medium), `#999` (light)
- **Background**: `#f5f5f5` (light), `#ffffff` (white)

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Upload button inactive | Add upload preset to `.env` |
| Images not loading | Check Cloudinary cloud name |
| localStorage full | Browser storage limit ~5-10MB |
| Styles not applying | Clear `.vite` cache, restart dev server |

## 📚 Resources

- [Cloudinary React Docs](https://cloudinary.com/documentation/react_integration)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)

## 🎬 Next Steps

1. ✅ Run development server
2. 📸 Test upload functionality
3. 🎨 Explore different view styles
4. 🎬 Test slideshow feature
5. 📱 Check mobile responsiveness
6. 🚀 Build and deploy

---

**Happy coding! 🎉**
