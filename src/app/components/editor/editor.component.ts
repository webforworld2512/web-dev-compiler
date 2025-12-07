import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Code } from '../../services/code.service';
import { Subject, debounceTime } from 'rxjs';

declare var monaco: any;

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() htmlCode: string = '';
  @Input() cssCode: string = '';
  @Input() jsCode: string = '';
  @Output() codeChange = new EventEmitter<Code>();

  private htmlEditor: any;
  private cssEditor: any;
  private jsEditor: any;
  private codeChangeSubject = new Subject<Code>();
  activeTab: 'html' | 'css' | 'js' = 'html';
  private isUpdatingFromInput = false;

  ngOnInit() {
    // Minimal debounce for instant preview (10ms for smooth typing)
    this.codeChangeSubject.pipe(
      debounceTime(10)
    ).subscribe(code => {
      this.codeChange.emit(code);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.htmlEditor || this.cssEditor || this.jsEditor) {
      this.updateEditors();
    }
  }

  ngAfterViewInit() {
    this.initializeMonaco();
  }

  ngOnDestroy() {
    if (this.htmlEditor) this.htmlEditor.dispose();
    if (this.cssEditor) this.cssEditor.dispose();
    if (this.jsEditor) this.jsEditor.dispose();
  }

  private async initializeMonaco() {
    // Load Monaco Editor
    if (typeof (window as any).monaco === 'undefined') {
      await this.loadMonacoScript();
    }

    // Initialize HTML Editor
    this.htmlEditor = monaco.editor.create(document.getElementById('html-editor')!, {
      value: this.htmlCode,
      language: 'html',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: true },
      fontSize: 14,
      wordWrap: 'on',
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      acceptSuggestionOnEnter: 'on'
    });

    // Initialize CSS Editor
    this.cssEditor = monaco.editor.create(document.getElementById('css-editor')!, {
      value: this.cssCode,
      language: 'css',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: true },
      fontSize: 14,
      wordWrap: 'on',
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      acceptSuggestionOnEnter: 'on'
    });

    // Initialize JavaScript Editor
    this.jsEditor = monaco.editor.create(document.getElementById('js-editor')!, {
      value: this.jsCode,
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: true },
      fontSize: 14,
      wordWrap: 'on',
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      acceptSuggestionOnEnter: 'on'
    });

    // Add change listeners
    this.htmlEditor.onDidChangeModelContent(() => {
      this.emitCodeChange();
    });

    this.cssEditor.onDidChangeModelContent(() => {
      this.emitCodeChange();
    });

    this.jsEditor.onDidChangeModelContent(() => {
      this.emitCodeChange();
    });

    // Update editors when input changes
    this.updateEditors();
  }

  private loadMonacoScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).monaco) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js';
      script.onload = () => {
        (window as any).require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });
        (window as any).require(['vs/editor/editor.main'], () => {
          resolve();
        });
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  private emitCodeChange() {
    if (this.isUpdatingFromInput) return;
    
    const code: Code = {
      html: this.htmlEditor?.getValue() || '',
      css: this.cssEditor?.getValue() || '',
      js: this.jsEditor?.getValue() || ''
    };
    this.codeChangeSubject.next(code);
  }

  private updateEditors() {
    this.isUpdatingFromInput = true;
    
    if (this.htmlEditor && this.htmlCode !== this.htmlEditor.getValue()) {
      this.htmlEditor.setValue(this.htmlCode);
    }
    if (this.cssEditor && this.cssCode !== this.cssEditor.getValue()) {
      this.cssEditor.setValue(this.cssCode);
    }
    if (this.jsEditor && this.jsCode !== this.jsEditor.getValue()) {
      this.jsEditor.setValue(this.jsCode);
    }
    
    setTimeout(() => {
      this.isUpdatingFromInput = false;
    }, 0);
  }

  setActiveTab(tab: 'html' | 'css' | 'js') {
    this.activeTab = tab;
  }

  getActiveTab(): 'html' | 'css' | 'js' {
    return this.activeTab;
  }
}

