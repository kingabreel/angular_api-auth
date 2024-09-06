import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../models/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  login: Login = {
    email: "",
    password: ""
  }

  confirmPassword: string = '';

  constructor(private authService:AuthService, private router: Router) {}

  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.login(this.login).subscribe({
      next: (res:any)=> {
          localStorage.setItem("token", res.token)
          this.router.navigateByUrl('/dashboard')  
      },
      error: () => {
        alert("Invalid user or password")
        this.login.password = '';
      }
    });
  }
}
