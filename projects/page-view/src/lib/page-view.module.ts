import { NgModule } from '@angular/core';
import { PageViewDirective } from './page-view.directive';
import { PageItemDirective } from './page-item.directive';



@NgModule({
  declarations: [
    PageViewDirective,
    PageItemDirective
  ],
  imports: [
  ],
  exports: [
    PageViewDirective,
    PageItemDirective,
  ]
})
export class PageViewModule { }
