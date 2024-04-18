import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { SelectAuthToken } from "../store/auth/auth.selectors";

export const AuthInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const store = inject(Store);
  const token = store.selectSignal(SelectAuthToken);

  if (token()) {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token()}` }
    });
  }
  return next(request);
}
