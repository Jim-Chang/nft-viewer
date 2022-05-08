import { NftCardListComponent } from './nft-card-list/nft-card-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NftCardComponent } from 'Lib/shared-component/nft-card/nft-card.component';
import { MaterialModule } from 'Lib/ui/material.module';

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [NftCardComponent, NftCardListComponent],
  exports: [NftCardComponent, NftCardListComponent],
})
export class SharedComponentModule {}
