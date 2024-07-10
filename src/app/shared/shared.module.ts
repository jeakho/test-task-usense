import { NgModule } from "@angular/core";
import { CurrencyValueDirective } from "./directives/currency-value.directive";
import { MaterialModule } from "./material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        HttpClientModule,
        
        CurrencyValueDirective, 
        MaterialModule
    ],
    exports: [
        CommonModule, 
        FormsModule,
        HttpClientModule,
        CurrencyValueDirective, 
        MaterialModule
    ]
})
export class SharedModule {}