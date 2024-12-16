import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';
import { LoadingComponent } from './loading/loading.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    ModalDetailComponent,
    LoadingComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalDetailComponent,
    PaginationComponent
  ]
})
export class ComponentsModule { }
