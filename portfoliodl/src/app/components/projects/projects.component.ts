import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../projects.data';
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { Project } from '../../interfaces/project.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectDetailComponent, TranslateModule],

  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  public projects = projects as Project[]; 
  public showProjectDetail: boolean = false;
  public selectedProject: Project = {} as Project;

  public toggleProjectDetail() {
    this.showProjectDetail = !this.showProjectDetail;
    console.log('showProjectDetail', this.showProjectDetail);
  }

  public openProject(project: Project) {
    this.selectedProject = project;
    this.toggleProjectDetail();
  }
}

