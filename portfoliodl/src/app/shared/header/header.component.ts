import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslateService } from '../../services/translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router'; 

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
  language: string = localStorage.getItem('language') || 'en';
  activeNavItem: string | null = null;
  constructor(public translateService: AppTranslateService, private router: Router) {}


  @HostListener('window:resize', [])
  onResize() {
    this.isMobileView = window.innerWidth < 900;
  }
  toggleNavEffect(item: string) {
    const scrollCallback = () => setTimeout(() => this.scrollToSection(item), 100);
    if (this.isOverlayMode) {
      this.closeOverlay.emit();
    }
    if (this.menuOpen) {
      this.toggleMenu();
    }
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(scrollCallback);
    } else {
      scrollCallback();
    }
    setTimeout(() => {
      this.activeNavItem = null;
    }, 100);
  }
  
  



  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  

  public changeLanguage(lang: string) {
    this.language = lang;  
    this.translateService.switchLanguage(lang);
    localStorage.setItem('language', lang);
}

  


  handleAboutClick() {
    const scrollCallback = () => setTimeout(() => this.scrollToSection('aboutSection'), 100);
  
    if (this.isOverlayMode || this.menuOpen) {
      this.closeOverlay.emit();
      this.toggleMenu();
    }
  
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(scrollCallback);
    } else {
      scrollCallback();
    }
  }
  
  handleSkillsClick() {
    const scrollCallback = () => setTimeout(() => this.scrollToSection('techstackSection'), 100);
  
    if (this.isOverlayMode || this.menuOpen) {
      this.closeOverlay.emit();
      this.toggleMenu();
    }
  
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(scrollCallback);
    } else {
      scrollCallback();
    }
  }
  
  handleProjectsClick() {
    const scrollCallback = () => setTimeout(() => this.scrollToSection('projectsSection'), 100);
    if (this.isOverlayMode || this.menuOpen) {
      this.closeOverlay.emit();
      this.toggleMenu();
    }
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(scrollCallback);
    } else {
      scrollCallback();
    }
  }
  
  handleContactClick() {
    const scrollCallback = () => setTimeout(() => this.scrollToSection('contactSection'), 100);
    if (this.isOverlayMode || this.menuOpen) {
      this.closeOverlay.emit();
      this.toggleMenu();
    }
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(scrollCallback);
    } else {
      scrollCallback();
    }
  }
  


  private scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
