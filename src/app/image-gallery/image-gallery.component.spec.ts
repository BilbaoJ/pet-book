import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { GalleryComponent } from './image-gallery.component';

import { ImageService } from '../image.service';

import { Pipe, PipeTransform } from '@angular/core';    

import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';

import { Router } from '@angular/router';

import { Location } from '@angular/common';

describe('ImageGalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let service: ImageService;
  let router: Router;
  let location: Location;

  @Pipe({name: 'filterimages'})
  class MockedFilterimagesPipe implements PipeTransform {
    transform(items: any[], filter: string): any {    
      if(filter === 'all'){ return items } else    
      return items.filter(item =>{    
        return item.brand === filter;    
      });    
    }
  }

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([{path: 'image/:id', component: class Dummy{}}]) ],
      declarations: [ GalleryComponent, MockedFilterimagesPipe],
      providers: [ImageService]
    })
    .compileComponents();

    service = TestBed.inject(ImageService);

    router = TestBed.inject(Router);

    location = TestBed.inject(Location);
    
    spyOn(service, "getImages").and.returnValue([
      { "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" },
      { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
      { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" }]);

      router.initialNavigation();

  }));

  beforeEach(async(() => {

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('Debe crearse el componente', () => {

    expect(component).toBeTruthy();

  });

  it('Debe mostrar todas las imagenes cuando se carga por primera vez la página', () => {

    let imagenes = fixture.debugElement.queryAll(By.css('.img'))

    expect(imagenes.length).toEqual(3);
  });

  it('Debe mostrar solo las imagenes de gatos cuando se hace click en el botón "Gato"', () => {

    let btnElement = fixture.debugElement.query(By.css('#gato'));

    btnElement.triggerEventHandler('click', null);
    
    fixture.detectChanges();

    let imagenes = fixture.debugElement.queryAll(By.css('.img'))
    expect(imagenes.length).toEqual(1);

  }); 

  it('Debe mostrar solo las imagenes de perros cuando se hace click en el botón "Perro"', () => {

    let btnElement = fixture.debugElement.query(By.css('#perro'));

    btnElement.triggerEventHandler('click', null);
    
    fixture.detectChanges();

    let imagenes = fixture.debugElement.queryAll(By.css('.img'))
    expect(imagenes.length).toEqual(2);

  }); 

  it('Debe mostrar todas las imagenes cuando se hace click en el botón "All"', () => {

    let btnElement = fixture.debugElement.query(By.css('#all'));

    btnElement.triggerEventHandler('click', null);

    fixture.detectChanges();

    let imagenes = fixture.debugElement.queryAll(By.css('.img'))

    expect(imagenes.length).toEqual(3);

  }); 

  it('Debe cambiar la URL cuando se hace click en una imagen', fakeAsync(() => {

    let imagen = fixture.debugElement.query(By.css('a'));

    imagen.nativeElement.click();

    tick();

    expect(location.path()).toBe('/image/1');

  })); 
});
