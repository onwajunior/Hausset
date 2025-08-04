import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Solutions from './components/Solutions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { contentService } from './services/contentService';
import './App.css';

function App() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const data = await contentService.getAllContent();
        setContent(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load content:', err);
        setError('Failed to load website content. Please refresh the page.');
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
    return <LoadingSpinner />;
  }

  if (error) {
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
    return null;
  }

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