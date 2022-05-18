import { ErrorPageComponent } from './error-page/error-page.component';
import { NftEntryComponent } from './nft-entry/nft-entry.component';
import { NftSearchComponent } from './nft-search/nft-search.component';
import { NftSeriesComponent } from './nft-series/nft-series.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes = [
  { path: '', component: NftSearchComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'error/:errCode', component: ErrorPageComponent },
  { path: 'contract/:address', component: NftSeriesComponent },
  { path: 'contract/:address/page/:page', component: NftSeriesComponent },
  { path: 'contract/:address/token/:tokenId', component: NftEntryComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
