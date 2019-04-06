import { Component, OnInit } from '@angular/core';
import { Home } from '../../home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: Home = {
    name: ''
  };
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Submit', JSON.stringify(this.form));
    return false;
  }
}
