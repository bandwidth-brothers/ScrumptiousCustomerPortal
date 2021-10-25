import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  public transform(item: string): any {
    if (!item) {
      return 0;
    }
    return parseInt(item.slice(0, 1), 10)
  }
}
