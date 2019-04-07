import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from "@angular/router";

import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  manufacturerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public api : ApiService,
  ) { }

  ngOnInit() {
    this.manufacturerForm = this.fb.group({
      name: ['',  Validators.compose([Validators.required])],
    });
  }

  get name() { return this.manufacturerForm.get('name'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.manufacturerForm.value));
    formData.append('op', 'manufacturer');
    formData.append('type', 'addManufacturer');
    this.api.storeModel(formData)
    .subscribe((response:any)=>{
      if(response.status) {
        this.router.navigate(['/add-model']);
      }
    });
  }
}
