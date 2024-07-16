# Mini Page Builder App

## Overview

A detailed explanation of the Mini Page Builder App, which allows users to drag and drop elements onto a canvas and save their configurations. The app is built using React and deployed on Vercel.

## Structure

The app consists of several main components:
- `index.js`
- `App.js`
- `Canvas.js`
- `Sidebar.js`
- `Modal.js`
- Individual Element Components: `Label.js`, `Input.js` and `Button.js`
- CSS files for styling

### index.js

The `index.js` file is the entry point of the application. It imports React and ReactDOM, as well as the main `App` component. It renders the `App` component inside the root element of the HTML.

### App.js

The `App.js` file contains the main application logic. It uses React hooks to manage state and side effects.

- **State Management**: The `elements` state stores the list of elements on the canvas. It is initialized by fetching data from `localStorage`.
- **Effects**: The `useEffect` hook is used to update `localStorage` whenever the `elements` state changes.
- **Export Functionality**: The `handleExport` function allows users to export the current configuration as a JSON file.

The `App` component renders the `Canvas` and `Sidebar` components.

### Canvas.js

The `Canvas.js` file handles the canvas where elements are placed. It manages the following functionalities:

- **State Management**: Manages the state for modal visibility, temporary elements, selected elements, and dragging elements.
- **Event Handling**: Handles keyboard events for element selection and deletion, drag and drop events for placing and moving elements, and click events for selecting elements.
- **Element Management**: Functions for adding, updating, and deleting elements, as well as handling their drag-and-drop behavior.
- **Rendering Elements**: Renders the elements on the canvas, with different types (label, input, button) having specific behaviors and styles.

### Sidebar.js

The `Sidebar.js` file contains the sidebar component with draggable elements (Label, Input, Button) and an export button.

- **Draggable Elements**: Each element (Label, Input, Button) is draggable, allowing users to drag them onto the canvas.
- **Export Button**: A button that triggers the export functionality to download the current canvas configuration as a JSON file.

### Modal.js

The `Modal.js` file handles the modal dialog for editing element properties.

- **State Management**: Manages the state for element properties such as text, coordinates, font size, and font weight.
- **Effect Hook**: Initializes the modal with the current properties of the selected element.
- **Form Handling**: Provides input fields for updating element properties and a save button to apply changes.

### Element Components

The element components (Label, Input, Button) are individual React components representing the draggable elements in the sidebar.

- **Drag Handlers**: Each component includes drag start and drag end handlers to manage the drag-and-drop behavior.

### CSS Files

The CSS files (`App.css`, `Canvas.css`, `Modal.css`, `Sidebar.css`, `Label.css`) provide styling for the application.

- **App.css**: General styles for the application layout.
- **Canvas.css**: Styles specific to the canvas and elements within it.
- **Modal.css**: Styles for the modal dialog.
- **Sidebar.css**: Styles for the sidebar and its content.
- **Label.css**: Styles specific to the Label component, defining its appearance and behavior on the canvas.

## Usage

1. **Drag Elements**: Drag elements from the sidebar to the canvas.
2. **Edit Elements**: Click on an element on the canvas to select it. Use the keyboard (Enter to edit, Delete to remove) or the modal dialog to update its properties.
3. **Move Elements**: Drag elements around the canvas to reposition them.
4. **Export Configuration**: Click the export button in the sidebar to download the current canvas configuration as a JSON file.

## Deployment

The app is deployed on Vercel. Ensure you have Vercel CLI installed and configured. To deploy, run:

```bash
vercel
```

## Running Locally

To run the app locally, follow these steps:

1. **Clone the repository**

```bash
git clone https://github.com/kaushiktak19/mini-page-builder
cd mini-page-builder
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

