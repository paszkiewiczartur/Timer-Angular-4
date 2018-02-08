import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'leadingZero'
})
export class LeadingZeroPipe implements PipeTransform{
  transform(value: any): any {
                if(value < 10){
                    return "0"+value.toString();
                } else {
                    return value;
                }
  }

}