import React from 'react';
import Search from './Search';


interface HeroSectionProps {
  title: string;
  imageUrl: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, imageUrl }) => {
  return (
    <section className="hero">
      <img src={imageUrl} alt="Background image" />
      <div className="hero-content">
        <h1 className='big-heading'>{title}</h1>
        <Search />
      </div>
    </section>
  );
};

export default HeroSection;
