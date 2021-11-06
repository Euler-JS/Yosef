import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AddDataService {
  ofertasArray:any = []
  constructor() { }

  async addDataOnStorage(name, object)
  {
    // await Storage.get({ key: 'YOSEF_S_'+name }).then(res=>
    //   {
    //     console.log("Valor ",JSON.parse(res.value));
        
    //   });

    // alert(`Hello ${value}!`);
   
      await Storage.set({
        key: 'YOSEF_S_'+name,
        value: object,
      });

      this.ofertasArray = JSON.parse(object);
    
  }

  async getDataFromStorage(name)
  {
    await Storage.get({ key: 'YOSEF_S_'+name }).then(res=>
      {
        console.log(JSON.parse(res.value));
        
        this.ofertasArray = JSON.parse(res.value);
        
      });
  }
}

