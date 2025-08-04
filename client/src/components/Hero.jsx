import React from 'react';

const Hero = ({ config }) => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        {config?.hero?.background_image && (
          <img 
            src={config.hero.background_image} 
            alt="Hero background"
            className="hero-bg-image"
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          {/* Launch Badge */}
          {config?.company?.launch_date && (
            <div className="launch-badge">
              <span className="badge-text">Soon</span>
              <span className="badge-date">Launch {config.company.launch_date}</span>
            </div>
          )}

          {/* Main Heading */}
          <h1 className="hero-title">
            {config?.hero?.title || config?.company?.name || 'Hausset'}
          </h1>

          {/* Subtitle */}
          <h2 className="hero-subtitle">
            {config?.hero?.subtitle || config?.company?.tagline || 'One organized hub, home troubles vanished'}
          </h2>

          {/* Description */}
          <p className="hero-description">
            {config?.hero?.description || config?.company?.description || 'Transform your home management with smart organization and proactive maintenance tracking.'}
          </p>

          {/* CTA Button */}
          <button 
            onClick={scrollToContact}
            className="btn btn-primary btn-large hero-cta"
          >
            {config?.hero?.cta_text || 'Get Started'}
          </button>

          {/* Features Preview */}
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🏠</span>
              <span>Asset Tracking</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Health Scoring</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔧</span>
              <span>Maintenance Alerts</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          padding-top: 80px; /* Account for fixed header */
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -2;
        }

        .hero-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(10, 10, 10, 0.7) 0%,
            rgba(10, 10, 10, 0.9) 100%
          );
          z-index: -1;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }

        .launch-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: rgba(66, 133, 244, 0.1);
          border: 1px solid var(--primary-color);
          border-radius: 50px;
          padding: var(--spacing-sm) var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .badge-text {
          background: var(--primary-color);
          color: white;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: 20px;
          font-size: 0.75rem;
        }

        .badge-date {
          color: var(--gray-300);
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 700;
          margin-bottom: var(--spacing-md);
          background: linear-gradient(
            135deg,
            var(--text-color) 0%,
            var(--primary-color) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 400;
          color: var(--gray-300);
          margin-bottom: var(--spacing-lg);
        }

        .hero-description {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--gray-400);
          margin-bottom: var(--spacing-2xl);
          line-height: 1.7;
        }

        .hero-cta {
          margin-bottom: var(--spacing-2xl);
          box-shadow: 0 10px 30px rgba(66, 133, 244, 0.3);
        }

        .hero-features {
          display: flex;
          justify-content: center;
          gap: var(--spacing-xl);
          flex-wrap: wrap;
          margin-top: var(--spacing-xl);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--gray-400);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .feature-icon {
          font-size: 1.25rem;
          filter: grayscale(0.3);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-content > * {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .hero-title {
          animation-delay: 0.1s;
        }

        .hero-subtitle {
          animation-delay: 0.2s;
        }

        .hero-description {
          animation-delay: 0.3s;
        }

        .hero-cta {
          animation-delay: 0.4s;
        }

        .hero-features {
          animation-delay: 0.5s;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero {
            min-height: 90vh;
            padding-top: 100px;
          }

          .hero-features {
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-md);
          }

          .hero-content {
            padding: var(--spacing-md);
          }
        }

        @media (max-width: 480px) {
          .launch-badge {
            flex-direction: column;
            gap: var(--spacing-xs);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;