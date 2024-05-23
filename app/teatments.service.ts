import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeatmentsService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:7116/api/Treatments';

  //metodo para crear una historia clinica
  RegisterTreatment(TreatmentId: number, TreatmentType: string, TreatmentStartDate: Date, TreatmentEndDate: Date, Dosage: string, MedicalRecordID: number): Observable<any>{
    const body = 
    {
      TreatmentId,
      TreatmentType,
      TreatmentStartDate,
      TreatmentEndDate,
      Dosage,
      MedicalRecordID
    };
    return this.httpClient.post<any>(`${this.baseUrl}`, body)
  }

  //metodo para actualizar una Historia Clinica
  UpDateTreatment(TreatmentId: number, TreatmentType: string, TreatmentStartDate: Date, TreatmentEndDate: Date, Dosage: string, MedicalRecordID: number): Observable<any>{
    const body = 
    {
      TreatmentId,
      TreatmentType,
      TreatmentStartDate,
      TreatmentEndDate,
      Dosage,
      MedicalRecordID
    };
    return this.httpClient.put<any>(`${this.baseUrl}`, body)
  }
}
