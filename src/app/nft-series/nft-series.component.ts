import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterService } from 'App/services/router.service';
import { ERC721 } from 'Lib/contracts/erc-721';
import { TTokenInfo } from 'Lib/contracts/type-define';
import { getContractClass } from 'Lib/contracts/utility';
import { Web3ProviderService } from 'Lib/services/web3-provider.service';
import { range } from 'Lib/utility';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nft-series',
  templateUrl: './nft-series.component.html',
  styleUrls: ['./nft-series.component.sass'],
})
export class NftSeriesComponent implements OnInit {
  @Input() contract: ERC721;
  tokenInfos: TTokenInfo[];

  totalSupply = 0;
  pageIndex = 0;
  pageSize = 12;
  pageSizeOptions = [12, 24, 36];

  private address: string | null;
  private pageChange$$ = new Subject<PageEvent>();
  private destroy$$ = new Subject<void>();
  private DEFAULT_PAGE = 1;

  get pageStartTokenId(): number {
    return 1 + this.pageIndex * this.pageSize;
  }

  get pageEndTokenId(): number {
    const tid = (this.pageIndex + 1) * this.pageSize;
    return tid > this.totalSupply ? this.totalSupply : tid;
  }

  get pageRangeTokenIds(): number[] {
    return range(this.pageStartTokenId, this.pageEndTokenId);
  }

  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
    private web3Service: Web3ProviderService,
  ) {}

  ngOnInit(): void {
    this.pageChange$$
      .pipe(
        takeUntil(this.destroy$$),
        debounceTime(200),
        switchMap((pageEvent) => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
          this.routerService.navToNftSeriesWithPageNum(this.address!, this.pageIndex + 1);
          return this.getTokenInfos$();
        }),
      )
      .subscribe();
  }

  ngAfterContentInit(): void {
    this.initParamFromRoute();

    if (!this.contract && !this.address) {
      throw 'Please provide contract or address for NFT series component';
    }
    if (!this.contract) {
      this.contract = this.web3Service.getContract(getContractClass(), this.address!) as ERC721;
    }

    this.contract
      .totalSupply$()
      .pipe(
        switchMap((totalSupply) => {
          this.totalSupply = totalSupply;
          return this.getTokenInfos$();
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
  }

  onChangePage(pageEvent: PageEvent): void {
    this.pageChange$$.next(pageEvent);
  }

  private initParamFromRoute(): void {
    const paramMap = this.route.snapshot.paramMap;
    this.address = paramMap.get('address');
    this.pageIndex = parseInt(paramMap.get('page') ?? this.DEFAULT_PAGE.toString()) - 1;
  }

  private getTokenInfos$(): Observable<void> {
    return this.contract.getTokenInfos$(this.pageRangeTokenIds).pipe(
      map((tokenInfos) => {
        this.tokenInfos = tokenInfos;
      }),
    );
  }
}
