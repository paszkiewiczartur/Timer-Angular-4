import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { CommonModule } from'@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { TimerModule } from './timer/timer.module';
import { AuthModule } from './auth/auth.module';
import { reducers } from './store/app.reducers';
import { environment } from '../environments/environment';
import { AuthEffects } from './auth/store/auth.effects';

import * as win from './shared/window';
@Injectable()


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //CommonModule,
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    TimerModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    //!environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {provide: win.WindowWrapper, useFactory: win.getWindow}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
