import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'range'
})
export class RangePipe implements PipeTransform{
  transform(data: any, page: number, size: number): any {
            let result = [];
            let start_index = (page - 1) * size;
            if (data.length < start_index) {
                return result;
            } else {
                for(let i=start_index; i<start_index + size && i< data.length; i++){
                    result.push(data[i]);
                }
                return result;
            }
  }

}