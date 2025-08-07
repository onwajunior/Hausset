import React, { useState } from 'react';
import { contentService } from '../services/contentService';

const Contact = ({ config }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error status when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      await contentService.submitContact(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact-content">
          {/* Header */}
          <div className="contact-header">
            <h2>📧 Get in Touch</h2>
            <p className="contact-subtitle">
              Ready to collaborate with us? Let's discuss!
            </p>
          </div>

          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="your.email@company.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your company name"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="What can we help you with?"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell us about your project or questions..."
                      rows="5"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="form-message success">
                    ✅ Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message error">
                    ❌ {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary btn-large submit-btn ${isSubmitting ? 'loading' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      📤 Send Message
                    </>
                  )}
                </button>

                <p className="form-note">
                  * Required fields
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info">
              <h3>Other ways to reach us</h3>
              
              <div className="contact-methods">
                {config?.contact?.email && (
                  <div className="contact-method">
                    <span className="contact-icon">✉️</span>
                    <div>
                      <div className="contact-label">Email</div>
                      <a href={`mailto:${config.contact.email}`} className="contact-value">
                        {config.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {config?.contact?.phone && (
                  <div className="contact-method">
                    <span className="contact-icon">📞</span>
                    <div>
                      <div className="contact-label">Phone</div>
                      <a href={`tel:${config.contact.phone}`} className="contact-value">
                        {config.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {config?.contact?.address && (
                  <div className="contact-method">
                    <span className="contact-icon">📍</span>
                    <div>
                      <div className="contact-label">Address</div>
                      <div className="contact-value address">
                        {config.contact.address.street}<br />
                        {config.contact.address.city}, {config.contact.address.state} {config.contact.address.zip}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="response-time">
                <h4>⏱️ Response Time</h4>
                <p>We typically respond to all inquiries within 24 hours during business days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact {
          background: linear-gradient(
            135deg,
            var(--dark-100) 0%,
            var(--background-color) 100%
          );
        }

        .contact-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .contact-header h2 {
          font-size: clamp(2rem, 4vw, 2.5rem);
          margin-bottom: var(--spacing-lg);
        }

        .contact-subtitle {
          font-size: 1.125rem;
          color: var(--gray-300);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-3xl);
          align-items: start;
        }

        .contact-form-container {
          background: var(--dark-200);
          border: 1px solid var(--dark-300);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl);
        }

        .contact-form {
          width: 100%;
        }

        .form-row {
          margin-bottom: var(--spacing-lg);
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          margin-bottom: var(--spacing-sm);
          font-weight: 600;
          color: var(--text-color);
          font-size: 0.875rem;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: var(--spacing-md);
          border: 2px solid var(--dark-400);
          border-radius: var(--radius-md);
          background: var(--dark-100);
          color: var(--text-color);
          font-size: 1rem;
          transition: all var(--transition-fast);
          font-family: inherit;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
        }

        .form-input:disabled,
        .form-textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.5;
        }

        .form-message {
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-lg);
          font-weight: 500;
        }

        .form-message.success {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid #22c55e;
        }

        .form-message.error {
          background: rgba(255, 107, 71, 0.1);
          color: var(--accent-color);
          border: 1px solid var(--accent-color);
        }

        .submit-btn {
          width: 100%;
          position: relative;
          margin-bottom: var(--spacing-md);
        }

        .submit-btn.loading {
          background: var(--gray-600);
          cursor: not-allowed;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: var(--spacing-sm);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .form-note {
          text-align: center;
          color: var(--gray-400);
          font-size: 0.875rem;
          margin: 0;
        }

        .contact-info {
          background: var(--dark-100);
          border: 1px solid var(--dark-300);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl);
          height: fit-content;
        }

        .contact-info h3 {
          margin-bottom: var(--spacing-xl);
          color: var(--text-color);
        }

        .contact-methods {
          margin-bottom: var(--spacing-2xl);
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .contact-icon {
          font-size: 1.25rem;
          margin-top: 2px;
        }

        .contact-label {
          color: var(--gray-400);
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: var(--spacing-xs);
        }

        .contact-value {
          color: var(--text-color);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .contact-value:hover {
          color: var(--primary-color);
        }

        .contact-value.address {
          line-height: 1.4;
        }

        .response-time {
          border-top: 1px solid var(--dark-300);
          padding-top: var(--spacing-lg);
        }

        .response-time h4 {
          color: var(--text-color);
          margin-bottom: var(--spacing-sm);
          font-size: 1rem;
        }

        .response-time p {
          color: var(--gray-400);
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr;
            gap: var(--spacing-2xl);
          }
        }

        @media (max-width: 768px) {
          .contact-form-container,
          .contact-info {
            padding: var(--spacing-xl);
          }

          .contact-layout {
            gap: var(--spacing-xl);
          }
        }

        @media (max-width: 480px) {
          .contact-form-container,
          .contact-info {
            padding: var(--spacing-lg);
          }

          .form-input,
          .form-textarea {
            font-size: 16px; /* Prevent zoom on iOS */
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;