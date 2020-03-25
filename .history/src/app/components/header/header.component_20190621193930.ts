import { Component, OnInit, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string;

  constructor(private popOverCtrl: PopoverController) {}

  ngOnInit() {}
}
