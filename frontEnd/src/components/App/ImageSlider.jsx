import React from "react";
import Slider from "./Slider";

function ImageSlider() {
  const images = [
    "",
    "./images/pexels-photo-14771169.jpeg",
    "./images/pexels-photo-5192090.webp",
    "./images/pexels-photo-53874.jpeg",
    "./images/pexels-photo-5632401.webp",
  ];

  return (
    <div className="w-full">
      <Slider images={images} />
    </div>
  );
}

export default ImageSlider;
