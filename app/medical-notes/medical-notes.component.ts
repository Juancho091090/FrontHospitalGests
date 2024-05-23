import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { GetPersonsService } from '../get-persons.service';
import { catchError } from 'rxjs';
import { MedicalNotesService } from '../medical-notes.service';

@Component({
  selector: 'app-medical-notes',
  standalone: true,
  imports: [AppComponent, ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './medical-notes.component.html',
  styleUrl: './medical-notes.component.css'
})
export class MedicalNotesComponent {
  Persons: any[] = [];
  accion: string = '';
  response: any;

  FormularioMN = new FormGroup({
    'NoteId': new FormControl(),
    'DateNote': new FormControl(),
    'NoteType': new FormControl(),
    'NoteName': new FormControl(),
    'MedicalRecordId': new FormControl()
  })
  errorMessage: any;


  constructor(private router: Router, private getPersonsService: GetPersonsService, private medicalNotesService: MedicalNotesService){}

  //Metodo que llama a los paciente
  getPerson(): void {
    this.getPersonsService.getPerson().subscribe((persons: any[]) =>{
      this.Persons = persons.filter(person => person.role === 'Paciente');
    })  
  }

  //Metodo que registra la historia clinica en la base de datos
  onSubmit() {
    if (this.accion === 'crear') {
      if (this.FormularioMN.valid) {
        const formData = this.FormularioMN.value;
        this.medicalNotesService.RegisterMedicalNotes(formData.NoteId, formData.DateNote, formData.NoteType, formData.NoteName, formData.MedicalRecordId)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioMN.reset();
              return error(error);              
            })
          )
          .subscribe(
            (response: any) => {                          
              this.FormularioMN.reset();
              console.log('Succes', response);
            }
          )
      }

    } else if (this.accion === 'actualizar') {
      if (this.FormularioMN.valid) {   
        const formData = this.FormularioMN.value;
        this.medicalNotesService.UpDateMedicalNotes(formData.NoteId, formData.DateNote, formData.NoteType, formData.NoteName, formData.MedicalRecordId)
          .pipe(
            catchError(error => {
              console.log('Please contact support', error);
              this.errorMessage = error.error || 'Please contact support';
              this.FormularioMN.reset();
              return error(error);
              
            })
          )
          .subscribe(
            (response: any) => {
              this.FormularioMN.reset();
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
  medicine(){
    this.router.navigate(['medicines'])
  }
  mrs(){
    this.router.navigate(['medical_results'])
  }

}
