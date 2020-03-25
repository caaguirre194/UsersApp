import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MainPage } from "./main.page";
import { BodyComponent } from "../../components/body/body.component";
import { HeaderComponent } from "../../components/header/header.component";

const routes: Routes = [
  {
    path: "",
    component: MainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainPage, BodyComponent, HeaderComponent]
})
export class MainPageModule {}
