import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "./../../services/database.service";
import { AuthService } from "./../../services/auth.service";
import { User } from "../../services/database.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"]
})
export class SigninPage implements OnInit {
  users: Observable<User[]>;
  user = {};
  selectedView = "users";

  constructor(private db: DatabaseService, private auth: AuthService) {}
  name: string;
  lastname: string;
  email: string;
  type_skin: string;
  birth_date: string;
  img: string;
  password: string;

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      this.users = this.db.getUsers();
    });
  }

  registerUser() {
    this.auth
      .register(this.user["password"], this.user["email"])
      .then(auth => {
        console.log(auth);
      })
      .catch(err => console.log(err));
  }

  addUser() {
    this.db
      .addUser(
        this.user["name"],
        this.user["lastname"],
        this.user["email"],
        this.user["type_skin"],
        this.user["birth_date"],
        this.user["img"],
        this.user["password"]
      )
      .then(_ => {
       console.log(this.["password"]+"----"+ this.user["email"]);
        this.registerUser();
        this.user = {};
      });
  }
}
