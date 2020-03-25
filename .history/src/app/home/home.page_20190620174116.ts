import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { MenuController } from "@ionic/angular";
import { Componente } from "../../../.history/src/environments/environment_20190603152137";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  componentes: Componente[] = [];

  constructor(
    public auth: AuthService,
    private menuCtrl: MenuController,
    private popOverCtrl: PopoverController
  ) {}
  logOut(event) {
    this.auth.logout();
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  ngOnInit() {}

  async showLenguages(ev) {
    const popover = await this.popOverCtrl.create({
      component: PopoverComponent,
      event: ev,
      mode: "ios"
    });
    return await popover.present();
  }
}
