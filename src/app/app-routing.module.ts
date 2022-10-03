import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './view/charts/charts.component';
import { SettingsComponent } from './view/settings/settings.component';
import { ResultsComponent } from './view/results/results.component';
import { AdministrativesComponent } from './view/administratives/administratives.component';
import { LoginComponent } from './view/login/login.component';
import { ForgotPasswordComponent } from './view/forgot-password/forgot-password.component';
import { AccountRegisterComponent } from './view/account-register/account-register.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'account', component: AccountRegisterComponent},
  {path: 'dashboard', component: ChartsComponent},
  {path: 'resultados', component: ResultsComponent},
  {path: 'administrativas', component: AdministrativesComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
