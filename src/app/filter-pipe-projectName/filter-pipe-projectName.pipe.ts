/*
This pipe is used with a textbox on the consultants listing page to filter by the consultant's first and last name.
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProjectName'
})
export class FilterPipeProjectNamePipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    const result = items.filter(item => (item.projectName.toLowerCase().indexOf(filter.toLowerCase()) !== -1));

    return result;
  }
}
