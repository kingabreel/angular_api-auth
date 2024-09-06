import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from '../models/user';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const tk = localStorage.getItem("token");

  if(tk) {
    const decodedTk: UserToken = jwtDecode(tk);

    const time = Math.floor(Date.now() / 1000);
    
    if (decodedTk.exp < time) {
      localStorage.removeItem("token");
      alert("Expired token");
      return false;
    }
    return true;
  } else {
    localStorage.setItem("redirectUrl", state.url);
    router.navigateByUrl("auth");
    return false;
  }
};
