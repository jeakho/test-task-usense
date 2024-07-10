import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from '../../shared/currency';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css'
})
export class CurrencyInputComponent {
  currencies = Object.keys(Currency);
  @Input('initialCurrency') currentCurrency!: string;
  @Input('initialValue') currentValue!: string;

  @Output('onCurrencyChange') currencyChangeEventEmitter = new EventEmitter<string>();
  @Output('onValueChange') valueChangeEventEmitter = new EventEmitter<string>();
  

  handleValueChange(newValue: string) {
    this.valueChangeEventEmitter.emit(newValue);
  }

  handleCurrencyChange(newCurrency: string) {
    this.currencyChangeEventEmitter.emit(newCurrency);
  }
}
