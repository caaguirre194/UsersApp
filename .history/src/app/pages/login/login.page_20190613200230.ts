import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  langs: string[] = [];
  email: string;
  password: string;
  msgError: string;

  constructor(
    private authService: AuthService,
    public router: Router,
    private translate: TranslateService
  ) {
    this.langs = this.translate.getLangs();
  }

  changeLang(event) {
    this.translate.use(event.detail.value);
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
        this.msgError = this.translate.get("PAGES.LOGIN.MSG_ERROR");
      }
      });
  }
}
