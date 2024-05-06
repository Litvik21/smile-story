import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Sex, SexMapping} from "../../model/GeneralInfo";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralInfoService} from "../../service/generalInfo.service";
import {LocalStor} from "../../service/localStor";

@Component({
  selector: 'app-general-info-update',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './general-info-update.component.html',
  styleUrl: './general-info-update.component.scss'
})
export class GeneralInfoUpdateComponent  implements OnInit  {
  firstName: string = '';
  lastName: string = '';
  sexes: string[] = Object.values(SexMapping);
  selectedSex: string = '';
  birthYear: string = '';
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

  getGeneralInfo(): void {
    this.route.params.subscribe(params => {
      this.generalInfoId = params['infoId']!;
      console.log('INFO ID: ', this.generalInfoId)
      this.patientId = params['patientId']!;

      this.generalInfoService.getGeneralInfo(this.generalInfoId).subscribe(
        generalInfo => {
          this.generalInfo = generalInfo;
          this.firstName = generalInfo.firstName;
          this.lastName = generalInfo.surName;
          this.birthYear = generalInfo.birthDate;
          this.selectedSex = this.mapSex(generalInfo.sex);
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
      birthDate: this.birthYear
    };

    console.log("UPDATE GENERAL INFO: ", this.updatedGeneralInfo);
    this.generalInfoService.updateGeneralInfo(this.updatedGeneralInfo, this.patientId).subscribe(
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
