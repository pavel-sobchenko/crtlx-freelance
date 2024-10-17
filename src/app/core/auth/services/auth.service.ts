import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Tokens } from '../types/tokens'
import { Credentials, LoginCredentials } from '../types/credentials'
import { ValidationErrors } from '@angular/forms'
import { User } from '@core/auth/types/user'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly _http: HttpClient) {}

  public getToken({ email, password }: LoginCredentials): Observable<Tokens> {
    return this._http.get<Tokens>(`/api/auth/token`, {
      params: new HttpParams({ fromObject: { email, password } })
    })
  }

  public refreshToken(token: string): Observable<Tokens> {
    return this._http.get<Tokens>(`/api/auth/token/new`, {
      params: new HttpParams({ fromObject: { refreshToken: token } })
    })
  }

  public register(credentials: Credentials): Observable<number> {
    return this._http.post<number>('/api/auth/sign-up', credentials)
  }

  public validateEmail(email: string): Observable<ValidationErrors> {
    return this._http.post(`/api/auth/sign-up/validate`, {
      email
    })
  }

  public getUserProfile(): Observable<User> {
    return this._http.get<User>('/api/me').pipe(
      map(data => {
        return {
          ...data,
          avatar: environment.apiUrl + data.avatar
        }
      })
    )
  }

  public updateUserInfo(user: FormData): Observable<User> {
    return this._http.patch<User>('/api/settings', user)
  }
}
