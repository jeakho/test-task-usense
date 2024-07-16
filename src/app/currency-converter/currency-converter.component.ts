import { Component, OnDestroy, OnInit } from '@angular/core';
import { Currency } from './model/currency';
import { CurrencyService } from './service/currency.service';
import { ReplaySubject, Subject, takeUntil, withLatestFrom, take, distinctUntilChanged } from 'rxjs';
import { CurrencyData } from './model/currencyData';


@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  firstCurrencyData$$ = new ReplaySubject<CurrencyData>(1);
  secondCurrencyData$$ = new ReplaySubject<CurrencyData>(1);

  private availableCurrencies = Object.keys(Currency);
  private destroy$$ = new Subject<boolean>();

  constructor(private readonly currencyService: CurrencyService) {}


  initialize() {
    const firstCurrencyData = { currency: this.availableCurrencies[1], currencyAmount: '1' }

    this.currencyService.convert(+firstCurrencyData.currencyAmount, Currency[firstCurrencyData.currency], Currency[this.availableCurrencies[0]]).pipe(
      take(1)
    ).subscribe(secondCurrencyAmount => (
      this.firstCurrencyData$$.next(firstCurrencyData),
      this.secondCurrencyData$$.next({ currencyAmount: this.convertCurrencyAmountToString(secondCurrencyAmount), currency: this.availableCurrencies[0] })
    ));
  }


  ngOnInit(): void {
    this.firstCurrencyData$$.pipe(
      distinctUntilChanged((prev, cur) => prev.currency === cur.currency && prev.currencyAmount === cur.currencyAmount),
      withLatestFrom(this.secondCurrencyData$$),
      takeUntil(this.destroy$$)
    ).subscribe(([firstCurrencyData, secondCurrencyData]) => (
      this.updateCurrencyData(firstCurrencyData, secondCurrencyData, this.secondCurrencyData$$) 
    ));

    this.secondCurrencyData$$.pipe(
      distinctUntilChanged((prev, cur) => prev.currency === cur.currency && prev.currencyAmount === cur.currencyAmount),
      withLatestFrom(this.firstCurrencyData$$),
      takeUntil(this.destroy$$)
    ).subscribe(([secondCurrencyData, firstCurrencyData]) => (
      this.updateCurrencyData(secondCurrencyData, firstCurrencyData, this.firstCurrencyData$$)
    ))

    this.initialize();
  }

  private updateCurrencyData (currencyDataFrom: CurrencyData, currencyDataTo: CurrencyData, currencyDataSubject: Subject<CurrencyData>) {
    const { currency: fromCurrency, currencyAmount: fromCurrencyAmount } = currencyDataFrom;
    const { currency: toCurrency } = currencyDataTo;

    if (!fromCurrencyAmount || fromCurrencyAmount === '.') {
      currencyDataSubject.next({ currencyAmount: '', currency: toCurrency });
      return;
    }

    this.currencyService.convert(+fromCurrencyAmount, Currency[fromCurrency], Currency[toCurrency]).pipe(
      take(1)
    ).subscribe(toCurrencyAmount => (
      currencyDataSubject.next({ currency: toCurrency, currencyAmount: this.convertCurrencyAmountToString(toCurrencyAmount) })
    ))
  }

  private convertCurrencyAmountToString(currencyAmountNumber: number): string {
    return String(parseFloat(currencyAmountNumber.toFixed(4)));
  }


  ngOnDestroy(): void {
    this.destroy$$.next(true);
    this.destroy$$.complete();

    this.firstCurrencyData$$.complete();
    this.secondCurrencyData$$.complete();
  }
}
