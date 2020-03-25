import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MainPage } from "./main.page";
import { BodyComponent } from "../../components/body/body.component";
import { ComponentsModule } from "../../components/components.module";
import { ModalComponent } from "../../components/modal/modal.component";
import { ModalModule } from "../../../../.history/src/app/components/modal/modal.module_20190613152639";

const routes: Routes = [
  {
    path: "",
    component: MainPage
  }
];

@NgModule({
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ModalModule
  ],
  declarations: [MainPage, BodyComponent]
})
export class MainPageModule {}
