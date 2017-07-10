import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerComponent } from './timer.component';
import { AllComponent } from './all/all.component';
import { EditComponent } from './edit/edit.component';
import { StartComponent } from './start/start.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { EditGuard } from './edit/edit-guard.service';
import { CanDeactivateGuard } from './edit/can-deactivate-guard.service';

const timerRoutes: Routes = [
    { path: '', component: TimerComponent, children: [
        { path: 'all', component: AllComponent},
        { path: 'statistics', component: StatisticsComponent},
        { path: 'edit', component: EditComponent, canActivate: [EditGuard], canDeactivate: [CanDeactivateGuard]},
        { path: 'start', component: StartComponent}
    ] }    
];

@NgModule({
    imports: [
        RouterModule.forChild(timerRoutes)
    ],
    exports: [RouterModule]
})
export class TimerRoutingModule{

}