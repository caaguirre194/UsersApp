import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { HttpClient } from "@angular/common/http";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject, Observable } from "rxjs";

export interface User {
  id: number;
  name: string;
  lastname: string;
  type_skin: string;
  birth_date: string;
  img: string;
}

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  users = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
  ) {
    this.plt.ready().then(() => {
      this.sqlite
        .create({
          name: "users.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    this.http
      .get("assets/seed.sql", { responseType: "text" })
      .subscribe(sql => {
        this.sqlitePorter
          .importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadUsers();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getDevs(): Observable<User[]> {
    return this.users.asObservable();
  }

  loadUsers() {
    User;
    return this.database
      .executeSql("SELECT * FROM developer", [])
      .then(data => {
        let users: User[] = [];

        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            users.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              lastname: data.rows.item(i).lastname,
              type_skin: data.rows.item(i).type_skin,
              birth_date: data.rows.item(i).birth_date,
              img: data.rows.item(i).img
            });
          }
        }
        this.users.next(users);
      });
  }

  addUser(name, lastname, type_skin, birth_date, img) {
    let data = [name, lastname, type_skin, birth_date, img];
    return this.database
      .executeSql(
        "INSERT INTO user (name, lastname, type_skin, birth_date, img) VALUES (?, ?, ?, ?, ?)",
        data
      )
      .then(data => {
        this.loadUsers();
      });
  }

  getDeveloper(id): Promise<user> {
    return this.database
      .executeSql("SELECT * FROM user WHERE id = ?", [id])
      .then(data => {
        return {
          id: data.rows.item(0).id,
          name: data.rows.item(0).name,
          lastname: data.rows.item(0).lastname,
          type_skin: data.rows.item(0).type_skin,
          birth_date: data.rows.item(0).birth_date,
          img: data.rows.item(0).img
        };
      });
  }

  deleteUser(id) {
    return this.database
      .executeSql("DELETE FROM user WHERE id = ?", [id])
      .then(_ => {
        this.loadUsers();
      });
  }

  updateuser(user: User) {
    let data = [
      user.name,
      user.lastname,
      user.type_skin,
      user.birth_date,
      user.img
    ];
    return this.database
      .executeSql(
        `UPDATE user SET name = ?, lastname = ?,type_skin = ?, birth_date = ?,img = ? WHERE id = ${
          user.id
        }`,
        data
      )
      .then(data => {
        this.loadUsers();
      });
  }
}
