import { NftEditorComponent } from './nft-editor/nft-editor.component';
import { NftPreviewComponent } from './nft-preview/nft-preview.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: NftEditorComponent },
  { path: 'preview', component: NftPreviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
