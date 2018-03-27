import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrderModule } from './order-pipe/ngx-order.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { ConsultantComponent } from './consultant/consultant.component';
import { ConsultantDetailComponent } from './consultant-detail/consultant-detail.component';
import { ConsultantEditComponent } from './consultant-edit/consultant-edit.component';
import { FilterPipeNameModule } from './filter-pipe-name/filter-pipe-name.module';
import { FilterPipeRegionModule} from './filter-pipe-region/filter-pipe-region.module';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AssignmentEditComponent } from './assignment-edit/assignment-edit.component';
import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/consultants',
    pathMatch: 'full'
  },
  {
  path: 'consultants',
  component: ConsultantComponent,
  data: { title: 'Consultant List' }
  },
  {
    path: 'consultant-details/:id',
    component: ConsultantDetailComponent,
    data: { title: 'Consultant Details'}
  },
  {
    path: 'consultant-edit/:id',
    component: ConsultantEditComponent,
    data: { title: 'Edit Consultant' }
  },
  {
    path: 'assignment/consultant/:consultantId',
    component: AssignmentComponent,
    data: { title: 'Assignment List'}
  },
  {
    path: 'assignment-details/:id',
    component: AssignmentDetailComponent,
    data: { title: 'Assignment Detail'}
  },
  {
    path: 'assignment-edit/:id',
    component: AssignmentEditComponent,
    data: {title: 'Edit Assignment'}
  },
  {
    path: 'projects',
    component: ProjectComponent,
    data: { title: 'Project List' }
  },
  {
    path: 'project-edit/:id',
    component: ProjectEditComponent,
    data: {title: 'Edit Project'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ConsultantComponent,
    ConsultantDetailComponent,
    ConsultantEditComponent,
    AssignmentComponent,
    AssignmentDetailComponent,
    AssignmentEditComponent,
    ProjectComponent,
    ProjectEditComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    HttpClientModule,
    FormsModule,
    FilterPipeNameModule,
    FilterPipeRegionModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
