import { Injectable } from '@angular/core'
import { Tokens } from '../types/tokens'

@Injectable({
  providedIn: 'root'
})
export class TokensStorageService {
  public set(tokens: Tokens, isLocalStorage = false): void {
    if (!tokens) {
      sessionStorage.removeItem('tokens')

      return localStorage.removeItem('tokens')
    }

    if (isLocalStorage) {
      localStorage.setItem('tokens', JSON.stringify(tokens))
    } else {
      sessionStorage.setItem('tokens', JSON.stringify(tokens))
    }
  }

  public get(): Tokens {
    const tokens =
      localStorage.getItem('tokens') || sessionStorage.getItem('tokens')

    return tokens ? JSON.parse(tokens) : null
  }

  public clear(): void {
    this.set(null)
  }
}
