import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountRegisterService } from './accountRegisterService.service';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css'],
})
export class AccountRegisterComponent implements OnInit {
  hide: boolean = true;
  hiderepeat: boolean = true;
  registerUsuario: Array<string> = [];
  usuario = {
    firstName: '',
    lastName: '',
    cpf: '',
    userEmail: '',
    userPassword: '',
    active: true,
  };


  @Input() required: boolean = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public http: HttpClient,
    private service: AccountRegisterService
  ) {}

  ngOnInit(): void {}

  createAccount() {
    this.service.saveFormAccountRegister(this.usuario).subscribe(
      (result) => this.alertMessageInfoRegister(),
      (error) => console.log(error)
    );
  }

  alertMessageInfoRegister() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro criado com sucesso!',
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([''], {
        relativeTo: this.route,
      });
    }, 1500);
  }
}
