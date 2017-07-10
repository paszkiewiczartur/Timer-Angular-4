import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TimestampsService } from '../timestamps.service';
import { Timestamp } from '../timestamp.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
    addForm: FormGroup;
    timestamps: Timestamp[];
    subscription: Subscription;
    nameSuggestions;
 
  constructor(private timestampsService: TimestampsService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.timestampsService.timestampsChanged.subscribe(
        (timestamps: Timestamp[]) => {
            this.timestamps = timestamps;
        }
    );
    this.timestamps = this.timestampsService.getTimestamps();
    this.initForm();
    this.nameSuggestions = this.getNameOfTimestamps();
  }
  
    chooseName(name: string){
        this.addForm.get('name').setValue(name);
    }
  
    getNameOfTimestamps(){
        let result: string[] = [];
        let keys = {};
        let value: string;
        for(let item of this.timestampsService.getTimestamps()){
            if(item['name'] == ''){
                value = 'Inne';
            } else {
                value = item['name'];
            }
            if(keys[value] == null){
                keys[value] = true;
                result.push(value);
            }
        }
        return result;
    }
  
    getCategoryOfTimestamps(timestamps: Timestamp[]){
        let result: string[] = [];
        let keys = {};
        let value: string;
        for(let item of timestamps){
            if(item['categories'].length != 0){
                for(let i of item['categories']){
                    if(keys[i] == null){
                        keys[i] = true;
                        result.push(i);
                    }                    
                }
            }
        }
        return result;        
    }
  
  placeholderCategory(){
    let result = "";
    for(let item of this.getCategoryOfTimestamps(this.timestampsService.getTimestamps())){
        result += item;
        result += " ";
    }
    //return this.timestampsService.getTimestamps()[this.timestampsService.getTimestamps().length - 1].categories[0];
    return result;
  }
    private initForm(){
        let formName = '';
        let formDescription = '';
        let formCategories = new FormArray([], this.validatorAtLeastOneCategory);
        
        this.addForm = new FormGroup({
            'name': new FormControl(formName, Validators.required),
            'description': new FormControl(formDescription, Validators.required),
            'categories': formCategories
        });
        
        this.onAddCategory();
    }
    
    getCategories(addForm) {
        return addForm.get('categories').controls;
     }
     
     
    onAddCategory(){
        (<FormArray>this.addForm.get('categories')).push(
                new FormControl(null, Validators.required)
        );
    }
    
    validatorAtLeastOneCategory(formArray: FormArray){
        if(formArray.length == 0){
            return { 'noCategories': true};
        }
        return null;
    }
    
    onSubmit(){
        this.timestampsService.addTimestamp(
            this.addForm.value['name'],
            this.addForm.value['description'],
            this.addForm.value['categories']);
        this.addForm.reset();
    }
    
    onReset(){
        this.addForm.reset();
    }
    
    onEdit(name: string){
        this.timestampsService.edited = this.timestampsService.getUnfinishedTimestamp(name);
        this.router.navigate(['/timer/edit']);
    }
    
    onDeleteCategory(index: number){
        (<FormArray>this.addForm.get('categories')).removeAt(index);
    }

    
    onFinish(name: string){
        this.timestampsService.finishTimestamp(name);
    }
}
