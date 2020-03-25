import { Injectable } from "@angular/core";

import { Componente } from ".history/src/environments/environment_20190603152137";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMenuOpts() {
    return this.http.get<Componente[]>("/assets/data/menu.json");
  }
}
