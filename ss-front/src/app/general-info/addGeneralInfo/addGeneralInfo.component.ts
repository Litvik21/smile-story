import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GeneralInfoService} from "../../service/generalInfo.service";
import {LocalStor} from "../../service/localStor";
import {SexMapping} from "../../model/GeneralInfo";

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
  //birthYear: string = '';
  birthYear: Date = new Date;
  phone: any;
  newGeneralInfo: any;

  constructor(private router: Router,
              private generalInfoService: GeneralInfoService,
              private localStor: LocalStor) {
  }


  ngOnInit(): void {
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


  submit() {
    console.log('Date: ' + this.birthYear)
    console.log('Date STRING: ' + this.formattedDate)
    this.newGeneralInfo = {
      firstName: this.firstName,
      surName: this.lastName,
      sex: this.selectedSex,
      phone: this.phone,
      birthDate: this.formattedDate
    };

    this.generalInfoService.addGeneralInfo(this.newGeneralInfo).subscribe(
      generalData => {
        console.log(generalData)
        this.localStor.setGeneralDataId(generalData.id);
        console.log("General ID: ")
        console.log(this.localStor.getGeneralDataId())
        this.router.navigate(['/medication/add']);
      }
    );
  }

  goToPreviousPage(): void {
    this.router.navigate(['/patients']);
  }
}
