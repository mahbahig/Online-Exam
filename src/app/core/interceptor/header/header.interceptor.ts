import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  // Clone the request and set the Authorization header if the token exists
  const modifiedReq = token
    ? req.clone({
        setHeaders: {
          token: token,
        },
      })
    : req;

  // Pass the modified request to the next handler
  return next(modifiedReq);
};
