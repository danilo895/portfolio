import { Component, ElementRef, Renderer2, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';





@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements AfterViewInit {
  nameError: string = '';
  emailError: string = '';
  messageError: string = '';
  checkboxError: string = '';
  isCheckboxChecked: boolean = false;
  isButtonDisabled: boolean = true;
  isFormTouched: boolean = false;
  private http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log("Formular ist gültig! Simulierte Datenübertragung...", this.contactData);

      setTimeout(() => {
        console.log("Simulierter Server-Antwort erhalten:", {
          status: "success",
          message: "Formulardaten erfolgreich verarbeitet",
          receivedData: this.contactData
        });
  
        console.info("Simulierter Test abgeschlossen");
      }, 2000);
    } else {
      console.warn("Formular ist ungültig, wird nicht gesendet.");
    }
  }
  
  
  
  
  

  validateName(event: Event) {
    this.isFormTouched = true;
    const input = (event.target as HTMLInputElement).value;
    const nameRegex = /^[A-Za-zÄÖÜäöüß\s]+$/;

    if (input.trim() === '') {
        this.nameError = "Ooops! It seems your name is missing";
    } else if (!nameRegex.test(input)) {
        this.nameError = "Invalid characters detected! Only letters allowed";
    } else {
        this.nameError = '';
    }
    this.validateCheckbox();
}

validateEmail(event: Event) {
  this.isFormTouched = true;
  const input = (event.target as HTMLInputElement).value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (input.trim() === '') {
      this.emailError = "Hoppla! Your email is required";
  } else if (!emailRegex.test(input)) {
      this.emailError = "Invalid email format";
  } else {
      this.emailError = '';
  }
  this.validateCheckbox();
}

validateMessage(event: Event) {
  this.isFormTouched = true;
  const input = (event.target as HTMLTextAreaElement).value.trim();

  if (input === '') {
      this.messageError = "What do you need to develop?";
  } else if (input.length < 10) {
      this.messageError = "Please provide at least 10 characters";
  } else {
      this.messageError = '';
  }
  this.validateCheckbox();
}



isFormValid(): boolean {
  return !this.nameError && !this.emailError && !this.messageError;
}

isFormCompletelyValid(): boolean {
  return !this.nameError && !this.emailError && !this.messageError && this.isCheckboxChecked;
}


validateCheckbox() {
  const allFieldsValid = !this.nameError && !this.emailError && !this.messageError;

  if (allFieldsValid && !this.isCheckboxChecked) {
      this.checkboxError = "Please accept the privacy policy";
  } else {
      this.checkboxError = "";
  }
  this.isButtonDisabled = !(allFieldsValid && this.isCheckboxChecked && this.isFormTouched);
}


onCheckboxChange(event: Event) {
  const checkbox = event.target as HTMLInputElement;
  this.isCheckboxChecked = checkbox.checked;
  if (this.isFormTouched) {
      this.validateCheckbox();
  }
}


  ngAfterViewInit() {
    this.initializeEffects();
  }

  private initializeEffects() {
    this.setupEffectsForField('.form-group-name', ['.hr-1', '.hr-2'], '#3355FF');
    this.setupEffectsForField('.form-group-email', ['.hr-2', '.hr-3'], '#3355FF');
    this.setupEffectsForField('.form-group-message', ['.hr-3', '.hr-4'], '#3355FF');
  }

  private setupEffectsForField(triggerSelector: string, targetSelectors: string[], color: string) {
    const triggerElement = this.el.nativeElement.querySelector(triggerSelector);
    if (!triggerElement) return;
    const inputElement = triggerElement.querySelector('input, textarea');
    triggerElement.addEventListener('mouseenter', () => this.applyHighlight(targetSelectors, color));
    triggerElement.addEventListener('mouseleave', () => this.removeHighlightIfNotFocused(inputElement, targetSelectors));

    if (inputElement) {
      inputElement.addEventListener('focus', () => this.applyHighlight(targetSelectors, color));
      inputElement.addEventListener('blur', () => this.removeHighlight(targetSelectors));
    }
  }

  private applyHighlight(targetSelectors: string[], color: string) {
    targetSelectors.forEach(selector => {
      const hrElement = this.el.nativeElement.querySelector(selector);
      if (hrElement) {
        this.renderer.setStyle(hrElement, 'backgroundColor', color);
      }
    });
  }

  private removeHighlightIfNotFocused(inputElement: HTMLElement | null, targetSelectors: string[]) {
    if (inputElement && document.activeElement === inputElement) return;
    this.removeHighlight(targetSelectors);
  }

  private removeHighlight(targetSelectors: string[]) {
    targetSelectors.forEach(selector => {
      const hrElement = this.el.nativeElement.querySelector(selector);
      if (hrElement) {
        const defaultColor = selector === '.hr-1' ? 'transparent' : '#F7C518';
        this.renderer.setStyle(hrElement, 'backgroundColor', defaultColor);
      }
    });
  }
}
