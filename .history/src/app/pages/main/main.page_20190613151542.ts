import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"]
})
export class MainPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  openModal() {
    this.modalCtrl.create({
      component: MyModalComponent,
      componentProps: { prop1: value, prop2: value2 }
    });
  }
}
