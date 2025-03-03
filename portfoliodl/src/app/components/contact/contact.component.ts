import { Component, ElementRef, Renderer2, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.initializeEffects();
  }

  private initializeEffects() {
    this.setupEffectsForField('.form-group-name', ['.hr-1', '.hr-2'], '#3355FF');
    this.setupEffectsForField('.form-group-email', ['.hr-2', '.hr-3'], '#3355FF');
    this.setupEffectsForField('.form-group-message', ['.hr-3', '.hr-4'], '#3355FF');
  }

  private setupEffectsForField(triggerSelector: string, targetSelectors: string[], color: string) {
    const triggerElement = this.el.nativeElement.querySelector(triggerSelector);
    if (!triggerElement) return;
    const inputElement = triggerElement.querySelector('input, textarea');
    triggerElement.addEventListener('mouseenter', () => this.applyHighlight(targetSelectors, color));
    triggerElement.addEventListener('mouseleave', () => this.removeHighlightIfNotFocused(inputElement, targetSelectors));

    if (inputElement) {
      inputElement.addEventListener('focus', () => this.applyHighlight(targetSelectors, color));
      inputElement.addEventListener('blur', () => this.removeHighlight(targetSelectors));
    }
  }

  private applyHighlight(targetSelectors: string[], color: string) {
    targetSelectors.forEach(selector => {
      const hrElement = this.el.nativeElement.querySelector(selector);
      if (hrElement) {
        this.renderer.setStyle(hrElement, 'backgroundColor', color);
      }
    });
  }

  private removeHighlightIfNotFocused(inputElement: HTMLElement | null, targetSelectors: string[]) {
    if (inputElement && document.activeElement === inputElement) return;
    this.removeHighlight(targetSelectors);
  }

  private removeHighlight(targetSelectors: string[]) {
    targetSelectors.forEach(selector => {
      const hrElement = this.el.nativeElement.querySelector(selector);
      if (hrElement) {
        const defaultColor = selector === '.hr-1' ? 'transparent' : '#F7C518';
        this.renderer.setStyle(hrElement, 'backgroundColor', defaultColor);
      }
    });
  }
}
