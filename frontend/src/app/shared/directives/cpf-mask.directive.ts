import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cpfMask]',
  standalone: true,
})
export class CpfMaskDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement;

    // só números (máx 11)
    let v = input.value.replace(/\D/g, '').slice(0, 11);

    // aplica máscara ###.###.###-##
    if (v.length > 9) v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/^(\d{3})(\d{0,3}).*/, '$1.$2');

    input.value = v;
  }
}
