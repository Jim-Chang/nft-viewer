import { readFileAsDataUrl$ } from '../utility';
import { TAttribute } from './../../../../lib-web3/src/lib/contracts/type-define';
import { NftFormService } from './../services/nft-form.service';
import { Component } from '@angular/core';
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

  constructor(private formService: NftFormService, private router: Router) {}

  ngOnInit(): void {
    if (!this.formService.isValid()) {
      this.router.navigate(['/']);
    }

    const imgFile = this.formService.getImageFile() as File;
    readFileAsDataUrl$(imgFile).subscribe((url) => (this.imageUrl = url));

    const formValue = this.formService.getFormValue();
    this.basicData = [
      {
        key: 'Owner Address',
        value: formValue.owner,
      },
      {
        key: 'Name',
        value: formValue.name,
      },
      {
        key: 'Description',
        value: formValue.description,
      },
    ];
    this.attrData = formValue.attributes.map((attr: TAttribute) => ({
      key: attr.trait_type,
      value: attr.value,
    }));
  }

  onClickBackButton(): void {
    this.router.navigate(['/']);
  }

  onClickNextButton(): void {
    this.router.navigate(['mint']);
  }
}
