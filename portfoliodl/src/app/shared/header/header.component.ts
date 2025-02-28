import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isOverlayMode: boolean = false; 
  @Output() closeOverlay = new EventEmitter<void>();


  handleAboutClick() {
    if (this.isOverlayMode) {
      this.closeOverlay.emit();
      setTimeout(() => {
        this.scrollToAbout();
      }, 100);
    } else {
      this.scrollToAbout();
    }
  }

  private scrollToAbout() {
    const aboutSection = document.getElementById('aboutSection');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
