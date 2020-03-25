import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { PopoverComponent } from "./popover/popover.component";
@NgModule({
  declarations: [HeaderComponent, PopoverComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, PopoverComponent]
})
export class ComponentsModule {}
