import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(public auth: AuthService, private menuCtrl: MenuController) {}
  logOut() {
    this.auth.logout();
  }
  toggleMenu() {}
}
