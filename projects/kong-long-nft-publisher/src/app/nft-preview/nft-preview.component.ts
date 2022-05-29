import { readFileAsDataUrl$ } from '../utility';
import { NftFormService } from './../services/nft-form.service';
import { Component } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

type TableData = {
  key: string;
  value: string;
};

@Component({
  selector: 'app-nft-preview',
  templateUrl: './nft-preview.component.html',
  styleUrls: ['./nft-preview.component.sass'],
})
export class NftPreviewComponent {
  imageUrl: string;
  basicData: TableData[];
  attrData: TableData[];

  get formValue(): any {
    return this.formService.getForm().getRawValue();
  }

  constructor(private formService: NftFormService, private router: Router) {
    const imgFile = this.formService.getImageFile();
    if (imgFile) {
      readFileAsDataUrl$(imgFile).subscribe((url) => (this.imageUrl = url));
    }

    const formValue = this.formService.getForm().getRawValue();
    this.basicData = [
      {
        key: 'Name',
        value: formValue.name,
      },
      {
        key: 'Description',
        value: formValue.description,
      },
    ];
    this.attrData = formValue.attributes.map((attr: { trait_type: string; value: string }) => ({
      key: attr.trait_type,
      value: attr.value,
    }));
  }

  onClickBackButton(): void {
    this.router.navigate(['/']);
  }

  onClickNextButton(): void {}
}
