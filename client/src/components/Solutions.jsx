import React, { useState } from 'react';

const Solutions = ({ products = [] }) => {
  const [selectedProduct, setSelectedProduct] = useState(0);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!products.length) {
    return (
      <section id="solutions" className="solutions section">
        <div className="container">
          <div className="section-header">
            <h2>Our Solution</h2>
            <p>Experience the platform that transforms home management</p>
          </div>
          <div className="cta-section">
            <button onClick={scrollToContact} className="btn btn-primary btn-large">
              Get Early Access
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="solutions" className="solutions section">
      <div className="container">
        <div className="section-header">
          <h2>Our Product</h2>
          <p className="section-subtitle">
            Our solution provides homeowners with a single, organized hub to eliminate home troubles.
            Giving users peace of mind and a stress-free home.
          </p>
          
          {/*<button onClick={scrollToContact} className="btn btn-primary btn-large cta-button">
            Get started for free
          </button>*/}
        </div>

        <div className="solutions-showcase">
          {/* Phone Mockup */}
          <div className="phone-mockup">
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="status-bar">
                    <span className="time">09:51</span>
                    <div className="status-icons">
                      <span className="signal">••••</span>
                      <span className="wifi">📶</span>
                      <span className="battery">🔋 100%</span>
                    </div>
                  </div>
                  
                  {products[selectedProduct] && (
                    <div className="screen-header">
                      <div className="user-info">
                        <div className="avatar"></div>
                        <span className="address">123 Main Street, Tracy, CA</span>
                        <span className="edit-icon">✏️</span>
                        <span className="notification-icon">🔔</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="phone-content">
                  {products[selectedProduct] && (
                    <>
                      <div className="content-header">
                        <h3>{products[selectedProduct].title}</h3>
                        <p className="content-subtitle">Analytics & Insights</p>
                      </div>

                      <div className="feature-showcase">
                        {products[selectedProduct].features?.map((feature, index) => (
                          <div key={index} className="feature-item">
                            <span className="feature-bullet">•</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mock-ui">
                        <div className="ui-card">
                          <div className="ui-icon">🏠</div>
                          <div className="ui-text">
                            <div className="ui-title">Overall Asset Health</div>
                            <div className="ui-value">87%</div>
                          </div>
                        </div>
                        
                        <div className="ui-stats">
                          <div className="stat-item">
                            <div className="stat-label">Total Spent</div>
                            <div className="stat-value">$2850</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Assets</div>
                            <div className="stat-value">24</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="phone-footer">
                  <div className="nav-tabs">
                    <div className="nav-tab active">
                      <span className="nav-icon">🏠</span>
                      <span className="nav-label">Home</span>
                    </div>
                    <div className="nav-tab">
                      <span className="nav-icon">📄</span>
                      <span className="nav-label">Asset</span>
                    </div>
                    <div className="nav-tab">
                      <span className="nav-icon">🔧</span>
                      <span className="nav-label">Services</span>
                    </div>
                    <div className="nav-tab">
                      <span className="nav-icon">🛡️</span>
                      <span className="nav-label">Warranty</span>
                    </div>
                    <div className="nav-tab">
                      <span className="nav-icon">📊</span>
                      <span className="nav-label">Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Navigation */}
          {products.length > 1 && (
            <div className="product-navigation">
              {products.map((product, index) => (
                <button
                  key={product.id || index}
                  className={`product-nav-btn ${selectedProduct === index ? 'active' : ''}`}
                  onClick={() => setSelectedProduct(index)}
                >
                  {product.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .solutions {
          background: var(--background-color);
          position: relative;
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: var(--gray-300);
          line-height: 1.7;
          margin-bottom: var(--spacing-2xl);
        }

        .cta-button {
          margin-bottom: var(--spacing-2xl);
          box-shadow: 0 10px 30px rgba(66, 133, 244, 0.3);
        }

        .solutions-showcase {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2xl);
        }

        .phone-mockup {
          position: relative;
          transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
          transition: transform var(--transition-normal);
        }

        .phone-mockup:hover {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
        }

        .phone-frame {
          width: 320px;
          height: 640px;
          background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
          border-radius: 40px;
          padding: 8px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 2px rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .phone-frame::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -4px;
          width: 4px;
          height: 40px;
          background: #333;
          border-radius: 2px;
          transform: translateY(-50%);
        }

        .phone-frame::after {
          content: '';
          position: absolute;
          top: 30%;
          right: -4px;
          width: 4px;
          height: 60px;
          background: #333;
          border-radius: 2px;
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          background: var(--dark-100);
          border-radius: 32px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .phone-header {
          background: var(--dark-200);
          border-bottom: 1px solid var(--dark-300);
        }

        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 20px;
          font-size: 0.75rem;
          color: var(--text-color);
          font-weight: 600;
        }

        .status-icons {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .screen-header {
          padding: 16px 20px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
          border-radius: 50%;
        }

        .address {
          flex: 1;
          font-size: 0.875rem;
          color: var(--text-color);
          font-weight: 500;
        }

        .phone-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .content-header h3 {
          font-size: 1.5rem;
          color: var(--text-color);
          margin-bottom: 4px;
        }

        .content-subtitle {
          color: var(--gray-400);
          font-size: 0.875rem;
          margin-bottom: var(--spacing-lg);
        }

        .feature-showcase {
          margin-bottom: var(--spacing-lg);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 0.875rem;
          color: var(--gray-300);
        }

        .feature-bullet {
          color: var(--primary-color);
          font-weight: bold;
        }

        .mock-ui {
          space-y: var(--spacing-md);
        }

        .ui-card {
          background: var(--dark-200);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .ui-icon {
          font-size: 1.5rem;
        }

        .ui-text {
          flex: 1;
        }

        .ui-title {
          font-size: 0.875rem;
          color: var(--gray-400);
        }

        .ui-value {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary-color);
        }

        .ui-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .stat-item {
          background: var(--dark-200);
          border-radius: 8px;
          padding: 12px;
          text-align: center;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--gray-400);
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-color);
        }

        .phone-footer {
          background: var(--dark-200);
          border-top: 1px solid var(--dark-300);
        }

        .nav-tabs {
          display: flex;
          justify-content: space-around;
          padding: 12px 8px 20px;
        }

        .nav-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          opacity: 0.6;
          transition: opacity var(--transition-fast);
        }

        .nav-tab.active {
          opacity: 1;
        }

        .nav-icon {
          font-size: 1.125rem;
        }

        .nav-label {
          font-size: 0.625rem;
          color: var(--text-color);
          font-weight: 500;
        }

        .nav-tab.active .nav-label {
          color: var(--primary-color);
        }

        .product-navigation {
          display: flex;
          gap: var(--spacing-md);
          flex-wrap: wrap;
          justify-content: center;
        }

        .product-nav-btn {
          background: var(--dark-200);
          border: 1px solid var(--dark-300);
          color: var(--gray-300);
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .product-nav-btn:hover,
        .product-nav-btn.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .phone-frame {
            width: 280px;
            height: 560px;
          }

          .phone-mockup {
            transform: none;
          }

          .solutions-showcase {
            gap: var(--spacing-xl);
          }
        }

        @media (max-width: 480px) {
          .phone-frame {
            width: 260px;
            height: 520px;
          }

          .product-navigation {
            flex-direction: column;
            align-items: center;
          }

          .product-nav-btn {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default Solutions;