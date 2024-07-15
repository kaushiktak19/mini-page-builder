import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Canvas.css';

function Canvas() {
  const [elements, setElements] = useState(() => {
    const savedElements = localStorage.getItem('canvasElements');
    return savedElements ? JSON.parse(savedElements) : [];
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [tempElement, setTempElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggingElement, setDraggingElement] = useState(null);

  useEffect(() => {
    localStorage.setItem('canvasElements', JSON.stringify(elements));
  }, [elements]);

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
    const canvasRect = event.currentTarget.getBoundingClientRect();

    if (draggingElement) {
      const elementRect = document.getElementById(draggingElement.id).getBoundingClientRect();
      const x = Math.min(Math.max(clientX - canvasRect.left, 0), canvasRect.width - elementRect.width);
      const y = Math.min(Math.max(clientY - canvasRect.top, 0), canvasRect.height - elementRect.height);

      const updatedElements = elements.map(el =>
        el.id === draggingElement.id ? { ...el, x, y, isDragging: false } : el
      );
      setElements(updatedElements);
      setDraggingElement(null);
    } else {
      const newElement = {
        id: Date.now(),
        type: elementType,
        x: clientX - canvasRect.left,
        y: clientY - canvasRect.top,
        text: elementType === 'label' ? 'Label' : elementType === 'input' ? 'Input' : 'Button',
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
      const canvasRect = event.currentTarget.getBoundingClientRect();
      const elementRect = document.getElementById(draggingElement.id).getBoundingClientRect();
      const x = Math.min(Math.max(clientX - canvasRect.left, 0), canvasRect.width - elementRect.width);
      const y = Math.min(Math.max(clientY - canvasRect.top, 0), canvasRect.height - elementRect.height);

      const updatedElements = elements.map(el =>
        el.id === draggingElement.id ? { ...el, x, y, isDragging: true } : el
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
    const updatedElements = elements.filter(el => el.id !== id);
    setElements(updatedElements);
    setSelectedElement(null);
  };

  const handleElementClick = (el, event) => {
    event.stopPropagation();
    setSelectedElement(el);
  };

  const handleCanvasClick = () => {
    setSelectedElement(null);
  };

  const handleDragStart = (el, event) => {
    event.dataTransfer.setData('text/plain', el.type);
    setDraggingElement(el);
  };

  const handleDragEnd = (event) => {
    if (draggingElement) {
      const { clientX, clientY } = event;
      const canvasRect = document.querySelector('.canvas').getBoundingClientRect();
      const elementRect = document.getElementById(draggingElement.id).getBoundingClientRect();
      const x = Math.min(Math.max(clientX - canvasRect.left, 0), canvasRect.width - elementRect.width);
      const y = Math.min(Math.max(clientY - canvasRect.top, 0), canvasRect.height - elementRect.height);

      const updatedElements = elements.map(el =>
        el.id === draggingElement.id ? { ...el, x, y, isDragging: false } : el
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
      {elements.map((el, index) => {
        let elementContent;
        if (el.type === 'label') {
          elementContent = (
            <span
              style={{
                fontSize: el.fontSize,
                fontWeight: el.fontWeight,
              }}
              className="label-element"
              onClick={(e) => handleElementClick(el, e)}
              onDragStart={(event) => handleDragStart(el, event)}
              onDragEnd={handleDragEnd}
              draggable={true}
            >
              {el.text}
            </span>
          );
        } else if (el.type === 'input') {
          elementContent = (
            <input
              type="text"
              defaultValue={el.text}
              style={{
                fontSize: el.fontSize,
                fontWeight: el.fontWeight,
              }}
              className="input-element"
              onClick={(e) => handleElementClick(el, e)}
              onDragStart={(event) => handleDragStart(el, event)}
              onDragEnd={handleDragEnd}
              draggable={true}
            />
          );
        } else if (el.type === 'button') {
          elementContent = (
            <button
              style={{
                fontSize: el.fontSize,
                fontWeight: el.fontWeight,
              }}
              className="button-element"
              onClick={(e) => handleElementClick(el, e)}
              onDragStart={(event) => handleDragStart(el, event)}
              onDragEnd={handleDragEnd}
              draggable={true}
            >
              {el.text}
            </button>
          );
        }

        return (
          <div
            id={el.id}
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
            {elementContent}
          </div>
        );
      })}

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
