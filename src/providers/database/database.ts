import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'govias.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, name TEXT, profileImage TEXT, password TEXT)'],
      ['CREATE TABLE IF NOT EXISTS homeData (id integer primary key AUTOINCREMENT NOT NULL, title TEXT, abbreviation TEXT)'],
      ['CREATE TABLE IF NOT EXISTS vehicle (id integer primary key AUTOINCREMENT NOT NULL, placa TEXT, status TEXT)']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from user', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        console.log(data);
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into user (username,name,profileImage,password) values (?,?,?,?)', ['ricardo','Ricardo Matta', 'http://img.freepik.com/icones-gratis/usuario-masculino-imagem-no-perfil_318-37825.jpg?size=338&ext=jpg','123456']],
            ['insert into user (username,name,profileImage,password) values (?,?,?,?)', ['andre','André de Lima e Silva', 'http://img.freepik.com/icones-gratis/usuario-masculino-imagem-no-perfil_318-37825.jpg?size=338&ext=jpg','123456']],
            ['insert into user (username,name,profileImage,password) values (?,?,?,?)', ['teste','Teste', 'http://img.freepik.com/icones-gratis/usuario-masculino-imagem-no-perfil_318-37825.jpg?size=338&ext=jpg','123456']],
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de Usuarios', e));

    db.executeSql('select COUNT(id) as qtd from homeData', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into homeData (title,abbreviation) values (?,?)', ['Faixa de Domíni','FD']],
            ['insert into homeData (title,abbreviation) values (?,?)', ['Faixa de Domíni','FD']],
            ['insert into homeData (title,abbreviation) values (?,?)', ['Produtos Perigosos','PP']],
            ['insert into homeData (title,abbreviation) values (?,?)', ['Placas de Veículo','PV']],
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de homeData', e));

    db.executeSql('select COUNT(id) as qtd from vehicle', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into vehicle (placa,status) values (?,?)', ['AUW-4325','VEÍCULO REGULAR']],
            ['insert into vehicle (placa,status) values (?,?)', ['JJJ-5555','VEÍCULO IRREGULAR']],
            ['insert into vehicle (placa,status) values (?,?)', ['FHF-3243','VEÍCULO ROUBADO']],
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de veiculos', e));
  }
}
