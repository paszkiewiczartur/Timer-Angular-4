import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimerComponent } from './timer.component';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdAutocompleteModule} from '@angular/material';
import {MdInputModule} from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { AllComponent } from './all/all.component';
import { StartComponent } from './start/start.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { EditComponent } from './edit/edit.component';
import { TimerRoutingModule } from './timer-routing.module';
import { UnfinishedPipe } from './unfinished.pipe';
import { LeadingZeroPipe } from './leadingZero.pipe';
import { UntilNowPipe } from './untilNow.pipe';
import { RangePipe } from './range.pipe';
import { PageCountPipe } from './pageCount.pipe';

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
        MdAutocompleteModule,
        MdInputModule
    ]
})
export class TimerModule{

}