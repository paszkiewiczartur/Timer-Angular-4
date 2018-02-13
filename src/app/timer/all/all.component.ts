import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Timestamp } from '../timestamp.model';
import * as fromTimer from '../store/timer.reducers';
import * as TimerActions from '../store/timer.actions';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
    timerState: Observable<fromTimer.State>;
    pageSize: number = 3;
    selectedPage: number = 1;
    @ViewChild('notFinished') notFinishedTranslation : ElementRef;
 
  constructor(private store: Store<fromTimer.FeatureState>, private router: Router) { }

  ngOnInit() {
    this.timerState = this.store.select('timer');
  }
 
  selectPage(newPage: number){
    this.selectedPage = newPage;
  }
 
 countPeriod(timestamp: Timestamp){
    let result = "";
    let resultMinute = 0;
    if(timestamp.endHour != -1){
        if(timestamp.endMinute < timestamp.startMinute){
            result += (timestamp.endHour-timestamp.startHour-1).toString();
            result += ":";
            resultMinute = 60 + timestamp.endMinute - timestamp.startMinute;
        } else {
            result += (timestamp.endHour-timestamp.startHour).toString();
            result += ":";
            resultMinute = timestamp.endMinute-timestamp.startMinute;
        }
        if(resultMinute < 10){
            result += "0";
        }
        result += resultMinute.toString();
    } else {
        result = this.notFinishedTranslation.nativeElement.textContent;
    }   
    return result;
 }
 
 onEdit(timestamp: Timestamp){
    this.store.dispatch(new TimerActions.StartEdit(timestamp));
    this.router.navigate(['/timer/edit']);
 }
 
}
