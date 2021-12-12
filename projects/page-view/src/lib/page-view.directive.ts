import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngxPageView]',
  host: {
    '[style.display]': '"flex"',
    '[style.width]': '"100%"',
    '[style.height]': '"100%"',
    '[style.overflow]': '"auto"',
    '[style.position]': '"relative"',
  },
})
export class PageViewDirective {

  @Input() ngxPageView: any;
  @Input() direction: PageViewDirection = PageViewDirection.vertical;
  @Input() threshold: number = 0.3;
  @Input() current: number = 0;

  @Output() onPageChanged = new EventEmitter<number>();

  get el(): HTMLElement { return this._el.nativeElement; }
  get vertical(): boolean { return this.direction == PageViewDirection.vertical; }
  get elLength(): number { return this.vertical ? this.el.clientHeight : this.el.clientWidth; }
  get movementRatio(): number { return Math.abs(this.movement / this.elLength); }
  get movementDirection(): 1 | -1 {return this.movement > 0 ? 1 : -1; }
  
  @HostBinding('style.flex-direction') get styleFlexDirection() { return this.vertical ? 'column' : 'row'; }
  @HostBinding('style.user-select') get styleUserSelect() { return (this.animated || this.scrolledByPointer) ? 'none' : 'auto'; }

  private movement: number = 0;
  private initialScrollPosition: number = 0;

  private touched: boolean = false;
  private scrolledByPointer = false;
  private animated: boolean = false;

  private _timerAutoScroll: any;

  constructor(
    private _el: ElementRef,
  ) {}

  public animateTo(index: number = 0, duration: number = 200) {
    if(this.el) {
      let time = 0;

      const destination = index * this.elLength;
      const currentScroll = this.vertical ? this.el.scrollTop : this.el.scrollLeft;

      this.animated = true;
      while(time < duration) {
        const scrollTo = currentScroll + Math.sin(time / duration * Math.PI / 2) * (destination - currentScroll);
        setTimeout((this.vertical? _scrollVerticalTo : _scrollHorizontalTo), time, this.el, scrollTo);
        time ++;
      }
      setTimeout(() => { this.animated = false; }, time);
    }
  }

  public jumpTo(index: number = 0) {
    if(this.el) {
      const scrollTo = index * this.elLength;
      if(this.vertical) { _scrollVerticalTo(this.el, scrollTo); }
      else { _scrollHorizontalTo(this.el, scrollTo); }
    }
  }

  @HostListener('scroll') scroll() {
    if(!this.animated && !this.touched) {
      clearTimeout(this._timerAutoScroll);
      
      this._timerAutoScroll = setTimeout(() => {
        const currentScrollPosition = this.vertical ? this.el.scrollTop : this.el.scrollLeft;
        let next = Math.round(currentScrollPosition / this.elLength);
        next = next <= 0 ? 0 : next >= this.el.children.length - 1 ? this.el.children.length - 1 : next;
        this.animateTo(next, 300);
        this.current = next;
        this.onPageChanged.emit(this.current);
      }, 400);
    }
  }

  @HostListener('touchstart') touchstart() {
    this.onTouchstart();
  }


  @HostListener('mousedown') mousedown() {
    this.onTouchstart();
  }

  @HostListener('window:touchmove', ['$event']) touchmove(e: TouchEvent) {
    if(this.touched && !this.animated) {
      this.scrolledByPointer = true;
    }

    if(this.animated) {
      e.preventDefault();
    }
  }

  @HostListener('window:mousemove', ['$event']) mousemove(e: MouseEvent) {
    if(this.touched && !this.animated) {
      this.scrolledByPointer = true;
      this.el.scrollBy({top: this.vertical ? -e.movementY : 0, left: this.vertical ? 0 : -e.movementX});
    }
  }

  @HostListener('window:touchend') touchend() {
    this.onTouchend();
  }

  @HostListener('window:mouseup') mouseup() {
    this.onTouchend();
  }

  ngAfterViewInit() {
    this.jumpTo(this.current);
  }

  private onTouchstart() {
    this.touched = true;
    this.movement = 0;
    this.initialScrollPosition = this.vertical ? this.el.scrollTop : this.el.scrollLeft;
  }

  private onTouchend() {
    if(this.touched) {
      this.scrolledByPointer = false;
      this.touched = false;

      const currentScrollPosition = this.vertical ? this.el.scrollTop : this.el.scrollLeft;
      this.movement = currentScrollPosition - this.initialScrollPosition;  

      if(this.movement != 0) {
        let next = this.current + (Math.floor(this.movementRatio) + (this.movementRatio % 1 >= this.threshold ? 1 : 0)) * this.movementDirection;
        next = next <= 0 ? 0 : next >= this.el.children.length - 1 ? this.el.children.length - 1 : next;
        this.animateTo(next, next != this.current ? 300 : 100);
        this.current = next;
        this.onPageChanged.emit(this.current);  
      }
    }
  }
}

export enum PageViewDirection {
  horizontal,
  vertical
}

function _scrollVerticalTo(el: HTMLElement, to: number) {
  el.scrollTop = to;
}

function _scrollHorizontalTo(el: HTMLElement, to: number) {
  el.scrollLeft = to;
}
