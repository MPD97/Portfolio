import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a 
            href="www.linkedin.com/in/mateusz-a-5061661b1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            LinkedIn
          </a>
          <a 
            href="https://buymeacoffee.com/mateusza" 
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