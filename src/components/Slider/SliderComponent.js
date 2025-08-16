import React from 'react';

const Slidercomponent = (props) => {
  return (
    <div className={props.className} style={props.style}>
      <div className="slide-image-container">
        <img 
          src={props.image} 
          alt="Slider content" 
          className="slide-image"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Slidercomponent;