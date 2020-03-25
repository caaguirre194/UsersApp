import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { ModalComponent } from "./modal/modal.component";
import { PopoverComponent } from "./popover/popover.component";
@NgModule({
  declarations: [HeaderComponent, ModalComponent, PopoverComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, ModalComponent, PopoverComponent]
})
export class ComponentsModule {}
