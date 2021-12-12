import { Component } from '@angular/core';
import { PageViewDirection } from 'projects/page-view/src/lib/page-view.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  public pageViewDirection: PageViewDirection = PageViewDirection.horizontal;
}
