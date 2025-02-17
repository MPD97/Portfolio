import React, { useState, useEffect, useCallback } from 'react';
import './ProjectSection.css';
import { FaGithub } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';

const ProjectSection = ({ project, isReversed }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');

  // Preload images
  useEffect(() => {
    project.images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [project.images]);

  const nextImage = useCallback(() => {
    setSlideDirection('next');
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [project.images.length]);

  const prevImage = useCallback(() => {
    setSlideDirection('prev');
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [project.images.length]);

  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [nextImage]);

  const getNextIndex = (current) => 
    current === project.images.length - 1 ? 0 : current + 1;
  
  const getPrevIndex = (current) => 
    current === 0 ? project.images.length - 1 : current - 1;

  const ProjectInfo = () => (
    <div className="project-info">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <div className="technologies">
        {project.technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
      <div className="project-links">
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </a>
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
          <BiLinkExternal /> Live Demo
        </a>
      </div>
    </div>
  );

  const ImageSlider = () => (
    <div className="image-slider">
      <button 
        onClick={prevImage} 
        className="slider-btn prev"
        aria-label="Previous image"
      >
        ←
      </button>
      <div className="slider-container">
        <img 
          src={project.images[getPrevIndex(currentImageIndex)]} 
          alt={project.title}
          className="slider-image prev-image"
        />
        <img 
          src={project.images[currentImageIndex]} 
          alt={project.title}
          className={`slider-image current-image ${isTransitioning ? `sliding-${slideDirection}` : ''}`}
        />
        <img 
          src={project.images[getNextIndex(currentImageIndex)]} 
          alt={project.title}
          className="slider-image next-image"
        />
      </div>
      <button 
        onClick={nextImage} 
        className="slider-btn next"
        aria-label="Next image"
      >
        →
      </button>
      <div className="slider-dots">
        {project.images.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => {
              const goingNext = index > currentImageIndex;
              setSlideDirection(goingNext ? 'next' : 'prev');
              setIsTransitioning(true);
              setCurrentImageIndex(index);
              setTimeout(() => setIsTransitioning(false), 500);
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className={`project-section ${isReversed ? 'reversed' : ''}`}>
      {isReversed ? (
        <>
          <ImageSlider />
          <ProjectInfo />
        </>
      ) : (
        <>
          <ProjectInfo />
          <ImageSlider />
        </>
      )}
    </section>
  );
};

export default ProjectSection; 