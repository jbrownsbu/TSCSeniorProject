import { NgModule } from '@angular/core';
import { FilterPipeProjectNamePipe } from './filter-pipe-projectName.pipe';

@NgModule({
  declarations: [FilterPipeProjectNamePipe],
  exports: [FilterPipeProjectNamePipe],
  providers: [FilterPipeProjectNamePipe]
})

export class FilterPipeProjectNameModule {}
