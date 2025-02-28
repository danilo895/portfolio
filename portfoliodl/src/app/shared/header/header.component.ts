import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslateService } from '../../services/translate.service';
import { TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isOverlayMode: boolean = false; 
  @Output() closeOverlay = new EventEmitter<void>();

  constructor(public translateService: AppTranslateService) {

  }

  public changeLanguage(lang: string) {
    this.translateService.switchLanguage(lang);
  }

  handleAboutClick() {
    if (this.isOverlayMode) {
      this.closeOverlay.emit();
      setTimeout(() => {
        this.scrollToSection('aboutSection');
      }, 100);
    } else {
      this.scrollToSection('aboutSection');
    }
  }

  handleSkillsClick() {
    if (this.isOverlayMode) {
      this.closeOverlay.emit();
      setTimeout(() => {
        this.scrollToSection('techstackSection');
      }, 100);
    } else {
      this.scrollToSection('techstackSection');
    }
  }

  handleProjectsClick() {
    if (this.isOverlayMode) {
      this.closeOverlay.emit();
      setTimeout(() => {
        this.scrollToSection('projectsSection');
      }, 100);
    } else {
      this.scrollToSection('projectsSection');
    }
  }

  handleContactClick() {
    if (this.isOverlayMode) {
      this.closeOverlay.emit();
      setTimeout(() => {
        this.scrollToSection('contactSection');
      }, 100);
    } else {
      this.scrollToSection('contactSection');
    }
  }

  private scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
