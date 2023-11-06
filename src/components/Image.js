import React from 'react';

const Image = ({ src, alt }) => {
  return <img src={src} alt={alt} className="gallery-image" />;
};

export default Image;
