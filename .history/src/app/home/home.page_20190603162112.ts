import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { MenuController } from "@ionic/angular";
import { Componente } from "../../../.history/src/environments/environment_20190603152137";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  componentes: Componente[] = [];

  constructor(public auth: AuthService, private menuCtrl: MenuController) {}
  logOut($event) {
    this.auth.logout();
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
