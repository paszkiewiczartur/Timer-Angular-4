import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as TimerActions from '../../timer/store/timer.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
     this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new TimerActions.StoreTimestamps());
  }

  onFetchData() {
    this.store.dispatch(new TimerActions.FetchTimestamps());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}

