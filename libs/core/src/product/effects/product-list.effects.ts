import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ProductService } from '../services/product.service';
import { 
  ProductListActionTypes, 
  ProductListLoad, 
  ProductListLoadSuccess, 
  ProductListLoadFailure } from '../actions/product-list.actions';
import { Observable } from 'rxjs/Observable';
import { Action } from 'rxjs/scheduler/Action';

@Injectable()
export class ProductListEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService) {}

  @Effect()
  loadAll$ : Observable<any> = this.actions$.pipe(
    ofType(ProductListActionTypes.ProductListLoadAction),
    switchMap((action: ProductListLoad) =>
      this.productService.getAll()
        .pipe(
          map((resp) => {
            return new ProductListLoadSuccess(resp);
          }),
          catchError(error => {
            return of(new ProductListLoadFailure("Failed to load product list"));
          })
        )
    )
  )
}
