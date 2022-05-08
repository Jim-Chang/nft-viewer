import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [MatCardModule, MatGridListModule, MatTableModule],
  exports: [MatCardModule, MatGridListModule, MatTableModule],
})
export class MaterialModule {}
