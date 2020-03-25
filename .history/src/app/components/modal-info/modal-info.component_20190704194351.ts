import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modal-info",
  templateUrl: "./modal-info.component.html",
  styleUrls: ["./modal-info.component.scss"]
})
export class ModalInfoComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  exit() {
    this.modalCtrl.dismiss();
  }
}
