import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HomeProvider} from "../../providers/home/home";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  itens: any[] = [];
  searchText: string = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              public homeProvider: HomeProvider) {
  }

  ionViewDidLoad() {
    this.getAll();
  }

  getAll(){
    this.homeProvider.getAll()
      .then((result: any[]) => {
        this.itens = result;
        console.log(this.itens);
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as categorias.', duration: 3000, position: 'botton' }).present();
      });
  }

  filterProducts(ev: any) {
    this.getAll();
  }

}
