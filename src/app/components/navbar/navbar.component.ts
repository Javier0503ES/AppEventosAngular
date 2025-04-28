import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  isUnlocked: boolean = false;
  showModal: boolean = false;
  passwordInput: string = '';
  optionsEnabled: boolean = false;

  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.passwordInput = '';
  }
  validatePassword() {
    const passwordCorrecta = '1234abcd';
    if (this.passwordInput === passwordCorrecta) {
      this.isUnlocked = true;
      this.optionsEnabled = true;
    }
    this.closeModal();
  }
}
