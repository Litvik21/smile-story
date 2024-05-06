import {Component, OnInit} from '@angular/core';
import {Patient} from "../../model/Patient";
import {PatientService} from "../../service/patient.service";
import {GeneralInfoService} from "../../service/generalInfo.service";
import {WishesMedicationService} from "../../service/wishesMedication.service";
import {Router} from "@angular/router";
import {PhotoService} from "../../service/photo.service";
import {ScanSerivce} from "../../service/scan.serivce";
import {forkJoin, map, switchMap} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent  implements OnInit  {
  patients: Patient[] = [];

  constructor(private patientService: PatientService,
              private generalInfo: GeneralInfoService,
              private medService: WishesMedicationService,
              private photoService: PhotoService,
              private scanService: ScanSerivce,
              private router: Router) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(
      patients => {
        if (patients.length < 0) {
          console.log("Don't have posts yet!")
          return;
        }
        console.log('1 PAT', patients)

        const getGeneralInfoObservables = [];
        const getWishesMedicationObservables = [];

        for (const patient of patients) {
          getGeneralInfoObservables.push(this.generalInfo.getGeneralInfo(patient.generalInfoId));
          getWishesMedicationObservables.push(this.medService.getWishesMedication(patient.wishesMedicationId));
          if (patient.photoIds.length > 0) {
            this.setPhotos(patient);
          }
        }

        forkJoin(getGeneralInfoObservables).subscribe(
          generalInfos => {
            for (let i = 0; i < patients.length; i++) {
              patients[i].generalInfo = generalInfos[i];
            }
          }
        );

        forkJoin(getWishesMedicationObservables).subscribe(
          wishesMedications => {
            for (let i = 0; i < patients.length; i++) {
              patients[i].wishesMedication = wishesMedications[i];
            }
          }
        );

        console.log(patients)
        this.patients = patients;
      }
    );
  }

  setScans(patient: any): void {
    const scanObservables = [];

    for (const scanId of patient.scanIds) {
      scanObservables.push(this.scanService.getScan(scanId));
    }

    forkJoin(scanObservables).subscribe(
      scans => {
        patient.scans = scans.map(scan => {
          return {
            id: scan.id,
            scanPath: scan.scanPath
          };
        });

        const patientIndex = this.patients.findIndex(p => p.id === patient.id);
        if (patientIndex !== -1) {
          this.patients = this.patients.map(p => (p.id === patient.id ? patient : p));
        }
      }
    );
  }

  setPhotos(patient: any): void {
    const photoObservables = [];

    for (const photoId of patient.photoIds) {
      photoObservables.push(this.photoService.getPhoto(photoId));
    }

    forkJoin(photoObservables).subscribe(
      photos => {
        patient.photos = photos.map(photo => {
          return {
            id: photo.id,
            period: photo.period,
            frontalPath: photo.frontalPath,
            rightSidePath: photo.rightSidePath,
            leftSidePath: photo.leftSidePath,
            rightSideLateralPath: photo.rightSideLateralPath,
            leftSideLateralPath: photo.leftSideLateralPath,
            intraoralFrontalPath: photo.intraoralFrontalPath,
            upperJawOcclusalPath: photo.upperJawOcclusalPath,
            lowerJawOcclusalPath: photo.lowerJawOcclusalPath
          };
        });

        const patientIndex = this.patients.findIndex(p => p.id === patient.id);
        if (patientIndex !== -1) {
          this.patients = this.patients.map(p => (p.id === patient.id ? patient : p));
        }
      }
    );
  }

  editPatient(id: any) {
    console.log("GOOD")
    //this.router.navigate(['/', id]);
  }

  viewPatient(id: any) {
    console.log("GOOD")
    this.router.navigate(['/view', id]);
  }


}
