import { NgModule } from '@angular/core';
import { FilterPipeAssignedPipe } from './filter-pipe-assigned.pipe';

@NgModule({
  declarations: [FilterPipeAssignedPipe],
  exports: [FilterPipeAssignedPipe],
  providers: [FilterPipeAssignedPipe]
})

export class FilterPipeAssignedModule { }
