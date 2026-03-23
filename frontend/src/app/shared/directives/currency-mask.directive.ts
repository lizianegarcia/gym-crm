import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[currencyMask]',
  standalone: true,
})
export class CurrencyMaskDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput() {

    const input = this.el.nativeElement;

    // remove tudo que não é número
    let value = input.value.replace(/\D/g, '');

    // evita vazio
    if (!value) {
      input.value = '';
      return;
    }

    // transforma em centavos
    const numberValue = Number(value) / 100;

    // formata para BRL
    input.value = numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

  }

}
