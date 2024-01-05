import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Tokens } from '../types/tokens'
import { Credentials } from '../types/credentials'

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
}
