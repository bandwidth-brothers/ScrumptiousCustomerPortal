import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByPrice'
})
export class SortByPricePipe implements PipeTransform {

  transform(items: any[], asc: boolean): any {
    if (!items) {
      return items
    }

    if (asc) {
      return items.sort((fst, snd) => {
        return fst.priceCategory.length - snd.priceCategory.length
      })
    } else {
      return items.sort((fst, snd) => {
        return snd.priceCategory.length - fst.priceCategory.length
      })
    }

  }

}
