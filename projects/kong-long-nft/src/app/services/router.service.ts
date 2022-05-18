import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

export type UrlEvent = {
  previousUrl: string;
  currentUrl: string;
};

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private previousUrl: string;
  private currentUrl: string;
  private urlChange$$ = new Subject<UrlEvent>();

  get urlChange$(): Observable<UrlEvent> {
    return this.urlChange$$.asObservable();
  }

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof NavigationEnd),
        pairwise(),
      )
      .subscribe(([preEvt, curEvt]: NavigationEnd[]) => {
        this.previousUrl = preEvt.url;
        this.currentUrl = curEvt.url;
        this.urlChange$$.next({ previousUrl: this.previousUrl, currentUrl: this.currentUrl });
      });
  }

  navToNftSeries(): void {
    this.router.navigate(['/']);
  }

  navToNftSeriesWithPageNum(page: number): void {
    this.router.navigate(['/', 'page', page]);
  }

  navBackToNftSeries(): void {
    if (this.previousUrl) {
      // /page/2
      const regex = /^\/page\/\d+$/;

      if (regex.test(this.previousUrl)) {
        this.router.navigateByUrl(this.previousUrl);
        return;
      }
    }

    this.router.navigate(['/']);
  }

  navToErrorPage(): void {
    this.router.navigate(['/', 'error']);
  }
}
