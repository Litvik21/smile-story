import {Component, OnInit} from '@angular/core';
import {SexMapping} from "../../model/GeneralInfo";
import {Router} from "@angular/router";
import {ImageFields} from "../../model/ImageFields";
import {LocalStor} from "../../service/localStor";
import {FormsModule} from "@angular/forms";
import {PhotoService} from "../../service/photo.service";

@Component({
  selector: 'app-add-photos',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-photos.component.html',
  styleUrl: './add-photos.component.scss'
})
export class AddPhotosComponent {
  period: string = "0";

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
              private localStor: LocalStor) {
  }


  ngOnInit(): void {
  }

  onSubmit() {
    let form: HTMLFormElement | null = document.forms.namedItem('uploadForm');
    if (form) {
      let fd = new FormData(form);

      this.photoService.addPhoto(fd).subscribe(
        photo => {
          console.log(photo)
          this.localStor.setPhotoId(photo.id);
          console.log('Photo ID: ', this.localStor.getPhotoId())
          this.router.navigate(['/scans/add']);
        }
      );
    }
  }

  goToPreviousPage(): void {
    this.router.navigate(['/medication/add']);
  }
}
