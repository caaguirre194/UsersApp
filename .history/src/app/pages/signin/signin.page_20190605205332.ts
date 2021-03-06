import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"]
})
export class SigninPage implements OnInit {
  constructor(private authService: AuthService, public router: Router) {}
  name: string;
  lastname: string;

  ngOnInit() {}
}
