// src/components/Navbar.jsx - Versão Web
import React from 'react';
import './Navbar.css';

export default function Navbar() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-nav">
        <button 
          className="nav-item"
          onClick={() => scrollToSection('gonzaga')}
        >
          O Gonzaga
        </button>
        <button 
          className="nav-item"
          onClick={() => scrollToSection('quadras')}
        >
          Quadras
        </button>
        <button 
          className="nav-item"
          onClick={() => scrollToSection('contato')}
        >
          Fale Conosco
        </button>
      </div>
    </nav>
  );
}