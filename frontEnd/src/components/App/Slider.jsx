import React, { useState, useEffect } from "react";

const Slider = ({ images }) => {
  const [currentIndex, SetCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    SetCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    SetCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [currentIndex, 3000]);
  return (
    <div className="relative w-full  mx-auto">
      <div
        className="w-full h-96 bg-center img-contain duration-500 mx-2 my-2"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>

      <div
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-2xl cursor-pointer"
        onClick={prevSlide}
      >
        ❮
      </div>

      <div
        className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-2xl cursor-pointer"
        onClick={nextSlide}
      >
        ❯
      </div>
    </div>
  );
};

export default Slider;
