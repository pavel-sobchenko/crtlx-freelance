import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';
const LOGIN = 'login';
const REMEMBER = 'isRemember';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public setToken(data: unknown): void {
    window.localStorage.setItem(TOKEN, JSON.stringify(data));
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  public removeToken(): void {
    window.localStorage.removeItem(TOKEN);
  }

  public setLogin(data: unknown): void {
    window.localStorage.setItem(LOGIN, JSON.stringify(data));
  }

  public getLogin(): string {
    return window.localStorage.getItem(LOGIN) || '';
  }

  public setIsRemember(data: unknown): void {
    window.localStorage.setItem(REMEMBER, JSON.stringify(data));
  }

  public getIsRemember(): boolean {
    return JSON.parse(window.localStorage.getItem(REMEMBER) || 'false');
  }

  public clearStorage(): void {
    window.localStorage.clear();
  }
}
