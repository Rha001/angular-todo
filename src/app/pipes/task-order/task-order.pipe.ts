import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskOrder',
  pure: false
})
export class TaskOrderPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    array.sort((a, b) => a.status - b.status);

    return array;
  }

}
