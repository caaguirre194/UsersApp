import { Component, OnInit } from "@angular/core";
import { DatabaseService, Dev } from "./../../services/database.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"]
})
export class SigninPage implements OnInit {
  constructor(private db: DatabaseService) {}
  name: string;
  lastname: string;
  type_skin: string;
  birth_date: string;
  img: string;

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        });
        this.products = this.db.getProducts();
      }
    });
  }
}
