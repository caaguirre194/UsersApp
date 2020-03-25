import { Component, OnInit } from "@angular/core";
import { DatabaseService, Dev } from "./../../services/database.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"]
})
export class SigninPage implements OnInit {
  users: Dev[] = [];

  user = {};

  selectedView = "users";

  constructor(private db: DatabaseService) {}
  name: string;
  lastname: string;
  type_skin: string;
  birth_date: string;
  img: string;

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      this.users = this.db.getUsers();
    });
  }

  addUser() {
    this.db
      .addProduct(
        this.product["name"],
        this.product["lastname"],
        this.product["type_skin"],
        this.product["birth_date"],
        this.product["img"]
      )
      .then(_ => {
        this.product = {};
      });
  }
}
