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

    spyOn(service, "getImages").and.returnValue([
      { "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" },
      { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
      { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" }]);

  });

  it('Debe crearse una instancia del pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('Debe filtar y devolver las imagenes de perros al buscar perros', () => {

    let imagenesPerros = pipe.transform(service.getImages(), "perro");

    expect(imagenesPerros.length).toEqual(2);

  });

  it('Debe filtar y devolver las imagenes de gatos al buscar gatos', () => {

    let imagenesGatos = pipe.transform(service.getImages(), "gato");

    expect(imagenesGatos.length).toEqual(1);

  });

  it('Debe devolver todas las imagenes de los animales al buscar todos', () => {

    let imagenes = pipe.transform(service.getImages(), "all");

    expect(imagenes.length).toEqual(3);

  });

  it('No debe devolver nada al buscar otro animal diferente a gato y perro', () => {

    let imagenes = pipe.transform(service.getImages(), "Pajaro");

    expect(imagenes.length).toEqual(0);

  });

  it('No debe devolver nada al buscar otras palabras diferentes a gato y perro', () => {

    let imagenes = pipe.transform(service.getImages(), "Carros");

    expect(imagenes.length).toEqual(0);

  });
  
});
