import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Project } from '../../../interfaces/project.model';
import { projects } from '../../../projects.data';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TranslateModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnChanges {
  @Input() project: Project = {} as Project;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() projectChange = new EventEmitter<Project>();

  public translatedImplementationDetails: string = '';

  constructor(private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project']?.currentValue) {
      this.loadTranslatedDetails();
    }

    // Falls sich die Sprache ändert, aktualisiere `ImplementationDetails`
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslatedDetails();
    });
  }

  private loadTranslatedDetails() {
    if (this.project?.title) {
      const projectKey = this.project.title.replace(/\s+/g, ""); // Entfernt Leerzeichen für JSON-Schlüssel
      const translationKey = `Home.Projects.ProjectCollection.${projectKey}.ImplementationDetails`;
  
      console.log("🔍 Übersetzungs-Key:", translationKey); // Debugging: Zeigt den Key an
  
      this.translate.get(translationKey).subscribe((translation: string) => {
        console.log("🎯 Gefundene Übersetzung:", translation); // Debugging: Zeigt den Wert an
        if (translation !== translationKey) {
          this.translatedImplementationDetails = translation;
        } else {
          this.translatedImplementationDetails = "Translation missing";
          console.warn(`⚠️ Übersetzung nicht gefunden für: ${translationKey}`);
        }
      });
    }
  }
  

  public closeProjectDetail() {
    this.closeDialog.emit();
  }

  public nextProject() {
    const currentIndex = projects.findIndex(p => p.id === this.project.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    this.project = projects[nextIndex]; 
    this.projectChange.emit(this.project);

    // Aktualisiere `ImplementationDetails` für das neue Projekt
    this.loadTranslatedDetails();
  }
}
