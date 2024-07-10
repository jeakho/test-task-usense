import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Currency } from '../shared/currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dollarRate!: number;
  euroRate!: number;

  constructor(private readonly currencyService: CurrencyService) {
    this.setRates();
  }

  async setRates() {
    this.dollarRate = await this.currencyService.getExchangeRate(Currency.USD, Currency.UAH);
    this.euroRate = await this.currencyService.getExchangeRate(Currency.EUR, Currency.UAH);
  }
}
