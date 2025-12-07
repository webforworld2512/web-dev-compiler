import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './components/editor/editor.component';
import { PreviewComponent } from './components/preview/preview.component';
import { CodeService } from './services/code.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EditorComponent, PreviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';

  constructor(private codeService: CodeService) {}

  ngOnInit() {
    // Load code from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const codeId = urlParams.get('id');
    
    if (codeId) {
      this.codeService.loadCode(codeId).subscribe(code => {
        if (code) {
          this.htmlCode = code.html || '';
          this.cssCode = code.css || '';
          this.jsCode = code.js || '';
        } else {
          this.loadDefaultCode();
        }
      });
    } else {
      this.loadDefaultCode();
    }
  }

  loadDefaultCode() {
    const savedCode = this.codeService.getStoredCode();
    if (savedCode) {
      this.htmlCode = savedCode.html || '';
      this.cssCode = savedCode.css || '';
      this.jsCode = savedCode.js || '';
    } else {
      this.setDefaultCode();
    }
  }

  setDefaultCode() {
    this.htmlCode = `<div>
    <h1>Welcome to Web Dev</h1>
    <p>Hello World!</p>
</div>`;

    this.cssCode = `body {
    margin: 0;
    padding: 20px 20px 20px 40px;
    background: white;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

p {
    color: #666;
}`;

    this.jsCode = `// JavaScript code goes here
console.log('Hello World!');`;
  }

  onCodeChange(code: { html: string; css: string; js: string }) {
    this.htmlCode = code.html;
    this.cssCode = code.css;
    this.jsCode = code.js;
    
    // Auto-save to localStorage
    this.codeService.saveCodeLocally(code);
  }

  onSave() {
    this.codeService.saveCode({
      html: this.htmlCode,
      css: this.cssCode,
      js: this.jsCode
    }).subscribe(shareUrl => {
      if (shareUrl) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert('Shareable link copied to clipboard!\n' + shareUrl);
        });
      }
    });
  }
}

