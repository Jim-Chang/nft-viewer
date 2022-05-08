import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ERC721 } from 'Lib/contracts/erc-721';
import { TTokenInfo } from 'Lib/contracts/type-define';
import { getContractClass } from 'Lib/contracts/utility';
import { Web3ProviderService } from 'Lib/services/web3-provider.service';

@Component({
  selector: 'nft-series',
  templateUrl: './nft-series.component.html',
  styleUrls: ['./nft-series.component.sass'],
})
export class NftSeriesComponent implements OnInit {
  @Input() contract: ERC721;
  private address: string | null;
  tokenInfos: TTokenInfo[];

  constructor(private route: ActivatedRoute, private web3Service: Web3ProviderService) {}

  ngOnInit(): void {
    this.address = this.route.snapshot.paramMap.get('address');

    if (!this.contract && !this.address) {
      throw 'Please provide contract or address for NFT series component';
    }
    if (!this.contract) {
      this.contract = this.web3Service.getContract(getContractClass(), this.address!) as ERC721;
    }

    this.contract.getTokenInfos$().subscribe((tokenInfos) => {
      this.tokenInfos = tokenInfos;
    });
  }
}
