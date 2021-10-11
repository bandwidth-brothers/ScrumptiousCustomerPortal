import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDistance'
})
export class SortByDistancePipe implements PipeTransform {

  transform(items: any[], asc: boolean): any {
    if (!items) {
      return items
    }

    if (asc) {
      return items.sort((fst, snd) => {
        return (fst.rating * fst.name.length) - (snd.rating * snd.name.length)
      })
    } else {
      return items.sort((fst, snd) => {
        return (snd.rating * snd.name.length) - (fst.rating * fst.name.length)
      })
    }
  }

}
