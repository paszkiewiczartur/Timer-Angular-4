import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { FooterMarginDirective } from './footer.directive';

@NgModule({
    declarations: [
        DropdownDirective,
        FooterMarginDirective
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        FooterMarginDirective
    ]
})
export class SharedModule{

}