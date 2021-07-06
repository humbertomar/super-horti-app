import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class FirebaseServiceProvider {

  private PATH: string;

  constructor(
    public db: AngularFireDatabase
  ) {
    //console.log('Hello FirebaseServiceProvider Provider');
  }

  getAll(path) {
    return this.db.list(path, ref => ref.orderByKey())
      .snapshotChanges()
      .map(data => {
        return data.map(d => ({ key: d.payload.key, ...d.payload.val() as {} }));
      })
  }

  getItems(path: string) {
        return this.db.list(path)
      //return this.db.list(path, ref => ref.orderByChild(item1).equalTo(item2))
        .snapshotChanges()
        .map(data => {
          return data.map(d => ({ key: d.payload.key, ...d.payload.val() as {} }));
        })
    }

  getItem(path: string, item1: string, item2: string) {
  //return this.db.list("/users/" + localStorage.getItem("uid") + "/cep")
    return this.db.list(path, ref => ref.orderByChild(item1).equalTo(item2))
      .snapshotChanges()
      .map(data => {
        return data.map(d => ({ key: d.payload.key, ...d.payload.val() as {} }));
      })
  }

  get(path: string, key: string) {
    return this.db.object(path + key).snapshotChanges()
      .map(d => {
        return { key: d.key, ...d.payload.val() as {}};
      });
  }

  save(item: any, db_fb: any) {
    this.db.list(db_fb)
    .push(item)
    .then(r => console.log(r));
  }

  update(item, db_fb) {
    //console.log(item);
    //return this.db.list('courses').update(course.key, course);
    return this.db.list(db_fb).update(item.token, item);
  }

  remove(key, db_fb) {
    //console.log(item);
    //return this.db.list('courses').remove(course.key);
    return this.db.list(db_fb).remove(key);
  }

}
