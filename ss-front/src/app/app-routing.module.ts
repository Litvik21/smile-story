import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddGeneralInfoComponent} from "./general-info/addGeneralInfo/addGeneralInfo.component";
import {PatientsComponent} from "./patients/patients.component";
import {AddWishesMedicationComponent} from "./wishes-medication/add-wishes-medication/add-wishes-medication.component";
import {AddPhotosComponent} from "./photos/add-photos/add-photos.component";
import {AddScansComponent} from "./scan/add-scans/add-scans.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "patients" },
  { path: "patients", component: PatientsComponent },
  { path: "general/add", component: AddGeneralInfoComponent },
  { path: "medication/add", component: AddWishesMedicationComponent },
  { path: "photos/add", component: AddPhotosComponent },
  { path: "scans/add", component: AddScansComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
