import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';
import { doctorGuard } from './guard/doctor.guard';
import { receptionistGuard } from './guard/receptionist.guard';
import { RegisterCardComponent } from './components/register-card/register-card.component';
import { registerGuard } from './guard/register.guard';
import { UsersComponent } from './pages/users/users.component';


export const routes: Routes = [
    {path:'',component: DashboardComponent, canActivate: [authGuard]},
    {path: 'auth', component: AuthComponent, title: 'Auth'},
    {path:'dashboard',component: DashboardComponent, canActivate: [authGuard]},
    {path: 'users/:role',component: UsersComponent, canActivate: [authGuard, adminGuard || doctorGuard || receptionistGuard]},
    {path: 'register', component: RegisterCardComponent, canActivate: [adminGuard || doctorGuard || receptionistGuard], canDeactivate: [registerGuard]}
];
