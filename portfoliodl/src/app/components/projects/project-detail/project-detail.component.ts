import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../interfaces/project.model';
import { projects } from '../../../projects.data';
import { HeaderComponent } from '../../../shared/header/header.component'; 

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  @Input() project: Project = {} as Project;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() projectChange = new EventEmitter<Project>();

  public closeProjectDetail() {
    this.closeDialog.emit();
  }

  public nextProject() {
    const currentIndex = projects.findIndex(p => p.id === this.project.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    this.project = projects[nextIndex]; 
    this.projectChange.emit(this.project); 
  }
}
