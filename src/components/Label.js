import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import './Label.css'; // New CSS file for specific label styles

function Label() {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', 'Label'); // Set drag data
    event.target.style.cursor = 'grab'; // Change cursor to grabbing
  };

  const handleDragEnd = (event) => {
    event.target.style.cursor = 'grab'; // Restore cursor to grab
  };

  return (
    <div className='blocks' draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className='icon'>
        <FontAwesomeIcon icon={faGripVertical} className='grip' style={{ color: "#D4D4D4" }} />
      </div>
      <div className='label'>Label</div>
    </div>
  );
}

export default Label;
