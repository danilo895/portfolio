import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverTransform]',
  standalone: true
})
export class HoverTransformDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    const target = this.el.nativeElement as HTMLElement;
    
    if (target) {
      this.renderer.addClass(target, 'hover-active');
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const target = this.el.nativeElement as HTMLElement;

    if (target) {
      this.renderer.removeClass(target, 'hover-active'); 
    }
  }
}
