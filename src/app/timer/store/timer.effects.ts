import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as TimerActions from '../store/timer.actions';
import { Timestamp } from '../timestamp.model';
import * as fromTimer from '../store/timer.reducers';

@Injectable()
export class TimerEffects {
  @Effect()
  timestampsFetch = this.actions$
    .ofType(TimerActions.FETCH_TIMESTAMPS)
    .switchMap((action: TimerActions.FetchTimestamps) => {
      return this.httpClient.get<Timestamp[]>('https://timer-ced0b.firebaseio.com/data.json', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map(
      (timestamps) => {
        for (let timestamp of timestamps) {
          if (!timestamp['categories']) {
            timestamp['categories'] = [];
          }
        }
        return {
          type: TimerActions.SET_TIMESTAMPS,
          payload: timestamps
        };
      }
    );

  @Effect({dispatch: false})
  timestampsStore = this.actions$
    .ofType(TimerActions.STORE_TIMESTAMPS)
    .withLatestFrom(this.store.select('timer'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://timer-ced0b.firebaseio.com/data.json', state.timestamps, {reportProgress: true});
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromTimer.FeatureState>) {}
}
