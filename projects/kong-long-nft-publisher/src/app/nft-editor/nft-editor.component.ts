import { NftFormService } from './../services/nft-form.service';
import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IpfsService } from 'projects/lib-web3/src/lib/services/ipfs.service.ts.service';
import { Web3ProviderService } from 'projects/lib-web3/src/lib/services/web3-provider.service';

@Component({
  selector: 'app-nft-editor',
  templateUrl: './nft-editor.component.html',
  styleUrls: ['./nft-editor.component.sass'],
})
export class NftEditorComponent {
  get form(): FormGroup {
    return this.formService.getForm();
  }

  get attrFormArray(): FormArray {
    return this.formService.getAttrFormArray();
  }

  constructor(
    private formService: NftFormService,
    private ipfsService: IpfsService,
    private web3Service: Web3ProviderService,
  ) {
    this.formService.buildForm();
  }

  onFileDropped(file: File | undefined): void {
    console.log('file', file);
    this.formService.setImageFile(file);
    // this.ipfsService.addAndPin(file).subscribe((ret) => console.log(ret));
  }

  onClickAddAttrButton(): void {
    this.formService.addAttr();
  }

  onClickDeleteAttrButton(index: number): void {
    this.formService.removeAttr(index);
  }

  onClickNextButton(): void {
    if (this.formService.isValid()) {
    }
  }
}
