import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PopoverComponent } from "./popover.component";

@NgModule({
  declarations: [PopoverComponent],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class PopoverModule {}
