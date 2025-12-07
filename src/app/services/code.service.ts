import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Code {
  html: string;
  css: string;
  js: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private storageKey = 'web-dev-compiler-code';
  private apiUrl = 'api/code'; // You can replace this with your backend URL

  constructor() {}

  // Save code locally
  saveCodeLocally(code: Code): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(code));
    } catch (e) {
      console.error('Failed to save code locally:', e);
    }
  }

  // Get stored code from localStorage
  getStoredCode(): Code | null {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Failed to load code from localStorage:', e);
      return null;
    }
  }

  // Save code and get shareable link
  saveCode(code: Code): Observable<string> {
    // For now, we'll use a simple approach with URL parameters
    // In production, you'd want to save to a backend and get a unique ID
    const codeId = this.generateCodeId();
    this.saveCodeLocally(code);
    
    // Store code with ID in localStorage for sharing
    const shareKey = `code-${codeId}`;
    localStorage.setItem(shareKey, JSON.stringify(code));
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?id=${codeId}`;
    return of(shareUrl);
  }

  // Load code by ID
  loadCode(codeId: string): Observable<Code | null> {
    try {
      const shareKey = `code-${codeId}`;
      const stored = localStorage.getItem(shareKey);
      if (stored) {
        const code = JSON.parse(stored);
        // Also save to main storage
        this.saveCodeLocally(code);
        return of(code);
      }
      return of(null);
    } catch (e) {
      console.error('Failed to load code:', e);
      return of(null);
    }
  }

  private generateCodeId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

