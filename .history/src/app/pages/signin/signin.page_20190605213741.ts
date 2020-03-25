import { Component, OnInit } from "@angular/core";
import { DatabaseService, User } from "./../../services/database.service";
import { User } from "../../services/database.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"]
})
export class SigninPage implements OnInit {
  users: User[] = [];

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
      .addUser(
        this.user["name"],
        this.user["lastname"],
        this.user["type_skin"],
        this.user["birth_date"],
        this.user["img"]
      )
      .then(_ => {
        this.user = {};
      });
  }
}
