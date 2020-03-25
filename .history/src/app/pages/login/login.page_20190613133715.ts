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

  ngOnInit() {}

  onSubmitLogin() {
    this.authService
      .login(this.email, this.password)
      .then(res => {
        this.router.navigate(["/home"]);
      })
      .catch(err => {
        alert("Datos incorrectos...");
        this.presentAlert();
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Fallo inicio de sesión",
      subHeader: "Datos incorrectos",
      message: "Valide que el email y password sean correctos.",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
