import { Timestamp } from './timestamp.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TimestampsService{
    timestampsChanged = new Subject<Timestamp[]>();
    edited: number = null;
    private timestamps: Timestamp[] = [
        new Timestamp('JavaStart', 'Super kurs!',[
            'Spring', 'Java'
        ], 12, 12, 13, 14, 3, 7, 2015),
        new Timestamp('JavaStart', 'Super kurs!',[
            'Spring', 'Java'
        ], 15, 12, 17, 10, 4, 7, 2016),
        new Timestamp('Timer', 'aplikacja',[
            'Angular2'
        ], 10, 12, 11, 14, 5, 7, 2016),
        new Timestamp('Timer', 'aplikacja!',[
            'Angular2'
        ], 12, 12, 13, 14, 5, 6, 2017),
        new Timestamp('JavaStart', 'Super kurs!',[
            'JEE', 'Java'
        ], 14, 12, -1, -1, 5, 7, 2017),
        new Timestamp('Timer', 'aplikacja',[
            'Angular2'
        ], 12, 12, -1, -1, 5, 7, 2017),
        new Timestamp('Kalistenika', 'ćwiczenia',[
        ], 16, 11, 17, 1, 6, 7, 2017),
    ];
    
    constructor(){}
    
    sortTimestamps(){
        for (let i = 0; i < this.timestamps.length; i++) {
            for (let j = 0; j < this.timestamps.length - 1; j++) {
                if (
                    this.timestamps[j].year < this.timestamps[j + 1].year
                    || (this.timestamps[j].year === this.timestamps[j+1].year 
                            && this.timestamps[j].month < this.timestamps[j+1].month) 
                    || (this.timestamps[j].year === this.timestamps[j+1].year 
                            && this.timestamps[j].month === this.timestamps[j+1].month 
                            && this.timestamps[j].day < this.timestamps[j+1].day)
                    || (this.timestamps[j].year === this.timestamps[j+1].year 
                            && this.timestamps[j].month === this.timestamps[j+1].month 
                            && this.timestamps[j].day === this.timestamps[j+1].day
                            && this.timestamps[j].startHour < this.timestamps[j+1].startHour)
                    || (this.timestamps[j].year === this.timestamps[j+1].year 
                            && this.timestamps[j].month === this.timestamps[j+1].month 
                            && this.timestamps[j].day === this.timestamps[j+1].day
                            && this.timestamps[j].startHour === this.timestamps[j+1].startHour
                            && this.timestamps[j].startMinute < this.timestamps[j+1].startMinute)
                    ) {
                    let temp;
                    temp = this.timestamps[j + 1];
                    this.timestamps[j + 1] = this.timestamps[j];
                    this.timestamps[j] = temp;
                }
            }
        }
    }
    
    setTimestamps(timestamps: Timestamp[]){
        this.timestamps = timestamps;
        this.sortTimestamps();
        this.timestampsChanged.next(this.timestamps.slice());
    }
    
    getTimestamps(){
        this.sortTimestamps
        return this.timestamps.slice();
    }
    
    getTimestamp(index: number){
        return this.timestamps[index];
    }
    
    getUnfinishedTimestamp(name: string){ // not used yet
        let i: number = null;
        for(i=0; i<this.timestamps.length; i++){
            if(this.timestamps[i].name == name && (!this.timestamps[i].endHour || this.timestamps[i].endHour == -1 )){
                break;
            }
        }
        return i;
    }
    
    addTimestamp(name: string, description: string, categories: string[]){
        let date = new Date();
        let startHour = date.getHours();
        let startMinute = date.getMinutes();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let endHour = -1;
        let endMinute = -1;
        
        let timestamp = new Timestamp(name, description, categories, startHour, startMinute, endHour, endMinute, day, month, year);
        this.timestamps.push(timestamp);
        this.sortTimestamps();
        this.timestampsChanged.next(this.timestamps.slice());
    }
    
    updateTimestamp(index: number, newTimestamp: Timestamp){
        this.timestamps[index] = newTimestamp;
        this.sortTimestamps();
        this.timestampsChanged.next(this.timestamps.slice());
    }
    
    finishTimestamp(name: string){
        let date = new Date();
        let endHour = date.getHours();
        let endMinute = date.getMinutes();
        for(let t of this.timestamps){
            if(t.name == name && (!t.endHour || t.endHour == -1 )){
                t.endHour = endHour;
                t.endMinute = endMinute;
            }
        }
        this.sortTimestamps();
        this.timestampsChanged.next(this.timestamps.slice());
    }
    
    deleteTimestamp(index: number){
        this.timestamps.splice(index, 1);
        this.sortTimestamps();
        this.timestampsChanged.next(this.timestamps.slice());
    }
}