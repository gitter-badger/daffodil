import { TestBed, inject } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { hot, cold } from 'jasmine-marbles';

import { ProductListEffects } from './product-list.effects';

import { ProductTestingModule } from '../testing/product-testing.module';
import { ProductService } from '../services/product.service';
import { ProductFactory } from '../testing/factories/product.factory';
import { Product } from '../model/product';
import { ProductListLoad, ProductListLoadSuccess, ProductListLoadFailure } from '../actions/product-list.actions';

import { DaffodilConfigService } from '../../config/daffodil-config.service';
import { DaffodilConfigFactory } from '../../config/testing/daffodil-config.factory';

describe('ProductListEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductListEffects;
  let productService: ProductService;
  let productFactory: ProductFactory;
  let mockProductList: Product[];
  let daffodilConfigService: DaffodilConfigService;
  let daffodilConfigFactory: DaffodilConfigFactory;

  beforeEach(() => {
    daffodilConfigFactory = new DaffodilConfigFactory();
    daffodilConfigService = new DaffodilConfigService(daffodilConfigFactory.create());

    TestBed.configureTestingModule({
      imports: [
        ProductTestingModule
      ],
      providers: [
        ProductListEffects,
        provideMockActions(() => actions$),
        {provide: DaffodilConfigService, useValue: daffodilConfigService}
      ]
    });

    effects = TestBed.get(ProductListEffects);
    productService = TestBed.get(ProductService);
    productFactory = TestBed.get(ProductFactory);

    mockProductList = new Array(productFactory.create());
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('when ProductListLoadAction is triggered', () => {

    let expected;
    const productListLoadAction = new ProductListLoad();
    
    describe('and the call to ProductService is successful', () => {

      beforeEach(() => {
        spyOn(productService, 'getAll').and.returnValue(of(mockProductList));
        const productListLoadSuccessAction = new ProductListLoadSuccess(mockProductList);
        actions$ = hot('--a', { a: productListLoadAction });
        expected = cold('--b', { b: productListLoadSuccessAction });
      });
      
      it('should dispatch a ProductListLoadSuccess action', () => {
        expect(effects.loadAll$).toBeObservable(expected);
      });
    });

    describe('and the call to ProductService fails', () => {
      
      beforeEach(() => {
        let error = 'Failed to load product list';
        let response = cold('#', {}, error);
        spyOn(productService, 'getAll').and.returnValue(response);
        const productListLoadFailureAction = new ProductListLoadFailure(error);
        actions$ = hot('--a', { a: productListLoadAction });
        expected = cold('--b', { b: productListLoadFailureAction });
      });
      
      it('should dispatch a ProductListLoadFailure action', () => {
        expect(effects.loadAll$).toBeObservable(expected);
      });
    });
  });
});
