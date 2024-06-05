import React from 'react'
import { useNavigate } from 'react-router-dom';
import TrendingCard from '../TrendingCard';
import { Route, Routes, useParams } from 'react-router-dom';

interface TrendingCardProps {
  imageUrl: string;
  title: string;
  author?: string;
  date?: Date;
  description?: string;
  // Add other properties for additional information (optional)
}

const trendingImages: TrendingCardProps[] = [
  { imageUrl: '/image2.jpg', title: 'Topic 2' },
  { imageUrl: '/image3.jpg', title: 'Topic 3' },
  { imageUrl: '/image4.jpg', title: 'Topic 4' },
  // Add more image objects as needed
];


const cardPost: React.FC = () => {

  // const imageUrl = '/image1.jpg';
  // const title = 'Topic 1';

  const navigate = useNavigate();

  const handleBuyButtonClick = () => {
    // Handle the buy button click event
    navigate('/checkout');
  }

  const { imageUrl, title, author, date, description } = useParams<{
    imageUrl: string;
    title: string;
    author: string;
    date: string; // Update the type based on the actual data type of date (string or Date)
    description: string;
  }>();



  return (
    <>
    

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div>
        <div style={{ maxWidth: '1000px', width: '100%', marginBottom: '20px' }}>
          <img src={imageUrl} alt="Image" style={{ width: '100%', height: 'auto' }} />
        </div>
        <h6>By: @{author} </h6>
        <div className="card" style={{ width: '1000px', justifyContent: 'center' }} >
          <div className="card-body" >
            <h6 className="card-title">Like</h6>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="card-text" style={{ color: 'gray' }}>Add to board</p>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: '1000px', justifyContent: 'center' }} >
          <div className="card-body" >
            <h6 className="card-title">Download</h6>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="card-text" style={{ color: 'gray' }}>free for commercial use, no attribution required</p>
              <button className="btn btn-primary">Download</button>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: '1000px', justifyContent: 'center' }} >
          <div className="card-body" >
            <h6 className="card-title">Buy</h6>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="card-text" style={{ color: 'gray' }}>$2.99</p>
              <button className="btn btn-primary" onClick={handleBuyButtonClick} >Buy</button>
            </div>
          </div>
        </div>
        <h5>description of the image</h5>
        <p className="card-text" style={{ color: 'gray' }}>{description}</p>
        <p className="card-text" style={{ color: 'gray' }}><small>Publish date</small></p>
        <p className="card-text" style={{ color: 'gray' }}><small>{ String(date) }</small></p>
        <p className="card-text" style={{ color: 'gray' }}><small>More details</small></p>
        <h6>#haja1#haja2#haja3</h6>
        <h5>You might also Like</h5>
        <div className="trending-cards" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {trendingImages.map((image, index) => (
            <TrendingCard key={index} imageUrl={image.imageUrl}
                                      title={image.title}
                                      author={image.author}
                                      date={image.date}
                                      description={image.description}
                                        />
          ))}
        </div>
     
      </div>
    </div>
  </>

  )
}

export default cardPost;