import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfoApiResponseI, UserInfoI } from '../Modals/UserInfoI';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userInfo = new BehaviorSubject<UserInfoI>(null);
  userInfo$ = this.userInfo.asObservable();

  http = inject(HttpClient);

  // constructor(private http:HttpClient) { }

  saveUserInfo(userInfo: UserInfoI) {
    this.userInfo.next(userInfo);
  }

  getUserData() {
    return this.userInfo.value;
  }

  login(loginInfo: UserInfoI): Observable<UserInfoApiResponseI> {
    return this.http.post<UserInfoApiResponseI>('api/login', loginInfo);
  }

  logout() {
    return this.http.get('api/logout');
  }
}
