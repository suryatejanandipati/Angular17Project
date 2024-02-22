import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './services/login.service';
import { UserInfoI } from './Modals/UserInfoI';

export const adminGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const userInfo:UserInfoI = loginService.getUserData()
  return userInfo && userInfo.role === 'admin';
};
