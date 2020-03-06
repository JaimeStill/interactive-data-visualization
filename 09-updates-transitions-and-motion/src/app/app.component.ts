import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs';
import { ThemeService } from './services';
import { Theme } from './models';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private themeSub: Subscription;

  themeClass = 'default';

  constructor(
    public theme: ThemeService
  ) { }

  ngOnInit() {
    this.themeSub = this.theme.theme$.subscribe((t: Theme) => this.themeClass = t.name);
  }

  ngOnDestroy() {
    this.themeSub && this.themeSub.unsubscribe();
  }
}
