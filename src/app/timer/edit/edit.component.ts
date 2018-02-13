import { ElementRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take'; 
import 'rxjs/add/operator/switchMap'; 

import { CanComponentDeactivate } from './can-deactivate-guard.service';
import * as fromTimer from '../store/timer.reducers';
import * as TimerActions from '../store/timer.actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, CanComponentDeactivate, OnDestroy {
    editForm: FormGroup;
    isSaved: boolean = false;
    isDeleted: boolean = false;
    @ViewChild('confirm') confirmTranslation : ElementRef;
    
  constructor(private store: Store<fromTimer.FeatureState>, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy(){
     this.store.dispatch(new TimerActions.StopEdit());
  }
 
  private initForm(){
        let formCategories = new FormArray([], this.validatorAtLeastOneCategory);
        this.store.select('timer').take(1).subscribe(
            (timerState: fromTimer.State) =>{
                const timestamp = timerState.editedTimestamp;
                if(timestamp['categories']){
                    for(let category of timestamp.categories){
                        formCategories.push(
                            new FormControl(category, Validators.required)               
                        );
                    }
                }
                this.editForm = new FormGroup({
                    'name': new FormControl(timestamp.name, Validators.required),
                    'categories': formCategories,
                    'description': new FormControl(timestamp.description, Validators.required),
                    'day': new FormControl(timestamp.day, Validators.required),
                    'month': new FormControl(timestamp.month, Validators.required),
                    'year': new FormControl(timestamp.year, Validators.required),
                    'startHour': new FormControl(timestamp.startHour, Validators.required),
                    'startMinute': new FormControl(timestamp.startMinute, Validators.required),
                    'endHour': new FormControl(timestamp.endHour, Validators.required),
                    'endMinute': new FormControl(timestamp.endMinute, Validators.required)
                });            
            }
        );
    }
 
    validatorAtLeastOneCategory(formArray: FormArray){
        if(formArray.length == 0){
            return { 'noCategories': true};
        }
        return null;
    }
    
    onAddCategory(){
        (<FormArray>this.editForm.get('categories')).push(
                new FormControl(null, Validators.required)
        );
    }

    getCategories() {
        return (<FormArray>this.editForm.get('categories')).controls;
    }
    
    onDeleteCategory(index: number){
        (<FormArray>this.editForm.get('categories')).removeAt(index);
    }
        
    deleteTimestamp(){
        this.store.dispatch(new TimerActions.DeleteTimestamp());
        this.isDeleted = true;
        setTimeout(this.finish.bind(this), 1200);
    }
    
    onSubmit(){
        this.store.dispatch(new TimerActions.UpdateTimestamp(this.editForm.value));
        this.isSaved = true;
        setTimeout(this.finish.bind(this),1200);
    }
    
    finish(){
         this.isSaved = true;
         this.store.dispatch(new TimerActions.StopEdit());
         this.router.navigate(['/timer/all']);               
    }
    
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if(this.isSaved){
            return true;
        } else{
            let con = confirm(this.confirmTranslation.nativeElement.textContent);
            if (con == true) {
                return true;
            } else {
                return false;
            }        
        }
    }
}
