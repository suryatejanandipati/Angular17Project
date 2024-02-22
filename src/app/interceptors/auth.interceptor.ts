import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:3010/';

  //req: Used for interceptor to interact with BE
  //next: Used to send the transformed request
  console.log(req);

  const updatedReq = req.clone({ url: `${baseUrl}${req.url}` });

  console.log(updatedReq);

  return next(updatedReq).pipe(tap((resp) => console.log('response', resp)));
};
