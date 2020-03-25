import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { ModalComponent } from "./modal/modal.component";
import { PopoverComponent } from "./popover/popover.component";
import { TranslateModule } from "@ngx-translate/core";
import { BodyComponent } from "./body/body.component";
import { FlagComponent } from "./flag/flag.component";
import { MenuComponent } from "./menu/menu.component";

@NgModule({
  declarations: [
    HeaderComponent,
    ModalComponent,
    PopoverComponent,
    BodyComponent,
    FlagComponent,
    MenuComponent
  ],
  entryComponents: [PopoverComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [
    HeaderComponent,
    ModalComponent,
    PopoverComponent,
    BodyComponent,
    FlagComponent,
    MenuComponent
  ]
})
export class ComponentsModule {}
