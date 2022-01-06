import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByPriceCategory'
})
export class FilterByPriceCategoryPipe implements PipeTransform {

  transform(items: any[], categories: string[]): any {
    if (!items || !categories) {
      return items
    }

    return items.filter(item => {
      return categories.includes(item.priceCategory)
    })
  }

}
