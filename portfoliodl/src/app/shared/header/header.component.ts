import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslateService } from '../../services/translate.service';
import { TranslateModule } from '@ngx-translate/core';

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

  isMobileView: boolean = window.innerWidth < 900;
  menuOpen: boolean = false;
  language: string = 'en';
  activeNavItem: string | null = null;
  constructor(public translateService: AppTranslateService) {}
  


  @HostListener('window:resize', [])
  onResize() {
    this.isMobileView = window.innerWidth < 900;
  }

  toggleNavEffect(item: string) {
    this.activeNavItem = item;
    setTimeout(() => {
        this.scrollToSection(item);
        this.menuOpen = false;


        setTimeout(() => {
            this.activeNavItem = null;
        }, 300); 
    }, 300);
}



  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  public changeLanguage(lang: string) {
    this.language = lang;
    this.translateService.switchLanguage(lang);
  }


  handleAboutClick() {
    if (this.isOverlayMode || this.menuOpen) {
      this.closeOverlay.emit();
      this.toggleMenu();
      setTimeout(() => {
        this.scrollToSection('aboutSection');
      }, 100);
    } else {
      this.scrollToSection('aboutSection');
    }
  }

  handleSkillsClick() {
    if (this.isOverlayMode || this.menuOpen) {
      this.closeOverlay.emit();
      this.toggleMenu();
      setTimeout(() => {
        this.scrollToSection('techstackSection');
      }, 100);
    } else {
      this.scrollToSection('techstackSection');
    }
  }

  handleProjectsClick() {
    if (this.isOverlayMode || this.menuOpen) {
      this.closeOverlay.emit();
      this.toggleMenu();
      setTimeout(() => {
        this.scrollToSection('projectsSection');
      }, 100);
    } else {
      this.scrollToSection('projectsSection');
    }
  }

  handleContactClick() {
    if (this.isOverlayMode || this.menuOpen) {
      this.closeOverlay.emit();
      this.toggleMenu();
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
