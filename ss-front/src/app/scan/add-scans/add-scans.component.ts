import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ImageFields} from "../../model/ImageFields";
import {Router} from "@angular/router";
import {LocalStor} from "../../service/localStor";
import {ScanSerivce} from "../../service/scan.serivce";
import {Scan} from "../../model/Scan";
import {PatientService} from "../../service/patient.service";

@Component({
  selector: 'app-add-scans',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './add-scans.component.html',
  styleUrl: './add-scans.component.scss'
})
export class AddScansComponent {
  patient: any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  fileStatus: string = 'Файл не выбран';

  onFileSelected(event: Event): void {
    const fileInputElement: HTMLInputElement = <HTMLInputElement>event.target;
    if (fileInputElement.files && fileInputElement.files[0]) {
      const fileName: string = fileInputElement.files[0].name;
      this.fileStatus = `Файл выбран: ${fileName}`;
    } else {
      this.fileStatus = 'Файл не выбран';
    }
  }
  constructor(private router: Router,
              private service: ScanSerivce,
              private localStor: LocalStor,
              private patientService: PatientService) {
  }


  ngOnInit(): void {
  }

  onSubmit() {
    let form:HTMLFormElement | null = document.forms.namedItem('uploadForm');
    if (form) {
      let fd = new FormData(form);
      // this.service.addScan(fd).subscribe({
      //   next: scan => {
      //     console.log(scan);
      //     this.localStor.setScnaId(scan.id);
      //     this.router.navigate(['/patients']).then(() => window.location.reload());
      //   }
      // });

      this.service.addScan(fd).subscribe(
        scan => {
          console.log(scan)
          this.localStor.setScnaId(scan.id);
          this.savePatient();
          this.router.navigate(['/patients']).then(() => window.location.reload());
        }
      );
    }
  }

  savePatient(): void {
    this.patient = {
      generalInfoId: this.localStor.getGeneralDataId(),
      wishesMedicationId: this.localStor.getMedId(),
      photoId: this.localStor.getPhotoId(),
      scanId: this.localStor.getScanId()
    };
    this.patientService.addPatient(this.patient)

    this.localStor.removeToken();
  }

  goToPreviousPage(): void {
    this.router.navigate(['/photo/add']);
  }
}
