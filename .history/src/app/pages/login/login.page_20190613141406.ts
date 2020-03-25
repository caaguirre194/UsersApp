import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthService,
    public router: Router,
    public alertController: AlertController
  ) {}
  email: string;
  password: string;
  msgError: string;

  ngOnInit() {}

  onSubmitLogin() {
    this.authService
      .login(this.email, this.password)
      .then(res => {
        this.router.navigate(["/home"]);
      })
      .catch(err => {
        this.msgError =
          "El email y contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.";
        this.IncorrectDataAlert();
      });
  }

  async IncorrectDataAlert() {
    const alert = await this.alertController.create({
      message:
        "El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
