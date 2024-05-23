import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { GetPersonsService } from '../get-persons.service';
import { catchError } from 'rxjs';
import { ExamResultsService } from '../exam-results.service';

@Component({
  selector: 'app-medical-results',
  standalone: true,
  imports: [AppComponent, ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './medical-results.component.html',
  styleUrl: './medical-results.component.css'
})
export class MedicalResultsComponent {
  Persons: any[] = [];
  accion: string = '';
  response: any;

  FormularioER = new FormGroup({
    'ExamId': new FormControl(),
    'MedicalRecordId': new FormControl(),
    'ExamType': new FormControl(),
    'ExamDate': new FormControl(),
    'Results': new FormControl(),
    'Observations': new FormControl()
  })
  errorMessage: any;


  constructor(private router: Router, private getPersonsService: GetPersonsService, private examResultsService: ExamResultsService){}

  //Metodo que llama a los paciente
  getPerson(): void {
    this.getPersonsService.getPerson().subscribe((persons: any[]) =>{
      this.Persons = persons.filter(person => person.role === 'Paciente');
    })  
  }

  //Metodo que registra la historia clinica en la base de datos
  onSubmit() {
    if (this.accion === 'crear') {
      if (this.FormularioER.valid) {
        const formData = this.FormularioER.value;
        this.examResultsService.RegisterExamResults(formData.ExamId, formData.MedicalRecordId, formData.ExamType, formData.ExamDate, formData.Results, formData.Observations)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioER.reset();
              return error(error);              
            })
          )
          .subscribe(
            (response: any) => {                          
              this.FormularioER.reset();
              console.log('Succes', response);
            }
          )
      }

    } else if (this.accion === 'actualizar') {
      if (this.FormularioER.valid) {   
        const formData = this.FormularioER.value;
        this.errorMessage.UpDateExamResults(formData.ExamId, formData.MedicalRecordId, formData.ExamType, formData.ExamDate, formData.Results, formData.Observations)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioER.reset();
              return error(error);
              
            })
          )
          .subscribe(
            (response: any) => {
              this.FormularioER.reset();
              console.log('Reserva actualizada con exito', response);
            }
          )
      }
    }
  }
  
  mr(){
    this.router.navigate(['medical_records'])
  }
  /*diag(){
    this.router.navigate(['diagnosis'])
  }*/
  ms(){
    this.router.navigate(['main_start'])
  }
  treat(){
    this.router.navigate(['treatments'])
  }
  mn(){
    this.router.navigate(['medical_notes'])
  }
  medicine(){
    this.router.navigate(['medicines'])
  }

}
