import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageViewModule } from 'projects/page-view/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PageViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
