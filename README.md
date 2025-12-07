# Web Dev Compiler - Online IDE

An Angular-based online IDE for HTML, CSS, and JavaScript development with live preview, code suggestions, and shareable links.

## Features

-  **Live Preview**: Real-time preview of HTML, CSS, and JavaScript with no delays
-  **Code Suggestions**: Intelligent autocomplete powered by Monaco Editor
-  **Save & Share**: Save your code and get shareable links
-  **Persistent Storage**: Code persists across page refreshes using localStorage
-  **Syntax Highlighting**: Full syntax highlighting for HTML, CSS, and JavaScript
-  **Tabbed Editor**: Switch between HTML, CSS, and JavaScript tabs

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

## Notes

- Code is stored in localStorage for persistence
- Shareable links use URL parameters with localStorage backup

# web-dev-compiler

<img width="1440" height="861" alt="Screenshot 2025-12-07 at 9 27 06 AM" src="https://github.com/user-attachments/assets/ad5ff042-bf9a-4d34-974c-68691894da8e" />

<img width="1440" height="865" alt="Screenshot 2025-12-07 at 9 27 25 AM" src="https://github.com/user-attachments/assets/c4928683-7057-4893-864f-6f8939c65a52" />


