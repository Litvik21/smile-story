import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPhotosComponent } from './get-photos.component';

describe('GetPhotosComponent', () => {
  let component: GetPhotosComponent;
  let fixture: ComponentFixture<GetPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetPhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
