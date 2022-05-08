import { NftEntryComponent } from './nft-entry/nft-entry.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftSeriesComponent } from 'Lib/shared-component/nft-series/nft-series.component';

const routes: Routes = [
  { path: 'contract/:address', component: NftSeriesComponent },
  { path: 'contract/:address/:tokenId', component: NftEntryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
