import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../projects.data';
import { ProjectDetailComponent } from "./project-detail/project-detail.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectDetailComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  public projects = projects; 
  public showProjectDetail: boolean = false;
  public selectedProject: any;

  public toggleProjectDetail() {
    this.showProjectDetail = !this.showProjectDetail;
    console.log('showProjectDetail', this.showProjectDetail);
  }

  public openProject(project: any) {
    this.selectedProject = project;
    this.toggleProjectDetail();
  }
}

