import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NftEntryComponent } from './nft-entry/nft-entry.component';
import { NftSeriesComponent } from './nft-series/nft-series.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentModule } from 'Lib/shared-component/shared-component.module';
import { MaterialModule } from 'Lib/ui/material.module';

@NgModule({
  declarations: [AppComponent, NftSeriesComponent, NftEntryComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
