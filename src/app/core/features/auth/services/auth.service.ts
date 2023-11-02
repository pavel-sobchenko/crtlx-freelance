import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { UserLoginModel } from '../types/user-login.model'
import { Observable } from 'rxjs'
import { TokenResponseModel } from '../types/token-response.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _baseUrl: string = `${environment.apiUrl}`

  constructor(private readonly _http: HttpClient) {
  }

  public login(
    username: string,
    password: string
  ): Observable<TokenResponseModel> {
    const params = new HttpParams()
      .set('email', username)
      .set('password', password)

    return this._http.get<TokenResponseModel>(this._baseUrl + `auth/token`, {
      params
    })
  }

  public loginToken(refreshToken: string): Observable<TokenResponseModel> {
    const params = new HttpParams().set('refreshToken', refreshToken)
    return this._http.get<TokenResponseModel>(
      this._baseUrl + `auth/token/new`,
      { params }
    )
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<UserLoginModel> {
    return this._http.post<UserLoginModel>(this._baseUrl + 'auth/sign-up', {
      username,
      email,
      password
    })
  }

  public logout(): void {
    window.localStorage.clear()
  }
}
