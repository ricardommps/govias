import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {VehicleProvider} from "../../providers/vehicle/vehicle";

/**
 * Generated class for the VehiclePlatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicle-plates',
  templateUrl: 'vehicle-plates.html',
})
export class VehiclePlatesPage {
  public base64Image: string;
  placa: any = "";
  status:any = "";
  showButton:Boolean = false;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public vehicleProvider: VehicleProvider,
              private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiclePlatesPage');
  }

  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.placa = 'FHF-3243'
      this.checkPlaca();
    }, (err) => {
      // Handle error
    });
  }

  direction(): void {
    this.navCtrl.push('VehicleDirectionPage',{placa:this.placa});
  }
  onInput() {
    if(this.placa.length == 8){
      this.checkPlaca();
    }else{
      this.status = null;
    }
  }

  checkPlaca(){
    this.vehicleProvider.checkPlaca(this.placa)
      .then((result: any) => {
        console.log(result);
        if(result){
          this.status = result.status
          this.showButton = true;
        }else{
          this.status = "Veiculo não encontrado"
        }
      })
  }

}
