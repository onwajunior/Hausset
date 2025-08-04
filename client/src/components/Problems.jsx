import React from 'react';

const Problems = ({ problems = [] }) => {
  if (!problems.length) {
    return null;
  }

  return (
    <section id="problems" className="problems section">
      <div className="container">
        <div className="section-header">
          <h2>Current Market Challenges</h2>
          <p className="section-subtitle">
            Understanding the problems homeowners face every day
          </p>
        </div>

        <div className="problems-grid">
          {problems.map((problem, index) => (
            <div key={problem.id || index} className="problem-card card">
              {problem.background_image && (
                <div className="problem-background">
                  <img 
                    src={problem.background_image} 
                    alt={problem.title}
                    className="problem-bg-image"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div className="problem-overlay"></div>
                </div>
              )}
              
              <div className="problem-content">
                <h3 className="problem-title">{problem.title}</h3>
                
                <p className="problem-description">
                  {problem.description}
                </p>
                
                {problem.stat && (
                  <div className="problem-stat">
                    <strong>{problem.stat}</strong>
                  </div>
                )}
                
                {problem.quote && (
                  <blockquote className="problem-quote">
                    "{problem.quote}"
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Overall impact statement */}
        <div className="impact-statement">
          <h3>The Real Impact</h3>
          <p>
            These challenges result in billions of dollars in emergency repairs, 
            health risks, and property damage that could be prevented with proper organization and maintenance.
          </p>
          
          <div className="impact-stats">
            <div className="impact-stat">
              <div className="stat-number">$200B+</div>
              <div className="stat-label">Annual U.S. emergency repairs</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number">125K+</div>
              <div className="stat-label">Deaths from home accidents</div>
            </div>
            <div className="impact-stat">
              <div className="stat-number">40%</div>
              <div className="stat-label">Homes with safety hazards</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .problems {
          background: linear-gradient(
            135deg,
            var(--background-color) 0%,
            var(--dark-100) 100%
          );
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: var(--gray-400);
          max-width: 600px;
          margin: 0 auto;
        }

        .problems-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-3xl);
        }

        .problem-card {
          text-align: center;
          position: relative;
          overflow: hidden;
          min-height: 400px;
          display: flex;
          align-items: end;
        }

        .problem-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--accent-color) 0%,
            var(--primary-color) 100%
          );
          transform: scaleX(0);
          transition: transform var(--transition-normal);
          z-index: 3;
        }

        .problem-card:hover::before {
          transform: scaleX(1);
        }

        .problem-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .problem-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-normal);
        }

        .problem-card:hover .problem-bg-image {
          transform: scale(1.05);
        }

        .problem-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(10, 10, 10, 0.3) 0%,
            rgba(10, 10, 10, 0.7) 50%,
            rgba(10, 10, 10, 0.9) 100%
          );
          transition: background var(--transition-normal);
        }

        .problem-card:hover .problem-overlay {
          background: linear-gradient(
            180deg,
            rgba(10, 10, 10, 0.4) 0%,
            rgba(10, 10, 10, 0.8) 50%,
            rgba(10, 10, 10, 0.95) 100%
          );
        }

        .problem-content {
          position: relative;
          z-index: 2;
          padding: var(--spacing-xl);
          width: 100%;
        }

        .problem-title {
          color: var(--text-color);
          margin-bottom: var(--spacing-md);
          font-size: 1.5rem;
        }

        .problem-description {
          color: var(--gray-300);
          margin-bottom: var(--spacing-lg);
          line-height: 1.6;
        }

        .problem-stat {
          background: rgba(255, 107, 71, 0.1);
          border: 1px solid var(--accent-color);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          color: var(--accent-color);
          font-weight: 600;
        }

        .problem-quote {
          font-style: italic;
          color: var(--gray-400);
          border-left: 4px solid var(--primary-color);
          padding-left: var(--spacing-md);
          margin: 0;
          font-size: 0.9rem;
        }

        .impact-statement {
          background: var(--dark-200);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl);
          text-align: center;
          border: 1px solid var(--dark-300);
        }

        .impact-statement h3 {
          color: var(--accent-color);
          margin-bottom: var(--spacing-lg);
          font-size: 2rem;
        }

        .impact-statement p {
          color: var(--gray-300);
          font-size: 1.125rem;
          margin-bottom: var(--spacing-2xl);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .impact-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-xl);
        }

        .impact-stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-color);
          margin-bottom: var(--spacing-sm);
        }

        .stat-label {
          color: var(--gray-400);
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Animation on scroll */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .problem-card {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .problem-card:nth-child(1) { animation-delay: 0.1s; }
        .problem-card:nth-child(2) { animation-delay: 0.2s; }
        .problem-card:nth-child(3) { animation-delay: 0.3s; }

        /* Responsive Design */
        @media (max-width: 768px) {
          .problems-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }

          .impact-stats {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }

          .stat-number {
            font-size: 2rem;
          }

          .impact-statement {
            padding: var(--spacing-xl);
          }
        }

        @media (max-width: 480px) {
          .problem-icon {
            font-size: 2.5rem;
          }

          .problem-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Problems;