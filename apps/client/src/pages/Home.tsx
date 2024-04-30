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
    author: 'author1',
    date: new Date(),
    description: 'This is a description',  
  },
  {
    imageUrl: '/image2.jpg',
    title: 'Topic 2',
    author: 'author2',
    date: new Date(),
    description: 'This is a description', 
  },
  {
    imageUrl: '/image3.jpg',
    title: 'Topic 3',
    author: 'author3',
    date: new Date(),
    description: 'This is a description', 
  },
  {
    imageUrl: '/image4.jpg',
    title: 'Topic 4',
    author: 'author4',
    date: new Date(),
    description: 'This is a description', 
  },
  {
    imageUrl: '/image5.jpg',
    title: 'Topic 5',
    author: 'author5',
    date: new Date(),
    description: 'This is a description', 
  },
  {
    imageUrl: '/image6.jpg',
    title: 'Topic 6',
    author: 'author6',
    date: new Date(),
    description: 'This is a description', 
  },
  {
    imageUrl: '/image7.jpg',
    title: 'Topic 7',
    author: 'author7',
    date: new Date(),
    description: 'This is a description', 
  },
  {
    imageUrl: '/image8.jpg',
    title: 'Topic 8',
    author: 'author8',
    date: new Date(),
    description: 'This is a description', 
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
      {/* <Header title="PhotoShare"  /> */}
          <HeroSection title="Discover new ideas to try" imageUrl="/discoverImage2.jpg" />
          <div className="content-container"> 
          <section className="trending">
            <h2>Trending today</h2>
            <div className="trending-cards"  >
            {trendingItems.map((item) => (
              <div >
              <TrendingCard key={item.title} 
                            imageUrl={item.imageUrl}
                            title={item.title}
                            author={item.author}
                            date={item.date}
                            description={item.description} />      
              </div>
            ))}
            </div>
          </section>
          </div>  
    </div>
  );
};

export default Home;
