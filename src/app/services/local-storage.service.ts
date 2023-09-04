import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setToken(data: unknown): void {
    window.localStorage.setItem(TOKEN, String(data));
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  public removeToken(): void {
    window.localStorage.removeItem(TOKEN);
  }
}
