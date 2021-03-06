import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../../components/components.module";
import { LoginPage } from "./login.page";
import { TranslateModule } from "@ngx-translate/core";
import { PopoverComponent } from "../../components/popover/popover.component";

const routes: Routes = [
  {
    path: "",
    component: LoginPage
  }
];

@NgModule({
  entryComponents: [PopoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    PopoverModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
