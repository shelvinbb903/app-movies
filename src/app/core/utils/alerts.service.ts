import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  /**
   * Cargar en pantalla un modal con un loading y un mensaje mientras se ejecuta una acción
   */
  showLoading = async () => {
    /*this.loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    await this.loading.present();  */  
  }

  /**
   * Cerrar el modal del loading
   */
  closeLoading = async () => {
    //await this.loading.dismiss();
  }
}
