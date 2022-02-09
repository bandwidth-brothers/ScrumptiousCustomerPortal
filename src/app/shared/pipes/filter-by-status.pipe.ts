import { Pipe, PipeTransform } from '@angular/core';
import { Order } from 'src/app/core/entities/order';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(items: Order[], status: string[]): any {
    if (!items || !status) {
      return items
    }

    return items.filter(item => {
      return status.indexOf(item.preparationStatus) > -1 ? true : false
    })
  }

}
