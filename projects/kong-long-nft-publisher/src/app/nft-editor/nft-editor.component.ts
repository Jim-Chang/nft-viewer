import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IpfsService } from 'projects/lib-web3/src/lib/services/ipfs.service.ts.service';
import { Web3ProviderService } from 'projects/lib-web3/src/lib/services/web3-provider.service';

@Component({
  selector: 'app-nft-editor',
  templateUrl: './nft-editor.component.html',
  styleUrls: ['./nft-editor.component.sass'],
})
export class NftEditorComponent {
  form: FormGroup;

  get attrFormArray(): FormArray {
    return this.form.get('attributes') as FormArray;
  }

  constructor(private fb: FormBuilder, private ipfsService: IpfsService, private web3Service: Web3ProviderService) {
    this.form = this.createForm();

    this.ipfsService.addAndPin('test').subscribe((ret) => console.log(ret));
  }

  onFileDropped(files: FileList): void {
    console.log('files', files);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: [null],
      description: [null],
      image: [null],
      attributes: this.fb.array([]),
    });
  }

  onClickAddAttrButton(): void {
    this.attrFormArray.push(
      this.fb.group({
        trait_type: [null],
        value: [null],
      }),
    );
  }

  onClickDeleteAttrButton(index: number): void {
    this.attrFormArray.removeAt(index);
  }
}
