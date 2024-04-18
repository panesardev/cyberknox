import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const SelectAuth = createFeatureSelector<AuthState>('auth');

export const SelectAuthToken = createSelector(
  SelectAuth,
  (state: AuthState) => state.token,
);
