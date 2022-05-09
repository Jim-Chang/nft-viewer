import { NftEntryComponent } from './nft-entry/nft-entry.component';
import { NftSeriesComponent } from './nft-series/nft-series.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

let routes: Routes;

if (environment.isKongLongNFT) {
  routes = [
    { path: '', redirectTo: `contract/${environment.kongLongNFTAddress}`, pathMatch: 'full' },
    { path: 'contract/:address', component: NftSeriesComponent },
    { path: 'contract/:address/:tokenId', component: NftEntryComponent },
  ];
} else {
  routes = [
    { path: 'contract/:address', component: NftSeriesComponent },
    { path: 'contract/:address/:tokenId', component: NftEntryComponent },
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
