import {
  Component,
  ViewChild,
  trigger,
  transition,
  style,
  state,
  animate,
  keyframes,
  OnInit
} from "@angular/core";
import { NavController, Slides } from "ionic-angular";

@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"],
  animations: [
    trigger("bounce", [
      state(
        "*",
        style({
          transform: "translateX(0)"
        })
      ),
      transition(
        "* => rightSwipe",
        animate(
          "700ms ease-out",
          keyframes([
            style({ transform: "translateX(0)", offset: 0 }),
            style({ transform: "translateX(-65px)", offset: 0.3 }),
            style({ transform: "translateX(0)", offset: 1 })
          ])
        )
      ),
      transition(
        "* => leftSwipe",
        animate(
          "700ms ease-out",
          keyframes([
            style({ transform: "translateX(0)", offset: 0 }),
            style({ transform: "translateX(65px)", offset: 0.3 }),
            style({ transform: "translateX(0)", offset: 1 })
          ])
        )
      )
    ])
  ]
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
