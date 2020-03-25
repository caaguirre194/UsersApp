import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-flag",
  templateUrl: "./flag.component.html",
  styleUrls: ["./flag.component.scss"]
})
export class FlagComponent implements OnInit {
  constructor() {}

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
