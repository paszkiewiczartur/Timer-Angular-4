import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { TimestampsService } from '../timer/timestamps.service';
import { DataStorageService } from '../shared/data-storage.service';
import { EditGuard } from '../timer/edit/edit-guard.service';
import { CanDeactivateGuard } from '../timer/edit/can-deactivate-guard.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        CommonModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [
        DataStorageService, 
        TimestampsService,
        EditGuard,
        CanDeactivateGuard,
        AuthService,
        AuthGuard
    ]
})
export class CoreModule{

}