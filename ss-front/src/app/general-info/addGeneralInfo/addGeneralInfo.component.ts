import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GeneralInfoService} from "../../service/generalInfo.service";
import {LocalStor} from "../../service/localStor";
import {Sex, SexMapping} from "../../model/GeneralInfo";
import {LocalStorageMedAndGeneral} from "../../service/local.storage.med.and.general";

@Component({
  selector: 'app-addGeneralInfo',
  templateUrl: './addGeneralInfo.component.html',
  styleUrls: ['./addGeneralInfo.component.scss']
})
export class AddGeneralInfoComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  sexes: string[] = Object.values(SexMapping);
  selectedSex: string = '';
  birthYear: Date | null = null;
  phone: any;
  newGeneralInfo: any;

  constructor(private router: Router,
              private generalInfoService: GeneralInfoService,
              private localStor: LocalStor,
              private storage: LocalStorageMedAndGeneral) {
  }


  ngOnInit(): void {
    if (this.storage.hasGeneralInfo()) {
      const generalInfo = this.storage.getGeneralInfo();
      console.log('Данные профиля:', generalInfo);

      this.firstName = generalInfo.firstName;
      this.lastName = generalInfo.surName;
      if (generalInfo.sex === 'Мужчина') {
        generalInfo.sex = 'MAN';
      } else {
        generalInfo.sex = 'WOMAN';
      }
      this.selectedSex = this.mapSex(generalInfo.sex);
      this.phone = generalInfo.phone;
      this.setBirthYearFromString(generalInfo.birthDate);
    } else {
      console.log('Данных профиля нет в localStorage.');
    }
  }

  mapSex(sex: Sex): string {
    return Sex[sex as unknown as keyof typeof Sex];
  }

  onDateChange(event: any) {
    console.log('Выбраная дата:', event.value);
    this.birthYear = event.value;
  }

  setBirthYearFromString(dateString: string): void {
    if (dateString) {
      const parts = dateString.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      this.birthYear = new Date(year, month, day);
    } else {
      this.birthYear = new Date();
    }
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


  submit() {
    this.newGeneralInfo = {
      firstName: this.firstName,
      surName: this.lastName,
      sex: this.selectedSex,
      phone: this.phone,
      birthDate: this.formattedDate
    };

    if (this.localStor.hasGeneralId()) {
      this.generalInfoService.updateGeneralInfo(this.newGeneralInfo, Number(this.localStor.getGeneralDataId())).subscribe(
        generalData => {
          this.router.navigate(['/medication/add']);
        }
      );
    }
    this.storage.setGeneralInfo(this.newGeneralInfo);

    this.generalInfoService.addGeneralInfo(this.newGeneralInfo).subscribe(
      generalData => {
        console.log(generalData)
        this.localStor.setGeneralDataId(generalData.id);
        console.log('General ID: ' + this.localStor.getGeneralDataId())
        this.router.navigate(['/medication/add']);
      }
    );
  }

  goToPreviousPage(): void {
    this.storage.removeData();
    this.router.navigate(['/patients']);
  }
}
