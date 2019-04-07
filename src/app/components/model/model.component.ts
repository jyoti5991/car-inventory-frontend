import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from "@angular/router"
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  modelForm: FormGroup;
  docs: FormGroup;
  manufacturerList: []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public api : ApiService,
  ) {
    const formData = new FormData();
    formData.set('op','manufacturer');
    formData.set('type', 'getManufacturers');

    this.api.getModels(formData)
    .subscribe((response:any)=>{
      if(response.length > 0) {
        this.manufacturerList = response;
      }
    });
  }

  ngOnInit() {
    this.modelForm = this.fb.group({
      manufacturer_id: [''],
      name: ['',  Validators.compose([Validators.required, Validators.minLength(5)])],
      manufacturing_year: [''],
      registration_number: [''],
      color: [''],
      note: [''],
    });
    this.docs = this.fb.group({
      document_1: [''],
      document_2: [''],
    })
  }

  get name() { return this.modelForm.get('name'); }

  fileUploader(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.docs.get(event.target.id).setValue(elem.files[0]); 
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.modelForm.value));
    formData.append('op', 'model');
    formData.append('type', 'createModel');
    formData.append('document_1', this.docs.get('document_1').value);
    formData.append('document_2', this.docs.get('document_2').value);
    
    this.api.storeModel(formData)
    .subscribe((response:any)=>{
      if(response.status) {
        this.router.navigate(['/listing']);
      }
    })
  }

}
