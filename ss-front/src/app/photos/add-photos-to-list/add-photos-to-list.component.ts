import {Component, OnInit} from '@angular/core';
import {ImageFields} from "../../model/ImageFields";
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoService} from "../../service/photo.service";
import {LocalStor} from "../../service/localStor";
import {PatientService} from "../../service/patient.service";
import {Photo} from "../../model/Photo";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-add-photos-to-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './add-photos-to-list.component.html',
  styleUrl: './add-photos-to-list.component.scss'
})
export class AddPhotosToListComponent implements OnInit {
  period: string = "0";
  patient: any;
  photos!: Photo[];
  periods!: number[];

  patientId: any;
  infoId: any;

  images: ImageFields = {
    upperJawOcclusalView: null,
    intraoralFrontalView: null,
    lowerJawOcclusalView: null,
    rightSideLateralView: null,
    leftSideLateralView: null,
    leftSideView: null,
    frontalView: null,
    rightSideView: null
  };

  onFileSelected(event: any, field: keyof ImageFields) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[field] = reader.result;
    };
    reader.readAsDataURL(file);
  }

  constructor(private router: Router,
              private photoService: PhotoService,
              private route: ActivatedRoute,
              private patientService: PatientService) {
  }


  ngOnInit(): void {
    this.infoId = -1;
    this.getPhoto();
    this.periods = [];
  }

  getPhotoPeriods(): void {
    this.photos.forEach(photo => {
      console.log('Photo: ', photo);
      console.log('Period: ', photo.period);
      this.periods.push(photo.period!);
    });
  }

  getPhoto(): void {
    this.route.params.subscribe(params => {
      this.patientId = params['patientId']!;
      this.infoId = params['infoId']!;

      this.patientService.getPatient(this.patientId).subscribe(
        patient => {
          this.photoService.getPhotosOfPatient(patient.photoIds).subscribe(
            photos => {
              this.photos = photos;
              this.getPhotoPeriods();
            }
          )
        }
      )
    });
  }

  isPeriodUnique(period: string): boolean {
    console.log(this.periods);
    return !this.periods.includes(Number(period));
  }

  onSubmit() {
    let form: HTMLFormElement | null = document.forms.namedItem('uploadForm');
    if (form) {
      let fd = new FormData(form);

      fd.append("userId", this.infoId);
      fd.append("patientId", this.patientId);
      console.log("INFO ID: ", this.infoId);

      this.photoService.addPhotoToList(fd).subscribe(
        photo => {
          this.router.navigate(['/view', this.patientId]);
        }
      );
    }
  }

  goToPreviousPage(): void {
    this.router.navigate(['/view', this.patientId]).then(() => window.location.reload());
  }
}
