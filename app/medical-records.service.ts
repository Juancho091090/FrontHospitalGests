import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MedicalRecordsService {
  
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:7116/api/MedicalRecords';

  //metodo para crear una historia clinica
  RegisterMR(MedicalRecordId: number, PersonId: number, AdmissionDate: string, DischargeDate: string, DiagnosisPrincipal: string): Observable<any>{
    const body = 
    {
      MedicalRecordId,
      PersonId,
      AdmissionDate,
      DischargeDate,
      DiagnosisPrincipal
    };
    return this.httpClient.post<any>(`${this.baseUrl}`, body)
  }

  //metodo para actualizar una Historia Clinica
  UpDateMR(MedicalRecordId: number, PersonId: number, AdmissionDate: string, DischargeDate: string, DiagnosisPrincipal: string): Observable<any>{
    const body = 
    {
      MedicalRecordId,
      PersonId,
      AdmissionDate,
      DischargeDate,
      DiagnosisPrincipal
    };
    return this.httpClient.put<any>(`${this.baseUrl}`, body)
  }

}
