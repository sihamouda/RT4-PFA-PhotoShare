import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


interface TrendingCardProps {
  imageUrl: string;
  title: string;
  // Add other properties for additional information (optional)
}

const TrendingCard: React.FC<TrendingCardProps> = ({ imageUrl, title }) => {




  return (
    // <div className="trending-card">
    //   <img src={imageUrl} alt={title} />
    //   <h3>{title}</h3>
    //   {/* Add other content or links here (optional) */}
    // </div>
    <>
      
        <div className="card" style={{width: '18rem'}} >
          <img src={imageUrl} className="card-img-top" alt={title} />
            <div className="card-body">
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
      
      
    </>
  );
};

export default TrendingCard;
