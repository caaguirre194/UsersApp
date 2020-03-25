import { Component, OnInit, ViewChild } from "@angular/core";
import { DatabaseService } from "./../../services/database.service";
import { AuthService } from "./../../services/auth.service";
import { User } from "../../services/database.service";
import { Observable } from "rxjs";
import { isNullOrUndefined } from "util";
import { strict } from "assert";
import { ModalController } from "@ionic/angular";
import { ModalInfoComponent } from "../../components/modal-info/modal-info.component";
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
  term: Boolean = false;

  constructor(
    private db: DatabaseService,
    private auth: AuthService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      this.users = this.db.getUsers();
    });
  }

  async openModalTerm() {
    const modal = await this.modalCtrl.create({
      component: ModalInfoComponent,
      cssClass: "my-custom-modal-css"
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.term = data;
    console.log("Retorno", data);
    console.log("Term", this.term);
  }

  validateInput(state: boolean, label: string, msgError: string) {
    var lbl: string = "";
    if (state == false) {
      lbl =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
      document.getElementById(msgError).style.display = "block";
    } else {
      lbl =
        "sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated validForm";
      document.getElementById(msgError).style.display = "none";
    }
    switch (label) {
      case "Name": {
        this.classLabelName = lbl;
        break;
      }
      case "LastName": {
        this.classLabelLastName = lbl;
        break;
      }
      case "Email": {
        this.classLabelEmail = lbl;
        break;
      }
      case "Password": {
        this.classLabelPassword = lbl;
        break;
      }
      case "Password2": {
        this.classLabelPassword2 = lbl;
        break;
      }
    }
  }

  validateTerm(e): void {
    var isChecked = e.currentTarget.checked;
    this.term = !isChecked;
    console.log(!isChecked); //undefined
  }

  validateEmail(search: string) {
    console.log("Entra en validateEmail" + search);
    if (!isNullOrUndefined(search)) {
      var serchfind: boolean;
      var regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      serchfind = regexp.test(search);
      if (serchfind == false) {
        this.validateInput(false, "Email", "msg_error_email");
      } else {
        this.validateInput(true, "Email", "msg_error_email");
      }
      return serchfind;
    } else {
      this.validateInput(false, "Email", "msg_error_email");
      return false;
    }
  }

  validatePassword(pass: string, pass2: string) {
    if (!isNullOrUndefined(pass) && !isNullOrUndefined(pass2)) {
      if (pass2 == pass && pass2.length > 5) {
        this.validateInput(true, "Password", "msg_error_password");
        this.validateInput(true, "Password2", "msg_error_password2");
        return true;
      } else if (pass2 == pass && pass2.length <= 5) {
        this.validateInput(false, "Password", "msg_error_password");
        this.validateInput(true, "Password2", "msg_error_password2");
        return false;
      } else if (pass2 != pass && pass.length > 5) {
        this.validateInput(true, "Password", "msg_error_password");
        this.validateInput(false, "Password2", "msg_error_password2");
        return false;
      } else if (pass2 != pass && pass.length == 0) {
        this.validateInput(false, "Password", "msg_error_password");
        this.validateInput(false, "Password2", "msg_error_password2");
        return false;
      }
    } else {
      this.validateInput(false, "Password", "msg_error_password");
      this.validateInput(false, "Password2", "msg_error_password");
      return false;
    }
  }

  validateName(name: string) {
    if (!isNullOrUndefined(name)) {
      if (name.length > 2) {
        this.validateInput(true, "Name", "msg_error_name");
        return true;
      } else {
        this.validateInput(false, "Name", "msg_error_name");
        return false;
      }
    } else {
      this.validateInput(false, "Name", "msg_error_name");
      return false;
    }
  }

  validateLastName(lastname: string) {
    if (!isNullOrUndefined(lastname)) {
      if (lastname.length > 2) {
        this.validateInput(true, "LastName", "msg_error_lastname");
        return true;
      } else {
        this.validateInput(false, "LastName", "msg_error_lastname");
        return false;
      }
    } else {
      this.validateInput(false, "LastName", "msg_error_lastname");
      return false;
    }
  }

  validateUser() {
    var res: Boolean;
    var vName: Boolean = this.validateName(this.user["name"]);
    var vLastName: Boolean = this.validateLastName(this.user["lastname"]);
    var vEmail: Boolean = this.validateEmail(this.user["email"]);
    var vPassword: Boolean = this.validatePassword(
      this.user["password"],
      (<HTMLInputElement>document.getElementById("password2")).value
    );
    if (!vName || !vLastName || !vEmail || !vPassword) {
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
