import { environment } from '../../environments/environment';
import { RouterService } from '../services/router.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { range } from 'Lib/utility';
import { KongLongNFT } from 'projects/kong-long-nft/src/app/contract/kong-long-nft';
import { TTokenInfo } from 'projects/lib-web3/src/lib/contracts/type-define';
import { Web3ProviderService } from 'projects/lib-web3/src/lib/services/web3-provider.service';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'nft-series',
  templateUrl: './nft-series.component.html',
  styleUrls: ['./nft-series.component.sass'],
})
export class NftSeriesComponent implements OnInit {
  contract: KongLongNFT;
  tokenInfos: TTokenInfo[];

  totalSupply = 0;
  pageIndex = 0;
  pageSize = 12;
  pageSizeOptions = [12, 24, 36];

  isLoadingTokenInfos = false;
  isShowNFTContent = true;

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
          this.routerService.navToNftSeriesWithPageNum(this.pageIndex + 1);
          return this.getTokenInfos$();
        }),
      )
      .subscribe();
  }

  ngAfterContentInit(): void {
    this.initParamFromRoute();

    this.web3Service
      .getChainId$()
      .pipe(
        switchMap((chainId) => {
          if (chainId === environment.NFTchainId) {
            return of(true);
          }
          this.isShowNFTContent = false;
          return this.web3Service.switchChainIfNeed$(environment.NFTchainId);
        }),
        filter((ret) => ret),
      )
      .subscribe(() => {
        this.initContract();
      });

    this.web3Service
      .chainChanged$()
      .pipe(takeUntil(this.destroy$$))
      .subscribe((chainId) => {
        this.isShowNFTContent = chainId === environment.NFTchainId;
        if (chainId === environment.NFTchainId) {
          this.initContract();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
  }

  onChangePage(pageEvent: PageEvent): void {
    this.pageChange$$.next(pageEvent);
  }

  onClickChangeToPolygon(): void {
    this.web3Service
      .switchChainIfNeed$(environment.NFTchainId)
      .pipe(filter((ret) => ret))
      .subscribe(() => {
        this.initContract();
      });
  }

  private initParamFromRoute(): void {
    const paramMap = this.route.snapshot.paramMap;
    this.pageIndex = parseInt(paramMap.get('page') ?? this.DEFAULT_PAGE.toString()) - 1;
  }

  private initContract(): void {
    this.isShowNFTContent = true;
    this.contract = this.web3Service.getContract(KongLongNFT, environment.kongLongNFTAddress) as KongLongNFT;

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

  private getTokenInfos$(): Observable<void> {
    this.isLoadingTokenInfos = true;
    return this.contract.getTokenInfos$(this.pageRangeTokenIds).pipe(
      map((tokenInfos) => {
        this.tokenInfos = tokenInfos;
        this.isLoadingTokenInfos = false;
      }),
    );
  }
}
