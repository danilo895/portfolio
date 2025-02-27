import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setupHoverEffect('.form-group-name', ['.hr-1', '.hr-2'], '#3355FF');
    this.setupHoverEffect('.form-group-email', ['.hr-2', '.hr-3'], '#3355FF');
    this.setupHoverEffect('.form-group-message', ['.hr-3', '.hr-4'], '#3355FF');
  }

  setupHoverEffect(triggerSelector: string, targetSelectors: string[], color: string) {
    const triggerElement = this.el.nativeElement.querySelector(triggerSelector);
    if (triggerElement) {
      triggerElement.addEventListener('mouseenter', () => {
        targetSelectors.forEach(selector => {
          const hrElement = this.el.nativeElement.querySelector(selector);
          if (hrElement) {
            this.renderer.setStyle(hrElement, 'backgroundColor', color);
          }
        });
      });

      triggerElement.addEventListener('mouseleave', () => {
        targetSelectors.forEach(selector => {
          const hrElement = this.el.nativeElement.querySelector(selector);
          if (hrElement) {
            const defaultColor = selector === '.hr-1' ? 'transparent' : '#F7C518';
            this.renderer.setStyle(hrElement, 'backgroundColor', defaultColor);
          }
        });
      });
    }
  }
}
