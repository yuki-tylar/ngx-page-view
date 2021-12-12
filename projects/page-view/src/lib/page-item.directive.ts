import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ngxPageItem]',
  host: {
    '[style.display]': '"block"',
    '[style.flex]': '"0 0 100%"',
    '[style.width]': '"100%"',
    '[style.height]': '"100%"',
    '[style.overflow]': '"auto"',
    '[style.position]': '"relative"',
  },
})
export class PageItemDirective {
  constructor() { }



}
