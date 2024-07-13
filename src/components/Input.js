// src/components/Input.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import '../Sidebar.css';

function Input() {
  return (
    <div className='blocks'>
      <div className='icon'>
        <FontAwesomeIcon icon={faGripVertical} className='grip' style={{ color: "#D4D4D4" }} />
      </div>
      <div className='label'>Input</div>
    </div>
  );
}

export default Input;
