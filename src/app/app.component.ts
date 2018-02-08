import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  
  constructor(){}
  
  ngOnInit(){
    firebase.initializeApp({
        apiKey: "AIzaSyC9P6GRaMXYjrSqteKfrOOvTAjkJcTNRxg",
        authDomain: "timer-ced0b.firebaseapp.com",
    });
  }
}
