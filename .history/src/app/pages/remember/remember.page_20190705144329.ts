import { Component, OnInit } from "@angular/core";
import { isNullOrUndefined } from "util";


@Component({
  selector: "app-remember",
  templateUrl: "./remember.page.html",
  styleUrls: ["./remember.page.scss"]
})
export class RememberPage implements OnInit {
  classLabelEmail: string = "";

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

      this.classLabelEmail="sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated invalidForm";
              document.getElementById("msg_error_email").style.display = "block";
      } else {
         this.classLabelEmail="sc-ion-label-md-h sc-ion-label-md-s md label-floating hydrated validForm";
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
    var vEmail: Boolean = this.validateEmail(this.user["email"]);

    if (!vEmail) {
      res = false;
    } else {
      res = true;
    }
    console.log(res);
    return res;
  }
}
