import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ERC721 } from 'Lib/contracts/erc-721';
import { TMetadata, TTokenInfo } from 'Lib/contracts/type-define';
import { getContractClass } from 'Lib/contracts/utility';
import { TokenURIService } from 'Lib/services/token-uri.service';
import { Web3ProviderService } from 'Lib/services/web3-provider.service';
import { httplizeIpfsUri } from 'Lib/utility';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nft-entry',
  templateUrl: './nft-entry.component.html',
  styleUrls: ['./nft-entry.component.sass'],
})
export class NftEntryComponent {
  private address: string;
  private tokenId: number;
  private contract: ERC721;
  tokenInfo: TTokenInfo;
  metaData: TMetadata;

  displayedColumns: string[] = ['trait_type', 'value'];

  constructor(
    private route: ActivatedRoute,
    private web3Service: Web3ProviderService,
    private tokenURIService: TokenURIService,
  ) {
    this.address = this.route.snapshot.paramMap.get('address')!;
    this.tokenId = parseInt(this.route.snapshot.paramMap.get('tokenId')!);

    this.contract = this.web3Service.getContract(getContractClass(), this.address) as ERC721;

    this.contract
      .getTokenInfo$(this.tokenId)
      .pipe(
        switchMap((tokenInfo) => {
          this.tokenInfo = tokenInfo;
          return this.tokenURIService.getMetaData$(this.tokenInfo.tokenURI);
        }),
      )
      .subscribe((metaData) => (this.metaData = metaData));
  }

  get imageURL(): string {
    return this.metaData?.image ? httplizeIpfsUri(this.metaData.image) : '';
  }

  get contractURL(): string {
    return `/contract/${this.address}`;
  }
}
