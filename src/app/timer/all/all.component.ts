import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { TimestampsService } from '../timestamps.service';
import { Timestamp } from '../timestamp.model';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
    timestamps: Timestamp[];
    subscription: Subscription;
    pageSize: number = 3;
    selectedPage: number = 1;
    
  constructor(private timestampsService: TimestampsService, private router: Router) { }

  ngOnInit() {
    this.timestampsService.sortTimestamps();
    this.subscription = this.timestampsService.timestampsChanged.subscribe(
        (timestamps: Timestamp[]) => {
            this.timestamps = timestamps;
        }
    );
    this.timestamps = this.timestampsService.getTimestamps();
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
        result = "Not finished";
    }   
    return result;
 }
 
 refreshTimestamps(){
    this.timestamps = this.timestampsService.getTimestamps();
 }
 
 onEdit(index: number){
    this.timestampsService.edited = index;
    this.router.navigate(['/timer/edit']);
 }
 
}
