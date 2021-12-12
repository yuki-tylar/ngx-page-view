import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { PageViewModule } from 'projects/page-view/src/public-api';

import { AppComponent } from './app.component';

const routes: Routes = [
  {component: AppComponent, path: ''},
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PageViewModule,
    RouterModule.forRoot(routes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
