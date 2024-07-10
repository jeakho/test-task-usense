import { NgModule, Optional, SkipSelf } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CurrencyService } from "../currency.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
      // CommonModule, 
      // FormsModule,
      // HttpClientModule
    ],
    // providers: [CurrencyService],
    // exports: [CommonModule, FormsModule, HttpClientModule]
  })
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
          throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
        }
    }
}