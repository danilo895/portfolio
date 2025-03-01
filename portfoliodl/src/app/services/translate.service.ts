import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  private translate = inject(TranslateService);

  constructor() {
    this.initTranslation();
    console.log('AppTranslateService initialized', "currentLanguage: ", this.currentLanguage);

  }

  private initTranslation() {
    const savedLang = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
    document.documentElement.setAttribute('lang', savedLang);
  }
  

  public switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang); // Fügt das `lang`-Attribut zu <html> hinzu
  }
  

  get currentLanguage(): string {
    return this.translate.currentLang;
  }
}