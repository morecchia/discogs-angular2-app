import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';

import { UserLogin } from '../../models';

@Component({
  selector: 'app-discogs-login',
  templateUrl: 'discogs-login.component.html'
})
export class DiscogsLoginComponent {
  username: string;
  rememberMe: boolean;

  @Input()
  loggedIn: boolean;

  @Output()
  onSubmit = new EventEmitter<UserLogin>();

  submit() {
    this.onSubmit.emit({username: this.username, rememberMe: this.rememberMe});
  }
}
