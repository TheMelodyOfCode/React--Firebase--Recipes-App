import React, { useState } from 'react';



const HeaderCarousel = () => {
  const [current, setCurrent] = useState(0);

  const images = [
    'img/food.png',
    'img/Oopsbutton.jpg',
    // 'img/to/image3.jpg',
  ];

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={index === current ? 'slide active' : 'slide'}
        />
      ))}
      <button className="carousel-btn left" onClick={prevSlide}>&#10094;</button>
      <button className="carousel-btn right" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default HeaderCarousel;
