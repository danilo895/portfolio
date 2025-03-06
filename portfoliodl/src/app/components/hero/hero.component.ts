import { Component, OnDestroy } from '@angular/core';
import { HoverTransformDirective } from '../../directives/hover-transform.directive';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '../../services/translate.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  imports: [CommonModule, HoverTransformDirective, TranslateModule]
})
export class HeroComponent implements OnDestroy {
  translatedJobName!: Observable<string>;
  private langChangeSub!: Subscription;
  constructor(public translateService: AppTranslateService, private translate: TranslateService) {
    this.loadTranslatedJobName();


    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadTranslatedJobName();
    });
  }

  private loadTranslatedJobName() {
    this.translatedJobName = this.translate.get('Home.Hero.JobName');
  }

  public scrollToContact() {
    const contactSection = document.getElementById('contactSection');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  

  ngOnDestroy(): void {
    this.langChangeSub.unsubscribe();
  }
}


