import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.sass'],
})
export class DragAndDropComponent {
  fileOver: boolean;
  @Output() fileDropped = new EventEmitter<FileList>();

  // Dragover listener
  @HostListener('dragover', ['$event'])
  onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('in');
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event'])
  ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    this.emitFiles(evt.dataTransfer?.files ?? null);
  }

  onFileInputChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.emitFiles(element.files);
  }

  private emitFiles(files: FileList | null): void {
    if (files && files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
