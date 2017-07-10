import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { TimestampsService } from '../timestamps.service';

@Injectable()

export class EditGuard implements CanActivate{
    constructor(private timestampsService: TimestampsService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.timestampsService.edited != null){
            return true;
        } else {
            this.router.navigate(['/timer/all']);
        }
    }
}