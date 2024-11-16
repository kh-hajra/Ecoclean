import React from 'react';
import './GarbageCollection.css';
import garbage from './assets/images/garbage.svg';

const GarbageCollection = () => {
  return (
    <div className="garbage-collection">
      <img src={garbage} alt="Garbage Collection" className="service-image" />
      <div className="content">
        <h2>Garbage Collection</h2>
        <p className="price-time">500 Rs - 1hr</p>
        <p>Efficient garbage collection and disposal service, ensuring cleanliness and hygiene in your surroundings.</p>
        <button className="hire-button">Hire now</button>
      </div>
    </div>
  );
};

export default GarbageCollection;
