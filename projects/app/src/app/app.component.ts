import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageViewDirection } from 'projects/page-view/src/lib/page-view.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ){}

  public pageViewDirection: PageViewDirection = PageViewDirection.horizontal;
  public mainPageIndex: number | null = null;

  ngOnInit() {
    this._route.fragment.subscribe(data => {
      if(this.mainPageIndex === null && data !== '') {
        this.mainPageIndex = Number(data) || 0;
      }
    });
  }

  onMainPageChanged(index: number) {
    this._router.navigate(['./'], {fragment: index.toString(), replaceUrl: true});
  }
}
