import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { LoginComponent } from './login/login.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { TreatmentsComponent } from './treatments/treatments.component';
import { MedicineComponent } from './medicine/medicine.component';
import { MedicalNotesComponent } from './medical-notes/medical-notes.component';
import { MedicalResultsComponent } from './medical-results/medical-results.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'main_start',
        component: MenuInicioComponent
    },
    {
        path: 'medical_records',
        component: MedicalRecordsComponent
    },
    {
        path: 'diagnosis',
        component: DiagnosisComponent
    },
    {
        path: 'treatments',
        component: TreatmentsComponent
    },
    {
        path: 'medicines',
        component: MedicineComponent
    },
    {
        path: 'medical_notes',
        component: MedicalNotesComponent
    },
    {
        path: 'medical_results',
        component: MedicalResultsComponent
    }
];
