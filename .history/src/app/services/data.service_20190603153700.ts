import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Componente } from ".history/src/environments/environment_20190603152137";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMenuOpts() {
    return this.http.get<Componente[]>("/assets/data/menu.json");
  }
}
