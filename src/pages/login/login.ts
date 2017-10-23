import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginProvider} from "../../providers/login/login";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginFormValidate: FormGroup;
  userInfo: {username: string, password: string} = {username: '', password: ''};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menu: MenuController,
              private formBuilder: FormBuilder,
              private loginProvider: LoginProvider) {
    this.menu = menu;
    this.menu.enable(false);
    this.loginFormValidate = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(){
    console.log(this.userInfo.username);
    console.log(this.userInfo.password);
    this.loginProvider.login(this.userInfo.username, this.userInfo.password)
      .then((result: any) => {
        console.log(result);
        if(result){
          this.menu.enable(true);
          this.navCtrl.setRoot('HomePage');
          console.log("OK");
        }else{
          this.menu.enable(true);
          this.navCtrl.setRoot('HomePage');
          console.log("Ivalido");
        }
      })
  }


}
