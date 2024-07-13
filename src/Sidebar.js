// src/Sidebar.js

import React from 'react';
import Label from './components/Label';
import Input from './components/Input';
import Button from './components/Button';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='content'>
        <div className='block'>BLOCKS</div>
        <Label />
        <Input />
        <Button />
      </div>
    </div>
  );
}

export default Sidebar;
