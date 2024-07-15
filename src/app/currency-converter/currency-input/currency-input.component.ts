import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { Currency } from '../model/currency';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { CurrencyData } from '../model/currencyData';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css'
})
export class CurrencyInputComponent implements OnInit, OnDestroy {
  availableCurrencies = Object.keys(Currency);

  @Input() currencyData$$!: Subject<CurrencyData>;
  @Input() currencyDataModified$$!: Subject<CurrencyData>;
  @Input() str!: string;
  
  currencyFormGroup!: FormGroup;
  private destroy$: Subject<boolean> = new Subject();

  ngOnInit(): void {
    this.currencyFormGroup = new FormGroup({
      currencyAmount: new FormControl(''),
      currency: new FormControl(this.availableCurrencies[0])
    });

    this.currencyFormGroup.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap(data => this.currencyData$$.next(data))
    ).subscribe(data => this.currencyDataModified$$.next(data));

    this.currencyData$$.subscribe(data => (
      this.currencyFormGroup.patchValue({
        currencyAmount: data.currencyAmount,
        currency: data.currency
      }, { emitEvent: false })
    ))
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
  }
}
