import { NgModule } from '@angular/core';
import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { HeaderComponent } from './header/header.component';
import { CurrencyService } from './service/currency.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyValueDirective } from './directives/currency-value.directive';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  providers: [CurrencyService],
  declarations: [
    CurrencyConverterComponent,
    CurrencyInputComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    CurrencyValueDirective,

    // material begin
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
    // material end
  ],
  exports: [
    CurrencyConverterComponent
  ]
})
export class CurrencyConverterModule { }
