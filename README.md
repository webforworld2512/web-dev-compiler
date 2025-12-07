# Web Dev Compiler - Online IDE

An Angular-based online IDE for HTML, CSS, and JavaScript development with live preview, code suggestions, and shareable links.

## Features

- ✅ **Live Preview**: Real-time preview of HTML, CSS, and JavaScript with no delays
- ✅ **Code Suggestions**: Intelligent autocomplete powered by Monaco Editor
- ✅ **Save & Share**: Save your code and get shareable links
- ✅ **Persistent Storage**: Code persists across page refreshes using localStorage
- ✅ **Syntax Highlighting**: Full syntax highlighting for HTML, CSS, and JavaScript
- ✅ **Tabbed Editor**: Switch between HTML, CSS, and JavaScript tabs

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

## Usage

1. **Edit Code**: Use the tabbed editor to switch between HTML, CSS, and JavaScript
2. **Live Preview**: See your changes instantly in the preview pane
3. **Save & Share**: Click "Save & Get Shareable Link" to generate a shareable URL
4. **Persistent Code**: Your code is automatically saved to localStorage and persists across refreshes

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── editor/          # Code editor component with Monaco
│   │   └── preview/         # Live preview component
│   ├── services/
│   │   └── code.service.ts  # Code storage and sharing service
│   └── app.component.*      # Main app component
├── index.html
├── main.ts
└── styles.css
```

## Technologies Used

- Angular 17 (Standalone Components)
- Monaco Editor (VS Code editor)
- TypeScript
- RxJS

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Notes

- Code is stored in localStorage for persistence
- Shareable links use URL parameters with localStorage backup
- For production, consider implementing a backend API for code storage

# web-dev-compiler
