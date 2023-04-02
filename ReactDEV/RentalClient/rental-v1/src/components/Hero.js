import React from 'react';
//import './Hero.css';

const Hero = ({ title, subtitle, image }) => {
  return (
    <div className="hero-container" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Hero;