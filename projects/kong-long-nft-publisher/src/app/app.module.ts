import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ImageDropComponent } from './image-drop/image-drop.component';
import { NftEditorComponent } from './nft-editor/nft-editor.component';
import { NftMintComponent } from './nft-mint/nft-mint.component';
import { NftPreviewComponent } from './nft-preview/nft-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'projects/lib-ui/src/lib/material.module';
import { SharedComponentModule } from 'projects/lib-ui/src/lib/shared-component/shared-component.module';
import {
  IPFS_GATEWAY_URL_TOKEN,
  IPFS_API_URL_TOKEN,
  PINATA_API_KEY_TOKEN,
  PINATA_API_SECRET_TOKEN,
} from 'projects/lib-web3/src/lib/services/ipfs.service.ts.service';
import { FALLBACK_CHAIN_RPC_TOKEN } from 'projects/lib-web3/src/lib/services/web3-provider.service';

@NgModule({
  declarations: [
    AppComponent,
    DragAndDropComponent,
    NftEditorComponent,
    ImageDropComponent,
    NftPreviewComponent,
    NftMintComponent,
  ],
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
    { provide: PINATA_API_KEY_TOKEN, useValue: environment.pinataApiKey },
    { provide: PINATA_API_SECRET_TOKEN, useValue: environment.pinataApiSecret },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
