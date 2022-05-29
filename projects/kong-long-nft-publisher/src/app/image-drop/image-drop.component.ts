import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'image-drop',
  templateUrl: './image-drop.component.html',
  styleUrls: ['./image-drop.component.sass'],
})
export class ImageDropComponent {
  imageUrl: string | null;
  @Output() imgFileDropped = new EventEmitter<File>();

  onFileDropped(files: FileList): void {
    if (files && files[0] && files[0].type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.imgFileDropped.emit(files[0]);
    }
  }

  onClickDeleteBtn(): void {
    this.imageUrl = null;
    this.imgFileDropped.emit();
  }
}
