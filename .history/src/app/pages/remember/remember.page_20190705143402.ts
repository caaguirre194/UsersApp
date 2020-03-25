import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-remember",
  templateUrl: "./remember.page.html",
  styleUrls: ["./remember.page.scss"]
})
export class RememberPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  validateEmail() {
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
