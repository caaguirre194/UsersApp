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
  password2: string;
  classLabelEmail: string = "";
  classLabelName: string = "";
  classLabelPassword: string = "";
  classLabelPassword2: string = "";
  @ViewChild("messageInputEmail") public messageInputEmail;
  @ViewChild("messageInputName") public messageInputName;
  @ViewChild("messageInputPassword") public messageInputPassword;
  @ViewChild("messageInputPassword2") public messageInputPassword2;

  constructor(private db: DatabaseService, private auth: AuthService) {}

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
    if (
      document.getElementById("password2").value == pass &&
      document.getElementById("password2").value.length > 5
    ) {
      console.log(document.getElementById("password2").value.length);
      this.classLabelPassword =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated validForm";
      this.classLabelPassword2 =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated validForm";
      return true;
    } else {
      this.classLabelPassword =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
      this.classLabelPassword2 =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
      return false;
    }
  }

  validateUser() {
    var res: Boolean;
    if (
      isNullOrUndefined(this.user["name"]) ||
      isNullOrUndefined(this.user["lastname"]) ||
      isNullOrUndefined(this.user["email"]) ||
      isNullOrUndefined(this.user["password"]) ||
      !this.validateEmail(this.user["email"]) ||
      !this.validatePassword(this.user["password"])
    ) {
      if (!this.validateEmail(this.user["email"])) {
        this.messageInputEmail.setFocus();
        this.classLabelEmail =
          "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
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
        .addUser(
          this.user["name"],
          this.user["lastname"],
          this.user["email"],
          this.user["password"]
        )
        .then(_ => {
          console.log("Agregando a Firebase..");
          this.registerUser();
        });
    }
  }
}
