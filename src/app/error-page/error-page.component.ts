import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Web3ProviderService } from 'Lib/services/web3-provider.service';

export const ERR_CONTRACT_NOT_FOUND = '1';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.sass'],
})
export class ErrorPageComponent {
  errCode: string | null = null;
  chainName: string;

  constructor(private route: ActivatedRoute, private web3Service: Web3ProviderService) {}

  ngAfterContentInit(): void {
    this.errCode = this.route.snapshot.paramMap.get('errCode');
    this.web3Service.getChainName$().subscribe((name) => (this.chainName = name));
  }
}
