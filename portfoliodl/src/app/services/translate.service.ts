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
    const savedLang = localStorage.getItem('language');
    const defaultLang = savedLang || 'en';
    
    this.translate.setDefaultLang('en');
    this.translate.use(defaultLang); 

    document.documentElement.setAttribute('lang', defaultLang);
  }
  
  public switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
  }
  

  get currentLanguage(): string {
    return this.translate.currentLang;
  }
}
