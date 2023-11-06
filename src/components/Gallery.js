import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AiFillCheckSquare } from 'react-icons/ai';
import './Gallery.css'; // Import your CSS for styling

const Gallery = ({ images }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleCheckboxChange = (index) => {
    let newCheckedItems;
    if (checkedItems.includes(index)) {
      newCheckedItems = checkedItems.filter((item) => item !== index);
    } else {
      newCheckedItems = [...checkedItems, index];
    }
    setCheckedItems(newCheckedItems);
    setSelectedCount(newCheckedItems.length);
  };

  const handleDeleteClick = () => {
    const filteredImages = galleryImages.filter((image, index) => !checkedItems.includes(index));
  
  // Update galleryImages state
    setGalleryImages(filteredImages);

    setCheckedItems([]);
    setSelectedCount(0);
  };

  const [galleryImages, setGalleryImages] = useState(images);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(galleryImages);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setGalleryImages(
      reorderedImages.map((image) => ({
        ...image,
        width: '100%', // Set the width to fill the container
        height: '100%', // Set the height to fill the container
      }))
    );
  };

  return (
    <div>
      <div className='action-bar'>
        {selectedCount > 0 ? 
          <div className="selected-count">
            <AiFillCheckSquare size={20} color='#0583D2'/>
            {selectedCount} files selected</div>
        : <div className="selected-count">Gallery</div>}
        {selectedCount > 0 && <button className="delete-button" onClick={handleDeleteClick}>Delete</button>}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided) => (
            <div className="gallery-container"{...provided.droppableProps} ref={provided.innerRef}>
              {galleryImages.map((image, index) => (
                <Draggable key={image.id.toString()} draggableId={image.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className={`image-container ${checkedItems.includes(index) ? 'checked' : ''}`}
                      key={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="checkbox"
                        className="image-checkbox"
                        checked={checkedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <div className="draggable-content" {...provided.dragHandleProps}>
                        <img src={image.url} alt="" />
                      </div>
                      <div className="image-overlay"></div>
                      <div className="image-overlay-checkbox"></div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
    </DragDropContext>

    </div>
  );
};

export default Gallery;
