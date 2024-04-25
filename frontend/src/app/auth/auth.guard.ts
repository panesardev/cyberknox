import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, take } from "rxjs";
import { AuthStore } from "./auth.store";

export function isAuthenticated(): CanActivateFn {
  return () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);
  
    return authStore.authState$.pipe(
      take(1),
      map(state => {
        console.log(state);
        
        if (state && state.isAuthenticated) {
          return true;
        }
        
        router.navigateByUrl('/');
        return false;
      }),
    );
  }
}