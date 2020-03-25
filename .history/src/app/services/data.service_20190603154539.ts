import { Injectable } from "@angular/core";

import { Componente } from "../../environments/environment";
import { HttpClientModule } from "@angular/common/http";
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
