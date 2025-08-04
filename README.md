# Hausset Website

## One organized hub, home troubles vanished

A modern, responsive website for Hausset - the home organization and safety management platform.

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Start development servers (both frontend and backend)
npm run dev

# Content management - watch for changes
npm run content:watch
```

## Project Structure

```
/
├── client/                 # React frontend
├── server/                 # Express backend  
├── content/               # 📁 YOUR CONTENT FOLDER
│   ├── config/           # Site configuration
│   ├── images/           # Photos and assets
│   ├── problems/         # Problem statements
│   └── products/         # Product screenshots
├── scripts/              # Build and deployment
└── docs/                 # Instructions and guides
```

## ✨ Easy Content Management

Drop files in the `content/` folder and your website updates automatically!

See `docs/content-guide.md` for detailed instructions.

## Development

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Content updates: Real-time with file watching

## Deployment

The site automatically rebuilds and deploys when you update content files.