import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../model/currency';
import { BehaviorSubject, map, tap, filter, firstValueFrom, Observable, of } from 'rxjs';
import { pick } from 'lodash';

@Injectable()
export class CurrencyService {
  private availableCurrencies = Object.keys(Currency);

  private exchangeRates$ = new BehaviorSubject<number[][] | null>(null);

  constructor(private readonly httpClient: HttpClient) {
    this.initializeExchangeRates();
  }

  private initializeExchangeRates() {
    const exchangeRates = Array(this.availableCurrencies.length).fill(0).map(() => Array(this.availableCurrencies.length).fill(0));

    // this.httpClient.get('https://openexchangeRates.org/api/latest.json?app_id=c07f564e415b41bf962f1d2ce1edf71a').pipe(
    of({ rates: { 'UAH': 41.02, 'EUR': 0.92, 'USD': 1 } }).pipe(
      map(({ rates }: any) => pick(rates, Object.keys(Currency))),
      tap((rates: { [key: string]: number }) => Object.keys(Currency).forEach(baseCurrency => (
        Object.keys(rates).forEach(targetCurrency => (
          exchangeRates[Currency[baseCurrency]][Currency[targetCurrency]] = rates[targetCurrency] / rates[baseCurrency]
        ))
      )))
    ).subscribe(() => {
      this.exchangeRates$.next(exchangeRates);
    });
  }

  getExchangeRate(base: number, target: number): Observable<number> {
    return this.exchangeRates$.pipe(
      filter(val => !!val),
      map(rates => (rates as number[][])[base][target]),
    );
  }

  convert(fromValue: number, fromCurrency: number, toCurrency: number): Observable<number> {
    return this.exchangeRates$.pipe(
      filter(val => !!val),
      map(exchangeRates => (
        fromValue * (exchangeRates as number[][])[fromCurrency][toCurrency]
      ))
    )
  }
}