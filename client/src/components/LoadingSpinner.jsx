import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <h2>Loading Hausset...</h2>
      <p>Organizing your experience</p>
      
      <style jsx>{`
        .loading-spinner {
          margin-bottom: var(--spacing-xl);
        }
        
        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid var(--dark-300);
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;