import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"]
})
export class MainPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { name: "picazón", urlImage: "//df" }
    });
    await modal.present();
  }
}
