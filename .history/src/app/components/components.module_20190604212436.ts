import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from "./menu/menu.component";
import { BodyComponent } from "./body/body.component";

@NgModule({
  declarations: [MenuComponent, BodyComponent],
  imports: [CommonModule, IonicModule],
  exports: [MenuComponent, BodyComponent]
})
export class ComponentsModule {}
