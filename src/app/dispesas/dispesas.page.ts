import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AddDataService } from '../services/add-data.service';

@Component({
  selector: 'app-dispesas',
  templateUrl: './dispesas.page.html',
  styleUrls: ['./dispesas.page.scss'],
})
export class DispesasPage implements OnInit {

  viewFixa = true;
  lista: any
  lista2: any
  ver = []

  dispesaFixaObject =
    {
      valor: '',
      nome: '',
      data: '',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_user: null
    };

  dispesaNaoFixaObject =
    {
      valor: '',
      nome: '',
      data: '',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_user: null
    };

  allDispesasFixas: any;

  allDispesasNaoFixas: any;


  constructor(
    public alertController: AlertController,
    private addDataService: AddDataService
  ) {

    try {
      addDataService.getDataFromStorage('dispesasFixas');
    } catch (error) {
      console.log('Sem Dispesas Fixas registadas');

    }
  }

  ionViewWillEnter() {

    try {
      this.allDispesasFixas = this.addDataService.dispesasFixasArray;
    } catch (error) {
      console.log('Array Vazio');

    }

  }

  ngOnInit() {
  }

  changeView(ev) {
    switch (ev.detail.value) {
      case "fixa":
        this.viewFixa = true
        break;
      case "naoFixa":
        this.viewFixa = false
        break;
    }
  }

  dispesa(tipo) {
    console.log("Meu tipo", tipo);

    switch (tipo) {
      case 'fixa':
        this.dispesaFixaAlert(null)
        break;

      case 'nao_fixa':

        break;

      default:
        break;
    }
  }

  async dispesaFixaAlert(shortCut) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registar Dispesa Fixa',
      inputs: [
        {
          name: 'valor',
          type: 'number',
          placeholder: 'Digite o valor da dispesa',
          id: 'input-valor-dispesas-fixas'
        },
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Digite o nome da dispesa',
          id: 'input-nome-dispesas-fixas'
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
            console.log('Minha Data ', (new Date()).toISOString());
            this.dispesaFixaObject.valor = val.valor;

            if (shortCut === null) {
              this.dispesaFixaObject.nome = val.nome;
            }
            else {
              this.dispesaFixaObject.nome = shortCut;
            }

            this.dispesaFixaObject.data = (new Date()).toISOString();
            this.dispesaFixaObject.id_user = 11;
            this.addDataService.dispesasFixasArray.push(this.dispesaFixaObject);

            this.addDataService.addDataOnStorage('dispesasFixas', JSON.stringify(this.addDataService.dispesasFixasArray));
            console.log('Confirm Ok', val);
            this.allDispesasFixas = this.addDataService.dispesasFixasArray;
          }
        }
      ]
    });


    await alert.present();
    if (shortCut != null) {
      let element1 = <HTMLInputElement>document.getElementById("input-nome-dispesas-fixas");
      element1.style.display = "none"
    }


  }


  getItems(ev) {
    let query = ev.target.value.toLowerCase()
    if (this.viewFixa) {
      this.procurarFixa(query)
    }

  }

  procurarFixa(query) {
    requestAnimationFrame(() => {
      this.ver = []

      this.addDataService.dispesasFixasArray.forEach(x => {

        let list = x.search = x.nome + ' - '
          + ' ' + x.valor

        if (query.length > 0 && query.trim() != '') {
          let shouldShow = list.toLowerCase().indexOf(query) > -1;
          this.ver.push(shouldShow)
        }

      });
    });
  }

  adicionarDispesa(nome) {
    this.dispesaFixaAlert(nome)
  }

}
