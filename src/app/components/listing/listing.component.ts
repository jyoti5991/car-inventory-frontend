import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  modelDetails: []
  modelInfo: []
  baseUrl: any

  constructor(public api : ApiService,) { }

  ngOnInit() {
    this.baseUrl = environment.apiBaseUrl;
    this.retreiveModelDetails();
  }

  retreiveModelDetails() {
    const formData = new FormData();
    formData.set('op','model');
    formData.set('type', 'getAllModelDetails');
    this.api.getModels(formData)
    .subscribe((response:any)=>{
      if(response.length > 0) {
        this.modelDetails = [];
        this.modelDetails = response;
      }
    });
  }

  setModalData(data) {
    this.modelInfo = data;
  }

  sellModel(id) {
    const formData = new FormData();
    formData.set('op','model');
    formData.set('type', 'deleteModel');
    formData.set('id', id);
    this.api.deleteModel(formData)
    .subscribe((response:any)=>{
      if(response.status) {
        this.retreiveModelDetails();
      }
    });
  }
}
