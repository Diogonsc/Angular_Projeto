import { map, Observable, catchError, throwError } from 'rxjs';
import { RequestLogin } from './model/RequestLogin';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';;
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:8080/api/login';
  private urlLogout: string = 'http://localhost:8080/logout';

  constructor(private http: HttpClient, private router: Router) {}
  
  public login(requestLogin: RequestLogin): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(requestLogin.userEmail + ':' + requestLogin.userPassword)
    });
    return this.http.post<{requestLogin: RequestLogin}>(this.url, requestLogin, { headers: headers }).pipe(
     map((res) => {
      localStorage.removeItem('access_token');
      localStorage.setItem('access_token', JSON.stringify(requestLogin));
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 2200);
     }),
     catchError((error)=> {
      if(error) return throwError(()=> error)
      return throwError(()=> 'No momento não podemos validar seus dados!')
     })
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')
    if(!token) return false;
    return true;
    // const jwtHelper = new JwtHelperService()
    // return !jwtHelper.isTokenExpired(token)
  }
  
  public logout() {
    localStorage.removeItem('access_token')
    return this.http.post(this.urlLogout, this.router.navigate(['']))
  }


}
