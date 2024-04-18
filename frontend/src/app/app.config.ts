import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './utilities/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { AuthReducer } from './store/auth/auth.reducer';
import * as authEffects from './store/auth/auth.effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()), 
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideStore({ auth: AuthReducer }),
    provideEffects(authEffects),
  ],
};
