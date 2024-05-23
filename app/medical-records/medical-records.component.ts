import { Component} from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MedicalRecordsService } from '../medical-records.service';
import { catchError } from 'rxjs';
import { GetPersonsService } from '../get-persons.service';


@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [AppComponent, ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './medical-records.component.html',
  styleUrl: './medical-records.component.css'
})
export class MedicalRecordsComponent{
  Persons: any[] = [];
  accion: string = '';
  response: any;

  FormularioMR = new FormGroup({
    'MedicalRecordId': new FormControl(),
    'PersonId': new FormControl(),
    'AdmissionDate': new FormControl(),
    'DischargeDate': new FormControl(),
    'DiagnosisPrincipal': new FormControl()
  })
  errorMessage: any;


  constructor(private router: Router, private getPersonsService: GetPersonsService, private medicalRecordsService: MedicalRecordsService){}

  //Metodo que llama a los paciente
  getPerson(): void {
    this.getPersonsService.getPerson().subscribe((persons: any[]) =>{
      this.Persons = persons.filter(person => person.role === 'Paciente');
    })  
  }

  //Metodo que registra la historia clinica en la base de datos
  onSubmit() {
    if (this.accion === 'crear') {
      if (this.FormularioMR.valid) {
        const formData = this.FormularioMR.value;
        this.medicalRecordsService.RegisterMR(formData.MedicalRecordId, formData.PersonId, formData.AdmissionDate, formData.DischargeDate, formData.DiagnosisPrincipal)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioMR.reset();
              return error(error);              
            })
          )
          .subscribe(
            (response: any) => {                          
              this.FormularioMR.reset();
              console.log('Succes', response);
            }
          )
      }

    } else if (this.accion === 'actualizar') {
      if (this.FormularioMR.valid) {  
        const formData = this.FormularioMR.value;
        this.medicalRecordsService.UpDateMR(formData.MedicalRecordId, formData.PersonId, formData.AdmissionDate, formData.DischargeDate, formData.DiagnosisPrincipal)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioMR.reset();
              return error(error);
              
            })
          )
          .subscribe(
            (response: any) => {
              this.FormularioMR.reset();
              console.log('Reserva actualizada con exito', response);
            }
          )
      }
    }
  }

  //Ruta a las demas componentes
  
  rp(){
    this.router.navigate(['register'])
  }
  ms(){
    this.router.navigate(['main_start'])
  }
  treat(){
    this.router.navigate(['tratments'])
  }
  medicine(){
    this.router.navigate(['medicines'])
  }
  mn(){
    this.router.navigate(['medical_notes'])
  }
  mrs(){
    this.router.navigate(['medical_results'])
  }
  
}
