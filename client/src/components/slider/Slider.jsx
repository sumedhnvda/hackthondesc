import { useState } from "react";
import "./slider.scss";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  // Function to handle slide change
  const changeSlide = (direction) => {
    setImageIndex((prevIndex) => {
      if (prevIndex === null) return 0; // Default to first image if none selected
      if (direction === "left") {
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  // Check if images are provided
  if (!Array.isArray(images) || images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow left" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="Previous" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt={`Slide ${imageIndex}`} />
          </div>
          <div className="arrow right" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" alt="Next" className="right" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            &times;
          </div>
        </div>
      )}

      <div className="map-container sliderMap">
        <img src={images[0]} alt="Main" onClick={() => setImageIndex(0)} />
      </div>

      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index}`}
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
