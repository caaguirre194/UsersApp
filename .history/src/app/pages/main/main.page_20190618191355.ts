import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalComponent } from "../../components/modal/modal.component";
import { ViewChild } from "@angular/core";
import { Slides } from "ionic-angular";

@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"]
})
export class MainPage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openModal(nameModale, urlImageModale) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { name: nameModale, urlImage: urlImageModale }
    });
    await modal.present();
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }
}
