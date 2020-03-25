import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @Input() name;
  @Input() urlImage;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  exit() {
    this.modalCtrl.dismiss();
  }
  selection(num) {
    this.modalCtrl.dismiss({
      number: num
    });
  }
}
