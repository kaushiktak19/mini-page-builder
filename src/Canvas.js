import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Canvas.css'; // CSS file for specific canvas styles

function Canvas() {
  const [elements, setElements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempElement, setTempElement] = useState(null); // Temporarily store the element being configured
  const [selectedElement, setSelectedElement] = useState(null); // Track the selected element
  const [draggingElement, setDraggingElement] = useState(null); // Track the element being dragged

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedElement) {
        if (event.key === 'Enter') {
          setTempElement(selectedElement);
          setModalOpen(true);
        } else if (event.key === 'Delete') {
          handleDeleteElement(selectedElement.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElement]);

  const handleDrop = (event) => {
    event.preventDefault();
    const elementType = event.dataTransfer.getData('text/plain');
    const { clientX, clientY } = event;

    // If an element is being moved, update its position
    if (draggingElement) {
      const updatedElements = elements.map(el =>
        el.id === draggingElement.id ? { ...el, x: clientX, y: clientY, isDragging: false } : el
      );
      setElements(updatedElements);
      setDraggingElement(null); // Clear the dragging element
    } else {
      // New element is being dropped
      const newElement = {
        id: Date.now(), // Unique ID for new elements
        type: elementType,
        x: clientX,
        y: clientY,
        text: 'Label', // Default text
        fontSize: '16px', // Default font size
        fontWeight: 'normal' // Default font weight
      };

      setTempElement(newElement); // Store temporarily
      setModalOpen(true); // Open modal for configuration
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (draggingElement) {
      const { clientX, clientY } = event;
      const updatedElements = elements.map(el =>
        el.id === draggingElement.id ? { ...el, x: clientX, y: clientY, isDragging: true } : el
      );
      setElements(updatedElements);
    }
  };

  const handleSaveChanges = (config) => {
    const updatedElement = {
      ...tempElement,
      ...config
    };

    setElements([...elements, updatedElement]); // Add or update element
    setModalOpen(false); // Close modal
    setTempElement(null); // Clear temporary element
  };

  const handleDeleteElement = (id) => {
    const updatedElements = elements.filter(el => el.id !== id);
    setElements(updatedElements);
    setSelectedElement(null); // Clear the selected element
  };

  const handleElementClick = (el, event) => {
    event.stopPropagation(); // Prevent triggering canvas click
    setSelectedElement(el); // Set the element as selected
  };

  const handleCanvasClick = () => {
    setSelectedElement(null); // Clear selection when clicking on canvas
  };

  const handleDragStart = (el, event) => {
    event.dataTransfer.setData('text/plain', 'Label');
    setDraggingElement(el); // Track the element being dragged
  };

  const handleDragEnd = (event) => {
    if (draggingElement) {
      const { clientX, clientY } = event;
      const updatedElements = elements.map(el =>
        el.id === draggingElement.id ? { ...el, x: clientX, y: clientY, isDragging: false } : el
      );
      setElements(updatedElements);
      setDraggingElement(null); // Clear the dragging element after dragging
    }
  };

  return (
    <div
      className='canvas'
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleCanvasClick}
      tabIndex="0"
    >
      {/* Render dropped elements */}
      {elements.map((el, index) => (
        <div
          key={index}
          className={`element ${selectedElement?.id === el.id || draggingElement?.id === el.id ? 'selected' : ''}`}
          style={{ 
            left: el.x, 
            top: el.y, 
            position: 'absolute',
            cursor: 'grab',
            opacity: el.isDragging ? 0 : 1 
          }}
          draggable={true}
          onClick={(event) => handleElementClick(el, event)}
          onDragStart={(event) => handleDragStart(el, event)}
          onDragEnd={handleDragEnd}
        >
          {el.text}
        </div>
      ))}

      {/* Modal for configuration */}
      {modalOpen && (
        <Modal
          element={tempElement}
          onSaveChanges={handleSaveChanges}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Canvas;
