import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal-info",
  templateUrl: "./modal-info.component.html",
  styleUrls: ["./modal-info.component.scss"]
})
export class ModalInfoComponent implements OnInit {
  @Input() title;
  @Input() content;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  exit() {
    this.modalCtrl.dismiss();
  }
}
