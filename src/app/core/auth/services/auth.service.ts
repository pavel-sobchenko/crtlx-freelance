import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Tokens } from '../types/tokens'
import { Credentials, RegisterData } from '../types/credentials'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly _http: HttpClient) {}

  public getToken(credentials: Credentials): Observable<Tokens> {
    return this._http.get<Tokens>(`/api/auth/token`, {
      params: new HttpParams({ fromObject: credentials })
    })
  }

  public register(registerData: RegisterData): Observable<RegisterData> {
    const { name, email, password } = registerData
    return this._http.post<RegisterData>('/api/auth/sign-up', {
      name,
      email,
      password
    })
  }

  public validateEmail(email: string): Observable<boolean> {
    return this._http.post<boolean>(`/api/auth/sign-up/validate`, {
      email
    })
  }
}
