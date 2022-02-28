import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FeedsService } from '../service/feeds.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ionicForm: FormGroup;
  loginForm: FormGroup;
  addForm: FormGroup;
  
  constructor(public formBuilder: FormBuilder, private service: FeedsService, private storage : Storage) { }

  ngOnInit() {
    this.setForm();
    this.setForm2();
    this.setForm3();
  }

  setForm(){
    this.ionicForm = this.formBuilder.group({
      nickname: ['', [Validators.required,]],
      phone: ['', [Validators.required,]],
      password: ['', [Validators.required,]]
    })
  }

  submitForm() {
    console.log(this.service.signIn(this.ionicForm));
  }

  setForm2(){
    this.loginForm = this.formBuilder.group({
      nickname: ['', [Validators.required,]],
      password: ['', [Validators.required,]]
    })
  }


  async submitForm2() {
    const tokens = this.service.login(this.loginForm);
    await this.storage.create();
    this.storage.set("token" , tokens);
  }


  setForm3(){
    this.addForm = this.formBuilder.group({
      message: ['', [Validators.required,]],
      imgUrl: ['', [Validators.required,]]
    })
  }

  async submitForm3() {
    let token = await this.storage.get("token");
    token = token.accessToken;
    
    this.service.addNewFeeds(this.addForm, token);
  }



}
