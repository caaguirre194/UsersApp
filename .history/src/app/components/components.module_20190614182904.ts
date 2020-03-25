import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { PopoverComponent } from "./popover/popover.component";
import { ModalComponent } from "./modal/modal.component";
@NgModule({
  declarations: [HeaderComponent, PopoverComponent, ModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, PopoverComponent, ModalComponent]
})
export class ComponentsModule {}
