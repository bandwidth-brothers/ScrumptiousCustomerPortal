import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByRating'
})
export class FilterByRatingPipe implements PipeTransform {

  transform(items: any[], higherThan: string): any {
    if (!items) {
      return items
    }

    return items.filter(item => {
      return item.rating >= parseInt(higherThan.slice(0, 1), 10)
    })
  }

}
