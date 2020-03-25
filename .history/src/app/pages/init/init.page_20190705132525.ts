import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-init",
  templateUrl: "./init.page.html",
  styleUrls: ["./init.page.scss"]
})
export class InitPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
  onSubmitLogin() {}
}
