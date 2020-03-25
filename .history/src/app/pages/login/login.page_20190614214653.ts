import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";
import { IonLabel } from "@ionic/angular";

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
    private translate: TranslateService,
    private popOverCtrl: PopoverController
  ) {
    this.langs = this.translate.getLangs();
  }

  async showLenguages(ev) {
    const popover = await this.popOverCtrl.create({
      component: PopoverComponent,
      event: ev,
      mode: "ios"
    });
    return await popover.present();
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
          document.getElementById("msg_error").style.display = "none";
          this.msgError = "";
        }, 1000);
      })
      .catch(err => {
        document.getElementById("msg_error").style.display = "block";
      });
  }
}
