import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRegion'
})
export class FilterPipeRegionPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    const result = items.filter(item => ((item.translationRegion.toLowerCase().indexOf(filter.toLowerCase()) !== -1)));

    return result;
  }
}
