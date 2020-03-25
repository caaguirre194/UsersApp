import { Component, OnInit, ViewChild } from "@angular/core";
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
  password2: string;

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      this.users = this.db.getUsers();
    });
  }

  validateEmail(search: string) {
    var serchfind: boolean;
    var regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    serchfind = regexp.test(search);
    return serchfind;
  }

  validatePassword(pass: string) {
    if (this.password2 == pass) {
      return true;
    } else {
      return false;
    }
  }
  @ViewChild("messageInputEmail") public messageInputEmail;
  @ViewChild("labelEmail") public labelEmail;
  @ViewChild("messageInputName") public messageInputName;
  @ViewChild("messageInputPassword") public messageInputPassword;
  @ViewChild("messageInputPassword2") public messageInputPassword2;

  validateUser() {
    var res: Boolean;
    if (
      isNullOrUndefined(this.user["name"]) ||
      isNullOrUndefined(this.user["email"]) ||
      isNullOrUndefined(this.user["password"]) ||
      !this.validateEmail(this.user["email"]) ||
      !this.validatePassword(this.user["password"])
    ) {
      if (!this.validateEmail(this.user["email"])) {
        this.messageInputEmail.setFocus();
        document.getElementById("label_email").style.color = "red";
        document.getElementById("msg_error_email").style.display = "block";
      }
      if (!this.validatePassword(this.user["password"])) {
        // this.messageInputPassword.setFocus();
        document.getElementById("msg_error_password").style.display = "block";
      }
      res = false;
    } else {
      res = true;
    }
    console.log(res);
    return res;
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
    if (this.validateUser()) {
      this.db
        .addUser(this.user["name"], this.user["email"], this.user["password"])
        .then(_ => {
          console.log("Agregando a Firebase..");
          this.registerUser();
        });
    }
  }
}
