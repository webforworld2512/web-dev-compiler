import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() htmlCode: string = '';
  @Input() cssCode: string = '';
  @Input() jsCode: string = '';

  compiledCode: SafeHtml = '';
  private iframe: HTMLIFrameElement | null = null;
  private iframeReady = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.updatePreview();
  }

  ngAfterViewInit() {
    // Wait a bit for iframe to be ready
    setTimeout(() => {
      this.iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
      this.iframeReady = true;
      this.updatePreview();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['htmlCode'] || changes['cssCode'] || changes['jsCode']) {
      // Update immediately without delay for instant preview
      this.updatePreview();
    }
  }

  private updatePreview() {
    const fullHtml = this.getFullHtml();
    
    // Try to update iframe directly for instant preview
    if (this.iframeReady && this.iframe && this.iframe.contentDocument) {
      const doc = this.iframe.contentDocument;
      doc.open();
      doc.write(fullHtml);
      doc.close();
    } else {
      // Fallback: use srcdoc
      this.compiledCode = this.sanitizer.sanitize(1, fullHtml) as string;
    }
  }

  private getFullHtml(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        ${this.cssCode}
    </style>
</head>
<body style="background: white; margin: 0; padding: 0;">
    ${this.htmlCode}
    <script>
        (function() {
            try {
                ${this.jsCode}
            } catch (e) {
                console.error('JavaScript Error:', e);
            }
        })();
    </script>
</body>
</html>`;
  }

  onIframeLoad() {
    this.iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
    this.iframeReady = true;
    // Update content when iframe loads
    this.updatePreview();
  }
}

