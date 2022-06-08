import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NftEntryComponent } from './nft-entry/nft-entry.component';
import { NftSearchComponent } from './nft-search/nft-search.component';
import { NftSeriesComponent } from './nft-series/nft-series.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'projects/lib-ui/src/lib/material.module';
import { SharedComponentModule } from 'projects/lib-ui/src/lib/shared-component/shared-component.module';
import { FALLBACK_CHAIN_RPC_TOKEN } from 'projects/lib-web3/src/lib/services/web3-provider.service';
import { HttpInterceptorService } from 'src/lib/services/http-intercept.service';

@NgModule({
  declarations: [AppComponent, NftSeriesComponent, NftEntryComponent, NftSearchComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    SharedComponentModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: FALLBACK_CHAIN_RPC_TOKEN, useValue: environment.chainRPC },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
