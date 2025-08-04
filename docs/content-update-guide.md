# 📝 Content Update Guide

## 🚀 How to Update Your Website Content

Your Hausset website now uses a **hybrid content system** that automatically fetches the latest content from GitHub. Here's how to update your content:

### 📋 **Quick Update Process:**

1. **Edit content files** in the `content/` folder
2. **Commit and push** to GitHub
3. **Website updates automatically** (within 1-2 minutes)

---

## 📁 **Content Files You Can Edit:**

### **Site Configuration** (`content/config/site.json`)
```json
{
  "company": {
    "name": "Hausset",
    "tagline": "One organized hub, home troubles vanished",
    "description": "Transform your home management with smart organization and proactive maintenance tracking"
  },
  "hero": {
    "title": "Hausset",
    "subtitle": "One organized hub, home troubles vanished",
    "description": "Reactive Approach to Home Maintenance is Dangerous and Costly",
    "cta_text": "Get Early Access"
  },
  "contact": {
    "email": "hello@calyptor.net",
    "phone": "+1 (267) 319-9196"
  }
}
```

### **Problems Section** (`content/problems/problems.json`)
```json
[
  {
    "id": "awareness",
    "title": "Lack of Awareness",
    "description": "Homeowners often aren't aware of the installations and systems in their homes",
    "stat": "40% of U.S. homes (~35M) have at least one health or safety hazard",
    "quote": "Most people only discover problems when it's too late",
    "background_image": "/awareness-bg.jpg"
  }
]
```

### **Products Section** (`content/products/screenshots.json`)
```json
{
  "featured": {
    "title": "Smart Home Management",
    "description": "Transform your home with intelligent organization and proactive maintenance tracking",
    "image": "/hausset-icon.png"
  },
  "features": [
    {
      "title": "Proactive Maintenance",
      "description": "Never miss important home maintenance tasks again"
    }
  ]
}
```

---

## 🖼️ **Adding/Updating Images:**

### **Background Images:**
- Place images in `content/images/problems/`
- Update the `background_image` path in `problems.json`
- Push to GitHub

### **Site Images:**
- Place images in `content/images/site/`
- Update references in `site.json`
- Push to GitHub

---

## 🔄 **Update Workflow:**

### **Step 1: Edit Content**
```bash
# Edit any content file
nano content/config/site.json
# or
code content/problems/problems.json
```

### **Step 2: Commit Changes**
```bash
git add .
git commit -m "Update website content: [describe your changes]"
```

### **Step 3: Push to GitHub**
```bash
git push origin main
```

### **Step 4: Website Updates**
- ✅ **Automatic**: Website fetches new content within 1-2 minutes
- ✅ **No deployment needed**: Changes appear automatically
- ✅ **Version controlled**: All changes tracked in Git

---

## 🌐 **How It Works:**

### **Development (localhost:3000):**
- Uses local backend API
- Real-time updates
- Full functionality

### **Production (Vercel):**
1. **Tries local API** (fails - no backend)
2. **Fetches from GitHub** raw content
3. **Falls back to static** if GitHub fails
4. **Displays latest content** automatically

---

## 🛠️ **Troubleshooting:**

### **Content Not Updating?**
1. **Check GitHub**: Ensure files are pushed to `main` branch
2. **Wait 1-2 minutes**: GitHub raw content has slight delay
3. **Clear browser cache**: Hard refresh (Ctrl+F5 / Cmd+Shift+R)
4. **Check console**: Open browser dev tools for error messages

### **Images Not Loading?**
1. **Verify paths**: Ensure image paths in JSON files are correct
2. **Check file names**: Case-sensitive, no spaces
3. **Push images**: Make sure image files are committed to GitHub

### **Contact Form Issues?**
- **Development**: Uses local backend with real email sending
- **Production**: Shows contact information for direct outreach

---

## 📞 **Need Help?**

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your JSON syntax is valid
3. Ensure all files are committed and pushed to GitHub
4. Wait 1-2 minutes for changes to propagate

---

## 🎯 **Best Practices:**

### **Content Updates:**
- ✅ **Small, frequent updates** work best
- ✅ **Test locally** before pushing to production
- ✅ **Use descriptive commit messages**
- ✅ **Keep JSON syntax valid**

### **Image Management:**
- ✅ **Optimize images** for web (compress if needed)
- ✅ **Use consistent naming** conventions
- ✅ **Update JSON references** when changing images

### **Version Control:**
- ✅ **Commit regularly** to track changes
- ✅ **Use meaningful commit messages**
- ✅ **Keep backup** of important content

---

**🎉 You now have a powerful, easy-to-update website that automatically stays current with your content changes!** 