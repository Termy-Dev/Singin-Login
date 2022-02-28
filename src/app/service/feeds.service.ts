import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export interface Creator {
  id: string;
  phone: string;
  nickname: string;
}

export interface RootObject {
  id: string;
  message: string;
  creator: Creator;
  imageUrl: string;
  date: Date;
  likes: any[];
  comments: any[];
}

export interface countable {
  skip: number;
  limit : number;
}




@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  apiUrl: string = "https://feeds-fake.herokuapp.com/feeds";
  apiSingIn: string = "https://feeds-fake.herokuapp.com/signin";
  apiLogin: string = "https://feeds-fake.herokuapp.com/login";


  constructor(private http: HttpClient) { }

  getFeeds(countable : countable){
    const { skip = 90 , limit = 90 } = countable;
    
    return this.http.get<RootObject[]>(`${this.apiUrl}?limit=${limit}&skip=${skip}`).toPromise();
  }


  signIn(form : FormGroup){
    let body = {
      "nickname" : form.value.nickname,
      "phone" : form.value.phone,
      "password" : form.value.password
    }

    return this.http.post(this.apiSingIn, body).toPromise();
  }

  login(form : FormGroup){
    let body = {
      "nickname" : form.value.nickname,
      "password" : form.value.password
    }

    return this.http.post(this.apiLogin, body).toPromise();

  }

  addNewFeeds(form: FormGroup, token){
    let body = {
        "message": form.value.message,
        "imageUrl": form.value.imgUrl
    }

    let headers =  new HttpHeaders({
      "Authorization" : "bearer " + token
    })

    return this.http.post(this.apiUrl, body, {headers}).toPromise();
  }

}
