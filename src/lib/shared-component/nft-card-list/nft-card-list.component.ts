import { Component, OnInit, Input } from '@angular/core';
import { TTokenInfo } from 'Lib/contracts/type-define';

@Component({
  selector: 'nft-card-list',
  templateUrl: './nft-card-list.component.html',
  styleUrls: ['./nft-card-list.component.sass'],
})
export class NftCardListComponent implements OnInit {
  @Input() tokenInfos: TTokenInfo[];
  @Input() isShowPlaceholder = false;
  @Input() placeholderCount = 1;

  get placeholders(): number[] {
    return Array(this.placeholderCount).fill(1);
  }

  constructor() {}

  ngOnInit(): void {}
}
