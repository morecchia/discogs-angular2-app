import { Directive, ElementRef, HostListener, Input, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';

class Scheduler {
    sH: number;
    sT: number;
    cH: number;
}

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  private scrollEvent$ = Observable.fromEvent(this.elRef.nativeElement, 'scroll');

  @Input()
  data: Observable<any>;

  // @HostBinding() get scrollElem() {
  //   return this.elRef;
  // }

  // @HostListener('scroll', ['$event'])
  // onScroll($event: any) {
  //   console.log('scrolled');
  // }

  /**
    check if the user is scrolling down by
    previous scroll position and current scroll position
  **/
  private isUserScrollingDown(positions) {
    return positions[0].sT < positions[1].sT;
  }

  /** Check if the scroll position at required
      percentage relative to the container
  **/
  private isScrollExpectedPercent(position, percent) {
    return ((position.sT + position.cH) / position.sH) > (percent / 100);
  }

  private userScrolledDown$() {
    return this.scrollEvent$
      .map((e: Event) => ({
        sH: e.srcElement.scrollHeight,
        sT: e.srcElement.scrollTop,
        cH: e.srcElement.clientHeight
      }))
      .pairwise()
      .filter(positions =>
        this.isScrollExpectedPercent(positions[1], 70)
      );
  }

  constructor(private elRef: ElementRef) {
    this.userScrolledDown$()
      .startWith(new Array<Scheduler>())
      .exhaustMap(() => this.data)
      .subscribe(data => {
        console.log(data.json());
      });
  }
}
