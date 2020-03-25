import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../../.history/src/app/services/data.service_20190603152944";
import { Observable } from "rxjs";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  componentes: Observable<Component>;

  constructor(private dataService: DataService) {}

  ngOnInit() {}
}
