import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { TimerComponent } from './timer/timer.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'timer', loadChildren: './timer/timer.module#TimerModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
