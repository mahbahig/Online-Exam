import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const modifiedReq = token
    ? req.clone({
        setHeaders: {
          token: token,
        },
      })
    : req;

  return next(modifiedReq);
};
