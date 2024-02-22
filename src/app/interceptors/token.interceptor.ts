import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers = request.headers.set(
      'Authorization',
      'Bearer ' + `${this.storage.getToken()} `
    );

    return next.handle(request.clone({ headers }));
  }
}
