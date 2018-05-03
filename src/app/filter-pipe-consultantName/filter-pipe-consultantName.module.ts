import { NgModule } from '@angular/core';
import { FilterPipeConsultantNamePipe } from './filter-pipe-consultantName.pipe';

@NgModule({
  declarations: [FilterPipeConsultantNamePipe],
  exports: [FilterPipeConsultantNamePipe],
  providers: [FilterPipeConsultantNamePipe]
})

export class FilterPipeConsultantNameModule {}
