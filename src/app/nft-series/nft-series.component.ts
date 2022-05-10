import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ERC721 } from 'Lib/contracts/erc-721';
import { TTokenInfo } from 'Lib/contracts/type-define';
import { getContractClass } from 'Lib/contracts/utility';
import { Web3ProviderService } from 'Lib/services/web3-provider.service';
import { range } from 'Lib/utility';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'nft-series',
  templateUrl: './nft-series.component.html',
  styleUrls: ['./nft-series.component.sass'],
})
export class NftSeriesComponent implements OnInit {
  @Input() contract: ERC721;
  tokenInfos: TTokenInfo[];

  totalSupply = 0;
  pageIndex = 0;
  pageSize = 12;
  pageSizeOptions = [12, 24, 36];

  private address: string | null;
  private pageChange$$ = new Subject<void>();

  get pageStartTokenId(): number {
    return 1 + this.pageIndex * this.pageSize;
  }

  get pageEndTokenId(): number {
    const tid = (this.pageIndex + 1) * this.pageSize;
    return tid > this.totalSupply ? this.totalSupply : tid;
  }

  get pageRangeTokenIds(): number[] {
    return range(this.pageStartTokenId, this.pageEndTokenId);
  }

  constructor(private route: ActivatedRoute, private web3Service: Web3ProviderService) {}

  ngOnInit(): void {
    this.address = this.route.snapshot.paramMap.get('address');

    if (!this.contract && !this.address) {
      throw 'Please provide contract or address for NFT series component';
    }
    if (!this.contract) {
      this.contract = this.web3Service.getContract(getContractClass(), this.address!) as ERC721;
    }

    this.contract
      .totalSupply$()
      .pipe(
        map((totalSupply) => {
          this.totalSupply = totalSupply;
          this.pageChange$$.next();
        }),
      )
      .subscribe();

    this.pageChange$$
      .pipe(
        switchMap(() => {
          return this.contract.getTokenInfos$(this.pageRangeTokenIds);
        }),
      )
      .subscribe((tokenInfos) => {
        this.tokenInfos = tokenInfos;
      });
  }

  onChangePage(pageEvent: PageEvent): void {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.pageChange$$.next();
  }

  private getTokenInfos$(tokenIdList: number[]): Observable<void> {
    return this.contract.getTokenInfos$(this.pageRangeTokenIds).pipe(
      map((tokenInfos) => {
        this.tokenInfos = tokenInfos;
      }),
    );
  }
}
