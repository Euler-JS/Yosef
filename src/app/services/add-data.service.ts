import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AddDataService {
  ofertasArray: any = []
  dizimosArray: any = []
  doacoesArray: any = []
  dispesasFixasArray: any = []
  dispesasNaoFixasArray: any = []
  lastKey: any
  constructor() { }

  async addDataOnStorage(name, object) {
    await Storage.set({
      key: 'YOSEF_S_' + name,
      value: object,
    });

    switch (name) {
      case "ofertas":
        this.ofertasArray = JSON.parse(object);
        break;
      case "dizimos":
        this.dizimosArray = JSON.parse(object);
        break;

      case "doacoes":
        this.doacoesArray = JSON.parse(object);
        break;

      case "dispesasFixas":
        this.dispesasFixasArray = JSON.parse(object);
        break;

      case "dispesasNaoFixas":
        this.dispesasNaoFixasArray = JSON.parse(object);
        break;

      default:
        break;
    }
  }

  async getDataFromStorage(name) {


    await Storage.get({ key: 'YOSEF_S_' + name }).then(res => {
      console.log(JSON.parse(res.value));
      switch (name) {
        case "ofertas":
          if (res.value == null) {
            this.ofertasArray = []
          }
          else {
            this.ofertasArray = JSON.parse(res.value);
          }

          break;
        case "dizimos":
          if (res.value == null) {
            this.dizimosArray = []
          }
          else {
            this.dizimosArray = JSON.parse(res.value);
          }
          break;

        case "doacoes":
          if (res.value == null) {
            this.doacoesArray = []
          }
          else {
            this.doacoesArray = JSON.parse(res.value);
          }
          break;

        case "dispesasFixas":
          if (res.value == null) {
            this.dispesasFixasArray = []
          }
          else {
            this.dispesasFixasArray = JSON.parse(res.value);
          }
          break;

        case "dispesasNaoFixas":
          if (res.value == null) {
            this.dispesasNaoFixasArray = []
          }
          else {
            this.dispesasNaoFixasArray = JSON.parse(res.value);
          }
          break;

        default:
          break;
      }



    });
  }

  async keyNumber() {
    await Storage.get({ key: 'YOSEF_S_KEY' }).then(res => {
      console.log(JSON.parse(res.value));
      if (res.value == null) {
        this.lastKey = 0;
      }
      else {
        this.lastKey = parseInt(JSON.parse(res.value));
      }


    });
  }
}

