import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Credentials } from '../types/credentials'
import { Tokens } from '../types/tokens'

@Injectable({ providedIn: 'root' })
export class AuthRepositoryService {
  constructor(private readonly _http: HttpClient) {}

  public getToken(credentials: Credentials): Observable<Tokens> {
    return this._http.get<Tokens>(`/api/auth/token`, {
      params: new HttpParams({ fromObject: credentials })
    })
  }
}
