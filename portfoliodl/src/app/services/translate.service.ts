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
    const defaultLang = 'en';
    //const browserLang = this.translate.getBrowserLang() || defaultLang;
    const browserLang = defaultLang;

    this.translate.setDefaultLang(defaultLang);
    this.translate.use(browserLang);
  }

  public switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  get currentLanguage(): string {
    return this.translate.currentLang;
  }
}