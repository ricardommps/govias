import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {DatabaseProvider} from "../providers/database/database";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any, icon: any}>;

  profileData = {
    profileImage:"http://img.freepik.com/icones-gratis/usuario-masculino-imagem-no-perfil_318-37825.jpg?size=338&ext=jpg",
    name: "Nome do usuário",
    codigo: "044597437-20"
  }


  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public dbProvider: DatabaseProvider,) {


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Govias', component: 'HomePage', icon: 'home' },
      { title: 'Placas de veículos', component: 'VehiclePlatesPage', icon: 'car' }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      //Criando o banco de dados
      dbProvider.createDatabase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          this.splashScreen.hide();
        })
        .catch(() => {
          // ou se houver erro na criação do banco
          this.splashScreen.hide();
        });
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
