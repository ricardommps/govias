import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleDirectionPage } from './vehicle-direction';

@NgModule({
  declarations: [
    VehicleDirectionPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleDirectionPage),
  ],
})
export class VehicleDirectionPageModule {}
