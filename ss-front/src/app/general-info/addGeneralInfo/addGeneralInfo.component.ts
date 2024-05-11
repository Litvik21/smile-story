import {Component, ElementRef, HostListener, inject, OnInit} from '@angular/core';
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
  birthYear: string = '';
  phone: any;
  newGeneralInfo: any;

  constructor(private router: Router,
              private generalInfoService: GeneralInfoService,
              private localStor: LocalStor) {
  }


  ngOnInit(): void {
  }

  submit() {
    this.newGeneralInfo = {
      firstName: this.firstName,
      surName: this.lastName,
      sex: this.selectedSex,
      phone: this.phone,
      birthDate: this.birthYear
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
