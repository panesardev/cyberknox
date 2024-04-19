import { isPlatformBrowser } from "@angular/common";
import { inject, InjectionToken, PLATFORM_ID } from "@angular/core";

export const LOCAL_STORAGE = new InjectionToken('LOCAL_STORAGE', {
  providedIn: 'root',
  factory: () => {
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
      return localStorage;
    }
    else {
      return new LocalStorageMock();
    }
  }
});

class LocalStorageMock {
  store: any;
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}
