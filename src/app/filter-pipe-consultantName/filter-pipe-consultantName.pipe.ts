/*
This pipe is used with a textbox on the consultants listing page to filter by the consultant's first and last name.
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterConsultantName'
})
export class FilterPipeConsultantNamePipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    const result = items.filter(item => ((item.firstName.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
                                                  (item.lastName.toLowerCase().indexOf(filter.toLowerCase()) !== -1)));

    return result;
  }
}
