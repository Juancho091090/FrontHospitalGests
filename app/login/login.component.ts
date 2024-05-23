import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  errorMessage: any;
error: any;

  constructor(private router: Router) { }
  
  formulario = new FormGroup({
    'document': new FormControl(),
    'password': new FormControl()
  });
  
  loginService = inject(LoginService)
  
  onSubmit(){
    if (this.formulario.valid){
      const formData = this.formulario.value;
      this.loginService.login(formData.document, formData.password)
      .pipe(
        catchError((error) => {
          console.error('Error de login', error);
          this.errorMessage = error.error || 'Error: Por favor valide sus credenciales.';
          return error(error);
        })
      )
      .subscribe(
        (response: any) => {
          console.log('Login exitoso', response);
          this.router.navigate(['main_start']);
        }
      )
    }
  }
  clearError() {
    this.errorMessage = null;
  }
  register(){
    this.router.navigate(['register'])
  }
}

