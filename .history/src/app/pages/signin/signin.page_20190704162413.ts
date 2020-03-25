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

  constructor(private db: DatabaseService, private auth: AuthService) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      this.users = this.db.getUsers();
    });
  }

  validateEmail(search: string) {
    console.log("Entra en validateEmail" + search);
    if (!isNullOrUndefined(search)) {
      var serchfind: boolean;
      var regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      serchfind = regexp.test(search);
      if (!serchfind) {
        this.classLabelEmail =
          "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
        document.getElementById("msg_error_email").style.display = "block";
      } else {
        this.classLabelEmail =
          "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated validForm";
        document.getElementById("msg_error_email").style.display = "none";
      }
      return serchfind;
    } else {
      return false;
    }
  }

  validatePassword(pass: string, pass2: string) {
    console.log("heyyyy");
    if (!isNullOrUndefined(pass) && !isNullOrUndefined(pass2)) {
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
    } else {
      return false;
    }
  }

  validateName(name: string) {
    if (!isNullOrUndefined(name) && name.length > 2) {
      console.log("Longitud de name " + name.length);
      this.classLabelName =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated validForm";
      document.getElementById("msg_error_name").style.display = "none";
      return false;
    } else {
      this.classLabelName =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
      document.getElementById("msg_error_name").style.display = "block";
      return true;
    }
  }

  validateLastName(lastname: string) {
    if (!isNullOrUndefined(lastname) && lastname.length > 2) {
      console.log("Longitud de name " + lastname.length);
      this.classLabelLastName =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated validForm";
      document.getElementById("msg_error_lastname").style.display = "none";
      return true;
    } else {
      this.classLabelLastName =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
      document.getElementById("msg_error_lastname").style.display = "block";
      return false;
    }
  }

  validateUser() {
    var res: Boolean;
    if (
      !this.validateName(this.user["name"]) ||
      !this.validateLastName(this.user["lastname"]) ||
      !this.validateEmail(this.user["email"]) ||
      isNullOrUndefined(this.user["password"]) ||
      !this.validatePassword(
        this.user["password"],
        (<HTMLInputElement>document.getElementById("password2")).value
      )
    ) {
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
