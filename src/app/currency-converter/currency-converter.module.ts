import { NgModule } from '@angular/core';
import { CurrencyConverterComponent } from './currency-converter.component';
import { SharedModule } from '../shared/shared.module';
import { CurrencyInputComponent } from './currency-input/currency-input.component';



@NgModule({
  declarations: [
    CurrencyConverterComponent,
    CurrencyInputComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CurrencyConverterComponent
  ]
})
export class CurrencyConverterModule { }
