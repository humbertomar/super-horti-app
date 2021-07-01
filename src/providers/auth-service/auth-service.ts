import {Injectable} from '@angular/core';
import {Http } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'https://superhorti.com.br/ws/controllers/_WS_/';
//let apiUrl = 'https://superhorti.com.br/ws/controllers/WS/';

//let apiUrl = 'http://localhost/douglas/superhorti.com.br/ws/controllers/_WS_/';

@Injectable()
export class AuthServiceProvider {

  constructor(public http : Http) {
    //console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + type, JSON.stringify(credentials)).subscribe(res => {
        resolve(JSON.parse(JSON.stringify(res.json())));
        //console.log(JSON.stringify(res.json()));
      }, (err) => {
        reject(err);
        console.log(err);
      });

    });

  }

  getData(type) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + type).subscribe(res => {
        resolve(JSON.parse(JSON.stringify(res.json())));
        //console.log(JSON.stringify(res.json()));
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

}
