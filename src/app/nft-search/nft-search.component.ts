import { Component } from '@angular/core';
import { RouterService } from 'App/services/router.service';
import { Web3ProviderService, chainIdToName } from 'Lib/services/web3-provider.service';
import { shuffle } from 'Lib/utility';
import DEMO_NFT_LIST from 'Static/demo-nft.json';
import { filter } from 'rxjs/operators';

type TNftSeriesDemoData = {
  name: string;
  chainId: number;
  image: string;
  address: string;
};

@Component({
  selector: 'app-nft-search',
  templateUrl: './nft-search.component.html',
  styleUrls: ['./nft-search.component.sass'],
})
export class NftSearchComponent {
  contractAddress: string;
  errorCode = 0;
  demoNftList: TNftSeriesDemoData[];

  private NO_ERR = 0;
  private ERR_NOT_VALID_ADDRESS = 1;
  private ERR_NOT_VALID_CONTRACT_ADDRESS = 2;

  get isAddress(): boolean {
    return this.web3Service.isAddress(this.contractAddress);
  }

  get errorMessage(): string {
    const map = {
      [this.ERR_NOT_VALID_ADDRESS]: 'Not valid address.',
      [this.ERR_NOT_VALID_CONTRACT_ADDRESS]:
        'Not valid contract address, please check again of address or change network.',
    };
    return map[this.errorCode] ?? '';
  }

  constructor(private routerService: RouterService, private web3Service: Web3ProviderService) {}

  ngAfterContentInit(): void {
    this.demoNftList = shuffle(DEMO_NFT_LIST).slice(0, 5);
  }

  getChainName(chainId: number): string {
    return chainIdToName(chainId);
  }

  getBackgroundCssUrl(url: string): string {
    return `url('${url}')`;
  }

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

  onClickDemoNftSeriesCard(data: TNftSeriesDemoData): void {
    console.log(data);
    this.web3Service
      .switchChainIfNeed$(data.chainId)
      .pipe(filter((ret) => ret))
      .subscribe(() => this.routerService.navToNftSeries(data.address));
  }
}
