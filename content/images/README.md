# 📸 Images Folder

This folder contains all the images and assets for your Hausset website.

## 📁 Folder Structure

```
images/
├── README.md           # This file
├── hausset-logo.png    # Your company logo
├── hero-bg.jpg         # Hero section background
├── hausset-og-image.jpg # Social media preview image
├── hausset-favicon.svg # Website icon
├── problems/           # Problem section background images
│   ├── README.md       # Problem images guide
│   ├── awareness-bg.jpg    # Lack of Awareness background
│   ├── reactive-bg.jpg     # Reactive Mindset background
│   └── costs-bg.jpg        # High Costs & Risks background
└── screenshots/        # Product screenshots
    ├── home-dashboard.png
    ├── asset-detail.png
    └── analytics.png
```

## 🖼️ Image Guidelines

### Logo (`hausset-logo.png`)
- **Format**: PNG with transparent background
- **Size**: 200x60px recommended
- **Usage**: Header, favicon base, branding

### Hero Background (`hero-bg.jpg`)
- **Format**: JPG or WebP
- **Size**: 1920x1080px or larger
- **Usage**: Hero section background
- **Style**: Should complement your brand colors

### Product Screenshots (`screenshots/`)
- **Format**: PNG for UI elements, JPG for photos
- **Size**: 800x600px minimum for clarity
- **Usage**: Solutions section showcasing features
- **Style**: Clean, high-quality, representative of actual product

### Social Media Image (`hausset-og-image.jpg`)
- **Format**: JPG
- **Size**: 1200x630px (Facebook/LinkedIn standard)
- **Usage**: Preview when sharing on social media
- **Content**: Should include your logo and key messaging

### Favicon (`hausset-favicon.svg`)
- **Format**: SVG (scalable) or PNG
- **Size**: 32x32px minimum, scalable preferred
- **Usage**: Browser tab icon
- **Style**: Simple, recognizable at small sizes

## 🎨 Design Tips

1. **Consistent Style**: Use consistent colors, fonts, and styling across all images
2. **High Quality**: Use high-resolution images for crisp display on all devices
3. **Optimized Size**: Compress images for web (aim for <500KB per image)
4. **Accessibility**: Ensure good contrast and readability
5. **Brand Aligned**: All images should reflect your brand personality

## 📐 Recommended Tools

- **Photo Editing**: Canva, Figma, Photoshop, GIMP
- **Image Compression**: TinyPNG, ImageOptim, Squoosh
- **Screenshots**: CleanShot X, Lightshot, built-in OS tools
- **AI Generation**: Midjourney, DALL-E, Stable Diffusion

## 🔄 Adding New Images

1. **Add image file** to appropriate subfolder
2. **Update references** in JSON configuration files
3. **Use correct path** format: `/images/filename.jpg`
4. **Test on website** to ensure proper loading

## ⚠️ Important Notes

- File paths are case-sensitive
- Use web-safe formats (JPG, PNG, WebP, SVG)
- Keep file names descriptive and without spaces
- All images are publicly accessible via web URLs

## 📝 Current Image References

Based on your current configuration, these images are expected:

- `/images/hausset-logo.png` - Used in header
- `/images/hero-bg.jpg` - Hero section background
- `/content/images/problems/awareness-bg.jpg` - Lack of Awareness problem background
- `/content/images/problems/reactive-bg.jpg` - Reactive Mindset problem background  
- `/content/images/problems/costs-bg.jpg` - High Costs & Risks problem background
- `/images/screenshots/home-dashboard.png` - Product showcase
- `/images/screenshots/asset-detail.png` - Product showcase
- `/images/screenshots/analytics.png` - Product showcase

Make sure these files exist and match the names exactly as referenced in your JSON files.