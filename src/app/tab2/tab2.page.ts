import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AddDataService } from '../services/add-data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  dizimoObject=
    {
      valor:'',
      nome:'',
      data:'',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_user: null
    };

  allDizimos: any;
  constructor(
    public alertController: AlertController,
    private addDataService: AddDataService
  ) {
    try {
      addDataService.getDataFromStorage('dizimos');
    } catch (error) {
      console.log('Sem dizimos registadas');

    }

  }

  ionViewWillEnter() {

    try {
      this.allDizimos = this.addDataService.dizimosArray;
    } catch (error) {
      console.log('Array Vazio');

    }

  }

  addDizimo()
  {
    this.dizimoAlert();
  }

  async dizimoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registar Dízimo',
      inputs: [
        {
          name: 'dizimo',
          type: 'number',
          placeholder: 'Digite o valor do Dízimo'
        },
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Digite o nome do Dizimista'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (val) => {
            const now = new Date();
            console.log('Minha Data ',(new Date()).toISOString());
            this.dizimoObject.valor = val.dizimo;
            this.dizimoObject.nome = val.nome;
            this.dizimoObject.data = (new Date()).toISOString();
            this.dizimoObject.id_user = 11;
            this.addDataService.dizimosArray.push(this.dizimoObject);

            this.addDataService.addDataOnStorage('dizimos',JSON.stringify(this.addDataService.dizimosArray));
            console.log('Confirm Ok', val);
            this.allDizimos = this.addDataService.dizimosArray;
          }
        }
      ]
    });

    await alert.present();
  }

}
