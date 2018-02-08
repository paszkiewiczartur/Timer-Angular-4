import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { EditGuard } from '../timer/edit/edit-guard.service';
import { CanDeactivateGuard } from '../timer/edit/can-deactivate-guard.service';
import { AuthInterceptor } from '../shared/auth.interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        FooterComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        CommonModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        EditGuard,
        CanDeactivateGuard,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ]
})
export class CoreModule{

}