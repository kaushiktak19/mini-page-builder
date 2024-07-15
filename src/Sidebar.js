import React from 'react';
import Label from './components/Label';
import Input from './components/Input';
import Button from './components/Button';
import './Sidebar.css';

function Sidebar({ handleExport }) {
  return (
    <div className='sidebar'>
      <div className='content'>
        <div className='block'>BLOCKS</div>
        <Label />
        <Input />
        <Button />
        <button onClick={handleExport} className="export-button">Export Configuration</button>
      </div>
    </div>
      
  );
}

export default Sidebar;
