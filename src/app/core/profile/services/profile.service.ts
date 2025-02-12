import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { User } from '@core/auth/types/user'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private readonly _http: HttpClient) {}

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
