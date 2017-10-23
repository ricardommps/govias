import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleProvider {

  constructor(private dbProvider: DatabaseProvider) {
    console.log('Hello VehicleProvider Provider');
  }

  public checkPlaca(placa: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from vehicle where placa = ?';
        let data = [placa];

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
