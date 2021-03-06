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
    this.translate.use(event);
  }

  clickLang(x) {
    console.log(x);
    this.changeLang(x);
    this.popoverCtrl.dismiss({ lang: x });
  }
}
