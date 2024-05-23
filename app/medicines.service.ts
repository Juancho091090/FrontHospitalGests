import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:7116/api/Medicines';

  //metodo para crear una historia clinica
  RegisterMedicines(MedicineId: number, MedicineName: string, QuantityAvaiable: string, DueDate: string, TreatmentId: string, ): Observable<any>{
    const body = 
    {
      MedicineId,
      MedicineName,
      QuantityAvaiable,
      DueDate,
      TreatmentId
    };
    return this.httpClient.post<any>(`${this.baseUrl}`, body)
  }

  //metodo para actualizar una Historia Clinica
  UpDateMedicines(MedicineId: number, MedicineName: string, QuantityAvaiable: string, DueDate: string, TreatmentId: string, ): Observable<any>{
    const body = 
    {
      MedicineId,
      MedicineName,
      QuantityAvaiable,
      DueDate,
      TreatmentId
    };
    return this.httpClient.put<any>(`${this.baseUrl}`, body)
  }
}
