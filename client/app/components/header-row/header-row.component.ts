import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-row',
  templateUrl: './header-row.component.html'
})
export class HeaderRowComponent {
  goBack() {
    this.location.back();
  }

  goForth() {
    this.location.forward();
  }

  constructor(private location: Location) { }
}
