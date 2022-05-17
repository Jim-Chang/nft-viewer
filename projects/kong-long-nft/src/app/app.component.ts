import { RouterService } from './services/router.service';
import { Component } from '@angular/core';
import { Web3ProviderService } from 'Lib/services/web3-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'kong-long-nft';

  constructor(private web3Service: Web3ProviderService, private routerService: RouterService) {}

  ngOnInit(): void {
    if (!this.web3Service.isBrowserSupportWeb3()) {
      this.routerService.navToErrorPage();
      return;
    }
  }
}
