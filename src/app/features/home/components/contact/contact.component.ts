import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.showSuccess = false;
      
      // Simulating enterprise-grade email transmission
      setTimeout(() => {
        const formData = this.contactForm.value;
        console.log('✅ SIGNAL TRANSMITTED TO hello@drove.dev:', formData);
        
        this.isSubmitting = false;
        this.showSuccess = true;
        this.contactForm.reset();
        
        // Success state persistence
        setTimeout(() => {
          this.showSuccess = false;
        }, 10000);
      }, 2500);
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }
}
