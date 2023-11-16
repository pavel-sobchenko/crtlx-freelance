import { Injectable } from '@angular/core'
import { Tokens } from '../types/tokens'

@Injectable({ providedIn: 'root' })
export class TokensStorage {
  public set(tokens: Tokens): void {
    if (!tokens) {
      return window.localStorage.removeItem('tokens')
    }

    window.localStorage.setItem('tokens', JSON.stringify(tokens))
  }

  public get(): Tokens {
    const tokens = window.localStorage.getItem('tokens')

    return tokens ? JSON.parse(tokens) : null
  }
}
