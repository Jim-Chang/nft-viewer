import { readFileAsDataUrl$ } from '../utility';
import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'image-drop',
  templateUrl: './image-drop.component.html',
  styleUrls: ['./image-drop.component.sass'],
})
export class ImageDropComponent {
  imageUrl: string | null;
  @Input() imageFile: File;
  @Output() imgFileDropped = new EventEmitter<File>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.imageFile && this.imageFile) {
      readFileAsDataUrl$(this.imageFile).subscribe((url) => (this.imageUrl = url));
    }
  }

  onFileDropped(files: FileList): void {
    if (files && files[0] && files[0].type.startsWith('image/')) {
      this.imgFileDropped.emit(files[0]);
      readFileAsDataUrl$(files[0]).subscribe((url) => (this.imageUrl = url));
    }
  }

  onClickDeleteBtn(): void {
    this.imageUrl = null;
    this.imgFileDropped.emit();
  }
}
