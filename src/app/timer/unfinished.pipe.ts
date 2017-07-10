import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'unfinished'
})
export class UnfinishedPipe implements PipeTransform{
  transform(value: any): any {
    if(value.length === 0) {
        return value;
    }
    const resultArray = [];
    for(const item of value){
        if(!item.endHour || item.endHour == -1){
            resultArray.push(item);
        }
    }
    return resultArray;
  }

}