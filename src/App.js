import React from 'react';
import './App.css';
import Gallery from './components/Gallery';


function App() {
  const images = [
    { id: 1, url: 'image-1.webp' },
    { id: 2, url: 'image-2.webp' },
    { id: 3, url: 'image-3.webp'},
    { id: 4, url: 'image-4.webp' },
    { id: 5, url: 'image-5.webp'},
    { id: 6, url: 'image-6.webp'},
    { id: 7, url: 'image-7.webp'},
    { id: 8, url: 'image-8.webp'},
    { id: 9, url: 'image-9.webp'},
    { id: 10, url: 'image-10.jpeg'},
    { id: 11, url: 'image-11.jpeg'},
    // Add more image data as needed
  ];
  return (
    <div className="App">
      {console.log(images)}
      <Gallery images={images} />
    </div>
  );
}

export default App;
