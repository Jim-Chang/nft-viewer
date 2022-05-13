import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof NavigationEnd),
        pairwise(),
      )
      .subscribe(([preEvt, curEvt]: NavigationEnd[]) => {
        this.previousUrl = preEvt.url;
        this.currentUrl = curEvt.urlAfterRedirects;
        console.log('route previous url', preEvt.urlAfterRedirects);
        console.log('route current url', curEvt.urlAfterRedirects);
      });
  }

  navToNftSeriesWithPageNum(contractAddress: string, page: number): void {
    this.router.navigate(['/', 'contract', contractAddress, 'page', page]);
  }

  navToNftSeries(contractAddress: string): void {
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
}
