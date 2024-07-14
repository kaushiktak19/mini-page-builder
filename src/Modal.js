import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ element, onSaveChanges, onClose }) {
  const [text, setText] = useState('');
  const [xCoordinate, setXCoordinate] = useState('');
  const [yCoordinate, setYCoordinate] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [fontWeight, setFontWeight] = useState('');

  useEffect(() => {
    if (element) {
      setText(element.text || '');
      setXCoordinate(element.x || '');
      setYCoordinate(element.y || '');
      setFontSize(element.fontSize || '');
      setFontWeight(element.fontWeight || '');
    } else {
      setText('');
      setXCoordinate('');
      setYCoordinate('');
      setFontSize('');
      setFontWeight('');
    }
  }, [element]);

  const handleSave = () => {
    const config = {
      text: text || 'Label',
      x: parseInt(xCoordinate) || 0, // Ensure coordinates are integers
      y: parseInt(yCoordinate) || 0,
      fontSize: fontSize || '16px',
      fontWeight: fontWeight || 'normal'
      // Add other properties as needed
    };

    onSaveChanges(config);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="edit-label">Edit Label</div>
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <div className="line"></div>

        <div className="input-container">
          <label htmlFor="textInput">Text:</label>
          <input
            type="text"
            id="textInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="large-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="xInput">X Coordinate:</label>
          <input
            type="text"
            id="xInput"
            value={xCoordinate}
            onChange={(e) => setXCoordinate(e.target.value)}
            placeholder="Enter X coordinate"
            className="large-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="yInput">Y Coordinate:</label>
          <input
            type="text"
            id="yInput"
            value={yCoordinate}
            onChange={(e) => setYCoordinate(e.target.value)}
            placeholder="Enter Y coordinate"
            className="large-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="fontSizeInput">Font Size:</label>
          <input
            type="text"
            id="fontSizeInput"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            placeholder="Enter font size"
            className="large-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="fontWeightInput">Font Weight:</label>
          <input
            type="text"
            id="fontWeightInput"
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value)}
            placeholder="Enter font weight"
            className="large-input"
          />
        </div>

        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Modal;
