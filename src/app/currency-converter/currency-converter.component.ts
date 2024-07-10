import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/currency';
import { CurrencyService } from '../currency.service';


function convertCurrencyValueToString(value: number) {
  return String(parseFloat(value.toFixed(4)));
}


@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent implements OnInit {
  availableCurrencies = Object.keys(Currency);

  currency1: string = this.availableCurrencies[1];
  currencyValue1: string = '1';
  currency2: string = this.availableCurrencies[0];
  currencyValue2!: string;

  constructor(private readonly currencyService: CurrencyService) {}

  async handleFirstCurrencyValueChange(newValue: string) {
    this.currencyValue1 = newValue;
    if (!newValue || newValue === '.') {
      this.currencyValue2 = '';
      return;
    }

    this.currencyValue2 = convertCurrencyValueToString(await this.currencyService.convert(+newValue, Currency[this.currency1], Currency[this.currency2]));
  }

  async handleFirstCurrencyChange(newValue: string) {
    this.currency1 = newValue;
    this.currencyValue2 = convertCurrencyValueToString(await this.currencyService.convert(+this.currencyValue1, Currency[newValue], Currency[this.currency2]));
  }

  async handleSecondCurrencyValueChange(newValue: string) {
    this.currencyValue2 = newValue;
    if (!newValue || newValue === '.') {
      this.currencyValue1 = '';
      return;
    }

    this.currencyValue1 = convertCurrencyValueToString(await this.currencyService.convert(+newValue, Currency[this.currency2], Currency[this.currency1]));
  }

  async handleSecondCurrencyChange(newValue: string) {
    this.currency2 = newValue;
    this.currencyValue1 = convertCurrencyValueToString(await this.currencyService.convert(+this.currencyValue2, Currency[newValue], Currency[this.currency1]));
  }

  ngOnInit(): void {
    this.handleFirstCurrencyValueChange('1');
  }
}
