import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setToken() {}

  getToken() {
    if (typeof sessionStorage !== 'undefined') {
      // Your code that uses sessionStorage
      return sessionStorage.getItem('token') ?? '';
    } else {
      console.error('sessionStorage is not available in this environment.');
      return null;
    }
  }

  clearToken() {
    sessionStorage.clear();
  }
}
