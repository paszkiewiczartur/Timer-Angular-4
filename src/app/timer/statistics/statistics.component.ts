import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take'; 

import { Timestamp } from '../timestamp.model';
import * as fromTimer from '../store/timer.reducers';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    category: string = 'all';
    name: string = 'all';
    totalTime: string;
    totalNumberOfEvents: number;
    activeData;
    toggle = {};
    timestamps: Array<Timestamp>;
    timerState: Observable<fromTimer.State>;

  constructor(private store: Store<fromTimer.FeatureState>) { }

  ngOnInit() {
    this.timerState = this.store.select('timer');
    this.store.select('timer').take(1).subscribe(
        (timerState: fromTimer.State) => {
            this.timestamps = timerState.timestamps;
        }
    );
    this.getActiveTimestamps('name','all');
    this.addToToggle();
  }

    toggleItem(yearName: string, monthName: string, dayName: string){
        if(dayName == null && monthName == null){
            this.toggle[yearName].name = ! this.toggle[yearName].name;
        } else if ( dayName == null){
            this.toggle[yearName].months[monthName].name = !this.toggle[yearName].months[monthName].name;
        } else {
            this.toggle[yearName].months[monthName].days[dayName].name = !this.toggle[yearName].months[monthName].days[dayName].name;
        }
    }

    addToToggle(){
        for(let year of this.activeData){
            let yearItem = {
                'name': false,
                'months': {}
            }
            for(let month of year.months){
                let monthItem = {
                    'name': false,
                    'days': []
                }
                for(let day of month.days){
                    let dayItem = {
                        'name': false,
                    }
                    monthItem.days[day.name] = dayItem;
                }
                yearItem.months[month.name] = monthItem;
            }
            this.toggle[year.name] = yearItem; 
        }
    }

    getNameOfTimestamps(){
        let result: Array<string> = [];
        let keys = {};
        let value: string;
        for(let item of this.timestamps){
            if(item['name'] == ''){
                value = 'Inne';
            } else {
                value = item['name'];
            }
            if(keys[value] == null){
                keys[value] = true;
                result.push(value);
            }
        }
        return result;
    }
    
    getCategoryOfTimestamps(){
        let result: Array<string> = [];
        let keys = {};
        let value: string;
        for(let item of this.timestamps){
            if(item['categories'].length == 0){
                value = 'Inne';
                if(keys[value] == null){
                    keys[value] = true;
                    result.push(value);
                }
            } else {
                for(let i of item['categories']){
                    if(keys[i] == null){
                        keys[i] = true;
                        result.push(i);
                    }                       
                }
            }
        }
        return result;
    }
    
    selectName(name: string = 'all'){
        if(name == 'all'){
            this.name = 'all';
        } else {
            this.name = name;
        }
        this.getActiveTimestamps('name', this.name);
        this.addToToggle();
    }
    
    selectCategory(category: string = 'all'){
        if(category == 'all'){
            this.category = 'all';
        } else {
            this.category = category;
        }
        this.getActiveTimestamps('categories', this.category);
        this.addToToggle();
    }
    
    isActiveName(name: string){
        if(this.name == name){
            return true;
        } else {
            return false;
        }
    }
    
    isActiveCategory(category: string){
        if(this.category == category){
            return true;
        } else {
            return false;
        }
    }
    
    getActiveTimestamps(property: string, categoryOrName: string){
        let data: Array<Timestamp> = this.getTimestampsBy(property, categoryOrName);
        let result = [];
        let resultPeriod: number = 0;
        let resultPeriodString: string = '';
        let resultAmount: number = 0;
        for(let i=0; i<data.length; i++){
            if(!this.find(result, data[i]["year"])){
                let year = {};
                year['name'] = data[i]["year"];
                year['months'] = [];
                year['yearSummary'] = {};
                year['yearSummary']['period'] = 0;
                year['yearSummary']['periodString'] = "";
                year['yearSummary']['amount'] = 0;
                result.push(year);
            }
        }

        for(let i=0; i<data.length; i++){
            for(let j=0; j<result.length; j++){
                if(result[j].name == data[i]["year"]){
                    if(!this.find(result[j].months, data[i]["month"])){
                        let month = {};
                        month['name'] = data[i]["month"];
                        month['days'] = [];
                        month['monthSummary'] = {};
                        month['monthSummary']['period'] = 0;
                        month['monthSummary']['periodString'] = "";
                        month['monthSummary']['amount'] = 0;
                        result[j].months.push(month);
                    }
                }
            }
        }
        for(let i=0; i<data.length; i++){
            for(let j=0; j<result.length; j++){
                for(let k=0; k<result[j].months.length; k++){
                    if(result[j].name == data[i]["year"] && result[j].months[k].name == data[i]["month"]){
                        if(!this.find(result[j].months[k].days, data[i]["day"])){
                            let day = {};
                            day['name'] = data[i]["day"];
                            day['daySummary'] = {};
                            day['daySummary']['period'] = 0;
                            day['daySummary']['periodString'] = "";
                            day['daySummary']['amount'] = 0;
                            day['events'] = [];
                            result[j].months[k].days.push(day);
                        }
                    }
                }
            }
        }
        for(let i=0; i<data.length; i++){
            for(let j=0; j<result.length; j++){
                for(let k=0; k<result[j].months.length; k++){
                    for(let m=0; m<result[j].months[k].days.length; m++){
                        if(result[j].name == data[i]["year"] && 
                        result[j].months[k].name == data[i]["month"] &&
                        result[j].months[k].days[m].name == data[i]["day"]){    
                            let event = {
                                'period': this.countPeriod(data[i]),
                                'periodString': '',
                                'name': data[i].name,
                                'categories': data[i].categories,
                                'description': data[i].description
                            };
                            event['periodString'] = this.periodString(event.period);
                            result[j].months[k].days[m].events.push(event);
                        }
                    }
                }
            }
        }
        for(let j=0; j<result.length; j++){
            for(let k=0; k<result[j].months.length; k++){
                for(let m=0; m<result[j].months[k].days.length; m++){
                    for(let p=0; p<result[j].months[k].days[m].events.length; p++){
                        result[j].months[k].days[m].daySummary.period += result[j].months[k].days[m].events[p].period;
                        result[j].months[k].days[m].daySummary.amount++;
                    }
                    result[j].months[k].days[m].daySummary.periodString = this.periodString(result[j].months[k].days[m].daySummary.period);
                    result[j].months[k].monthSummary.period += result[j].months[k].days[m].daySummary.period;
                    result[j].months[k].monthSummary.amount += result[j].months[k].days[m].daySummary.amount;
                }
                result[j].months[k].monthSummary.periodString =  this.periodString(result[j].months[k].monthSummary.period);
                result[j].yearSummary.period += result[j].months[k].monthSummary.period;
                result[j].yearSummary.amount += result[j].months[k].monthSummary.amount;
            }
            result[j].yearSummary.periodString = this.periodString(result[j].yearSummary.period);
            resultPeriod += result[j].yearSummary.period;
            resultAmount += result[j].yearSummary.amount;
        }
        resultPeriodString = this.periodString(resultPeriod); 
        this.totalTime = resultPeriodString
        this.activeData = result;
        this.totalNumberOfEvents = resultAmount;
    }
    
    getTimestampsBy(property: string, categoryOrName: string): Array<Timestamp>{ 
        if(categoryOrName == 'all'){
            return this.timestamps;
        } else{
            let result: Array<Timestamp> = [];
            for(let item of this.timestamps){
                if(property == 'name'){
                    if(item[property] == categoryOrName){
                        result.push(item);
                    }            
                } else {
                    if(item.categories.length == 0 && categoryOrName == 'Inne'){
                        result.push(item);
                    }
                    for(let category of item.categories){
                        if(category == categoryOrName){
                            result.push(item);
                        }
                    }
                }
            }
            return result; 
        }
    }
    
    periodString(data: number){
        let result: string = "";
        let hour: number = Math.floor(data/60);
        let minute: number = data - 60*hour;
        result += hour.toString();
        result += ":";
        if(minute < 10){
            result += "0";
        }
        result += minute.toString();
        return result;
    }
    
    countPeriod(data: Timestamp){
        let result: number = 0;
        let hour: number = 0;
        let minute: number = 0;
        if(data.endHour != -1){
            if(data.endMinute < data.startMinute){
                hour = data.endHour-data.startHour-1;
                minute = 60 + data.endMinute - data.startMinute;
            } else {
                hour = data.endHour-data.startHour;
                minute = data.endMinute-data.startMinute;
            }
            result = hour * 60 + minute;
            return result;
        } else {
            return 0;
        }
    }
    
    find(data, index: number): boolean{
        let found = false;
        for(let item of data){
            if(item.name == index){
                found = true; 
                break;
            }
        }
        return found;
    }
}
