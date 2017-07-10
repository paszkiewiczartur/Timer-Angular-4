import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TimestampsService } from '../timestamps.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, CanComponentDeactivate, OnDestroy {
    id: number;
    editForm: FormGroup;
    isSaved: boolean = false;
    isDeleted: boolean = false;
    
  constructor(private timestampsService: TimestampsService, private router: Router) { }

  ngOnInit() {
    this.id = this.timestampsService.edited;
    this.initForm();
  }

    ngOnDestroy(){
        this.timestampsService.edited = null;
    }

    getCategories(addForm) {
        return addForm.get('categories').controls;
     }
 
     validatorAtLeastOneCategory(formArray: FormArray){
        if(formArray.length == 0){
            return { 'noCategories': true};
        }
        return null;
    }
 
    private initForm(){
        let formCategories = new FormArray([], this.validatorAtLeastOneCategory);
        const timestamp = this.timestampsService.getTimestamp(this.id);
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
    
    onAddCategory(){
        (<FormArray>this.editForm.get('categories')).push(
                new FormControl(null, Validators.required)
        );
    }
    
       onDeleteCategory(index: number){
        (<FormArray>this.editForm.get('categories')).removeAt(index);
    }
    
    cancelEdit(){
        this.timestampsService.edited = null;
        this.router.navigate(['/timer/all']);
    }
    
    deleteTimestamp(){
        this.timestampsService.deleteTimestamp(this.id);
        this.isDeleted = true;
        setTimeout(this.finish.bind(this), 2000);
    }
    
    onSubmit(){
        this.timestampsService.updateTimestamp(this.id, this.editForm.value);
        this.isSaved = true;
        setTimeout(this.finish.bind(this),2000);
    }
    
    finish(){
         this.timestampsService.edited = null;
         this.router.navigate(['/timer/all']);               
    }
    
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if(this.timestampsService.edited != null){
            return confirm('Do you want to discard the changes?');
        } else {
            return true;
        }
    }
    
    
}
