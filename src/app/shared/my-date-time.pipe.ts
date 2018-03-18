import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDateTime'
})
export class MyDateTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
