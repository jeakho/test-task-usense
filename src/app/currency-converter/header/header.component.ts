import { Component } from '@angular/core';
import { CurrencyService } from '../service/currency.service';
import { Currency } from '../model/currency';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dollarRate$!: Observable<number>;
  euroRate$!: Observable<number>;

  constructor(private readonly currencyService: CurrencyService) {
    this.setRates();
  }

  async setRates() {
    this.dollarRate$ = this.currencyService.getExchangeRate(Currency.USD, Currency.UAH);
    this.euroRate$ = this.currencyService.getExchangeRate(Currency.EUR, Currency.UAH);
  }
}
