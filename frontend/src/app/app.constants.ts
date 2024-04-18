import { isDevMode } from "@angular/core";

export const BRAND = 'Cyberknox';

export const API_URL = isDevMode() ? 'http://localhost:3000' : 'https://cyberknox-api.vercel.app';

