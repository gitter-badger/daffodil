import { TestBed, inject } from '@angular/core/testing';

import { ProductTestingService } from './product.testing.service';
import { Product } from '@core/product/model/product';
import { ProductTestingModule } from '@core/product/testing/product-testing.module';
import { ProductFactory } from '@core/product/testing/factories/product.factory';

describe('Core | Product | Testing | ProductTestingService', () => {
  
  let productTestingService;
  let productFactory;
  let mockProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductTestingModule
      ],
      providers: [ProductTestingService]
    });

    productFactory = TestBed.get(ProductFactory);
    productTestingService = TestBed.get(ProductTestingService);
    mockProduct = {
      cost: "20"
    }

    spyOn(productFactory, 'create').and.returnValue(mockProduct);
  });

  it('should be created', () => {
    expect(productTestingService).toBeTruthy();
  });

  describe('createDb', () => {

    let result;

    beforeEach(() => {
      result = productTestingService.createDb();
    });
    
    it('should return a object with an array of Products', () => {
      expect(result.products.length).toEqual(2);
    });

    it('should call productFactory.create twice', () => {
      expect(productFactory.create).toHaveBeenCalledTimes(2);
    });
  });
});
