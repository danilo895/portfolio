import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Project } from '../../../interfaces/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule

  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  @Input() project: Project = {} as Project;
  @Output() closeDialog= new EventEmitter<void>();





  public closeProjectDetail() {
    this.closeDialog.emit();
  }

}
