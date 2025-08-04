import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Solutions from './components/Solutions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { contentService } from './services/contentService';
import { staticContent } from './data/staticContent';
import './App.css';

function App() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        console.log('🔄 Starting content load...');
        setLoading(true);
        
        // Check if we're in production
        const isProduction = !window.location.hostname.includes('localhost');
        console.log('🌍 Environment:', isProduction ? 'Production' : 'Development');
        
        const data = await contentService.getAllContent();
        console.log('✅ Content loaded successfully:', data);
        setContent(data);
        setError(null);
      } catch (err) {
        console.error('❌ Failed to load content from API, using static content:', err);
        // Fallback to static content when API is not available (e.g., in production)
        console.log('🔄 Using static content fallback...');
        setContent(staticContent);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Apply theme colors to CSS variables
  useEffect(() => {
    if (content?.config?.theme) {
      const theme = content.config.theme;
      const root = document.documentElement;
      
      root.style.setProperty('--primary-color', theme.primary_color || '#4285f4');
      root.style.setProperty('--background-color', theme.background_color || '#0a0a0a');
      root.style.setProperty('--text-color', theme.text_color || '#ffffff');
      root.style.setProperty('--accent-color', theme.accent_color || '#ff6b47');
    }
  }, [content]);

  if (loading) {
    console.log('⏳ Showing loading spinner...');
    return <LoadingSpinner />;
  }

  if (error) {
    console.log('❌ Showing error:', error);
    return (
      <div className="error-container">
        <div className="error-content">
          <h1>⚠️ Something went wrong</h1>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    console.log('❌ No content available');
    return (
      <div className="error-container">
        <div className="error-content">
          <h1>⚠️ No Content Available</h1>
          <p>Unable to load website content. Please refresh the page.</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  console.log('🎉 Rendering website with content:', content);
  return (
    <div className="App">
      <Header config={content.config} />
      <main>
        <Hero config={content.config} />
        <Problems problems={content.problems} />
        <Solutions products={content.products} />
        <Contact config={content.config} />
      </main>
      <Footer config={content.config} />
    </div>
  );
}

export default App;