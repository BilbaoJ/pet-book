import { TestBed } from '@angular/core/testing';

import { FilterimagesPipe } from './filterimages.pipe';

import { ImageService } from './image.service';

describe('FilterimagesPipe', () => {
  
  let pipe : FilterimagesPipe;
  let service: ImageService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [FilterimagesPipe, ImageService]
    });

    pipe = TestBed.inject(FilterimagesPipe);
    service = TestBed.inject(ImageService);

  });

  it('Debe crearse una instancia de la clase', () => {
    expect(pipe).toBeTruthy();
  });

  it('Debe filtar y devolver las imagenes de perros', () => {

    spyOn(service, "getImages").and.returnValue([
      { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" }]);

    let imagenesPerros = pipe.transform(service.getImages(), "perro");

    expect(imagenesPerros.length).toEqual(1);

  });

  it('Debe filtar y devolver las imagenes de gatos', () => {

    spyOn(service, "getImages").and.returnValue([
      { "id": 4, "brand": "gato", "url": "assets/images/gato2.jpeg" }]);

    let imagenesGatos = pipe.transform(service.getImages(), "gato");

    expect(imagenesGatos.length).toEqual(2);

  });

  it('No debe devolver nada al buscar otro animal', () => {

    spyOn(service, "getImages").and.returnValue([
      { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
    { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" }]);

    let imagenes = pipe.transform(service.getImages(), "Pajaro");

    expect(imagenes.length).toEqual(0);

  });

  it('Debe devolver todas las imagenes', () => {

    spyOn(service, "getImages").and.returnValue([
      { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
    { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" },
    { "id": 4, "brand": "gato", "url": "assets/images/gato2.jpeg" }]);

    let imagenes = pipe.transform(service.getImages(), "all");

    expect(imagenes.length).toEqual(3);

  });

});
