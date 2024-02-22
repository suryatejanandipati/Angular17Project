import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private messageSource = new BehaviorSubject('default message');

  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {}

  getCustomer(): Observable<any> {
    return this.http.get<any>('api/customer');
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
