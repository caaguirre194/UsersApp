import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../../.history/src/app/services/data.service_20190603152944";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {}
}
