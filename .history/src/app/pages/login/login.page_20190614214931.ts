import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    public router: Router,
    private popOverCtrl: PopoverController
  ) {}

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
        }, 1000);
      })
      .catch(err => {
        document.getElementById("msg_error").style.display = "block";
      });
  }
}
