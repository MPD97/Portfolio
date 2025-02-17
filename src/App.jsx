import React from 'react';
import ProjectSection from './components/ProjectSection';
import Footer from './components/Footer';
import './App.css';

const BackgroundShapes = () => (
  <div className="background-shapes">
    <div className="shape"></div>
    <div className="shape"></div>
  </div>
);

const projects = [
  {
    id: 1,
    title: "Projekt 1",
    description: "Opis pierwszego projektu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    technologies: ["React", "Node.js", "MongoDB"],
    githubLink: "https://github.com/user/project1",
    liveLink: "https://project1.com",
    images: ["/project1-1.png", "/project1-2.png", "/project1-3.png"]
  },
  {
    id: 2,
    title: "Projekt 2",
    description: "Opis drugiego projektu. Sed do eiusmod tempor incididunt ut labore et dolore.",
    technologies: ["Angular", "Express", "PostgreSQL"],
    githubLink: "https://github.com/user/project2",
    liveLink: "https://project2.com",
    images: ["/project2-1.png", "/project2-2.png", "/project2-3.png"]
  },
  // Podobnie dla projektu 3 i 4
];

function App() {
  return (
    <>
      <BackgroundShapes />
      <div className="app">
        <main className="main">
          {projects.map((project, index) => (
            <ProjectSection 
              key={project.id}
              project={project}
              isReversed={index % 2 !== 0}
            />
          ))}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App; 