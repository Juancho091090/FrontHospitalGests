import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { GetPersonsService } from '../get-persons.service';
import { catchError } from 'rxjs';
import { MedicinesService } from '../medicines.service';

@Component({
  selector: 'app-medicine',
  standalone: true,
  imports: [AppComponent, ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './medicine.component.html',
  styleUrl: './medicine.component.css'
})
export class MedicineComponent {
  Persons: any[] = [];
  accion: string = '';
  response: any;

  FormularioMD = new FormGroup({
    'MedicineId': new FormControl(),
    'MedicineName': new FormControl(),
    'QuantityAvaiable': new FormControl(),
    'DueDate': new FormControl(),
    'TreatmentId': new FormControl()
  })
  errorMessage: any;


  constructor(private router: Router, private getPersonsService: GetPersonsService, private medicinesService: MedicinesService){}

  //Metodo que llama a los paciente
  getPerson(): void {
    this.getPersonsService.getPerson().subscribe((persons: any[]) =>{
      this.Persons = persons.filter(person => person.role === 'Paciente');
    })  
  }

  //Metodo que registra la historia clinica en la base de datos
  onSubmit() {
    if (this.accion === 'crear') {
      if (this.FormularioMD.valid) {
        const formData = this.FormularioMD.value;
        this.medicinesService.RegisterMedicines(formData.MedicineId, formData.MedicineName, formData.QuantityAvaiable, formData.DueDate, formData.TreatmentId)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioMD.reset();
              return error(error);              
            })
          )
          .subscribe(
            (response: any) => {                          
              this.FormularioMD.reset();
              console.log('Succes', response);
            }
          )
      }

    } else if (this.accion === 'actualizar') {
      if (this.FormularioMD.valid) {   
        const formData = this.FormularioMD.value;
        this.medicinesService.UpDateMedicines(formData.MedicineId, formData.MedicineName, formData.QuantityAvaiable, formData.DueDate, formData.TreatmentId)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioMD.reset();
              return error(error);
              
            })
          )
          .subscribe(
            (response: any) => {
              this.FormularioMD.reset();
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
  mrs(){
    this.router.navigate(['medical_results'])
  }
  
}
