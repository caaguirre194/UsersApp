import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-remember",
  templateUrl: "./remember.page.html",
  styleUrls: ["./remember.page.scss"]
})
export class RememberPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  validateEmail(search: string) {
    console.log("Entra en validateEmail" + search);
    if (!isNullOrUndefined(search)) {
      var serchfind: boolean;
      var regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      serchfind = regexp.test(search);
      if (serchfind == false) {
        document.getElementById("msg_error_email").style.display = "block";
      } else {
        document.getElementById("msg_error_email").style.display = "none";
      }

      return serchfind;
    } else {
      this.validateInput(false, "Email", "msg_error_email");
      return false;
    }
  }

  validate() {
    var res: Boolean;
    var vName: Boolean = this.validateName(this.user["name"]);
    var vLastName: Boolean = this.validateLastName(this.user["lastname"]);
    var vEmail: Boolean = this.validateEmail(this.user["email"]);
    var vPassword: Boolean = this.validatePassword(
      this.user["password"],
      (<HTMLInputElement>document.getElementById("password2")).value
    );
    var vTerm: Boolean = this.validateTerm();

    if (!vName || !vLastName || !vEmail || !vPassword || !this.term) {
      res = false;
    } else {
      res = true;
    }
    console.log(res);
    return res;
  }
}
