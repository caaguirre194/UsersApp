import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { RememberPage } from "./remember.page";
import { ComponentsModule } from "../../../../.history/src/app/components/components.module_20190606135948";

const routes: Routes = [
  {
    path: "",
    component: RememberPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RememberPage]
})
export class RememberPageModule {}
