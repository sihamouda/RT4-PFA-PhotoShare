// src/pages/Home.tsx
import React, { useState } from 'react';
import Header from '../components/Home/Header/Header';
import HeroSection from '../components/Home/Body/HeroSection';
import TrendingCard from '../components/Home/Body/TrendingCard';
import CardPost from '../components/Home/Body/Card/cardPost';

const trendingItems = [
  {
    imageUrl: '/image1.jpg',
    title: 'Topic 1',
  },
  {
    imageUrl: '/image2.jpg',
    title: 'Topic 2',
  },
  {
    imageUrl: '/image3.jpg',
    title: 'Topic 3',
  },
  {
    imageUrl: '/image4.jpg',
    title: 'Topic 4',
  },
  {
    imageUrl: '/image5.jpg',
    title: 'Topic 5',
  },
  {
    imageUrl: '/image6.jpg',
    title: 'Topic 6',
  },
  {
    imageUrl: '/image7.jpg',
    title: 'Topic 7',
  },
  {
    imageUrl: '/image8.jpg',
    title: 'Topic 8',
  },
  // ... Add more trending items here
];

const Home: React.FC = () => {

    // state for showing the photo post 
    const [showCardPost, setShowCardPost] = useState(true);
    // state for showing the discover section
    const [showHeroSection, setShowHeroSection] = useState(true);
    //fonction to handle showCardPost state
    const handleCardClick = () => {
      setShowCardPost(!showCardPost);
    };
    //fonction to handle discover section state
    const handleHeroClick = () => {
      setShowHeroSection(!showHeroSection);
    }

  return (
    <div className="home-page">
      <Header title="PhotoShare" />
          <HeroSection title="Discover new ideas to try" imageUrl="/discoverImage2.jpg" />
          <div className="content-container"> 
          <section className="trending">
            <h2>Trending today</h2>
            <div className="trending-cards"  >
            {trendingItems.map((item) => (
              <div >
              <TrendingCard key={item.title} imageUrl={item.imageUrl} title={item.title} />      
              </div>
            ))}
            </div>
          </section>
          </div>  
    </div>
  );
};

export default Home;
