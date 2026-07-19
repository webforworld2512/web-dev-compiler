import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
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

  editorWidth = 50;
  toastVisible = false;
  toastMessage = '';
  resizing = false;
  private toastTimer: any;

  @ViewChild('mainContent') mainContent!: ElementRef<HTMLDivElement>;

  constructor(private codeService: CodeService) {}

  startResize(event: MouseEvent) {
    event.preventDefault();
    this.resizing = true;
  }

  onDividerKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.editorWidth = Math.max(20, this.editorWidth - 2);
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.editorWidth = Math.min(80, this.editorWidth + 2);
      event.preventDefault();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.resizing) return;
    const rect = this.mainContent.nativeElement.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    this.editorWidth = Math.min(80, Math.max(20, percent));
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.resizing = false;
  }

  private showToast(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toastVisible = false), 2600);
  }

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
          this.showToast('Link copied to clipboard');
        });
      }
    });
  }
}

