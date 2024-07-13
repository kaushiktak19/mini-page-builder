import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

import './Sidebar.css'; 

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='content'>
        <div className='block'>BLOCKS</div>
        <div className='blocks'>
          <div className='icon'>
            <FontAwesomeIcon icon={faGripVertical} className='grip' style={{ color: "#D4D4D4" }} />
          </div>
          <div className='label'>Label</div>
        </div>
        <div className='blocks'>
          <div className='icon'>
            <FontAwesomeIcon icon={faGripVertical} className='grip' style={{ color: "#D4D4D4" }} />
          </div>
          <div className='label'>Input</div>
        </div>
        <div className='blocks'>
          <div className='icon'>
            <FontAwesomeIcon icon={faGripVertical} className='grip' style={{ color: "#D4D4D4" }} />
          </div>
          <div className='label'>Button</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
