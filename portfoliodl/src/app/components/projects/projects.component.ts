import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../projects.data';
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { Project } from '../../interfaces/project.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectDetailComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  public projects: Project[] = [];
  public showProjectDetail: boolean = false;
  public selectedProject: Project = {} as Project;

  constructor(private translate: TranslateService) {
    this.loadProjects();
    this.translate.onLangChange.subscribe(() => {
      this.loadProjects();
    });
  }

  private loadProjects() {
    this.translate.get('Home.Projects.ProjectCollection').subscribe((translations: any) => {
      this.projects = projects.map(project => {
        if (translations[project.title]) {
          return {
            ...project,
            title: translations[project.title].Title,
            description: translations[project.title].Description,
            image: translations[project.title].Image
          };
        }
        return project;
      });
    });
  }

  public toggleProjectDetail() {
    this.showProjectDetail = !this.showProjectDetail;
  
    if (this.showProjectDetail) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
  
  

  public openProject(project: Project) {
    this.selectedProject = project;
    this.toggleProjectDetail();
  }
}
