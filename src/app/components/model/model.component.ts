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
  default: string = 'select';
  err: boolean = false;

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
      manufacturer_id: ['',  Validators.compose([Validators.required])],
      name: ['',  Validators.compose([Validators.required])],
      manufacturing_year: ['', Validators.compose([Validators.required])],
      registration_number: [''],
      color: ['', Validators.compose([Validators.required])],
      note: [''],
    });
    this.modelForm.get('manufacturer_id').setValue(this.default, {onlySelf: true});
    this.docs = this.fb.group({
      document_1: [''],
      document_2: [''],
    })
  }

  get name() { return this.modelForm.get('name'); }

  get manufacturing_year() { return this.modelForm.get('manufacturing_year'); }
  
  get color() { return this.modelForm.get('color'); }

  get manufacturer_id() { return this.modelForm.get('manufacturer_id'); }

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
        this.err = false;
        this.router.navigate(['/listing']);
      } else {
        this.err = true;
      }
    })
  }

}
