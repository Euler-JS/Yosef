import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AddDataService } from '../services/add-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  doacaoObject=
    {
      valor:'',
      nome:'',
      data:'',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_user: null
    };

    allDoacoes: any;
  constructor(
    public alertController: AlertController,
    private addDataService: AddDataService
  ) {
    try {
      addDataService.getDataFromStorage('doacoes');
    } catch (error) {
      console.log('Sem doacoes registadas');

    }
  }

  ionViewDidEnter() {

    try {
      this.allDoacoes = this.addDataService.doacoesArray;
    } catch (error) {
      console.log('Array Vazio');

    }

  }

  addDoacao()
  {
    this.doacaoAlert();
  }

  async doacaoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Adiconar Oferta',
      inputs: [
        {
          name: 'doacao',
          type: 'number',
          placeholder: 'Digite o valor doado.'
        },
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Digite o nome do doador'
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
            this.doacaoObject.valor = val.doacao;
            this.doacaoObject.nome = val.nome;
            this.doacaoObject.data = (new Date()).toISOString();
            this.doacaoObject.id_user = 11;
            this.addDataService.doacoesArray.push(this.doacaoObject);

            this.addDataService.addDataOnStorage('doacoes',JSON.stringify(this.addDataService.doacoesArray));
            console.log('Confirm Ok', val);
            this.allDoacoes = this.addDataService.doacoesArray;
          }
        }
      ]
    });

    await alert.present();
  }

}
