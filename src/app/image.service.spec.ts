import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageService]
    });
    service = TestBed.inject(ImageService);
  });

  it('El servicio de imagenes debe crearse', () => {
    expect(service).toBeTruthy();
  });

  describe('Obtener todas las imagenes', () => {

    it('Debe devolver todas las imagenes ', () => {

      let imagenes = service.getImages();

      expect(imagenes.length).toEqual(5);

    });

    describe('Obtener una imagen', () => {

      it('Debe devolver una imagen en específico al indicarle un id existente', () => {

        let imagen = service.getImage(1);
  
        expect(imagen.id).toEqual(1);
        
      });

      it('Debe devolver una imagen en específico al indicarle un id existente', () => {

        let imagen = service.getImage(4);
  
        expect(imagen.id).toEqual(4);
        
      });
  
      it('Debe devolver "indefinido" al indicarle un id inexistente', () => {
  
        let imagen = service.getImage(6);
  
        expect(imagen).toEqual(undefined);
        
      });
    });
  });
});
