/*
This pipe is used with a textbox on the consultants listing page to filter by the consultant's region.
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLanguage'
})
export class FilterPipeLanguagePipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    const result = items.filter(item => ((item.language.toLowerCase().indexOf(filter.toLowerCase()) !== -1)));

    return result;
  }
}
