import React from 'react';

const Footer = ({ config }) => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'problems', label: 'Problems' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="footer-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="#" className="footer-link">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Company Information */}
          <div className="footer-section">
            <h4>Company</h4>
            <div className="company-info">
              {config?.contact?.address && (
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div className="info-text">
                    <div>{config.contact.address.street}</div>
                    <div>{config.contact.address.city}, {config.contact.address.state}</div>
                    <div>{config.contact.address.zip}</div>
                  </div>
                </div>
              )}

              {config?.contact?.phone && (
                <div className="info-item">
                  <span className="info-icon">☎️</span>
                  <a href={`tel:${config.contact.phone}`} className="info-link">
                    {config.contact.phone}
                  </a>
                </div>
              )}

              {config?.contact?.email && (
                <div className="info-item">
                  <span className="info-icon">✉️</span>
                  <a href={`mailto:${config.contact.email}`} className="info-link">
                    {config.contact.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Follow Us */}
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              {config?.social?.email && (
                <a 
                  href={`mailto:${config.social.email}`} 
                  className="social-link"
                  title="Email"
                >
                  <span className="social-icon">📧</span>
                  <span className="social-label">Email</span>
                </a>
              )}

              {config?.social?.linkedin && (
                <a 
                  href={config.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="LinkedIn"
                >
                  <span className="social-icon">💼</span>
                  <span className="social-label">LinkedIn</span>
                </a>
              )}

              {config?.social?.twitter && (
                <a 
                  href={config.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="Twitter"
                >
                  <span className="social-icon">🐦</span>
                  <span className="social-label">Twitter</span>
                </a>
              )}

              <a 
                href="https://hausset.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                title="Website"
              >
                <span className="social-icon">🌐</span>
                <span className="social-label">Website</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-separator"></div>
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} {config?.company?.name || 'Hausset'}. All rights reserved.
            </p>
            {/*<p className="built-with">
              Built with ❤️ and code
            </p>*/}
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--dark-200);
          border-top: 1px solid var(--dark-300);
          padding: var(--spacing-3xl) 0 var(--spacing-xl);
          margin-top: var(--spacing-3xl);
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-2xl);
          margin-bottom: var(--spacing-2xl);
        }

        .footer-section h4 {
          color: var(--text-color);
          margin-bottom: var(--spacing-lg);
          font-size: 1.125rem;
          font-weight: 600;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: var(--spacing-sm);
        }

        .footer-link {
          color: var(--gray-400);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          transition: color var(--transition-fast);
          padding: 0;
          text-align: left;
        }

        .footer-link:hover {
          color: var(--primary-color);
        }

        .company-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
        }

        .info-icon {
          font-size: 1rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .info-text {
          color: var(--gray-400);
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .info-link {
          color: var(--gray-400);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color var(--transition-fast);
        }

        .info-link:hover {
          color: var(--primary-color);
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--gray-400);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color var(--transition-fast);
        }

        .social-link:hover {
          color: var(--primary-color);
        }

        .social-icon {
          font-size: 1rem;
          flex-shrink: 0;
        }

        .social-label {
          font-weight: 500;
        }

        .footer-bottom {
          margin-top: var(--spacing-2xl);
        }

        .footer-separator {
          height: 1px;
          background: var(--dark-300);
          margin-bottom: var(--spacing-lg);
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .copyright,
        .built-with {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin: 0;
        }

        .built-with {
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer {
            padding: var(--spacing-2xl) 0 var(--spacing-lg);
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
            text-align: center;
          }

          .footer-link {
            text-align: center;
          }

          .info-item {
            justify-content: center;
          }

          .social-links {
            align-items: center;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: var(--spacing-sm);
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            gap: var(--spacing-lg);
          }

          .social-links {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;