import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ImageFields} from "../../model/ImageFields";
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoService} from "../../service/photo.service";

@Component({
  selector: 'app-photo-update',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './photo-update.component.html',
  styleUrl: './photo-update.component.scss'
})
export class PhotoUpdateComponent implements OnInit {
  period = '';
  photoId: any;
  patientId: any;
  photo: any;
  infoId: any;
  photoToDelete: any;
  photoFullPath: any;
  photoToUpdate: any;

  frontalView: any;
  rightSideView: any;
  leftSideView: any;
  rightSideLateralView: any;
  leftSideLateralView: any;
  intraoralFrontalView: any;
  upperJawOcclusalView: any;
  lowerJawOcclusalView: any;

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

  upperJawOcclusalViewSelected(event: any, field: keyof ImageFields) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[field] = reader.result;
      this.upperJawOcclusalView = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  intraoralFrontalViewSelected(event: any, field: keyof ImageFields) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[field] = reader.result;
      this.intraoralFrontalView = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  lowerJawOcclusalViewSelected(event: any, field: keyof ImageFields) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[field] = reader.result;
      this.lowerJawOcclusalView = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  rightSideLateralViewSelected(event: any, field: keyof ImageFields) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[field] = reader.result;
      this.rightSideLateralView = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  leftSideLateralViewSelected(event: any, field: keyof ImageFields) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[field] = reader.result;
      this.leftSideLateralView = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  leftSideViewSelected(event: any, field: keyof ImageFields) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[field] = reader.result;
      this.leftSideView = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  frontalViewSelected(event: any, field: keyof ImageFields) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[field] = reader.result;
      this.frontalView = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  rightSideViewSelected(event: any, field: keyof ImageFields) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[field] = reader.result;
      this.rightSideView = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private photoService: PhotoService) {
  }


  ngOnInit(): void {
    this.getPhoto();
  }

  getPhoto(): void {
    this.route.params.subscribe(params => {
      this.photoId = params['photoId']!;
      this.patientId = params['patientId']!;
      this.infoId = params['infoId']!;

      this.photoService.getPhoto(this.photoId).subscribe(
        photo => {
          this.photo = photo;
          this.period = photo.period.toString();
        }
      )
      this.photoService.getPhotoForDelete(this.photoId).subscribe(
        photo => {
          this.photoFullPath = photo;
        }
      )
    });
  }

  onSubmit() {
    this.photoToDelete = {
      path: this.photoFullPath.frontalPath
    }
    // this.photoService.deleteOldPhotos(this.photoToDelete).subscribe(
    //   result => {
    //
    //   }
    // );

    let form: HTMLFormElement | null = document.forms.namedItem('uploadForm');
    if (form) {
      let fd = new FormData(form);

      fd.append("userId", this.infoId);
      this.photoToUpdate = {
        period: this.period,
        userId: this.infoId,
        frontalPath: this.frontalView,
        rightSidePath: this.rightSideView,
        leftSidePath: this.leftSideView,
        rightSideLateralPath: this.rightSideLateralView,
        leftSideLateralPath: this.leftSideLateralView,
        intraoralFrontalPath: this.intraoralFrontalView,
        upperJawOcclusalPath: this.upperJawOcclusalView,
        lowerJawOcclusalPath: this.lowerJawOcclusalView
      }

      this.photoService.updatePhoto(this.photoToUpdate, this.photo.id).subscribe(
        photo => {
          this.router.navigate(['/view', this.patientId]);
          //this.router.navigate(['/view', this.patientId]).then(() => window.location.reload());
        }
      );
    }



    // setTimeout(() => {
    //   console.log('Прошло 5 секунд');
    // }, 5000);


  }

  goToPreviousPage(): void {
    this.router.navigate(['/view', this.patientId]).then(() => window.location.reload());
  }

  checkUpperJawOcclusalView(imagePath: string): string {
    if (imagePath.includes('DEFAULT')) {
      this.upperJawOcclusalView = 'ss-front/src/assets/photosBackground/occlusal_upper_icon.png'
      return 'assets/photosBackground/occlusal_upper_icon.png';
    } else {
      this.upperJawOcclusalView = this.photoFullPath.upperJawOcclusalPath;
      return imagePath;
    }
  }

  checkIntraoralFrontalView(imagePath: string): string {
    if (imagePath.includes('DEFAULT')) {
      this.intraoralFrontalView = 'ss-front/src/assets/photosBackground/intraoral_front_icon.png'
      return 'assets/photosBackground/intraoral_front_icon.png';
    } else {
      this.intraoralFrontalView = this.photoFullPath.intraoralFrontalPath;
      return imagePath;
    }
  }

  checkLowerJawOcclusalView(imagePath: string): string {
    if (imagePath.includes('DEFAULT')) {
      this.lowerJawOcclusalView = 'ss-front/src/assets/photosBackground/occlusal_lower_icon.png'
      return 'assets/photosBackground/occlusal_lower_icon.png';
    } else {
      this.lowerJawOcclusalView = this.photoFullPath.upperJawOcclusalPath;
      return imagePath;
    }
  }

  checkRightSideLateralView(imagePath: string): string {
    if (imagePath.includes('DEFAULT')) {
      this.rightSideLateralView = 'ss-front/src/assets/photosBackground/side_right_icon.png'
      return 'assets/photosBackground/side_right_icon.png';
    } else {
      this.rightSideLateralView = this.photoFullPath.rightSideLateralPath;
      return imagePath;
    }
  }

  checkLeftSideLateralView(imagePath: string): string {
    if (imagePath.includes('DEFAULT')) {
      this.leftSideLateralView = 'ss-front/src/assets/photosBackground/side_left_icon.png'
      return 'assets/photosBackground/side_left_icon.png';
    } else {
      this.leftSideLateralView = this.photoFullPath.leftSideLateralPath;
      return imagePath;
    }
  }

  checkLeftSideView(imagePath: string): string {
    if (imagePath.includes('DEFAULT')) {
      this.leftSideView = 'ss-front/src/assets/photosBackground/profile_left_icon.png'
      return 'assets/photosBackground/profile_left_icon.png';
    } else {
      this.leftSideView = this.photoFullPath.leftSidePath;
      return imagePath;
    }
  }

  checkFrontalView(imagePath: string): string {
    if (imagePath.includes('DEFAULT')) {
      this.frontalView = 'ss-front/src/assets/photosBackground/front_smile_icon.png'
      return 'assets/photosBackground/front_smile_icon.png';
    } else {
      this.frontalView = this.photoFullPath.frontalPath;
      return imagePath;
    }
  }

  checkRightSideView(imagePath: string): string {
    if (imagePath.includes('DEFAULT')) {
      this.rightSideView = 'ss-front/src/assets/photosBackground/profile_right_icon.png'
      return 'assets/photosBackground/profile_right_icon.png';
    } else {
      this.rightSideView = this.photoFullPath.rightSidePath;
      return imagePath;
    }
  }

}
