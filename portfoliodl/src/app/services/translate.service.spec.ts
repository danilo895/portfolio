import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from './translate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// Factory function für den TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

describe('AppTranslateService', () => {
    let service: AppTranslateService;
    let translateService: TranslateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                }),
            ],
            providers: [AppTranslateService],
        });

        service = TestBed.inject(AppTranslateService);
        translateService = TestBed.inject(TranslateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with the default language', () => {
        expect(translateService.getDefaultLang()).toBe('en');
    });

    it('should switch language correctly', () => {
        service.switchLanguage('de');
        expect(translateService.currentLang).toBe('de');
    });
});
