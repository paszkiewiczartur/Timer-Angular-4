import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'pageCount'
})
export class PageCountPipe implements PipeTransform{
  transform(data: any, size: number): any {
            let result = [];
            for (let i = 0; i < Math.ceil(data.length / size) ; i++) {
                result.push(i);
            }
            return result;
  }

}