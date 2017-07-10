import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { TimestampsService } from '../timer/timestamps.service';
import { Timestamp } from '../timer/timestamp.model';

@Injectable()
export class DataStorageService{
    constructor(private http: Http, private timestampsService: TimestampsService){}
    
    storeTimestamps(){
        return this.http.put('https://timer-ced0b.firebaseio.com/data.json', this.timestampsService.getTimestamps());
    }
    
    getTimestamps(){
        this.http.get('https://timer-ced0b.firebaseio.com/data.json')
            .map(
                (response: Response) => {
                    const timestamps: Timestamp[] = response.json();
                    for(let timestamp of timestamps){
                        if(!timestamp['categories']){
                            timestamp['categories'] = [];
                        }
                    }
                    return timestamps;
                }
            )
            .subscribe(
            (timestamps: Timestamp[]) => {
                this.timestampsService.setTimestamps(timestamps);
            }
        );
    }
}