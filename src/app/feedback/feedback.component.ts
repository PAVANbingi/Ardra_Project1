// feedback.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  imports: [FormsModule,CommonModule ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  userName: string = '';
  email: string = '';
  message: string = '';
  rating: number | null = null;

  submitted: boolean = false;
  status: 'idle' | 'success' | 'error' = 'idle';

  // Track touched fields
  userNameTouched: boolean = false;
  emailTouched: boolean = false;
  messageTouched: boolean = false;
  ratingTouched: boolean = false;

  showFieldErrors: boolean = false;

  get isValid(): boolean {
    return (
      this.userName.trim().length >= 3 &&
      this.isValidEmail(this.email) &&
      this.message.trim().length >= 10 &&
      this.rating !== null
    );
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  getEmojiMessage(rating: number): string {
    switch (rating) {
      case 1: return "😢 Very Bad";
      case 2: return "😒 Bad";
      case 3: return "😊 Average";
      case 4: return "😀 Good";
      case 5: return "😍 Excellent";
      default: return "";
    }
  }

  submitFeedback() {
    // mark all fields as touched
    this.userNameTouched = true;
    this.emailTouched = true;
    this.messageTouched = true;
    this.ratingTouched = true;

    // Show error summary if not valid
    if (!this.isValid) {
      this.status = 'error';
      this.showFieldErrors = true;
      return;
    }

    // If valid, proceed
    this.status = 'success';
    this.submitted = true;
    this.showFieldErrors = false;

    setTimeout(() => {
      this.userName = '';
      this.email = '';
      this.message = '';
      this.rating = null;

      this.userNameTouched = false;
      this.emailTouched = false;
      this.messageTouched = false;
      this.ratingTouched = false;

      this.submitted = false;
      this.status = 'idle';
    }, 3000);
  }
}

