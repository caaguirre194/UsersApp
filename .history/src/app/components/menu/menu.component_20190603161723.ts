import { Component, OnInit, Output } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Observable } from "rxjs";
import { Componente } from "../../../environments/environment";
import { EventEmitter } from "events";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  @Output() clickExit = EventEmitter;
  componentes: Observable<Componente[]>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

  onClickExit() {
    console.log("Exit");
  }
}
