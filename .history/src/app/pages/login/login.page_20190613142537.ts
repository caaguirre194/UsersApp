import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, public router: Router) {}
  email: string;
  password: string;
  msgError: string;

  ngOnInit() {}

  onSubmitLogin() {
    this.msgError = "";
    this.authService
      .login(this.email, this.password)
      .then(res => {
        this.email = "";
        this.password = "";
        this.router.navigate(["/home"]);
      })
      .catch(err => {
        this.msgError =
          "El email y contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.";
      });
  }
}
