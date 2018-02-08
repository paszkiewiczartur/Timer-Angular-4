import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import * as fromTimer from '../store/timer.reducers';

@Injectable()

export class EditGuard implements CanActivate{
    constructor(private store: Store<fromTimer.FeatureState>, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.store.select('timer')
            .take(1)
            .map((timerState: fromTimer.State) => {
                let edit: boolean = timerState.editedTimestamp != null;
                if(edit){
                    return true;
                } else {
                    this.router.navigate(['/timer/all']);
                    return false;
                }
            });
    }
}