import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { GetPersonsService } from '../get-persons.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { catchError } from 'rxjs';
import { DiagnosisService } from '../diagnosis.service';

@Component({
  selector: 'app-diagnosis',
  standalone: true,
  imports: [AppComponent, ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.css'
})
export class DiagnosisComponent {

  Persons: any[] = [];
  accion: string = '';
  response: any;

  FormularioD = new FormGroup({
    'DiagnosisId': new FormControl(),
    'DiagnosisName': new FormControl(),
    'DiagnosisDescription': new FormControl(),
    'DiagnosisType': new FormControl(),
    'MedicalRecordId': new FormControl()
  })
  errorMessage: any;


  constructor(private router: Router, private getPersonsService: GetPersonsService, private diagnosisService: DiagnosisService){}

  //Metodo que llama a los paciente
  getPerson(): void {
    this.getPersonsService.getPerson().subscribe((persons: any[]) =>{
      this.Persons = persons.filter(person => person.role === 'Paciente');
    })  
  }

  //Metodo que registra la historia clinica en la base de datos
  onSubmit() {
    if (this.accion === 'crear') {
      if (this.FormularioD.valid) {
        const formData = this.FormularioD.value;
        this.diagnosisService.RegisterDiagnosis(formData.DiagnosisId, formData.DiagnosisName, formData.DiagnosisDescription, formData.DiagnosisType, formData.MedicalRecordId)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioD.reset();
              return error(error);              
            })
          )
          .subscribe(
            (response: any) => {                          
              this.FormularioD.reset();
              console.log('Succes', response);
            }
          )
      }

    } else if (this.accion === 'actualizar') {
      if (this.FormularioD.valid) {  
        const formData = this.FormularioD.value;
        this.diagnosisService.UpDateDiagnosis(formData.DiagnosisId, formData.DiagnosisName, formData.DiagnosisDescription, formData.DiagnosisType, formData.MedicalRecordId)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioD.reset();
              return error(error);
              
            })
          )
          .subscribe(
            (response: any) => {
              this.FormularioD.reset();
              console.log('Reserva actualizada con exito', response);
            }
          )
      }
    }
  }

  ms(){
    this.router.navigate(['main_start']);
  }
  mr(){
    this.router.navigate(['medical_records'])
  }
  treat(){
    this.router.navigate(['treatments'])
  }
  medicine(){
    this.router.navigate(['medicine'])
  }
  mn(){
    this.router.navigate(['medical_notes'])
  }
  mrs(){
    this.router.navigate(['medical_results'])
  }

}
