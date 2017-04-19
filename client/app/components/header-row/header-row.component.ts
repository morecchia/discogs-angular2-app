import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as userActions from '../../actions/user';

import { DiscogsUser } from '../../models';

@Component({
  selector: 'app-header-row',
  templateUrl: './header-row.component.html'
})
export class HeaderRowComponent {
  @Input()
  user: DiscogsUser;

  @Output()
  onSearch = new EventEmitter<string>();

  goBack() {
    this.location.back();
  }

  goForth() {
    this.location.forward();
  }

  search(term: string) {
    this.onSearch.emit(term);
  }

  logout() {
    this.store.dispatch(new userActions.LogoutAction());
    this.router.navigate(['/login']);
  }

  constructor(private store: Store<fromRoot.State>, private location: Location, private router: Router) { }
}
