import { NgModule } from '@angular/core';
import { FilterPipeRegionPipe } from './filter-pipe-region.pipe';

@NgModule({
  declarations: [FilterPipeRegionPipe],
  exports: [FilterPipeRegionPipe],
  providers: [FilterPipeRegionPipe]
})

export class FilterPipeRegionModule { }
