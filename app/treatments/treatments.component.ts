import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { GetPersonsService } from '../get-persons.service';
import { catchError } from 'rxjs';
import { TeatmentsService } from '../teatments.service';

@Component({
  selector: 'app-treatments',
  standalone: true,
  imports: [AppComponent, ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './treatments.component.html',
  styleUrl: './treatments.component.css'
})
export class TreatmentsComponent {
  Persons: any[] = [];
  accion: string = '';
  response: any;

  FormularioT = new FormGroup({
    'TreatmentId': new FormControl(),
    'TreatmentType': new FormControl(),
    'TreatmentStartDate': new FormControl(),
    'TreatmentEndDate': new FormControl(),
    'Dosage': new FormControl(),
    'MedicalRecordID': new FormControl()
  })
  errorMessage: any;


  constructor(private router: Router, private getPersonsService: GetPersonsService, private treatmentService: TeatmentsService){}

  //Metodo que llama a los paciente
  getPerson(): void {
    this.getPersonsService.getPerson().subscribe((persons: any[]) =>{
      this.Persons = persons.filter(person => person.role === 'Paciente');
    })  
  }

  //Metodo que registra la historia clinica en la base de datos
  onSubmit() {
    if (this.accion === 'crear') {
      if (this.FormularioT.valid) {
        const formData = this.FormularioT.value;
        this.treatmentService.RegisterTreatment(formData.TreatmentId, formData.TreatmentType, formData.TreatmentStartDate, formData.TreatmentEndDate, formData.Dosage, formData.MedicalRecordID)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioT.reset();
              return error(error);              
            })
          )
          .subscribe(
            (response: any) => {                          
              this.FormularioT.reset();
              console.log('Succes', response);
            }
          )
      }

    } else if (this.accion === 'actualizar') {
      if (this.FormularioT.valid) {  
        const formData = this.FormularioT.value;
        this.treatmentService.UpDateTreatment(formData.TreatmentId, formData.TreatmentType, formData.TreatmentStartDate, formData.TreatmentEndDate, formData.Dosage, formData.MedicalRecordID)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioT.reset();
              return error(error);
              
            })
          )
          .subscribe(
            (response: any) => {
              this.FormularioT.reset();
              console.log('Reserva actualizada con exito', response);
            }
          )
      }
    }
  }

  ms(){
    this.router.navigate(['main_start'])
  }
  mr(){
    this.router.navigate(['medical_records'])
  }
  /*diag(){
    this.router.navigate(['diagnosis'])
  }*/
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
