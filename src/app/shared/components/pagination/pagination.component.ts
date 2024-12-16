import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 0;
  @Output() onSelectPage = new EventEmitter<number>();

  
  /**
   * Metodo para seleccionar una pagina y notificarlo al componente padre
   * 
   * @param page Pagina a seleccionar
   */
  async select(page: number) {
    this.currentPage = page;
    this.onSelectPage.emit(this.currentPage);
  }
}
