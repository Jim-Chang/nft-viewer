import { environment } from './../../environments/environment';
import { KongLongNFT } from './../contract/kong-long-nft';
import { RouterService } from './../services/router.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TMetadata, TTokenInfo } from 'Lib/contracts/type-define';
import { TokenURIService } from 'Lib/services/token-uri.service';
import { Web3ProviderService } from 'Lib/services/web3-provider.service';
import { httplizeIpfsUri } from 'Lib/utility';
import { forkJoin, Subject, of } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-nft-entry',
  templateUrl: './nft-entry.component.html',
  styleUrls: ['./nft-entry.component.sass'],
})
export class NftEntryComponent {
  tokenInfo: TTokenInfo;
  metaData: TMetadata;
  basicInfos: { key: string; value: string | number }[];

  isLoadingMetaData = false;
  isShowNFTContent = true;

  private address: string;
  private tokenId: number;
  private contract: KongLongNFT;
  private NA = 'N/A';
  private destroy$$ = new Subject<void>();

  get imageURL(): string {
    return this.metaData?.image ? httplizeIpfsUri(this.metaData.image) : '';
  }

  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
    private web3Service: Web3ProviderService,
    private tokenURIService: TokenURIService,
  ) {}

  ngAfterContentInit(): void {
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
        this.loadNft();
      });

    this.web3Service
      .chainChanged$()
      .pipe(takeUntil(this.destroy$$))
      .subscribe((chainId) => {
        this.isShowNFTContent = chainId === environment.NFTchainId;
        if (chainId === environment.NFTchainId) {
          this.loadNft();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
  }

  onClickBackButton(): void {
    this.routerService.navBackToNftSeries();
  }

  onClickChangeToPolygon(): void {
    this.web3Service
      .switchChainIfNeed$(environment.NFTchainId)
      .pipe(filter((ret) => ret))
      .subscribe(() => {
        this.loadNft();
      });
  }

  private loadNft(): void {
    this.address = this.route.snapshot.paramMap.get('address')!;
    this.tokenId = parseInt(this.route.snapshot.paramMap.get('tokenId')!);

    this.contract = this.web3Service.getContract(KongLongNFT, this.address) as KongLongNFT;

    this.isLoadingMetaData = true;
    this.contract
      .getTokenInfo$(this.tokenId)
      .pipe(
        switchMap((tokenInfo) => {
          this.tokenInfo = tokenInfo;
          return this.tokenURIService.getMetaData$(this.tokenInfo.tokenURI);
        }),
        switchMap((metaData) => {
          this.metaData = metaData;
          this.isLoadingMetaData = false;
          return forkJoin([this.contract.name$(), this.contract.symbol$(), this.contract.totalSupply$()]);
        }),
      )
      .subscribe(([name, symbol, totalSupply]) => {
        this.basicInfos = [
          { key: 'Name', value: name },
          { key: 'Symbol', value: symbol },
          { key: 'Contract Address', value: this.tokenInfo.contractAddress },
          { key: 'Total Supply', value: totalSupply },
          { key: 'Owner By', value: this.tokenInfo.owner },
          { key: 'URI', value: this.tokenInfo.tokenURI },
          { key: 'Token Name', value: this.metaData.name ?? this.NA },
          { key: 'Token Description', value: this.metaData.description ?? this.NA },
          { key: 'External URL', value: this.metaData.external_url ?? this.NA },
          { key: 'Image URL', value: this.metaData.image ?? this.NA },
          { key: 'Animation URL', value: this.metaData.animation_url ?? this.NA },
          { key: 'Youtube URL', value: this.metaData.youtube_url ?? this.NA },
          { key: 'Background Color', value: this.metaData.background_color ?? this.NA },
        ];
      });
  }
}
