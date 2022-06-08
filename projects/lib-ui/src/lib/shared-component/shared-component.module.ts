import { NftCardListComponent } from './nft-card-list/nft-card-list.component';
import { NftCardComponent } from './nft-card/nft-card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/lib-ui/src/lib/material.module';

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [NftCardComponent, NftCardListComponent],
  exports: [NftCardComponent, NftCardListComponent],
})
export class SharedComponentModule {}
