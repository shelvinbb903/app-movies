import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NgbRatingModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class ComponentsModule { }
