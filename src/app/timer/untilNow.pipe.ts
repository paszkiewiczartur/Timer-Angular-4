import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'untilNow'
})
export class UntilNowPipe implements PipeTransform{
  transform(timestamp: any): any {
        let time = new Date();
        let result = "";
        let resultMinute = 0;
        if(time.getDate() - timestamp.day == 0){
            if(time.getMinutes()<timestamp.startMinute){
                result += (time.getHours() - timestamp.startHour - 1).toString();
                resultMinute = 60 + time.getMinutes() - timestamp.startMinute;
            } else {
                result += (time.getHours() - timestamp.startHour).toString();
                resultMinute = time.getMinutes() - timestamp.startMinute;
            }
                result += ":";
                if(resultMinute < 10){
                    result += "0";
                }
                result += resultMinute.toString();
        } else {
            result = "Forgotten event!"
        }
        return result;
    
  }

}