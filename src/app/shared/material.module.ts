import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
    imports: [
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule
    ],
    exports: [
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule
    ]
  })
  export class MaterialModule { }