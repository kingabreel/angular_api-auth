import { Component } from '@angular/core';
import { Register } from '../../models/auth';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-card',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, CommonModule],
  templateUrl: './register-card.component.html',
  styleUrl: './register-card.component.css'
})
export class RegisterCardComponent {
  userType: string = 'patient'; 
  formChanged: boolean = false;

  register: Register = {
    name: "",
    email: "",
    password: "",
    age: 0
  }

  confirmPassword: string = '';

  constructor (private service: AuthService, private router: Router) {}

  canDeactivate(): boolean {
    if (this.formChanged) {
      return confirm("Do you really want to leave? You will loose all informations.");
    }
    return true;
  }

  onSwitchUserType(type: string) {
    this.userType = type;
  }

  onSubmit(){
    if (this.userType === 'doctor') {
      this.service.registerDoctor(this.register).subscribe({
        next: (data) => {
          alert("Doctor registered");
          this.resetForm();
        },
        error: (err) => {
          console.error('Error', err);
        }
      });
    } else if (this.userType === 'receptionist') {
      this.service.registerReceptionist(this.register).subscribe({
        next: (data) => {
          alert("Doctor registered");
          this.resetForm();
        },
        error: (err) => {
          console.error('Error', err);
        }
      });
    } else if (this.userType === 'patient') {
      this.service.register(this.register).subscribe({
        next: (data) => {
          alert("Patient registered");
          this.resetForm();
        },
        error: (err) => {
          console.error('Error', err);
        }
      });
    }
  }

  onFormChange() {
    this.formChanged = true;
  }

  resetForm() {
    this.register.age = 0;
    this.register.name = '';
    this.register.email = '';
    this.register.password = '';
    this.confirmPassword = '';
  }

  toDashboard(){
    this.router.navigateByUrl('dashboard');
  }
}