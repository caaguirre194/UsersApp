import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "./modal.component";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ModalModule {}
