import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AddDataService } from './services/add-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    dataService: AddDataService,
    platform: Platform) {
      try {
      dataService.getDataFromStorage("ofertas")
      } catch (error) {
        console.log("Ocorreu um erro ao pegar lista das ofertas");
        
      }

      try {
      dataService.getDataFromStorage("dizimos") 
      } catch (error) {
        console.log("Ocorreu um erro ao pegar lista das dizimos");
      }

      try {
        dataService.getDataFromStorage("doacoes")
      } catch (error) {
        console.log("Ocorreu um erro ao pegar lista das doacoes");
      }

      try {
        dataService.getDataFromStorage("dispesasFixas")
      } catch (error) {
        console.log("Ocorreu um erro ao pegar lista das dispesas Fixas");
      }

      try {
        dataService.getDataFromStorage("dispesasNaoFixas")
      } catch (error) {
        console.log("Ocorreu um erro ao pegar lista das dispesas nao fixas");
      }
      
      
      
    platform.ready().then(preparado=>{
      this.iniciar()
    })
  }

  async iniciar()
  {
    console.log("Iniciando Yosef");
    
  }
}
