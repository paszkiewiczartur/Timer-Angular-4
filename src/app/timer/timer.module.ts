import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimerComponent } from './timer.component';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { AllComponent } from './all/all.component';
import { StartComponent } from './start/start.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { EditComponent } from './edit/edit.component';
import { TimerRoutingModule } from './timer-routing.module';
import { UnfinishedPipe } from './pipes/unfinished.pipe';
import { LeadingZeroPipe } from './pipes/leadingZero.pipe';
import { UntilNowPipe } from './pipes/untilNow.pipe';
import { RangePipe } from './pipes/range.pipe';
import { PageCountPipe } from './pipes/pageCount.pipe';
import { timerReducer } from './store/timer.reducers';
import { TimerEffects } from './store/timer.effects';

@NgModule({
    declarations: [
       TimerComponent,
       AllComponent,
       StartComponent,
       StatisticsComponent,
       EditComponent,
       LeadingZeroPipe,
       UnfinishedPipe,
       UntilNowPipe,
       RangePipe,
       PageCountPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        TimerRoutingModule,
       // BrowserAnimationsModule,
        MatAutocompleteModule,
        MatInputModule,
        StoreModule.forFeature('timer', timerReducer),
        EffectsModule.forFeature([TimerEffects])
    ]
})
export class TimerModule{

}