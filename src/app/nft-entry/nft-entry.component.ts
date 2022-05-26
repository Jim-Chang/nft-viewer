import { RouterService } from './../services/router.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { httplizeIpfsUri } from 'Lib/utility';
import { ERC721 } from 'projects/lib-web3/src/lib/contracts/erc-721';
import { TMetadata, TTokenInfo } from 'projects/lib-web3/src/lib/contracts/type-define';
import { getContractClass } from 'projects/lib-web3/src/lib/contracts/utility';
import { TokenURIService } from 'projects/lib-web3/src/lib/services/token-uri.service';
import { Web3ProviderService } from 'projects/lib-web3/src/lib/services/web3-provider.service';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil, catchError } from 'rxjs/operators';
import { ERR_CONTRACT_NOT_FOUND } from 'src/app/error-page/error-page.component';

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

  private address: string;
  private tokenId: number;
  private contract: ERC721;
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

  ngOnInit(): void {
    this.routerService.urlChange$.pipe(takeUntil(this.destroy$$)).subscribe(() => {
      this.loadNft();
    });
  }

  ngAfterContentInit(): void {
    this.loadNft();
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
  }

  onClickBackButton(): void {
    this.routerService.navBackToNftSeries(this.address);
  }

  private loadNft(): void {
    this.address = this.route.snapshot.paramMap.get('address')!;
    this.tokenId = parseInt(this.route.snapshot.paramMap.get('tokenId')!);

    this.contract = this.web3Service.getContract(getContractClass(), this.address) as ERC721;

    this.isLoadingMetaData = true;
    this.contract
      .getTokenInfo$(this.tokenId)
      .pipe(
        catchError((err) => {
          this.routerService.navToErrorPage(ERR_CONTRACT_NOT_FOUND);
          throw err;
        }),
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
          { key: 'Image URL', value: (this.metaData.image || this.metaData.imageUrl) ?? this.NA },
          { key: 'Animation URL', value: this.metaData.animation_url ?? this.NA },
          { key: 'Youtube URL', value: this.metaData.youtube_url ?? this.NA },
          { key: 'Background Color', value: this.metaData.background_color ?? this.NA },
        ];
      });
  }
}
