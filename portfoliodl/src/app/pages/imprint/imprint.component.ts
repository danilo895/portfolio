import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule], 
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  constructor(public translateService: AppTranslateService, private translate: TranslateService) {}

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
