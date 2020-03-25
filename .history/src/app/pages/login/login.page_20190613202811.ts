import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { isNullOrUndefined } from “util”;

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  langs: string[] = [];
  email: string;
  password: string;
  msgError: any;

  constructor(
    private authService: AuthService,
    public router: Router,
    private translate: TranslateService
  ) {
    this.langs = this.translate.getLangs();
  }

  changeLang(event) {
    console.log(this.msgError);
    this.translate.use(event.detail.value);
    if (isNullOrUndefined(this.msgError)) {
      this.translate.get("PAGES.LOGIN.MSG_ERROR").subscribe((res: string) => {
        console.log(res);
        this.msgError = res;
      });
    }
  }

  ngOnInit() {}

  onSubmitLogin() {
    this.authService
      .login(this.email, this.password)
      .then(res => {
        this.router.navigate(["/home"]);
        setTimeout(() => {
          this.email = "";
          this.password = "";
          this.msgError = "";
        }, 1000);
      })
      .catch(err => {
        this.translate.get("PAGES.LOGIN.MSG_ERROR").subscribe((res: string) => {
          console.log(res);
          this.msgError = res;
        });
      });
  }
}
