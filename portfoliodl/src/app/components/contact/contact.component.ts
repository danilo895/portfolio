import { Component, ElementRef, Renderer2, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, RouterModule],
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
  nameTouched: boolean = false;
  emailTouched: boolean = false;
  messageTouched: boolean = false;

  successMessage: string = '';
  private http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService,
    private router: Router 
  ) {}

  navigateToPrivacy() {
    localStorage.setItem('scrollPosition', window.scrollY.toString());
    this.router.navigate(['/privacy-policy']).then(() => {
      window.scrollTo(0, 0);
    });
  }
  
  

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
  
      this.http.post('https://daniel-loeffler.com/sendMail.php', this.contactData, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        (response: any) => {
          if (response.status === "success") {
            this.successMessage = "E-Mail successfully sent!";
            this.contactData = { name: '', email: '', message: '' };
            ngForm.resetForm();
            this.isCheckboxChecked = false;
            const checkbox = document.getElementById('privacy-checkbox') as HTMLInputElement;
            if (checkbox) {
              checkbox.checked = false;
            }
            this.isButtonDisabled = true;
            this.isFormTouched = false;
            setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          } else {
            this.successMessage = "Fehler beim Senden der E-Mail.";
          }
        },
        (error) => {
          console.error("Fehler beim Senden der E-Mail:", error);
          this.successMessage = "Es gab ein Problem beim Senden der Nachricht.";
        }
      );
    } else {
      console.warn("Formular ist ungültig, wird nicht gesendet.");
    }
  }

  validateName(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const nameRegex = /^[A-Za-zÄÖÜäöüß\s]+$/;

    if (input.length > 0) { 
        this.nameTouched = true; 
    }

    if (this.nameTouched) {
        if (input.trim() === '') {
            this.nameError = this.translate.instant('Home.Contact.Form.NameRequired');
        } else if (!nameRegex.test(input)) {
            this.nameError = this.translate.instant('Home.Contact.Form.NameInvalid');
        } else {
            this.nameError = '';
        }
    }

    this.validateCheckbox();
}

validateEmail(event: Event) {
  const input = (event.target as HTMLInputElement).value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (input.length > 0) { 
      this.emailTouched = true; 
  }

  if (this.emailTouched) {
      if (input.trim() === '') {
          this.emailError = this.translate.instant('Home.Contact.Form.EmailRequired');
      } else if (!emailRegex.test(input)) {
          this.emailError = this.translate.instant('Home.Contact.Form.EmailInvalid');
      } else {
          this.emailError = '';
      }
  }

  this.validateCheckbox();
}



validateMessage(event: Event) {
  const input = (event.target as HTMLTextAreaElement).value.trim();

  if (input.length > 0) { 
      this.messageTouched = true; 
  }

  if (this.messageTouched) {
      if (input === '') {
          this.messageError = this.translate.instant('Home.Contact.Form.MessageRequired');
      } else if (input.length < 10) {
          this.messageError = this.translate.instant('Home.Contact.Form.MessageTooShort');
      } else {
          this.messageError = '';
      }
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
  const formFilledCompletely = this.contactData.name.trim() !== '' && 
                            this.contactData.email.trim() !== '' && 
                            this.contactData.message.trim() !== '';
  this.isFormTouched = formFilledCompletely;

  if (allFieldsValid && !this.isCheckboxChecked && this.isFormTouched) {
      this.checkboxError = this.translate.instant('Home.Contact.Form.PrivacyError');
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
