import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user';
import { Observable, shareReplay } from "rxjs";
import { Token } from '../models/token';
import { LocalStorageService } from "./local-storage.service";
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = `${environment.apiUrl}`;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private readonly router: Router, private readonly http: HttpClient, private readonly localStorage: LocalStorageService) {
  }

  public login(username: string, password: string): Observable<Token> {
    return this.http.get<Token>(
      this.baseUrl + `auth/token?email=${username}&password=${password}`,
    ).pipe(
      shareReplay()
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
    this.localStorage.removeToken();
    this.router.navigate(['/login']);
  }
}
