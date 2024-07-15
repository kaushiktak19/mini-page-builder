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


  let modalTitle = '';
  switch (element?.type) {
    case 'label':
      modalTitle = 'Edit Label';
      break;
    case 'input':
      modalTitle = 'Edit Input';
      break;
    case 'button':
      modalTitle = 'Edit Button';
      break;
    default:
      modalTitle = 'Edit Element';
      break;
  }

  const handleSave = () => {
    const config = {
      text: text || 'Label',
      x: parseInt(xCoordinate) || 0, 
      y: parseInt(yCoordinate) || 0,
      fontSize: fontSize || '16px',
      fontWeight: fontWeight || 'normal'
    };

    onSaveChanges(config);
  };

  const handleFontSizeChange = (e) => {
    let value = parseInt(e.target.value);
    if (value < 1) value = 1;
    if (value > 200) value = 200;
    setFontSize(value + 'px');
  };

  const handleFontWeightChange = (e) => {
    let value = parseInt(e.target.value);
    if (value < 100) value = 100;
    if (value > 900) value = 900;
    setFontWeight(value);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="edit-label">{modalTitle}</div>
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
            type="number"
            id="fontSizeInput"
            value={fontSize ? parseInt(fontSize) : ''}
            onChange={handleFontSizeChange}
            placeholder="Enter font size"
            className="large-input"
            min="1"
            max="200"
          />
        </div>

        <div className="input-container">
          <label htmlFor="fontWeightInput">Font Weight:</label>
          <input
            type="number"
            id="fontWeightInput"
            value={fontWeight ? fontWeight : ''}
            onChange={handleFontWeightChange}
            placeholder="Enter font weight"
            className="large-input"
            min="100"
            max="900"
            step="100"
          />
        </div>

        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
