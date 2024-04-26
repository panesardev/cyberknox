import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, take } from "rxjs";
import { AuthStore } from "./auth.store";

export function isAuthenticated(): CanActivateFn {
  return () => {
    const auth = inject(AuthStore);
    const router = inject(Router);
  
    return auth.state$.pipe(
      take(1),
      map(state => {
        if (state && state.isAuthenticated) {
          return true;
        }
        router.navigateByUrl('/');
        return false;
      }),
    );
  }
}