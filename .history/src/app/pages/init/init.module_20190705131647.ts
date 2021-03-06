import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { PopoverComponent } from "../../components/popover/popover.component";
import { IonicModule } from "@ionic/angular";
import { InitPage } from "./init.page";

const routes: Routes = [
  {
    path: "",
    component: InitPage
  }
];

@NgModule({
  entryComponents: [PopoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InitPage]
})
export class InitPageModule {}
