import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TokenResponse } from '../types/token-response'
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
  ): Observable<TokenResponse> {
    const params = new HttpParams()
        .set('email', username)
        .set('password', password)

    return this._http.get<TokenResponse>(this._baseUrl + `auth/token`, {
      params
    })
  }

  public loginToken(refreshToken: string): Observable<TokenResponse> {
    const params = new HttpParams().set('refreshToken', refreshToken)
    return this._http.get<TokenResponse>(
        this._baseUrl + `auth/token/new`,
        { params }
    )
  }
}
