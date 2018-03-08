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

// import { OrderModule } from 'ngx-order-pipe';

const appRoutes: Routes = [
  {
  path: 'consultants',
  component: ConsultantComponent,
  data: { title: 'Consultant List' }
  },
  { path: '',
    redirectTo: '/consultants',
    pathMatch: 'full'
  },
  {
    path: 'consultant-details/:id',
    component: ConsultantDetailComponent,
    data: { title: 'Consultant Details'}
  },
  {
    path: 'consultant-edit/:id',
    component: ConsultantEditComponent,
    data: { title: 'Edit Book' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ConsultantComponent,
    ConsultantDetailComponent,
    ConsultantEditComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
