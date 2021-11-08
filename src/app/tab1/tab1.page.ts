import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AddDataService } from '../services/add-data.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  ofertaObject=
    {
      valor:'',
      data:'',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_user: null
    };

    novo: any = [];

    allOfertas: any;



  constructor(
    public alertController: AlertController,
    private addDataService: AddDataService) {
      try {
        addDataService.getDataFromStorage('ofertas');
      } catch (error) {
        console.log('Sem ofertas registadas');

      }


    }

    ionViewWillEnter() {

      try {
        this.allOfertas = this.addDataService.ofertasArray;
      } catch (error) {
        console.log('Array Vazio');

      }

      // console.log(this.allOfertas);


    }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit() {
      // this.apiService.getToken()
      // this.allOfertas = this.addDataService.getDataFromStorage("ofertas")
      // console.log(this.allOfertas);
    }

  addOferta()
  {
    this.ofertaAlert();
  }

  async ofertaAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Adiconar Oferta',
      inputs: [
        {
          name: 'oferta',
          type: 'number',
          placeholder: 'Digite o valor da Oferta'
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
            this.ofertaObject.valor = val.oferta;
            this.ofertaObject.data = (new Date()).toISOString();
            this.ofertaObject.id_user = 11;
            this.addDataService.ofertasArray.push(this.ofertaObject);

            // this.novo.push(this.ofertaObject)
            // novo.push(this.ofertaObject)

            // console.log("Dados ", this.ofertaObject[0]);

            this.addDataService.addDataOnStorage('ofertas',JSON.stringify(this.addDataService.ofertasArray));
            console.log('Confirm Ok', val);
            this.allOfertas = this.addDataService.ofertasArray;
          }
        }
      ]
    });

    await alert.present();
  }


    // async presentAlertPrompt() {
    //   const alert = await this.alertController.create({
    //     cssClass: 'my-custom-class',
    //     header: 'Prompt!',
    //     inputs: [
    //       {
    //         name: 'name1',
    //         type: 'text',
    //         placeholder: 'Placeholder 1'
    //       },
    //       {
    //         name: 'name2',
    //         type: 'text',
    //         id: 'name2-id',
    //         value: 'hello',
    //         placeholder: 'Placeholder 2'
    //       },
    //       // multiline input.
    //       {
    //         name: 'paragraph',
    //         id: 'paragraph',
    //         type: 'textarea',
    //         placeholder: 'Placeholder 3'
    //       },
    //       {
    //         name: 'name3',
    //         value: 'http://ionicframework.com',
    //         type: 'url',
    //         placeholder: 'Favorite site ever'
    //       },
    //       // input date with min & max
    //       {
    //         name: 'name4',
    //         type: 'date',
    //         min: '2017-03-01',
    //         max: '2018-01-12'
    //       },
    //       // input date without min nor max
    //       {
    //         name: 'name5',
    //         type: 'date'
    //       },
    //       {
    //         name: 'name6',
    //         type: 'number',
    //         min: -5,
    //         max: 10
    //       },
    //       {
    //         name: 'name7',
    //         type: 'number'
    //       },
    //       {
    //         name: 'name8',
    //         type: 'password',
    //         placeholder: 'Advanced Attributes',
    //         cssClass: 'specialClass',
    //         attributes: {
    //           maxlength: 4,
    //           inputmode: 'decimal'
    //         }
    //       }
    //     ],
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         cssClass: 'secondary',
    //         handler: () => {
    //           console.log('Confirm Cancel');
    //         }
    //       }, {
    //         text: 'Ok',
    //         handler: () => {
    //           console.log('Confirm Ok');
    //         }
    //       }
    //     ]
    //   });

    //   await alert.present();
    // }




}
