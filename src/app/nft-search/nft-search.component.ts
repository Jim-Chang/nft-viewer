import { Component, OnInit } from '@angular/core';
import { RouterService } from 'App/services/router.service';
import { Web3ProviderService } from 'Lib/services/web3-provider.service';
import { timingSafeEqual } from 'crypto';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nft-search',
  templateUrl: './nft-search.component.html',
  styleUrls: ['./nft-search.component.sass'],
})
export class NftSearchComponent {
  contractAddress: string;
  isShowError = false;

  constructor(private routerService: RouterService, private web3Service: Web3ProviderService) {}

  onClickViewBtn(): void {
    this.isShowError = false;

    if (!this.web3Service.isAddress(this.contractAddress)) {
      console.log('Not valid address');
      this.isShowError = true;
      return;
    }

    this.web3Service.isContractAddress$(this.contractAddress).subscribe((ret) => {
      if (!ret) {
        console.log('Not contract address');
        this.isShowError = true;
        return;
      }
      this.routerService.navToNftSeries(this.contractAddress);
    });
  }

  get isAddress(): boolean {
    return this.web3Service.isAddress(this.contractAddress);
  }
}
