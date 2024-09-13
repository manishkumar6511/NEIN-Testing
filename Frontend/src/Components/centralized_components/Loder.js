import React from 'react';
import './TruckAnimation.css'; // Import the CSS file


const Loader = () => (
  <div className="overlay">
    <div className="loader">
      <div className="plane">
        <img src="https://via.placeholder.com/50x30?text=Plane" alt="Plane" />
      </div>
      <div className="clouds">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
      </div>
    </div>
  </div>
);

export default Loader;


