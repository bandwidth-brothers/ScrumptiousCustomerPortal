import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByRating'
})
export class SortByRatingPipe implements PipeTransform {

  transform(items: any[], asc: boolean): any {
    if (!items) {
      return items
    }

    if (asc) {
      return items.sort((fst, snd) => {
        return fst.rating - snd.rating
      })
    } else {
      return items.sort((fst, snd) => {
        return snd.rating - fst.rating
      })
    }
  }

}
