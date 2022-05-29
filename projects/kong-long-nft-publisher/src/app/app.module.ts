import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ImageDropComponent } from './image-drop/image-drop.component';
import { NftEditorComponent } from './nft-editor/nft-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentModule } from 'Lib/shared-component/shared-component.module';
import { MaterialModule } from 'Lib/ui/material.module';
import { IPFS_GATEWAY_URL_TOKEN, IPFS_API_URL_TOKEN } from 'projects/lib-web3/src/lib/services/ipfs.service.ts.service';
import { FALLBACK_CHAIN_RPC_TOKEN } from 'projects/lib-web3/src/lib/services/web3-provider.service';

@NgModule({
  declarations: [AppComponent, DragAndDropComponent, NftEditorComponent, ImageDropComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: IPFS_GATEWAY_URL_TOKEN, useValue: environment.ipfsGatewayURL },
    { provide: IPFS_API_URL_TOKEN, useValue: environment.ipfsApiUrl },
    { provide: FALLBACK_CHAIN_RPC_TOKEN, useValue: environment.chainRPC },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
