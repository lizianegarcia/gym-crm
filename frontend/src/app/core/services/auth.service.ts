import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  usuario: { id: number; nome: string; email: string; role: string };
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}`;
  private accessTokenKey = 'gymcrm_access_token';
  private refreshTokenKey = 'gymcrm_refresh_token';

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasAccessToken());

  constructor(private http: HttpClient) {}

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  private hasAccessToken(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  login(email: string, senha: string) {
    return this.http.post<LoginResponse>(`${this.api}/auth/login`, { email, senha }).pipe(
      tap((res) => {
        localStorage.setItem(this.accessTokenKey, res.accessToken);
        localStorage.setItem(this.refreshTokenKey, res.refreshToken);
        this.loggedIn$.next(true);
      })
    );
  }

  refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    return this.http.post<{ accessToken: string }>(`${this.api}/auth/refresh`, { refreshToken }).pipe(
      tap((res) => {
        localStorage.setItem(this.accessTokenKey, res.accessToken);
      })
    );
  }

  logout() {
  localStorage.removeItem('gymcrm_access_token');
  localStorage.removeItem('gymcrm_refresh_token');
}
}
