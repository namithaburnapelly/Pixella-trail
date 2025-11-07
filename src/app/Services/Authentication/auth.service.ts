import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser, UserDetails } from '../../Models/user.model';
import { environment } from '../../../Environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private login_url: string = environment.loginUrl;
  private signup_url: string = environment.registerURL;

  private currentUserSubject: BehaviorSubject<CurrentUser | null> =
    new BehaviorSubject<CurrentUser | null>(null);
  currentUser$: Observable<CurrentUser | null> =
    this.currentUserSubject.asObservable();

  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);

  constructor() {
    //get local storage when service intializes for persistent state
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user: CurrentUser = JSON.parse(storedUser);
      if (this.isTokenExpired(user.accessToken)) {
        this.logout(); //automatically logout if token expires
        return;
      }
      this.currentUserSubject.next(user);
    }
  }

  login(identifier: string, password: string): Observable<CurrentUser> {
    return this.http
      .post<UserDetails>(this.login_url, { identifier, password })
      .pipe(
        map((response) => {
          // console.log(response, 'response from post call');
          const user: CurrentUser = {
            username: response.user.username,
            accessToken: response.token,
          };
          // console.log(user, 'user created');
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  // error handling
  signup(
    username: string,
    email: string,
    password: string
  ): Observable<Partial<UserDetails>> {
    return this.http.post<Partial<UserDetails>>(this.signup_url, {
      username,
      email,
      password,
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isTokenExpired(token: string | null): boolean {
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  isUserLoggedIn(): Boolean {
    return (
      !!this.currentUserSubject.value?.accessToken &&
      !this.isTokenExpired(this.currentUserSubject.value.accessToken)
    );
    //!! converts whatever result to strict boolean
  }

  getUsername(): string {
    return this.currentUserSubject.value?.username || '';
  }

  getAccessToken(): string | null {
    return this.currentUserSubject.value?.accessToken || null;
  }
}
