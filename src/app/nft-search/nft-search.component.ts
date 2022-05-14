import { Component } from '@angular/core';
import { RouterService } from 'App/services/router.service';
import { Web3ProviderService } from 'Lib/services/web3-provider.service';

@Component({
  selector: 'app-nft-search',
  templateUrl: './nft-search.component.html',
  styleUrls: ['./nft-search.component.sass'],
})
export class NftSearchComponent {
  contractAddress: string;
  errorCode = 0;

  private NO_ERR = 0;
  private ERR_NOT_VALID_ADDRESS = 1;
  private ERR_NOT_VALID_CONTRACT_ADDRESS = 2;

  get errorMessage(): string {
    const map = {
      [this.ERR_NOT_VALID_ADDRESS]: 'Not valid address.',
      [this.ERR_NOT_VALID_CONTRACT_ADDRESS]:
        'Not valid contract address, please check again of address or change network.',
    };
    return map[this.errorCode] ?? '';
  }

  constructor(private routerService: RouterService, private web3Service: Web3ProviderService) {}

  onClickViewBtn(): void {
    this.errorCode = this.NO_ERR;

    if (!this.web3Service.isAddress(this.contractAddress)) {
      this.errorCode = this.ERR_NOT_VALID_ADDRESS;
      return;
    }

    this.web3Service.isContractAddress$(this.contractAddress).subscribe((ret) => {
      if (!ret) {
        this.errorCode = this.ERR_NOT_VALID_CONTRACT_ADDRESS;
        return;
      }
      this.routerService.navToNftSeries(this.contractAddress);
    });
  }

  get isAddress(): boolean {
    return this.web3Service.isAddress(this.contractAddress);
  }
}
