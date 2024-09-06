import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserToken } from '../models/user';
import { jwtDecode } from 'jwt-decode';

export const receptionistGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const tk = localStorage.getItem('token');

  if(tk) {
    const decodedTk: UserToken = jwtDecode(tk);

    const role = decodedTk.roles;

    if(role == "receptionist"){
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
