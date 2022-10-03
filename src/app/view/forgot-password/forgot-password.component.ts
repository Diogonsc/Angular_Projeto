import { RequestForgot } from './model/ResquestForgot';
import { ForgotPasswordService } from './forgot-password.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail: string = ''
  public requestForgot!: RequestForgot;

  constructor(public router : Router, private forgotService: ForgotPasswordService) { }

  ngOnInit(): void {
    this.requestForgot = new RequestForgot()
  }

  changePassword() {
    this.forgotService.changePassword(this.requestForgot).subscribe(res => {
      this. msgSuccess()
      this.router.navigate([''])
    })
  }

  msgSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Senha Alterada com Sucesso!',
      showConfirmButton: false,
      timer: 2000
    })
  }

}
