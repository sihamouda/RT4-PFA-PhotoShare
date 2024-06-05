import React, { useState } from 'react';
import Search from './Search';
import { useNavigate } from 'react-router-dom';


interface TrendingCardProps {
  imageUrl: string;
  title: string;
  author?: string;
  date?: Date;
  description?: string;
  // Add other properties for additional information (optional)
}

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

const HeroSection: React.FC<TrendingCardProps> = ({ title, imageUrl }) => {

  const [searchResults, setSearchResults] = useState<TrendingCardProps[]>([]);

  const navigate = useNavigate();

  const handleSearch = (searchQuery: string) => {
    // Perform search logic here (e.g., filter cards based on searchQuery)
    const filteredResults = trendingItems.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);

    // Redirect to search results page or individual card post based on your requirements
    if (filteredResults.length === 1) {
      navigate(
        `/card/${encodeURIComponent(filteredResults[0].imageUrl)}/${encodeURIComponent(filteredResults[0].title)}/${encodeURIComponent(filteredResults[0].author)}/${encodeURIComponent(filteredResults[0].date.toString())}/${encodeURIComponent(filteredResults[0].description)}`
      ); // Redirect to the first search result's CardPost component
    } else {
      navigate('/searchResults'); // Redirect to a search results page where all matching cards are displayed
    }
    

  };




  return (
    <section className="hero">
      <img src={imageUrl} alt="Background image" />
      <div className="hero-content">
        <h1 className='big-heading'>{title}</h1>
        <Search onSearch={handleSearch}/>
      </div>
    </section>
  );
};

export default HeroSection;
