# ImageForge

A modern browser-based image editor built with HTML, CSS, and Vanilla JavaScript.

ImageForge allows users to upload images, apply real-time adjustments, use cinematic presets, inspect image metadata, and export edited images directly from the browser without relying on external services.

## Preview

![ImageForge UI](assets/screenshots/editor-ui.png)

## Features

* Real-time image adjustments
* Brightness control
* Contrast control
* Saturation control
* Blur effect
* Grayscale effect
* Sepia effect
* Hue rotation
* Invert colors
* Opacity control
* Preset-based image styling
* Image metadata inspection
* PNG export functionality
* Responsive user interface
* Canvas API rendering engine

## Built With

* HTML5
* CSS3
* Vanilla JavaScript
* Canvas API

## Architecture

The application is divided into four core modules:

### Upload Engine

Handles image selection and loading into the editor.

### Filter Engine

Applies real-time visual adjustments using the Canvas API filter pipeline.

### Preset Engine

Provides reusable cinematic and creative image presets.

### Export Engine

Generates and downloads edited images as PNG files directly from the browser.

## Screenshots

### Editor Interface

![Editor](assets/screenshots/editor-ui.png)

### Preset System

![Presets](assets/screenshots/presets-panel.png)

### Metadata Panel

![Metadata](assets/screenshots/metadata-panel.png)

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/imageforge-web-editor.git
```

Open the project folder and launch:

```bash
index.html
```

## Future Improvements

* Image Scaling
* Drag & Drop Upload
* Additional Export Formats
* Custom Preset Saving

## License

This project is licensed under the MIT License.
