import { Component, inject } from '@angular/core';
import { LoginService } from '../login.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: any;

  constructor(private router: Router) { }
  
  formularioR = new FormGroup({
    'firstName': new FormControl(),
    'secondName': new FormControl(),
    'firstLastName': new FormControl(),
    'secondLastName': new FormControl(),
    'documentType': new FormControl(),
    'document': new FormControl(),
    'role': new FormControl(),
    'password': new FormControl(),
    'passwordRepeat': new FormControl()
  })
  
  loginService = inject(LoginService)
  
  onSubmit() {
    if (this.formularioR.valid){
      const formData = this.formularioR.value;
      this.loginService.register(formData.firstName, formData.secondName, formData.firstLastName, formData.secondLastName, formData.documentType, formData.document, formData.role, formData.password, formData.passwordRepeat)
      .pipe(
        catchError(error => {
          console.error('Error en el registro', error);
          this.errorMessage = error.error || 'Error al registrar. Por favor, inténtalo de nuevo más tarde.';
          return error(error);
        })        
      )
      .subscribe(
        (response: any)  => {
          console.log('Registro Exitoso', response);
          this.router.navigate(['login']);
        }           
      );
    }
  }
  Back(){
    this.router.navigate(['login']);
  }
}
