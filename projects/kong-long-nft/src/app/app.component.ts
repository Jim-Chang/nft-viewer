import { RouterService } from './services/router.service';
import { Component } from '@angular/core';
import { Web3ProviderService } from 'projects/lib-web3/src/lib/services/web3-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'kong-long-nft';
}
