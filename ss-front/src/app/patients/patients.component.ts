import { Component } from '@angular/core';
import {Patient} from "../model/Patient";
import {PatientService} from "../service/patient.service";
import {GeneralInfoService} from "../service/generalInfo.service";
import {WishesMedicationService} from "../service/wishesMedication.service";
import {Router} from "@angular/router";
import {PhotoService} from "../service/photo.service";
import {ScanSerivce} from "../service/scan.serivce";
import {forkJoin, map, switchMap} from "rxjs";

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {
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

  // getPatients(): void {
  //   this.patientService.getPatients().subscribe(
  //     patients => {
  //       if (patients.length < 0) {
  //         console.log("Don't have posts yet!")
  //         return;
  //       }
  //       const getGeneralInfoObservables = [];
  //       const getMedObservables = [];
  //
  //       for (const patient of patients) {
  //         getGeneralInfoObservables.push(this.generalInfo.getGeneralInfo(patient.generalInfoId));
  //         getMedObservables.push(this.medService.getWishesMedication(patient.wishesMedicationId));
  //         if (patient.photoIds.length > 0) {
  //           this.setPhotos(patient);
  //         }
  //         if (patient.scanIds.length > 0) {
  //
  //         }
  //       }
  //
  //       forkJoin(getGeneralInfoObservables).subscribe(
  //         generalInfos => {
  //           for (let i = 0; i < patients.length; i++) {
  //             patients[i].generalInfo = generalInfos[i];
  //           }
  //           this.patients = patients;
  //         }
  //       );
  //
  //       forkJoin(getMedObservables).subscribe(
  //         meds => {
  //           for (let i = 0; i < patients.length; i++) {
  //             patients[i].wishesMedication = meds[i];
  //           }
  //           this.patients = patients;
  //         }
  //       );
  //     }
  //   );
  // }
  //
  // setPhotos(patient: any): void {
  //   const photoObservables = [];
  //
  //   for (const photoId of patient.photoIds) {
  //     photoObservables.push(this.photoService.getPhoto(photoId));
  //   }
  //
  //   forkJoin(photoObservables).subscribe(
  //     photos => {
  //       patient.photos = photos.map(photo => {
  //         return {
  //           id: photo.id,
  //           period: photo.period,
  //           frontalPath: photo.frontalPath,
  //           rightSidePath: photo.rightSidePath,
  //           leftSidePath: photo.leftSidePath,
  //           rightSideLateralPath: photo.rightSideLateralPath,
  //           leftSideLateralPath: photo.leftSideLateralPath,
  //           intraoralFrontalPath: photo.intraoralFrontalPath,
  //           upperJawOcclusalPath: photo.upperJawOcclusalPath,
  //           lowerJawOcclusalPath: photo.lowerJawOcclusalPath
  //         };
  //       });
  //
  //       const patientIndex = this.patients.findIndex(p => p.id === patient.id);
  //       if (patientIndex !== -1) {
  //         this.patients = this.patients.map(p => (p.id === patient.id ? patient : p));
  //       }
  //     }
  //   );
  // }

  getPatients(): void {
    this.patientService.getPatients().subscribe(
      patients => {
        if (patients.length < 0) {
          console.log("Don't have posts yet!")
          return;
        }

        const getGeneralInfoObservables = [];
        const getWishesMedicationObservables = [];

        for (const patient of patients) {
          getGeneralInfoObservables.push(this.generalInfo.getGeneralInfo(patient.generalInfoId));
          getWishesMedicationObservables.push(this.medService.getWishesMedication(patient.wishesMedicationId));
          if (patient.photoIds.length > 0) {
            this.setPhotos(patient);
          }
          if (patient.scanIds.length > 0) {
            this.setScans(patient);
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


}
