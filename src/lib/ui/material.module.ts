import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [MatCardModule, MatGridListModule],
  exports: [MatCardModule, MatGridListModule],
})
export class MaterialModule {}
