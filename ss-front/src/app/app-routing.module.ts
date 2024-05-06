import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddGeneralInfoComponent} from "./general-info/addGeneralInfo/addGeneralInfo.component";
import {PatientsComponent} from "./patient/patients/patients.component";
import {AddWishesMedicationComponent} from "./wishes-medication/add-wishes-medication/add-wishes-medication.component";
import {AddPhotosComponent} from "./photos/add-photos/add-photos.component";
import {AddScansComponent} from "./scan/add-scans/add-scans.component";
import {ViewPatientComponent} from "./patient/view-patient/view-patient.component";
import {GeneralInfoUpdateComponent} from "./general-info/general-info-update/general-info-update.component";
import {MedicationUpdateComponent} from "./wishes-medication/medication-update/medication-update.component";
import {PhotoUpdateComponent} from "./photos/photo-update/photo-update.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "patients" },
  { path: "patients", component: PatientsComponent },
  { path: "general/add", component: AddGeneralInfoComponent },
  { path: "medication/add", component: AddWishesMedicationComponent },
  { path: "photos/add", component: AddPhotosComponent },
  { path: "scans/add", component: AddScansComponent },
  { path: "view/:id", component: ViewPatientComponent },
  { path: 'general-info/update/:infoId/:patientId', component: GeneralInfoUpdateComponent },
  { path: 'medication/update/:medId/:patientId', component: MedicationUpdateComponent },
  { path: 'photo/update/:photoId/:patientId/:infoId', component: PhotoUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
