import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
    declarations: [],
    imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,MatToolbarModule,MatRadioModule],
    exports: [MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,MatToolbarModule,MatRadioModule],
})
export class MaterialModule {}
