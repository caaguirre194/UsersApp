import { Component, OnInit } from "@angular/core";
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
  salir() {
    this.modalCtrl.dismiss();
  }
}
