import { Component } from '@angular/core';
import { HoverTransformDirective } from '../../directives/hover-transform.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  imports: [CommonModule, HoverTransformDirective] 
})
export class HeroComponent {}
