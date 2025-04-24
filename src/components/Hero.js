import React from 'react';
import logoImage from '../asset/logo.jpg'; // Adjust the path according to your project structure

function Hero({ title, subtitle, buttonText, imageSrc }) {
  // Use the imported image as fallback if no imageSrc is provided
  const backgroundImage = logoImage;

  return (
    <section 
      className="hero"
      style={{ 
        backgroundImage: ` url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button className="cta-button" aria-label={buttonText}>
          <span className="button-text">{buttonText}</span>
          <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

// Default props
Hero.defaultProps = {
  title: "Featured Collection",
  subtitle: "Discover our newest arrivals",
  buttonText: "Explore",
  imageSrc: null // Now it will fall back to your logo.jpg
};

export default Hero;