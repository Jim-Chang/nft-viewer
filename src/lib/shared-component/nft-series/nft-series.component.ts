import { Component, OnInit, Input } from '@angular/core';
import { ERC721 } from 'Lib/contracts/erc-721';
import { TTokenInfo } from 'Lib/contracts/type-define';

@Component({
  selector: 'nft-series',
  templateUrl: './nft-series.component.html',
  styleUrls: ['./nft-series.component.sass'],
})
export class NftSeriesComponent implements OnInit {
  @Input() contract: ERC721;
  tokenInfos: TTokenInfo[];

  constructor() {}

  ngOnInit(): void {
    this.contract.getTokenInfos$().subscribe((tokenInfos) => {
      console.log('token info list', tokenInfos);
      this.tokenInfos = tokenInfos;
    });
  }
}
