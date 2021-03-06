import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { HttpClient } from "@angular/common/http";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject, Observable } from "rxjs";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
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

  getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }

  loadUsers() {
    return this.database.executeSql("SELECT * FROM user", []).then(data => {
      let users: User[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            email: data.rows.item(i).email,
            password: data.rows.item(i).password
          });
        }
      }
      this.users.next(users);
      console.log("Usuarios:");
      console.log(this.users);
    });
  }

  addUser(name, email, password) {
    let data = [name, email, password];
    console.log("Solicitud de agregar usuario.");
    console.log(data);
    return this.database
      .executeSql(
        "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
        data
      )
      .then(data => {
        console.log("Nuevo usuario agregado.");
        this.loadUsers();
      });
  }

  getUser(id): Promise<User> {
    return this.database
      .executeSql("SELECT * FROM user WHERE id = ?", [id])
      .then(data => {
        console.log("Usuario:");
        return {
          id: data.rows.item(0).id,
          name: data.rows.item(0).name,
          email: data.rows.item(0).email,
          password: data.rows.item(0).password
        };
      });
  }

  deleteUser(id) {
    return this.database
      .executeSql("DELETE FROM user WHERE id = ?", [id])
      .then(_ => {
        console.log("Usuario eliminado.");
        this.loadUsers();
      });
  }

  updateUser(user: User) {
    let data = [user.name, user.email, user.password];
    return this.database
      .executeSql(
        `UPDATE user SET name = ?, email = ?, password =? WHERE id = ${
          user.id
        }`,
        data
      )
      .then(data => {
        console.log("Usuario actualizado.");
        this.loadUsers();
      });
  }
}
