import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../../../shared/models/user';
import { Observable, shareReplay, tap } from "rxjs";
import { Token } from '../../../shared/models/token';
import { StorageService } from "../../../core/services/storage.service";
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = `${environment.apiUrl}`;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private readonly router: Router, private readonly http: HttpClient, private readonly localStorage: StorageService) {
  }

  public login(username: string, password: string, isRemembered = false): Observable<Token> {
    return this.http.get<Token>(
      this.baseUrl + `auth/token?email=${username}&password=${password}`
    ).pipe(
      tap((token) => {
        this.localStorage.setToken(token);
        this.localStorage.setLogin(username);
        this.localStorage.setIsRemember(isRemembered);
      }),
      shareReplay(),
    );
  }

  public loginToken(refreshToken: string): Observable<Token> {
    return this.http.get<Token>(
      this.baseUrl + `auth/token/new?refreshToken=${refreshToken}`
    ).pipe(
      tap((token) => {
        this.localStorage.setToken(token);
      }),
      shareReplay(),
    );
  }

  public register(username: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(
      this.baseUrl + 'auth/sign-up',
      {
        username,
        email,
        password,
      },
      this.httpOptions
    );
  }

  public logout(): void {
    this.localStorage.clearStorage()
    this.router.navigate(['/login']);
  }
}
