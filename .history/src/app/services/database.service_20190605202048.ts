import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { HttpClient } from "@angular/common/http";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject, Observable } from "rxjs";

export interface User {
  id: number;
  name: string;
  skills: any[];
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
              last_name: data.rows.item(i).last_name,

              img: data.rows.item(i).img
            });
          }
        }
        this.users.next(users);
      });
  }

  addDeveloper(name, skills, img) {
    let data = [name, JSON.stringify(skills), img];
    return this.database
      .executeSql(
        "INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)",
        data
      )
      .then(data => {
        this.loadDevelopers();
      });
  }

  getDeveloper(id): Promise<Dev> {
    return this.database
      .executeSql("SELECT * FROM developer WHERE id = ?", [id])
      .then(data => {
        let skills = [];
        if (data.rows.item(0).skills != "") {
          skills = JSON.parse(data.rows.item(0).skills);
        }

        return {
          id: data.rows.item(0).id,
          name: data.rows.item(0).name,
          skills: skills,
          img: data.rows.item(0).img
        };
      });
  }

  deleteDeveloper(id) {
    return this.database
      .executeSql("DELETE FROM developer WHERE id = ?", [id])
      .then(_ => {
        this.loadDevelopers();
        this.loadProducts();
      });
  }

  updateDeveloper(dev: Dev) {
    let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    return this.database
      .executeSql(
        `UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${
          dev.id
        }`,
        data
      )
      .then(data => {
        this.loadDevelopers();
      });
  }

  loadProducts() {
    let query =
      "SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId";
    return this.database.executeSql(query, []).then(data => {
      let products = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          products.push({
            name: data.rows.item(i).name,
            id: data.rows.item(i).id,
            creator: data.rows.item(i).creator
          });
        }
      }
      this.products.next(products);
    });
  }

  addProduct(name, creator) {
    let data = [name, creator];
    return this.database
      .executeSql("INSERT INTO product (name, creatorId) VALUES (?, ?)", data)
      .then(data => {
        this.loadProducts();
      });
  }
}
