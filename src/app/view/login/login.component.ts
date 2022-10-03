import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { RequestLogin } from './model/RequestLogin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  resposta: boolean = false;
  public requestLogin!: RequestLogin;

  constructor(private authService: AuthService, public router: Router) {}
  ngOnInit(): void {
    this.requestLogin = new RequestLogin();
  }

  public submitForm() {
    this.authService.login(this.requestLogin).subscribe(
     { next: (res) => {
        this.msgSuccess();
      },
      error: (error) => {
        this.msgError();
        console.log(error);
      }}
    );
  }

  msgSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logado com Sucesso!',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  msgError() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Usuário e/ou Senha Inválidos!',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
