import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatCardModule, MatGridListModule, MatTableModule, MatToolbarModule, MatButtonModule, MatIconModule],
  exports: [MatCardModule, MatGridListModule, MatTableModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class MaterialModule {}
