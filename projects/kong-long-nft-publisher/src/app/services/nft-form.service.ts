import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NftFormService {
  private form: FormGroup;
  private imageFile: File | undefined;

  constructor(private fb: FormBuilder) {}

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      attributes: this.fb.array([]),
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  getAttrFormArray(): FormArray {
    return this.form.get('attributes') as FormArray;
  }

  addAttr(): void {
    this.getAttrFormArray().push(
      this.fb.group({
        trait_type: [null, Validators.required],
        value: [null, Validators.required],
      }),
    );
  }

  removeAttr(index: number): void {
    this.getAttrFormArray().removeAt(index);
  }

  setImageFile(file: File | undefined): void {
    this.imageFile = file;
  }

  isValid(): boolean {
    return this.form.valid;
  }
}
