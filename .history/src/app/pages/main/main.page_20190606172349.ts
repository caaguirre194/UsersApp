import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"]
})
export class MainPage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";
  state: string = "x";

  constructor(public navCtrl: NavController) {}

  skip() {
    this.navCtrl.push(MainPage);
  }

  slideChanged() {
    if (this.slides.isEnd()) this.skipMsg = "Alright, I got it";
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = "rightSwipe";
    else this.state = "leftSwipe";
  }

  animationDone() {
    this.state = "x";
  }
}
