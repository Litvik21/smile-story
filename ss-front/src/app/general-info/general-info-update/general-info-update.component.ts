import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Sex, SexMapping} from "../../model/GeneralInfo";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralInfoService} from "../../service/generalInfo.service";
import {LocalStor} from "../../service/localStor";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-general-info-update',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix
  ],
  templateUrl: './general-info-update.component.html',
  styleUrl: './general-info-update.component.scss'
})
export class GeneralInfoUpdateComponent  implements OnInit  {
  firstName: string = '';
  lastName: string = '';
  sexes: string[] = Object.values(SexMapping);
  selectedSex: string = '';
  phone: string = '';
  birthYear: Date | null = null;
  generalInfo: any;
  updatedGeneralInfo: any;
  patientId: any;
  generalInfoId: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private generalInfoService: GeneralInfoService,
              private localStor: LocalStor) {
  }


  ngOnInit(): void {
    this.getGeneralInfo();
  }

  setBirthYearFromString(dateString: string): void {
    if (dateString) {
      const parts = dateString.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      this.birthYear = new Date(year, month, day);
    } else {
      this.birthYear = null;
    }
  }

  onDateChange(event: any) {
    console.log('Выбраная дата:', event.value);
    this.birthYear = event.value;
  }


  get formattedDate(): string | null {
    if (this.birthYear) {
      const year = this.birthYear.getFullYear();
      const month = String(this.birthYear.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
      const day = String(this.birthYear.getDate()).padStart(2, '0'); // Дни
      return `${year}-${month}-${day}`; // Формат yyyy-MM-dd
    }
    return null;
  }

  getGeneralInfo(): void {
    this.route.params.subscribe(params => {
      this.generalInfoId = params['infoId']!;
      console.log('INFO ID: ', this.generalInfoId)
      this.patientId = params['patientId']!;

      this.generalInfoService.getGeneralInfo(this.generalInfoId).subscribe(
        generalInfo => {
          console.log('Данные профиля:', generalInfo);
          this.generalInfo = generalInfo;
          this.firstName = generalInfo.firstName;
          this.lastName = generalInfo.surName;
          this.setBirthYearFromString(generalInfo.birthDate);
          this.selectedSex = this.mapSex(generalInfo.sex);
          this.phone = generalInfo.phone;
        }
      )
    });
  }

  mapSex(sex: Sex): string {
    return Sex[sex as unknown as keyof typeof Sex];
  }

  submit() {
    this.updatedGeneralInfo = {
      firstName: this.firstName,
      surName: this.lastName,
      sex: this.selectedSex,
      phone: this.phone,
      birthDate: this.formattedDate,
      patientId: this.patientId
    };

    console.log("UPDATE GENERAL INFO: ", this.updatedGeneralInfo);
    this.generalInfoService.updateGeneralInfo(this.updatedGeneralInfo, this.generalInfoId).subscribe(
      generalData => {
        console.log('GeneralInfo: ', generalData)
        console.log(this.localStor.getGeneralDataId())
        this.router.navigate(['/view', this.patientId]).then(() => window.location.reload());
      }
    );
  }

  goToPreviousPage(): void {
    this.router.navigate(['/view', this.patientId]).then(() => window.location.reload());
  }
}
