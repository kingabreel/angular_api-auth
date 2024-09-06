import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from '../models/user';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const tk = localStorage.getItem('token');

  if(tk) {
    const decodedTk: UserToken = jwtDecode(tk);

    const role = decodedTk.roles;

    if(role == "admin" || role == "receptionist"){
      return true;
    } else {
      router.navigateByUrl("dashboard");
      return false;
    }
  } else{
    localStorage.setItem("redirectUrl", state.url);
    router.navigateByUrl("auth");
    return false;
  }
};
