import { Component } from '@angular/core';
import { RouterService } from 'App/services/router.service';
import { chainIdToName, Web3ProviderService } from 'Lib/services/web3-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'nft-viewer';
  chainName: string;

  constructor(private web3Service: Web3ProviderService, private routerService: RouterService) {}

  ngOnInit(): void {
    if (!this.web3Service.isBrowserSupportWeb3()) {
      this.routerService.navToErrorPage();
      return;
    }

    this.web3Service.getChainName$().subscribe((name) => (this.chainName = name));
    this.web3Service.chainChanged$().subscribe((chainId) => {
      this.chainName = chainIdToName(chainId);
    });
  }
}
