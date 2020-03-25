import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { ModalComponent } from "./modal/modal.component";
@NgModule({
  declarations: [HeaderComponent, ModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, ModalComponent]
})
export class ComponentsModule {}
