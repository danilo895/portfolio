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
  public translatedDescription: string = '';
  public translatedTitle: string = '';
  public translatedDuration: string = '';
  public translatedTechStack: { name: string; icon: string }[] = [];




  constructor(private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project']?.currentValue) {
      this.loadTranslatedDetails();
    }


    this.translate.onLangChange.subscribe(() => {
      this.loadTranslatedDetails();
    });
  }

  private loadTranslatedDetails() {
    if (this.project?.title) {
        const projectKey = this.project.title.replace(/\s+/g, "");
        const titleKey = `Home.Projects.ProjectCollection.${projectKey}.Title`;
        const descriptionKey = `Home.Projects.ProjectCollection.${projectKey}.Description`;
        const implementationDetailsKey = `Home.Projects.ProjectCollection.${projectKey}.ImplementationDetails`;
        const durationKey = `Home.Projects.ProjectCollection.${projectKey}.Duration`;


        this.translate.get(titleKey).subscribe((translation: string) => {
            this.translatedTitle = translation !== titleKey ? translation : "Translation missing";
        });


        this.translate.get(descriptionKey).subscribe((translation: string) => {
            this.translatedDescription = translation !== descriptionKey ? translation : "Translation missing";
        });

  
        this.translate.get(implementationDetailsKey).subscribe((translation: string) => {
            this.translatedImplementationDetails = translation !== implementationDetailsKey ? translation : "Translation missing";
        });


        this.translate.get(durationKey).subscribe((translation: string) => {
            this.translatedDuration = translation !== durationKey ? translation : "Translation missing";
        });


        this.translatedTechStack = [];
        this.translate.get('Home.Projects.TechStack').subscribe((techStack: any) => {
            this.project.used_tech.forEach(tech => {
                if (techStack[tech]) {
                    this.translatedTechStack.push({
                        name: techStack[tech].name,
                        icon: techStack[tech].icon
                    });
                }
            });
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
    const projectKey = this.project.title.replace(/\s+/g, "");
    const titleKey = `Home.Projects.ProjectCollection.${projectKey}.Title`;
    this.translate.get(titleKey).subscribe((translation: string) => {
        this.translatedTitle = translation !== titleKey ? translation : this.project.title;
        this.project = { ...this.project, title: this.translatedTitle };
    });
    this.projectChange.emit(this.project);
}

}
