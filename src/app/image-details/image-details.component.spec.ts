import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailComponent } from './image-details.component';

import { ImageService } from '../image.service';

import { ActivatedRoute } from '@angular/router'

describe('ImageDetailsComponent', () => {
  let component: ImageDetailComponent;
  let fixture: ComponentFixture<ImageDetailComponent>;
  let service: ImageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDetailComponent ],
      providers: [{provide: ImageService},
      {provide: ActivatedRoute, useValue:{
        snapshot: {
          params: {"id":1}
        }
      }}]
    })
    .compileComponents();

    service = TestBed.inject(ImageService);

    spyOn(service, "getImage").and.
    returnValues({ "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" });
      
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Debería crearse el componente', () => {

    expect(component).toBeTruthy();

  });

});
