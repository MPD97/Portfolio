import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a 
            href="https://linkedin.com/in/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            LinkedIn
          </a>
          <a 
            href="https://buymeacoffee.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            Buy Me a Coffee
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 