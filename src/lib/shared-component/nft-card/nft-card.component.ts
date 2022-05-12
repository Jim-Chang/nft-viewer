import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TMetadata, TTokenInfo } from 'Lib/contracts/type-define';
import { TokenURIService } from 'Lib/services/token-uri.service';
import { httplizeIpfsUri } from 'Lib/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.sass'],
})
export class NftCardComponent {
  @Input() tokenInfo: TTokenInfo;
  @Input() disableClick = false;
  @Input() isPlaceholder = false;
  metaData: TMetadata;
  isImageLoaded = false;

  constructor(private router: Router, private tokenURIService: TokenURIService) {}

  get imageURL(): string {
    return this.metaData?.image ? httplizeIpfsUri(this.metaData.image) : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tokenInfo && this.tokenInfo) {
      this.isImageLoaded = false;
      this.tokenURIService.getMetaData$(this.tokenInfo.tokenURI).subscribe((metaData) => (this.metaData = metaData));
    }
  }

  onClickCard(): void {
    if (this.disableClick) {
      return;
    }
    this.router.navigate(['/', 'contract', this.tokenInfo.contractAddress, 'token', this.tokenInfo.id]);
  }

  onImageLoaded(): void {
    this.isImageLoaded = true;
  }
}
