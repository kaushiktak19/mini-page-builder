import React, { useState, useEffect } from 'react';
import './App.css';
import Canvas from './Canvas';
import Sidebar from './Sidebar';

function App() {
  const [elements, setElements] = useState(() => {
    const savedElements = localStorage.getItem('canvasElements');
    return savedElements ? JSON.parse(savedElements) : [];
  });

  useEffect(() => {
    localStorage.setItem('canvasElements', JSON.stringify(elements));
  }, [elements]);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(elements));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "canvasElements.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="App">
      <Canvas elements={elements} setElements={setElements} />
      <Sidebar handleExport={handleExport} />
    </div>
  );
}

export default App;
