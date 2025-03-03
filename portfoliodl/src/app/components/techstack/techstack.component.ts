import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core'; // Import hinzugefügt!

@Component({
  selector: 'app-techstack',
  standalone: true,
  imports: [CommonModule, TranslateModule], // TranslateModule hier hinzufügen!
  templateUrl: './techstack.component.html',
  styleUrl: './techstack.component.scss'
})
export class TechstackComponent {

  @ViewChild('peeloffCover') peeloffCover!: ElementRef;
  @ViewChild('peeloffMiddle') peeloffMiddle!: ElementRef;
  @ViewChild('finalPeeloff') finalPeeloff!: ElementRef;

  peelOffInterests(): void {
    setTimeout(() => {
      this.peeloffMiddle.nativeElement.classList.add('show');
      this.peeloffCover.nativeElement.classList.add('hidden');
      setTimeout(() => {
        this.finalPeeloff.nativeElement.classList.add('show');
        setTimeout(() => {
          this.peeloffMiddle.nativeElement.classList.remove('show');
        }, 25);
      }, 25);
    }, 25);
  }
}
