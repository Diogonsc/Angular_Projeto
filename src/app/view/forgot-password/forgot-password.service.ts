import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestForgot } from './model/ResquestForgot';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  userEmail: string = ''
  private urlForgotPassword = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  changePassword(requestForgot: RequestForgot): Observable<RequestForgot> {
    return this.http.put<RequestForgot>(`${this.urlForgotPassword}/alterPassword`, requestForgot)
  }
}
