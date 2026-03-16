import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement;

    // só números (DDD + número) até 11 dígitos
    let v = input.value.replace(/\D/g, '').slice(0, 11);

    // formata: (##) ####-#### ou (##) #####-####
    if (v.length <= 10) {
      // fixo: 10 dígitos
      v = v.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_, ddd, p1, p2) => {
        let out = '';
        if (ddd) out += `(${ddd}`;
        if (ddd.length === 2) out += ') ';
        if (p1) out += p1;
        if (p2) out += `-${p2}`;
        return out;
      });
    } else {
      // celular: 11 dígitos
      v = v.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (_, ddd, p1, p2) => {
        let out = '';
        if (ddd) out += `(${ddd}`;
        if (ddd.length === 2) out += ') ';
        if (p1) out += p1;
        if (p2) out += `-${p2}`;
        return out;
      });
    }

    input.value = v;
  }
}
