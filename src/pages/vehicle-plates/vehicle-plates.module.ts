import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiclePlatesPage } from './vehicle-plates';

@NgModule({
  declarations: [
    VehiclePlatesPage,
  ],
  imports: [
    IonicPageModule.forChild(VehiclePlatesPage),
  ],
})
export class VehiclePlatesPageModule {}
