import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from "../../../.history/src/app/components/menu/menu.component_20190603162324";
import { BodyComponent } from "./body/body.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, IonicModule],
  exports: [MenuComponent, BodyComponent]
})
export class ComponentsModule {}
