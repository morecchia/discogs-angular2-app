import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

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

  login(login: UserLogin) {
    if (!login.username) {
      this.store.dispatch(new user.LoginFailedAction('You must enter a username'));
      return;
    }

    this.store.dispatch(new user.LoginAction(login));
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

  constructor(private store: Store<fromRoot.State>, private mdlSnackbarService: MdlSnackbarService) {
      this.user$ = store.select(fromRoot.getUser);

      store.select(fromRoot.getLoginFailed)
        .subscribe(error => {
          if (error) {
            this._showError(error);
          }
        });
    }
}
