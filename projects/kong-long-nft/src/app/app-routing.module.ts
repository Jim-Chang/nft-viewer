import { ErrorPageComponent } from './error-page/error-page.component';
import { NftEntryComponent } from './nft-entry/nft-entry.component';
import { NftSeriesComponent } from './nft-series/nft-series.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes = [
  { path: '', component: NftSeriesComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'page/:page', component: NftSeriesComponent },
  { path: 'contract/:address/token/:tokenId', component: NftEntryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
