import { NftFormService } from './../services/nft-form.service';
import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  get imageFile(): File {
    return this.formService.getImageFile() as File;
  }

  constructor(private formService: NftFormService, private router: Router) {
    this.formService.buildFormIfNotExist();
  }

  onFileDropped(file: File | undefined): void {
    this.formService.setImageFile(file);
  }

  onClickAddAttrButton(): void {
    this.formService.addAttr();
  }

  onClickDeleteAttrButton(index: number): void {
    this.formService.removeAttr(index);
  }

  onClickNextButton(): void {
    if (this.formService.isValid()) {
      this.router.navigate(['preview']);
    }
  }
}
