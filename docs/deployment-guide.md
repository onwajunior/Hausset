# 🚀 Deployment Guide

## Quick Start

### Development (Local Testing)

```bash
# Install all dependencies
npm run install:all

# Start development servers (frontend + backend)
npm run dev

# Watch content changes (in another terminal)
npm run content:watch
```

Your website will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Setup Instructions

### 1. Initial Setup

```bash
# Clone or download your website files
cd hausset-website

# Install all dependencies
npm run install:all

# Copy environment variables
cp server/.env.example server/.env
```

### 2. Configure Environment

Edit `server/.env` with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Email Configuration (choose one method)

# Method 1: Gmail SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Method 2: SendGrid
# SENDGRID_API_KEY=your-sendgrid-api-key

# Method 3: Mailgun  
# MAILGUN_API_KEY=your-mailgun-api-key
# MAILGUN_DOMAIN=your-mailgun-domain

# Contact Form
CONTACT_EMAIL=hello@hausset.com

# Content Management
CONTENT_PATH=../content
AUTO_REBUILD=true
```

### 3. Content Setup

Add your content files to the `content/` folder:

```
content/
├── config/site.json      # Your site configuration
├── problems/problems.json # Problem statements
├── products/screenshots.json # Product information
└── images/               # Your images and screenshots
```

See the [Content Guide](./content-guide.md) for detailed instructions.

### 4. Test Locally

```bash
# Start development environment
npm run dev

# In another terminal, watch for content changes
npm run content:watch
```

Visit http://localhost:3000 to see your website.

## 🌐 Hosting Options

### Option 1: Vercel (Recommended)

Vercel offers excellent performance and automatic deployments.

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure build settings** in Vercel dashboard:
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm run install:all`

4. **Set environment variables** in Vercel dashboard using your `.env` file values.

### Option 2: Netlify

Great for static hosting with serverless functions.

1. **Connect your repository** to Netlify
2. **Configure build settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `client/dist`
3. **Add environment variables** in Netlify dashboard

### Option 3: Heroku

Traditional server hosting with full backend support.

1. **Install Heroku CLI**
2. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```
3. **Configure environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set EMAIL_USER=your-email@gmail.com
   # Add all your environment variables
   ```
4. **Deploy**:
   ```bash
   git push heroku main
   ```

### Option 4: DigitalOcean/VPS

For full control over your hosting environment.

1. **Create a VPS instance**
2. **Install Node.js and PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```
3. **Upload your code** and run:
   ```bash
   npm run install:all
   npm run build
   pm2 start server/server.js --name hausset-website
   ```

## 🔧 Advanced Configuration

### Custom Domain Setup

1. **Point your domain** to your hosting provider
2. **Configure SSL certificate** (usually automatic with modern hosts)
3. **Update environment variables** if needed for production domain

### Email Service Setup

Choose one of these email services:

#### Gmail SMTP (Easiest)
1. **Enable 2-factor authentication** on your Gmail account
2. **Generate an app password**: https://myaccount.google.com/apppasswords
3. **Use the app password** in your `.env` file:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

#### SendGrid (Recommended for Production)
1. **Sign up for SendGrid**: https://sendgrid.com/
2. **Create an API key**
3. **Add to environment**:
   ```env
   SENDGRID_API_KEY=your-sendgrid-api-key
   ```

#### Mailgun (Alternative)
1. **Sign up for Mailgun**: https://www.mailgun.com/
2. **Get your API key and domain**
3. **Add to environment**:
   ```env
   MAILGUN_API_KEY=your-mailgun-api-key
   MAILGUN_DOMAIN=your-mailgun-domain
   ```

### Performance Optimization

1. **Enable compression** (most hosts enable this automatically)
2. **Use a CDN** for images (Cloudflare, AWS CloudFront)
3. **Optimize images** before uploading to `content/images/`
4. **Monitor performance** with Google PageSpeed Insights

### Security Best Practices

1. **Keep dependencies updated**:
   ```bash
   npm audit
   npm update
   ```

2. **Use environment variables** for all sensitive data
3. **Enable HTTPS** (SSL certificate)
4. **Set up proper CORS** (already configured in the server)
5. **Use rate limiting** (already implemented)

## 📊 Monitoring & Analytics

### Google Analytics Setup

1. **Create Google Analytics account**
2. **Add tracking code** to `client/index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

### Error Monitoring

Consider adding error monitoring services:
- **Sentry**: For error tracking
- **LogRocket**: For user session recording
- **Hotjar**: For user behavior analytics

## 🔄 Continuous Deployment

### GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Hausset Website

on:
  push:
    branches: [ main ]
  
jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm run install:all
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear caches and reinstall
rm -rf node_modules client/node_modules server/node_modules
rm package-lock.json client/package-lock.json server/package-lock.json
npm run install:all
```

#### Email Not Working
1. **Check environment variables** are set correctly
2. **Test email configuration**:
   ```bash
   curl http://localhost:5000/api/contact/test-email
   ```
3. **Check spam folder** for test emails
4. **Verify email service credentials**

#### Content Not Updating
1. **Check JSON syntax** using jsonlint.com
2. **Clear browser cache** (Ctrl+F5)
3. **Check file paths** are correct
4. **Restart the server** if needed

#### Performance Issues
1. **Optimize images** (compress large files)
2. **Check hosting resources** (CPU, memory)
3. **Use browser dev tools** to identify bottlenecks
4. **Enable caching** at hosting level

### Getting Help

1. **Check the logs** for error messages
2. **Review this documentation** for common solutions
3. **Test in development** environment first
4. **Contact support** with specific error messages and steps to reproduce

## 📋 Deployment Checklist

Before going live:

- [ ] All content files are properly formatted and validated
- [ ] Images are optimized and properly referenced
- [ ] Email service is configured and tested
- [ ] Contact form works and sends emails
- [ ] Website is responsive on mobile devices
- [ ] All links work correctly
- [ ] Google Analytics is set up (if desired)
- [ ] SSL certificate is active
- [ ] Custom domain is configured
- [ ] Environment variables are set for production
- [ ] Backup of content files is created

## 🎉 You're Live!

Congratulations! Your Hausset website is now live and ready for visitors. Remember:

- **Update content regularly** using the content management system
- **Monitor website performance** and user feedback
- **Keep dependencies updated** for security
- **Backup your content** before making major changes

Happy launching! 🚀