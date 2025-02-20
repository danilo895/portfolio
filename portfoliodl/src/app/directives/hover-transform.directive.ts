import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverTransform]',
  standalone: true,
})
export class HoverTransformDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && target.nodeType === Node.ELEMENT_NODE) {
      this.renderer.setStyle(target, 'text-transform', 'lowercase');
      this.renderer.setStyle(target, 'color', '#F7C518');
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && target.nodeType === Node.ELEMENT_NODE) {
      this.renderer.setStyle(target, 'text-transform', 'uppercase');
      this.renderer.setStyle(target, 'color', 'white');
    }
  }
}
