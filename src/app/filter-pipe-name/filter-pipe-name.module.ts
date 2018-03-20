import { NgModule } from '@angular/core';
import { FilterPipeNamePipe } from './filter-pipe-name.pipe';

@NgModule({
  declarations: [FilterPipeNamePipe],
  exports: [FilterPipeNamePipe],
  providers: [FilterPipeNamePipe]
})

export class FilterPipeNameModule {}
