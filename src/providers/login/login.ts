import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }

  public login(username: string, password: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from user where username = ? and password = ?';
        let data = [username,password];

        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log(data);
            console.log(data.rows.item);
            if (data.rows.length > 0) {
              return data.rows.item(0);
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
