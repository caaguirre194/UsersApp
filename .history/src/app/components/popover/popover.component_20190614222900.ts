import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"]
})
export class PopoverComponent implements OnInit {
  langs: string[] = [];
  constructor(
    private translate: TranslateService,
    private popoverCtrl: PopoverController
  ) {
    this.langs = this.translate.getLangs();
  }

  ngOnInit() {}

  changeLang(event) {
    this.translate.use(event.detail.value);
    this.popoverCtrl.dismiss();
  }
}
