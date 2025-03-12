import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    console.log('TestimonialsComponent initialized');

    const container: HTMLElement | null = this.el.nativeElement.querySelector('.testimonial-container');

    if (!container) {
      console.error('Element `.testimonial-container` nicht gefunden!');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(container, 'visible');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);


    const cards: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.testimonial-image-wrapper');

    cards.forEach((card: HTMLElement) => {
      card.addEventListener('touchstart', () => {
        cards.forEach((c: HTMLElement) => this.renderer.removeClass(c, 'touched'));

        this.renderer.addClass(card, 'touched');
      });
    });
  }
}
