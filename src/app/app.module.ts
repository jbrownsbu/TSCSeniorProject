import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrderModule } from './order-pipe/ngx-order.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { ConsultantComponent } from './consultant/consultant.component';
import { ConsultantEditComponent } from './consultant-edit/consultant-edit.component';
import { FilterPipeNameModule } from './filter-pipe-name/filter-pipe-name.module';
import { FilterPipeRegionModule} from './filter-pipe-region/filter-pipe-region.module';
import { FilterPipeAssignedModule } from './filter-pipe-assigned/filter-pipe-assigned.module';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentEditComponent } from './assignment-edit/assignment-edit.component';
import { AssignmentCreateComponent } from './assignment-create/assignment-create.component';
import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { AssignConsultantComponent } from './assign-consultant/assign-consultant.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'consultants',
    component: ConsultantComponent,
    data: { title: 'Consultant List' }
  },
  {
    path: 'consultant-edit/:id',
    component: ConsultantEditComponent,
    data: { title: 'Edit Consultant' }
  },
  {
    path: 'assignments',
    component: AssignmentComponent,
    data: { title: 'Assignment List' }
  },
  {
    path: 'assignment/consultant/:consultantId',
    component: AssignmentComponent,
    data: { title: 'Assignment List'}
  },
  {
    path: 'assignment/project/:projectId',
    component: AssignmentComponent,
    data: { title: 'Assignment List'}
  },
  {
    path: 'assignment-edit/:id',
    component: AssignmentEditComponent,
    data: {title: 'Edit Assignment'}
  },
  {
    path: 'assignment-create/project/:projectId',
    component: AssignmentCreateComponent,
    data: {title: 'Create Assignment'}
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
  },
  {
    path: 'assign-consultant/:assignmentId',
    component: AssignConsultantComponent,
    data: {title: 'Assign Consultant'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ConsultantComponent,
    ConsultantEditComponent,
    AssignmentComponent,
    AssignmentEditComponent,
    AssignmentCreateComponent,
    ProjectComponent,
    ProjectEditComponent,
    AssignConsultantComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    HttpClientModule,
    FormsModule,
    FilterPipeNameModule,
    FilterPipeRegionModule,
    FilterPipeAssignedModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
