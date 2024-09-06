import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RegisterCardComponent } from "../../components/register-card/register-card.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, RegisterCardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @Input()
  role: string = '';

  users: any[] = [];
  
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('role') || '';

    this.loadUsers();
  }

  loadUsers() {
    if (this.role == 'doctor'){
      this.userService.getDoctors().subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error('Error', err);
        }
      });
    } else if (this.role == 'receptionist'){
      this.userService.getReceptionist().subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error('Error', err);
        }
      });
    } else if (this.role == 'patient'){
      this.userService.getPatients().subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error('Error', err);
        }
      });
    }
  }

  registerPage(){
    this.router.navigateByUrl('register');
  }

  toDashboard(){
    this.router.navigateByUrl('dashboard');
  }
}