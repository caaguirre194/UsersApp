import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Observable } from "rxjs";
import { Componente } from "../../../environments/environment";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  @Output() clickExit = new EventEmitter();
  componentes: Observable<Componente[]>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

  onClickExit() {
    this.clickExit.emit();
  }
}
