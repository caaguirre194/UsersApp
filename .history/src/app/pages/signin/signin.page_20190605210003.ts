import { Component, OnInit } from "@angular/core";

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

  ngOnInit() {}
}
