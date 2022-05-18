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

  navToNftSeries(contractAddress: string): void {
    this.router.navigate(['/', 'contract', contractAddress]);
  }

  navToNftSeriesWithPageNum(contractAddress: string, page: number): void {
    this.router.navigate(['/', 'contract', contractAddress, 'page', page]);
  }

  navBackToNftSeries(contractAddress: string): void {
    if (this.previousUrl) {
      // /contract/0x0000...
      const regex = /^\/contract\/([A-Za-z0-9]+)$/;
      // /ocontract/0x0000.../page/2
      const regexWithPage = /^\/contract\/([A-Za-z0-9]+)\/page\/\d+$/;

      if (regex.test(this.previousUrl) || regexWithPage.test(this.previousUrl)) {
        this.router.navigateByUrl(this.previousUrl);
        return;
      }
    }

    this.router.navigate(['/', 'contract', contractAddress]);
  }

  navToErrorPage(errCode: string | null = null): void {
    if (errCode) {
      this.router.navigate(['/', 'error', errCode]);
    } else {
      this.router.navigate(['/', 'error']);
    }
  }
}
