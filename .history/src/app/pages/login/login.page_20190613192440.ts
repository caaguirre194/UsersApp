import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  langs: string[] = [];

  constructor(private authService: AuthService, public router: Router) {
    this.langs = this.translate.getLangs();
    this.translate.get("HELLO").subscribe((res: string) => {
      console.log(res);
    });
    this.translate
      .stream("GREETING", { name: "nicolas" })
      .subscribe((res: string) => {
        console.log(res);
      });
  }
  email: string;
  password: string;
  msgError: string;

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
        this.msgError =
          "El email y contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.";
      });
  }
}
