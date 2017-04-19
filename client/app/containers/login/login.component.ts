import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { MdlSnackbarService } from 'angular2-mdl';

import * as fromRoot from '../../reducers';
import * as user from '../../actions/user';

import { DiscogsUser, UserLogin } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user$: Observable<DiscogsUser>;
  loggedIn$: Observable<boolean>;

  login(data: UserLogin) {
    this.store.dispatch(new user.LoginAction(data));
  }

  private _showError(message: string) {
    this.mdlSnackbarService.showSnackbar({
      message: message,
      action: {
        handler: () => { },
        text: 'OK'
      }
    });
  }

  constructor(private router: Router, private store: Store<fromRoot.State>, private mdlSnackbarService: MdlSnackbarService) {
      this.user$ = store.select(fromRoot.getUser);
      this.loggedIn$ = store.select(fromRoot.getLoggedIn);

      this.loggedIn$
        .subscribe(loggedIn => {
          if (loggedIn) {
            this.router.navigate(['/wantlist']);
          }
        });

      store.select(fromRoot.getLoginFailed)
        .subscribe(error => {
          if (error) {
            this._showError(`Login failed for "${error.username}" - ${error.message}`);
            this.router.navigate(['/']);
          }
        });
    }
}
