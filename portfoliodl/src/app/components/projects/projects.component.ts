import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = [
    {
      title: "Join",
      description: "This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.",
      image: "/assets/img/projects/join.png",
      buttonText: "Project details"
    },
    {
      title: "El Pollo Loco",
      description: "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.",
      image: "/assets/img/projects/epl.png",
      buttonText: "Project details"
    },
    {
      title: "Portfolio",
      description: "This is my personal portfolio website, built with Angular and TypeScript, showcasing my projects, skills, and experience as a frontend developer.",
      image: "/assets/img/projects/portfolio.png",
      buttonText: "Project details"
    },
    {
      title: "El Pollo Loco",
      description: "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.",
      image: "/assets/img/projects/epl.png",
      buttonText: "Project details"
    }
  ];
}

