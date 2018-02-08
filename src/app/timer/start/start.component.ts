import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take'; 

import { Timestamp } from '../timestamp.model';
import * as fromTimer from '../store/timer.reducers';
import * as TimerActions from '../store/timer.actions';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
    addForm: FormGroup;
    timerState: Observable<fromTimer.State>;
    nameSuggestions: string[];
    placeholderCategories: string = "";
    timestamps: Timestamp[];
 
  constructor(private store: Store<fromTimer.FeatureState>, private router: Router) { }

  ngOnInit() {
    this.timerState = this.store.select('timer');
    this.store.select('timer').subscribe(
        (timerState: fromTimer.State) => {
            this.timestamps = timerState.timestamps;
        }
    );
    this.initForm();
    this.placeholder();
    this.getNamesOfTimestamps();
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
  

  placeholder(){
    this.store.select('timer').subscribe(
        (timerState: fromTimer.State) => {
            let result = "";
            for(let item of this.getCategoryOfTimestamps(timerState.timestamps)){
                result += item;
                result += " ";
            }
            this.placeholderCategories = result;
        }
    );
  }
  
    getNamesOfTimestamps(){
        this.timerState.subscribe(
            (timerState: fromTimer.State) => {
                let result: string[] = [];
                let keys = {};
                let value: string;
                for(let item of timerState.timestamps){
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
                this.nameSuggestions = result;
            }
        );
    }
    
    chooseName(name: string){
        this.addForm.get('name').setValue(name);
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
    
    getCategories() {
        return (<FormArray>this.addForm.get('categories')).controls;
    }
     
     
    onAddCategory(){
        (<FormArray>this.addForm.get('categories')).push(
                new FormControl(null, Validators.required)
        );
    }

    isToday(timestamp: Timestamp){
        const today = new Date();
        return today.getDate() == timestamp.day &&
                (today.getMonth() + 1) == timestamp.month &&
                today.getFullYear() == timestamp.year;
    }

    validatorAtLeastOneCategory(formArray: FormArray){
        if(formArray.length == 0){
            return { 'noCategories': true};
        }
        return null;
    }
    
    onSubmit(){
        let today = new Date();
        let timestamp = new Timestamp(
            this.addForm.value['name'],
            this.addForm.value['description'],
            this.addForm.value['categories'],
            today.getHours(),
            today.getMinutes(),
            -1,
            -1,
            today.getDate(),
            (today.getMonth() + 1),
            today.getFullYear()
        );
        this.store.dispatch(new TimerActions.AddTimestamp(timestamp));
        this.onReset();
    }
    
    onReset(){
        this.addForm.reset();
    }
    
    onEdit(timestamp: Timestamp){
        this.store.dispatch(new TimerActions.StartEdit(timestamp));
        this.router.navigate(['/timer/edit']);
    }
    
    onDeleteCategory(index: number){
        (<FormArray>this.addForm.get('categories')).removeAt(index);
    }

    onFinish(name: string){
        this.store.dispatch(new TimerActions.FinishNow(name));
    }    
}
