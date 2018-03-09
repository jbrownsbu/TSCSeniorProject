import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    const result = items.filter(item => ((item.firstName.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
                                                   (item.lastName.toLowerCase().indexOf(filter.toLowerCase()) !== -1)));

    return result;
  }
}

