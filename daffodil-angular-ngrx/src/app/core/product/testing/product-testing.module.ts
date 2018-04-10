import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductTestingService } from '@core/product/testing/services/product.testing.service';
import { ProductFactory } from '@core/product/testing/factories/product.factory';
import { ProductService } from '@core/product/services/product.service';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forFeature(ProductTestingService, {
      delay: 500
    }),
  ],
  providers: [
    ProductFactory,
    ProductService
  ]
})
export class ProductTestingModule { }
