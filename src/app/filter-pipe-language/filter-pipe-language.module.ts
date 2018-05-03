import { NgModule } from '@angular/core';
import { FilterPipeLanguagePipe } from './filter-pipe-language.pipe';

@NgModule({
  declarations: [FilterPipeLanguagePipe],
  exports: [FilterPipeLanguagePipe],
  providers: [FilterPipeLanguagePipe]
})

export class FilterPipeLanguageModule { }
