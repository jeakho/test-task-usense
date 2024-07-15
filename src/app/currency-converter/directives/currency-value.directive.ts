import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyValue]',
  standalone: true,
})
export class CurrencyValueDirective {
  private validCharactersPattern: RegExp = new RegExp('^\\d*\\.?\\d{0,4}$');
  private specialKeys = ['End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {}


  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const input = this.el.nativeElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (this.specialKeys.indexOf(event.key) !== -1 || 
      start === input.value.length && end === input.value.length && event.key === 'Backspace'
    ) {
      return;
    }


    const current = input.value;
    const next = current.concat(event.key);
    if (start !== input.value.length || end !== input.value.length || !this.validCharactersPattern.test(next)) {
      event.preventDefault();
    }
  }
}
