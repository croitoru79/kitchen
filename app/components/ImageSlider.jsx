"use client"
import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Image from 'next/image';
import placeholder from "@images/Img-15.jpg";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (!images || images.length === 0) return null;

  return (
    

<div className="preview__images">
<PhotoProvider>
{images.map((url, index) => (
  <PhotoView key={index} src={url}>
  <div
    className={`preview__images-item item_${index + 1}`}
    key={index}
  >
    <Image
      className="preview__images-image"
      src={url || placeholder}
      width={1400}
      height={500}
      unoptimized
    />
  </div>
  </PhotoView>
))}
      </PhotoProvider>
</div>
  );
};

export default ImageSlider;
