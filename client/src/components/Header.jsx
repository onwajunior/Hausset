import React, { useState, useEffect } from 'react';

const Header = ({ config }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'problems', label: 'Problems' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <img 
              src={config?.company?.logo || '/hausset-logo.png'} 
              alt={config?.company?.name || 'Hausset'}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="logo-text">{config?.company?.name || 'Hausset'}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="nav-link-mobile"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(10px);
          transition: all var(--transition-normal);
          border-bottom: 1px solid transparent;
        }

        .header-scrolled {
          background: rgba(10, 10, 10, 0.95);
          border-bottom-color: var(--dark-300);
          box-shadow: var(--shadow-lg);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md) 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .logo img {
          height: 40px;
          width: auto;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-color);
        }

        .nav-desktop {
          display: flex;
          gap: var(--spacing-xl);
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--gray-300);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: color var(--transition-fast);
          padding: var(--spacing-sm) 0;
          position: relative;
        }

        .nav-link:hover {
          color: var(--primary-color);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-color);
          transition: width var(--transition-fast);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--spacing-sm);
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          width: 24px;
          height: 18px;
          justify-content: space-between;
        }

        .hamburger span {
          display: block;
          height: 2px;
          background: var(--text-color);
          transition: all var(--transition-fast);
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .nav-mobile {
          display: none;
          flex-direction: column;
          background: var(--dark-100);
          border-top: 1px solid var(--dark-300);
          margin-top: var(--spacing-md);
          border-radius: var(--radius-md);
          overflow: hidden;
          max-height: 0;
          transition: max-height var(--transition-normal);
        }

        .nav-mobile.open {
          display: flex;
          max-height: 300px;
        }

        .nav-link-mobile {
          background: none;
          border: none;
          color: var(--text-color);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          padding: var(--spacing-md);
          text-align: left;
          transition: background-color var(--transition-fast);
          border-bottom: 1px solid var(--dark-300);
        }

        .nav-link-mobile:last-child {
          border-bottom: none;
        }

        .nav-link-mobile:hover {
          background: var(--dark-200);
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }

          .nav-mobile {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;