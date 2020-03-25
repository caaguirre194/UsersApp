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
  classLabelLastName: string = "";
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

  validatePassword(pass: string, pass2: string) {
    if (pass2 == pass && pass2.length > 5) {
      console.log("Longitud de password2 " + pass2.length);
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

  validateName(name: string) {
    if (name.length > 1) {
      console.log("Longitud de name " + name.length);
      this.classLabelName =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated validForm";
    } else {
      this.classLabelName =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
    }
  }

  validateLastName(lastname: string) {
    if (lastname.length > 1) {
      console.log("Longitud de name " + lastname.length);
      this.classLabelLastName =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated validForm";
    } else {
      this.classLabelLastName =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
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
      !this.validatePassword(
        this.user["password"],
        (<HTMLInputElement>document.getElementById("password2")).value
      )
    ) {
      validateName(this.user["name"]);
      validateLastName(this.user["lastname"]);
      if (!this.validateEmail(this.user["email"])) {
        //this.messageInputEmail.setFocus();
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
