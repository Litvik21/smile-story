import {Component, OnInit} from '@angular/core';
import {Patient} from "../../model/Patient";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalStor} from "../../service/localStor";
import {PatientService} from "../../service/patient.service";
import {GeneralInfo, Sex} from "../../model/GeneralInfo";
import {GeneralInfoService} from "../../service/generalInfo.service";
import {Photo} from "../../model/Photo";
import {PhotoService} from "../../service/photo.service";
import {WishesMedicationService} from "../../service/wishesMedication.service";
import {
  Alignment, AlignmentMapping,
  Correction, CorrectionMapping,
  Extraction, ExtractionMapping,
  Medication, MedicationMapping,
  Microimplant, MicroimplantMapping,
  WishesMedication
} from "../../model/WishesMedication";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-view-patient',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './view-patient.component.html',
  styleUrl: './view-patient.component.scss'
})
export class ViewPatientComponent implements OnInit {
  patient!: Patient;
  generalInfo!: GeneralInfo;
  medication!: WishesMedication;
  photos!: Photo[];
  photo!: Photo;
  firstPhoto!: Photo;
  periods!: number[];
  currentPeriod = 0;
  showPhotos = false;
  loadPhotos = false;

  mapSex(sex: Sex): string {
    return Sex[sex as unknown as keyof typeof Sex];
  }

  mapMedication(medication: Medication): string {
    return Medication[medication as unknown as keyof typeof Medication];
  }

  mapAlignment(alignment: Alignment): string {
    return Alignment[alignment as unknown as keyof typeof Alignment];
  }

  mapExtraction(extraction: Extraction): string {
    return Extraction[extraction as unknown as keyof typeof Extraction];
  }

  mapMicroimplant(microimplant: Microimplant): string {
    return Microimplant[microimplant as unknown as keyof typeof Microimplant];
  }

  mapCorrection(correction: Correction): string {
    return Correction[correction as unknown as keyof typeof Correction];
  }

  constructor(private patientService: PatientService,
              private generalInfoService: GeneralInfoService,
              private medicationService: WishesMedicationService,
              private photoService: PhotoService,
              private route: ActivatedRoute,
              private localStore: LocalStor,
              private router: Router) { }

  ngOnInit(): void {
    this.getPatient();
    this.periods = [];
  }

  getPhoto(): void {
    const firstPhotoId = this.patient.photoIds[0];
    this.photoService.getPhoto(firstPhotoId).subscribe(
      photo => {
        this.firstPhoto = photo;
      }
    )
  }

  getPatient(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.patientService.getPatient(id).subscribe(
      patient => {
        this.patient = patient;
        this.generalInfoService.getGeneralInfo(patient.generalInfoId).subscribe(
          generalInfo => {
            this.generalInfo = generalInfo;
          }
        )
        this.photoService.getPhotosOfPatient(patient.photoIds).subscribe(
          photos => {
            this.photos = photos;
            this.getPhotoPeriods();
          }
        )
        this.medicationService.getWishesMedication(patient.wishesMedicationId).subscribe(
          medication => {
            this.medication = medication;
          }
        )
        this.getPhoto();
      }
    )
  }

  editGeneralInfo(infoId: any, patientId: any): void {
    console.log('INFO ID: ', infoId)
    this.router.navigate(['/general-info/update', infoId, patientId]);
  }

  editTreatment(medId: any, patientId: any): void {
    console.log('MED ID: ', medId)
    this.router.navigate(['/medication/update', medId, patientId]);
  }

  deletePatient(patientId: any): void {
    this.patientService.removePatient(patientId);
    this.router.navigate(['/patients']).then(() => window.location.reload());
  }

  getPhotoPeriods(): void {
    this.photos.forEach(photo => {
      this.periods.push(photo.period!);
    });
  }

  onPeriodChange(): void {
    this.loadPhotos = false;
  }

  getPhotosByPeriod(): void {
    this.photo = this.photos.find(photo => photo.period === this.currentPeriod)!;
    this.loadPhotos = true;
  }

  showPhoto(): void {
    this.showPhotos = !this.showPhotos;
  }

  updatePhoto(photoId: any, patientId: any, infoId: any): void {
    this.router.navigate(['/photo/update', photoId, patientId, infoId]);
  }
}
