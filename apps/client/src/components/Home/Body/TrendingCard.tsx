import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useParams } from 'react-router-dom';


interface TrendingCardProps {
  imageUrl: string;
  title: string;
  author?: string;
  date?: Date;
  description?: string;
  // Add other properties for additional information (optional)
}

const TrendingCard: React.FC<TrendingCardProps> = ({ imageUrl, title, author, date, description }) => {

  const handleClick = () => {
    // Handle click logic here
    console.log('Div clicked!');
  };



  return (
    // <div className="trending-card">
    //   <img src={imageUrl} alt={title} />
    //   <h3>{title}</h3>
    //   {/* Add other content or links here (optional) */}
    // </div>
    <>
      <Link to={`/card/${encodeURIComponent(imageUrl)}/${encodeURIComponent(title)}/${encodeURIComponent(author || 'unknown')}/${encodeURIComponent(String(date))}/${encodeURIComponent(description|| 'no')}`} className="card-link">
      <div
      className="card"
      style={{ width: '18rem', cursor: 'pointer', overflow: 'hidden' }}
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        className="card-img-top"
        alt={title}
        style={{ transition: 'transform 0.3s' }}
      />
      <div className="card-body">
        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
      </div>
    </div>
    </Link>

      
      
    </>
  );
};

export default TrendingCard;
