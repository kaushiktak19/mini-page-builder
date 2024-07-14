import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Canvas.css';

function Canvas() {
  const [elements, setElements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempElement, setTempElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggingElement, setDraggingElement] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      //console.log('Key pressed:', event.key);  // Log the key pressed
      if (selectedElement) {
        if (event.key === 'Enter') {
          //console.log('Enter key pressed');
          setTempElement(selectedElement);
          setModalOpen(true);
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
          //console.log('Delete key pressed');
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

    if (draggingElement) {
      const updatedElements = elements.map(el =>
        el.id === draggingElement.id ? { ...el, x: clientX, y: clientY, isDragging: false } : el
      );
      setElements(updatedElements);
      setDraggingElement(null);
    } else {
      const newElement = {
        id: Date.now(),
        type: elementType,
        x: clientX,
        y: clientY,
        text: 'Label',
        fontSize: '16px',
        fontWeight: 'normal'
      };

      setTempElement(newElement);
      setModalOpen(true);
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
    const updatedElements = elements.map(el =>
      el.id === tempElement.id ? { ...el, ...config } : el
    );

    if (!elements.some(el => el.id === tempElement.id)) {
      setElements([...elements, { ...tempElement, ...config }]);
    } else {
      setElements(updatedElements);
    }

    setModalOpen(false);
    setTempElement(null);
  };

  const handleDeleteElement = (id) => {
    //console.log('Deleting element with id:', id);  // Log the id being deleted
    const updatedElements = elements.filter(el => el.id !== id);
    //console.log('Updated elements:', updatedElements);  // Log the updated elements
    setElements(updatedElements);
    setSelectedElement(null);
  };

  const handleElementClick = (el, event) => {
    event.stopPropagation();
    //console.log('Element clicked:', el);  // Log the clicked element
    setSelectedElement(el);
  };

  const handleCanvasClick = () => {
    //console.log('Canvas clicked, deselecting element');
    setSelectedElement(null);
  };

  const handleDragStart = (el, event) => {
    event.dataTransfer.setData('text/plain', 'Label');
    setDraggingElement(el);
  };

  const handleDragEnd = (event) => {
    if (draggingElement) {
      const { clientX, clientY } = event;
      const updatedElements = elements.map(el =>
        el.id === draggingElement.id ? { ...el, x: clientX, y: clientY, isDragging: false } : el
      );
      setElements(updatedElements);
      setDraggingElement(null);
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
      {elements.map((el, index) => (
        <div
          key={index}
          className={`element ${selectedElement?.id === el.id || draggingElement?.id === el.id ? 'selected' : ''}`}
          style={{ 
            left: el.x, 
            top: el.y, 
            position: 'absolute',
            cursor: 'grab',
            opacity: el.isDragging ? 0 : 1,
            fontSize: el.fontSize,
            fontWeight: el.fontWeight
          }}
          draggable={true}
          onClick={(event) => handleElementClick(el, event)}
          onDragStart={(event) => handleDragStart(el, event)}
          onDragEnd={handleDragEnd}
        >
          {el.text}
        </div>
      ))}

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
