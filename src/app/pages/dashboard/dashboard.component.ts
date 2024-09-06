import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jwtDecode } from 'jwt-decode';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  appointments: Appointment[] = [];

  constructor(private service: AppointmentService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
      
    console.log(Date.now())
    if (!token) {
      this.router.navigate(["/auth"]);
    } else {
      localStorage.removeItem("redirectUrl");
      this.getAppointments();
    }
  
    this.getAppointments();
  }
  
  getAppointments(): void {
    this.service.getAppointments().subscribe({
      next: (res:any)=> {
        this.appointments = res;
      },
      error: () => {
        this.snackBar.open("System offline", "Close", {
          duration: 5000,
        });
      }
    })
  }
}