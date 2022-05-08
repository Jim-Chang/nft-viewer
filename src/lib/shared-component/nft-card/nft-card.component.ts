import { Component, Input, OnInit } from '@angular/core';
import { TMetadata, TTokenInfo } from 'Lib/contracts/type-define';
import { TokenURIService } from 'Lib/services/token-uri.service';
import { httplizeIpfsUri } from 'Lib/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.sass'],
})
export class NftCardComponent implements OnInit {
  @Input() tokenInfo: TTokenInfo;
  metaData: TMetadata;

  constructor(private tokenURIService: TokenURIService) {}

  ngOnInit(): void {
    this.tokenURIService.getMetaData$(this.tokenInfo.tokenURI).subscribe((metaData) => (this.metaData = metaData));
  }

  get imageURL(): string {
    return this.metaData?.image ? httplizeIpfsUri(this.metaData.image) : '';
  }
}
