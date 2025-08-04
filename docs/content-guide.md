# 📁 Content Management Guide

## Overview

Welcome to your Hausset website content management system! This guide will show you how to easily update your website content, images, and settings without touching any code.

## 🗂️ Folder Structure

```
content/
├── config/           # Site configuration
│   └── site.json    # Main site settings
├── images/          # Photos and assets
│   ├── hero-bg.jpg  # Hero background image
│   ├── screenshots/ # Product screenshots
│   └── logos/       # Logo files
├── problems/        # Problem statements
│   └── problems.json
└── products/        # Product information
    └── screenshots.json
```

## ⚙️ Configuration Files

### 📄 `config/site.json`

This is your main configuration file. Update these settings to change your website:

```json
{
  "company": {
    "name": "Hausset",
    "tagline": "Your custom tagline here",
    "description": "Your business description",
    "logo": "/content/images/site/hausset-logo.png",
    "launch_date": "2025"
  },
  "hero": {
    "title": "Your Hero Title",
    "subtitle": "Your subtitle",
    "description": "Hero description text",
    "cta_text": "Get Started",
    "background_image": "/images/hero-bg.jpg"
  },
  "contact": {
    "email": "hello@yourbusiness.com",
    "phone": "+1 (555) 123-4567",
    "address": {
      "street": "123 Your Street",
      "city": "Your City",
      "state": "ST",
      "zip": "12345"
    }
  },
  "social": {
    "twitter": "https://twitter.com/yourbusiness",
    "linkedin": "https://linkedin.com/company/yourbusiness",
    "email": "hello@yourbusiness.com"
  },
  "theme": {
    "primary_color": "#4285f4",
    "background_color": "#0a0a0a",
    "text_color": "#ffffff",
    "accent_color": "#ff6b47"
  }
}
```

### 📄 `problems/problems.json`

Define the problems your business solves:

```json
[
  {
    "id": "unique-problem-id",
    "title": "Problem Title",
    "description": "Detailed problem description",
    "stat": "Key statistic (e.g., '40% of businesses face this')",
    "quote": "Supporting quote or testimonial",
    "background_image": "/content/images/problems/problem-bg.jpg"
  }
]
```

**Note**: Each problem now uses a background image instead of an icon. Add your images to `content/images/problems/` folder.

### 📄 `products/screenshots.json`

Showcase your product features:

```json
[
  {
    "id": "feature-id",
    "title": "Feature Name",
    "description": "Feature description",
    "image": "/images/screenshots/feature.png",
    "features": [
      "Feature benefit 1",
      "Feature benefit 2",
      "Feature benefit 3"
    ]
  }
]
```

## 🖼️ Managing Images

### Adding Images

1. **Create the images folder** (if it doesn't exist):
   ```
   content/images/
   ```

2. **Add your images** to the appropriate subfolder:
   ```
   content/images/
   ├── logo.png           # Your logo
   ├── hero-bg.jpg        # Hero background
   ├── og-image.jpg       # Social media preview
   ├── problems/          # Problem background images
   │   ├── awareness-bg.jpg
   │   ├── reactive-bg.jpg
   │   └── costs-bg.jpg
   └── screenshots/       # Product screenshots
       ├── dashboard.png
       ├── mobile-app.png
       └── analytics.png
   ```

3. **Reference images in JSON files** using the path:
   ```json
   {
     "logo": "/images/logo.png",
     "hero_background": "/images/hero-bg.jpg"
   }
   ```

### Image Guidelines

- **Formats**: Use JPG, PNG, or WebP
- **Hero Background**: 1920x1080px or larger
- **Logo**: PNG with transparent background, 200x60px recommended
- **Screenshots**: 800x600px or larger for clarity
- **File Names**: Use lowercase, hyphens instead of spaces (`hero-bg.jpg`, not `Hero BG.jpg`)

## 🔄 Making Updates

### Method 1: Direct File Editing

1. **Navigate to the content folder** in your file explorer
2. **Open the JSON file** you want to edit in any text editor
3. **Make your changes** (be careful with commas and quotes!)
4. **Save the file**
5. **Refresh your website** - changes appear automatically!

### Method 2: Using a Code Editor (Recommended)

1. **Open VS Code** (or any code editor)
2. **Open the content folder**
3. **Edit the JSON files** with syntax highlighting
4. **Save** - the editor will validate your JSON automatically

## 📝 Common Tasks

### Changing Your Company Name

Edit `content/config/site.json`:
```json
{
  "company": {
    "name": "Your New Company Name"
  }
}
```

### Updating Contact Information

Edit `content/config/site.json`:
```json
{
  "contact": {
    "email": "new-email@yourbusiness.com",
    "phone": "+1 (555) 987-6543"
  }
}
```

### Adding a New Problem Statement

Edit `content/problems/problems.json`:
```json
[
  {
    "id": "new-problem",
    "icon": "⚡",
    "title": "New Problem",
    "description": "Description of the new problem",
    "stat": "Relevant statistic",
    "quote": "Supporting quote"
  }
]
```

### Changing Colors

Edit `content/config/site.json`:
```json
{
  "theme": {
    "primary_color": "#your-new-color",
    "accent_color": "#your-accent-color"
  }
}
```

### Adding Product Screenshots

1. **Add image** to `content/images/screenshots/`
2. **Update** `content/products/screenshots.json`:
```json
[
  {
    "id": "new-feature",
    "title": "New Feature",
    "description": "Feature description",
    "image": "/images/screenshots/new-feature.png",
    "features": ["Benefit 1", "Benefit 2"]
  }
]
```

## ⚠️ Important Rules

### JSON Syntax Rules

1. **Always use double quotes** (`"text"`, not `'text'`)
2. **Include commas** between items (but not after the last item)
3. **No trailing commas** in objects or arrays
4. **Escape special characters** in text:
   - Use `\"` for quotes inside text
   - Use `\\` for backslashes

### Example of CORRECT JSON:
```json
{
  "title": "My \"Amazing\" Product",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ]
}
```

### Example of INCORRECT JSON:
```json
{
  "title": 'My "Amazing" Product',    // Wrong quotes
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3",                      // Trailing comma
  ],                                  // Trailing comma
}
```

## 🔧 Troubleshooting

### Website Not Updating?

1. **Check JSON syntax** - use a JSON validator online
2. **Clear browser cache** (Ctrl+F5 or Cmd+Shift+R)
3. **Check file names** - ensure they match exactly
4. **Check image paths** - make sure images exist at the specified paths

### JSON Syntax Errors?

1. **Use a JSON validator**: Copy your JSON to jsonlint.com
2. **Check for missing commas** between items
3. **Check for extra commas** at the end of lists
4. **Ensure all quotes are properly closed**

### Images Not Loading?

1. **Check file paths** in your JSON files
2. **Verify image files exist** in the images folder
3. **Check file names** - they're case-sensitive
4. **Ensure supported formats** (JPG, PNG, WebP)

## 🚀 Best Practices

### Content Guidelines

1. **Keep descriptions concise** but informative
2. **Use consistent tone** throughout your content
3. **Include relevant statistics** to build credibility
4. **Test on mobile** by resizing your browser window

### File Organization

1. **Use descriptive file names** (`hero-background.jpg`, not `image1.jpg`)
2. **Keep images organized** in appropriate subfolders
3. **Backup your content** regularly
4. **Version control** - keep copies of working configurations

### Performance Tips

1. **Optimize images** before uploading (compress large files)
2. **Use appropriate formats** (JPG for photos, PNG for logos)
3. **Avoid very large images** (>2MB)

## 💡 Pro Tips

1. **Make small changes** and test frequently
2. **Keep a backup** of your working configuration
3. **Use consistent formatting** in your JSON files
4. **Test different screen sizes** when making changes
5. **Update content regularly** to keep your site fresh

## 📞 Need Help?

If you encounter issues:

1. **Check this guide** for common solutions
2. **Validate your JSON** using online tools
3. **Contact support** with specific error messages
4. **Include relevant files** when asking for help

Remember: The website updates automatically when you save changes to the content files. No technical knowledge required!

---

*Happy content managing! 🎉*