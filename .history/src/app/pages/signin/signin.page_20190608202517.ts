import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "./../../services/database.service";
import { AuthService } from "./../../services/auth.service";
import { User } from "../../services/database.service";
import { Observable } from "rxjs";
import { isNullOrUndefined } from "util";

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

  validateUser() {
    var res: Boolean;
    if (
      isNullOrUndefined(this.user["name"]) ||
      isNullOrUndefined(this.user["lastname"]) ||
      isNullOrUndefined(this.user["email"]) ||
      isNullOrUndefined(this.user["birth_date"]) ||
      isNullOrUndefined(this.user["img"]) ||
      isNullOrUndefined(this.user["password"])){
res= false;
}else{
  res= true;
}

  }

  registerUser() {
    this.auth
      .register(this.user["email"], this.user["password"])
      .then(auth => {
        console.log(auth);
        this.user = {};
      })
      .catch(err => console.log(err));
  }

  addUser() {
    if (
      /* this.user["name"] == "" ||
      this.user["lastname"] == "" ||
      this.user["email"] == "" ||
      this.user["type_skin"] == "" ||
      this.user["birth_date"] == "" ||
      this.user["img"] == "" ||
      this.user["password"] == "" ||
      this.user["name"] == null ||
      this.user["lastname"] == null ||
      this.user["email"] == null ||
      this.user["type_skin"] == null ||
      this.user["birth_date"] == null ||
      this.user["img"] == null ||
      this.user["password"] == null*/

    ) {
      alert("Datos incompletos");
    } else {
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
          console.log("Agregando a Firebase..");
          this.registerUser();
        });
    }
  }
}
