/*
This pipe is used with a checkbox on the projects listing page to filter by whether or not a project has had a consultant assigned to it.
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAssigned'
})
export class FilterPipeAssignedPipe implements PipeTransform {

  transform(items: any[], filter: boolean): any {
    if (!items || !filter) {
      return items;
    }

    const result = items.filter(item => (item.consultantId.indexOf('Unassigned') !== -1));

    return result;
  }
}
