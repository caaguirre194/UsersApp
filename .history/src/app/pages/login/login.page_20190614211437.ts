import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";

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
  @ViewChild("msg_error") msg_error;

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

  changeLang(event) {
    this.translate.use(event.detail.value);
    if (this.msgError !== undefined) {
      this.translate.get("PAGES.LOGIN.MSG_ERROR").subscribe((res: string) => {
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
          this.msg_error.nativeElement.style = "display:none";
          this.msgError = "";
        }, 1000);
      })
      .catch(err => {
        this.msg_error.nativeElement.style = "display:block";
      });
  }
}
