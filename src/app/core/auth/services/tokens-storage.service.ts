import { Injectable } from '@angular/core';
import { Tokens } from "../types/tokens";

@Injectable({
  providedIn: 'root'
})
export class TokensStorageService {
  public set(tokens: Tokens): void {
    if (!tokens) {
      return localStorage.removeItem('tokens');
    }

    localStorage.setItem('tokens', JSON.stringify(tokens));
  }

  public get(): Tokens {
    const tokens = localStorage.getItem('tokens');
    return tokens ? JSON.parse(tokens) : null;
  }

  public clear(): void {
    localStorage.clear();
  }
}
